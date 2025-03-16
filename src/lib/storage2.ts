import { EnabledCoinMap } from "@/models/interfaces";

//Section enabling the user to select which coins they want to see

//Key used to store the enabled coins in local storage
const STORAGE_KEY = 'enabled-coins';

//Default enabled coins
const DEFAULT_COINS = {
  "bitcoin": { coin: { id: "bitcoin", name: "Bitcoin", symbol: "BTC" }, enabled: true }
};

//Function to get the enabled coins from local storage
export function getEnabledCoins(): EnabledCoinMap {
  if (typeof window === 'undefined') return DEFAULT_COINS;

  const stored = localStorage.getItem(STORAGE_KEY);
  
  return stored ? JSON.parse(stored) : DEFAULT_COINS;
}

//Function to save the enabled coins to local storage
export function saveEnabledCoins(coins: EnabledCoinMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coins));
}
