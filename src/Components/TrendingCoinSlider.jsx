import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { trendingCoins } from '../APIs/ApiUrl';
import '../Styles/TrendingCoins.css';
import { TrendingCard } from './TrendingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper';

export const TrendingCoinSlider = () => {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            try {
                const { data } = await axios.get(trendingCoins);
                setTrending(data.coins);
            } catch (error) {
                console.log('Error fetching trending coins data:', error);
            }
        };

        fetchTrendingCoins();
    }, [trendingCoins]);

    return (
        <div className='trending--container'>

            <h3>Trending Cryptos</h3>

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
                        slidesPerView: 2,
                        spaceBetween: 0,
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