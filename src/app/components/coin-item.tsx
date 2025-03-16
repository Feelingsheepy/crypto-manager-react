// /components/CoinItem.tsx
import { ReactNode } from "react";

interface CoinItemProps {
  symbol: string; // e.g., "btc"
  name: string;   // e.g., "Bitcoin"
  className?: string; // Optional: extra DaisyUI/Tailwind classes
  children?: ReactNode; // Optional: for additional content (e.g. buttons)
}

//Component to show a coin item with symbol and name and spot for extra content
export default function CoinItem({ symbol, name, className = "", children }: CoinItemProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-base-200 rounded-lg w-full">
      <div className={`flex items-center gap-2 flex-1 ${className}`}>
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8 flex items-center justify-center ring ring-primary ring-offset-2 ring-offset-base-100">
            <span className="text-xs">{symbol.toUpperCase()}</span>
          </div>
        </div>
        <span className="font-medium pl-2">{name}</span>
      </div>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}