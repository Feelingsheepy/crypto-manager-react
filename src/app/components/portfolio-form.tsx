"use client";
import { useState } from 'react';

import { CoinType, EnabledCoinMap } from '@/models/interfaces';
import { useCoinStore } from '@/stores/coin-store';

interface Props {
  onAddCoin: (coin: { coin: CoinType; amount: number }) => void;
}

//Function to get the default coin for the select input
const getDefaultCoin = (enabledCoins: EnabledCoinMap) => {
  const defaultCoin = Object.values(enabledCoins).find((c) => c.enabled);

  return defaultCoin?.coin.id || '';
}

/**
 * PortfolioForm component allows users to add a coin to their portfolio.
 * 
 * @param {Function} onAddCoin - Function to call when a coin is added
 */
export default function PortfolioForm({ onAddCoin }: Props) {
  const {enabledCoins} = useCoinStore();
  const [coin, setCoin] = useState(getDefaultCoin(enabledCoins));
  const [amount, setAmount] = useState(0);
  
  //Function to handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //Call the function passed as a prop to add the coin
    onAddCoin({ coin: enabledCoins[coin]?.coin as CoinType, amount: amount });
    //Reset the form
    setCoin(getDefaultCoin(enabledCoins));
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl p-6 max-w-md mx-auto">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Coin Symbol</span>
        </label>
        <select
          title="Coin type"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="select select-bordered w-full"
        >
          {Object.values(enabledCoins).filter((c) => c.enabled).map((option) => (
            <option key={option.coin.id} value={option.coin.id}>
              {option.coin.name} ({option.coin.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="0.0"
          step="0.1"
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full">
        Add Coin
      </button>
    </form>
  );
}