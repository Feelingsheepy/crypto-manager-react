"use client";

import { Coin } from '@/models/interfaces';
import CoinItem from './coin-item';


//Component to show a list of coins and their values
export default function CoinList({ coins }: { coins: Coin[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* Table head */}
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c, i) => (
            <tr key={i} className="hover bg-base-200">
              <td>
                <CoinItem symbol={c.coin.symbol} name={c.coin.name} />
              </td>
              <td>{c.amount}</td>
              <td>${c.value?.toLocaleString() || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}