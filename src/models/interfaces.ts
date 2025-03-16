//A coin that is enabled for the user
export interface EnabledCoin {
  coin: CoinType;
  enabled: boolean;
}

//Map of enabled coins
export interface EnabledCoinMap {
  [key: string]: EnabledCoin;
}

//Coin data
export interface Coin {
  coin: CoinType;
  amount: number;
  value?: number;
}

//Coin type
export interface CoinType {
  id: string;
  name: string;
  symbol: string;
}

//Map of coin price data
export interface Prices {
  [key: string]: PriceData;
}

//Coin price data
export interface PriceData {
  usd: number;
}

//Map of coins in the portfolio
export interface Portfolio {
  [key: string]: Coin;
}

//Client data
interface Client {
  id: string;
  firstName: string;
  lastName: string;
  availableFunds: number;
  portfolio: Portfolio;
}