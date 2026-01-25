import { Widget } from '@/app/store/dashboardSlice';

export const DEMO_WIDGETS: Widget[] = [
  {
    id: 'demo-1',
    name: 'Bitcoin Price Tracker',
    apiUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true',
    selectedFields: ['usd', 'usd_market_cap'],
    displayMode: 'card',
    refreshInterval: 60,
    position: 0,
    data: { 
      usd: 42350.50,
      usd_market_cap: 830000000000
    },
    loading: false,
    error: null,
  },
  {
    id: 'demo-2',
    name: 'Crypto Market Overview',
    apiUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,cardano,solana&vs_currencies=usd&include_market_cap=true',
    selectedFields: ['ethereum', 'cardano', 'solana'],
    displayMode: 'table',
    refreshInterval: 60,
    position: 1,
    data: { 
      ethereum: { usd: 2350.75, usd_market_cap: 282000000000 },
      cardano: { usd: 0.95, usd_market_cap: 33000000000 },
      solana: { usd: 195.80, usd_market_cap: 87000000000 }
    },
    loading: false,
    error: null,
  },
  {
    id: 'demo-3',
    name: 'Top Coins Market Cap',
    apiUrl: 'https://api.coingecko.com/api/v3/global?vs_currencies=usd',
    selectedFields: ['total_market_cap', 'total_volume', 'btc_dominance'],
    displayMode: 'chart',
    refreshInterval: 60,
    position: 2,
    data: { 
      total_market_cap: 1200000000000,
      total_volume: 85000000000,
      btc_dominance: 48.5
    },
    loading: false,
    error: null,
  },
];

export const DEMO_TEMPLATES = [
  {
    id: 'template-crypto',
    name: '🪙 Crypto Portfolio',
    description: 'Monitor multiple cryptocurrencies in real-time',
    icon: '🪙',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'template-stocks',
    name: '📈 Stock Market',
    description: 'Track stock prices and market trends',
    icon: '📈',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'template-forex',
    name: '💱 Forex Rates',
    description: 'Monitor currency exchange rates',
    icon: '💱',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'template-custom',
    name: '⚙️ Custom API',
    description: 'Connect any financial API you want',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-500',
  },
];
