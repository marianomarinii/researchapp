export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
  price_change_percentage_24h: number;
}

export interface KPILink {
  id: string;
  title: string;
  url: string;
  coinId: string;
}

export interface BlogLink {
  id: string;
  title: string;
  url: string;
  coinId: string;
}

export interface DashboardMetric {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
