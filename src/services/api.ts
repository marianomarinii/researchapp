import axios from 'axios';
import { Coin } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const DEFILLAMA_API = 'https://api.llama.fi';

export const getTopCoins = async (): Promise<Coin[]> => {
  const response = await axios.get(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false`
  );
  return response.data;
};

export const getCoinTVL = async (coinId: string): Promise<number> => {
  const response = await axios.get(`${DEFILLAMA_API}/protocols/${coinId}`);
  return response.data.tvl;
};

export const getMarketMetrics = async () => {
  const response = await axios.get(`${COINGECKO_API}/global`);
  return response.data.data;
};
