import axios from 'axios';

export const baseURL = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
});

export const marketData = async () => {
    const response = await baseURL.get(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`)
    return response.data
};

export const trendingCoins = async () => {
    const response = await baseURL.get('/search/trending')
    return response.data
};

export const singleCoinMain = async () => {
    const response = await baseURL.get('/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    return response.data
};

export const globalMarketDataURL = async () => {
    const response = await baseURL.get('/global/')
    return response.data
};

export const singleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;


export const marketDataUrl = (page) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=${page}&sparkline=false`;

export const HistoricalChart = (id, days) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;