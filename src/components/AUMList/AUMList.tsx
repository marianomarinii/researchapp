import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Coin } from '../../types';
import { LinkIcon, NewspaperIcon } from '@heroicons/react/24/outline';

export const AUMList = () => {
  const { portfolio, kpiLinks, blogLinks } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = portfolio.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Links
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCoins.map((coin) => (
              <tr key={coin.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={coin.image}
                      alt={coin.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${coin.current_price.toLocaleString()}
                  </div>
                  <div
                    className={`text-sm ${
                      coin.price_change_percentage_24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title="KPI Links"
                    >
                      <LinkIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      title="Blog Links"
                    >
                      <NewspaperIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
