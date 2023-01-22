export const singleCoinMain = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const singleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

export const globalMarketDataURL = 'https://api.coingecko.com/api/v3/global/';

export const marketDataUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const trendingCoins = 'https://api.coingecko.com/api/v3/search/trending';

export const HistoricalChart = (id, days = 365) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;