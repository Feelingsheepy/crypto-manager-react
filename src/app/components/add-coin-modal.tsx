import { CoinType } from '@/models/interfaces';
import { useState } from 'react';
import CoinItem from './coin-item';

interface AddCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCoin: (coin: CoinType) => void;
  coinTypes?: CoinType[];
  isLoading: boolean;
  enabledCoins: Record<string, any>;
}

//Component to add a coin to the enabled coins
export function AddCoinModal({
  isOpen,
  onClose,
  onAddCoin,
  coinTypes,
  isLoading,
  enabledCoins
}: AddCoinModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Coin</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search coins..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-64 overflow-y-auto mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (coinTypes
            ?.filter(coin =>
              // Filter out coins that are already enabled and include the search term
              coin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !enabledCoins[coin.id]?.enabled
            )
            // Only show the first 50 coins that fit the filter
            .slice(0, 50)
            // Map the coins to a clickable list
            .map(coin => (
              <div
                key={coin.id}
                onClick={() => {
                  onAddCoin(coin);
                  onClose();
                }}
                className="flex items-center justify-between p-1 hover:bg-base-200 rounded-lg cursor-pointer transition-colors"
              >
                <CoinItem symbol={coin.symbol} name={coin.name} />
              </div>
            )))}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => onClose()}>Close</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => onClose()}>close</button>
      </form>
    </dialog>
  );
}