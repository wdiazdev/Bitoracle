import { trendingCoins } from '../APIs/ApiUrl';
import '../Styles/TrendingCoins.css';
import { TrendingCard } from './TrendingCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from './Spinner';
import styled from 'styled-components';


export const TrendingCoinSlider = () => {

    const {
        data,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['Trending Coins'],
        queryFn: () => trendingCoins(),
        keepPreviousData: true,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Spinner />;
    };

    if (isError) {
        return <Error>
            <h3>Error: {error.message}</h3>
        </Error>;
    };

    return (
        <div
            className='trending--container'
            data-aos='fade-up'
            data-aos-duration='2000'
        >

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

                {data.coins?.map((coin) => (
                    <SwiperSlide key={coin.item.id}>
                        <TrendingCard coin={coin.item} />
                    </SwiperSlide>
                ))}

            </Swiper>

        </div >
    )
};

export const Error = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 2rem 0;
`