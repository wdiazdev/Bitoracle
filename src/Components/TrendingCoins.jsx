import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { trendingCoins } from '../APIs/ApiUrl';
import '../Styles/TrendingCoins.css';
import { TrendingCard } from './TrendingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper';

export const TrendingCoins = () => {

    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(trendingCoins);
        setTrending(data.coins);
        // console.log(data.coins);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, []);

    return (
        <div className='trending--container'>
            <h2>Trending Cryptos</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                className='swiper--container'
                breakpoints={{
                    1000: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                    }
                }}
            >
                {trending.map((coin) => {
                    return (
                        <SwiperSlide key={coin.item.id}>
                            <TrendingCard coin={coin.item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div >
    )
};