import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { trendingCoins } from '../APIs/ApiUrl';
import '../Styles/TrendingCoins.css';

export const TrendingCoins = () => {

    const [trending, setTrending] = useState([]);

    const navigate = useNavigate();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(trendingCoins);
        setTrending(data.coins);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, []);

    return (
        <div className='trending--container'>
            <h2>Trending Cryptos</h2>
            <div className='card--container'>
                {trending.map((coin, id) => {
                    return (
                        <div key={id} className='card' onClick={() => navigate(`/coin/${coin.id}`)}>
                            <img src={coin.item.large} alt={coin.item.name} />
                            <h3>{coin.item.name}</h3>
                            <span># {coin.item.market_cap_rank}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
