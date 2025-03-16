"use client";

import { useEffect, useState } from 'react';
import PortfolioForm from './portfolio-form';
import CoinList from './coin-list';
import { Coin, Portfolio } from '@/models/interfaces';
import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useCoinStore } from '@/stores/coin-store';

//Component to show the client's portfolio
export default function ClientPortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  //Add a state to track if the store is hydrated
  const [isHydrated, setIsHydrated] = useState(false);
  const { enabledCoins } = useCoinStore();

  //Set hydrated flag once when component mounts
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  //Query to fetch api prices
  const { data: prices, isLoading, error } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      //Create string array of enabled coin ids
      const enabledCoinsArray = Object.values(enabledCoins)
        .filter((c) => c.enabled)
        .map((c) => c.coin.id);

      //Throw error if no coins are enabled
      if (enabledCoinsArray.length === 0) throw new Error('No coins enabled');

      //Fetch prices from the api
      const res = await client.price.fetch.$get({ coinIds: enabledCoinsArray as [string, ...string[]] });

      if (!res.ok) throw new Error('Failed to fetch prices');

      return res.json();
    },
    refetchInterval: 60000,
    enabled: isHydrated, //Ensure the query is only enabled after the store is hydrated
  });

  //Function to add a coin to the portfolio
  const addCoin = (coinData: Coin) => {
    console.log(coinData);

    const value = coinData.amount * (prices?.[coinData.coin.id.toLowerCase()]?.usd || 0);

    //Updated coin if it does not exist
    let updatedCoin = { coin: coinData.coin, amount: coinData.amount, value: value };

    const existingCoin = portfolio[coinData.coin.id];
    if (existingCoin) {
      //Updated coin if it exists
      updatedCoin = { ...existingCoin, 
        amount: existingCoin.amount + coinData.amount, 
        value: (existingCoin.value ? existingCoin.value : 0) + value };
    }

    //Update the portfolio with the new coin
    setPortfolio({ ...portfolio, [coinData.coin.id]: updatedCoin });
  };

  //Return loading spinner if loading or hydrating
  //Return error message if error
  //Return portfolio form and coin list if successful
  if (!isHydrated || isLoading) return <div className="loading loading-spinner"></div>;
  if (error) return <div className="alert alert-error">Error: {error.message}</div>;

  return (
    <>
      <PortfolioForm onAddCoin={addCoin} />
      <CoinList coins={Object.values(portfolio)} />
    </>
  );
}