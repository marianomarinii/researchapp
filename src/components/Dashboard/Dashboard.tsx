import { useQuery } from '@tanstack/react-query';
import { getMarketMetrics } from '../../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { data: metrics, isLoading } = useQuery(['marketMetrics'], getMarketMetrics);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const marketMetrics = [
    {
      title: 'Total Market Cap',
      value: metrics?.total_market_cap?.usd
        ? `$${(metrics.total_market_cap.usd / 1e9).toFixed(2)}B`
        : '-',
      change: metrics?.market_cap_change_percentage_24h_usd,
    },
    {
      title: 'Total Volume',
      value: metrics?.total_volume?.usd
        ? `$${(metrics.total_volume.usd / 1e9).toFixed(2)}B`
        : '-',
    },
    {
      title: 'BTC Dominance',
      value: metrics?.market_cap_percentage?.btc
        ? `${metrics.market_cap_percentage.btc.toFixed(2)}%`
        : '-',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketMetrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
            <div className="mt-1 flex items-baseline justify-between">
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
              {metric.change && (
                <span
                  className={`text-sm font-medium ${
                    metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.change >= 0 ? '+' : ''}
                  {metric.change.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
