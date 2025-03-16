import { CoinType, Prices } from "@/models/interfaces";
import { j, publicProcedure } from "../jstack"
import { z } from "zod";

//Router for managing prices
export const priceRouter = j.router({
  //Fetch the prices from coin gecko
  fetch: publicProcedure
    .input(z.object({
      coinIds: z.array(z.string()).nonempty()
    }))
    .query(async ({ input, c }) => {
      //Build query string from input
      const { coinIds } = input;
      const queryString = coinIds.join(',');

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${queryString}&vs_currencies=usd`,
        { 
          next: { 
            revalidate: 60, //Cache for 60 seconds
            tags: ['prices', ...coinIds.map(id => `price-${id}`)] //Each id in the cache is independently cached
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch prices');
      }

      var data = await res.json<Prices>();
      console.log(data);

      return c.superjson(data);
    }),
  
  //Fetch available coins from coin gecko
  getCoinList: publicProcedure
    .query(async ({ c }) => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );

      if (!res.ok) {
        throw new Error('Failed to fetch coin list');
      }

      var data = await res.json<CoinType[]>();
      console.log(data);

      return c.superjson(data);
    }),
})