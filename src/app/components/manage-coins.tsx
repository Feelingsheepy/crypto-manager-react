"use client";

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CoinItem from "./coin-item";
import { AddCoinModal } from "./add-coin-modal";
import { useCoinStore } from "@/stores/coin-store";

//Component to manage enabled coins
export default function ManageCoins() {
  const { enabledCoins, toggleCoin } = useCoinStore();
  const [modalOpen, setModalOpen] = useState(false);

  //Query the available coin types
  const { data: coinTypes, isLoading: isCoinTypeLoading } = useQuery({
    queryKey: ['coin-types'],
    queryFn: async () => {
      const res = await client.price.getCoinList.$get();
      if (!res.ok) throw new Error('Failed to fetch coin list');
      return res.json();
    },
    refetchInterval: 3600000,
  });

  const closeModal = () => setModalOpen(false);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Active Coins</h2>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setModalOpen(true)}
          >
            Add Coin
          </button>
        </div>

        {/* Active Coins List */}
        <div className="space-y-2">
          {Object.values(enabledCoins)
            .filter((coin) => coin.enabled)
            .map((coin) => (
              <CoinItem name={coin.coin.name} symbol={coin.coin.symbol} key={coin.coin.id}>
                <input
                  id={`toggle-${coin.coin.id}`}
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={true}
                  onChange={() => toggleCoin(coin.coin)}
                  aria-label={`Toggle ${coin.coin.name}`}
                />
              </CoinItem>
            ))}
        </div>

        <AddCoinModal isOpen={modalOpen} enabledCoins={enabledCoins} isLoading={isCoinTypeLoading} onAddCoin={toggleCoin} coinTypes={coinTypes} onClose={closeModal} />
      </div>
    </div>
  );
}