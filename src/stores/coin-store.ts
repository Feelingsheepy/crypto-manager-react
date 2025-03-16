import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CoinType, EnabledCoinMap } from '@/models/interfaces'

interface CoinState {
  enabledCoins: EnabledCoinMap
  toggleCoin: (coin: CoinType) => void
}

const DEFAULT_COINS = {
  "bitcoin": { coin: { id: "bitcoin", name: "Bitcoin", symbol: "BTC" }, enabled: true }
} as EnabledCoinMap

export const useCoinStore = create<CoinState>()(
  persist(
    (set) => ({
      enabledCoins: DEFAULT_COINS,
      toggleCoin: (coinType: CoinType) =>
        set((state) => {
          const existingCoin = state.enabledCoins[coinType.id]
          return {
            enabledCoins: {
              ...state.enabledCoins,
              [coinType.id]: existingCoin
                ? { ...existingCoin, enabled: !existingCoin.enabled }
                : { coin: coinType, enabled: true }
            }
          }
        })
    }),
    {
      name: 'enabled-coins',
    }
  )
)