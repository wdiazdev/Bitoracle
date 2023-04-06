import { useNavigate } from 'react-router-dom';
import { singleCoinMain } from '../APIs/ApiUrl';
import { formatCurrency } from '../Utilities/FormatCurrency';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from './Spinner';
import { Error } from './TrendingCoinSlider';

export const SingleCoins = () => {

    const navigate = useNavigate();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['Single Coins'],
        queryFn: () => singleCoinMain(),
        keepPreviousData: true,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    // console.log(data);

    if (isLoading) {
        return <Spinner />;
    };

    if (isError) {
        return <Error>
            <h3>Error: {error.message}</h3>
        </Error>;
    };

    return (

        <div className='coins--container'>

            {data?.map((coin) => {
                return (
                    <div
                        data-aos='fade-left'
                        data-aos-duration='1500'
                        // data-aos-easing='ease-in-sine'
                        key={coin.id}
                        onClick={() => {
                            console.log(`Navigating to /coin/${coin.id}`);
                            navigate(`/coin/${coin.id}`);
                        }}
                    >

                        <div className='coin'>

                            <img src={coin.image} alt={coin.name} />

                            <div className='main--price--symbol'>

                                <div className='main--symbol--rank'>

                                    <div className='main--rank'>
                                        #{coin.market_cap_rank}
                                    </div>

                                    <div>
                                        {coin.symbol.toUpperCase()}
                                    </div>
                                </div>

                                <span className='main--price'>
                                    {formatCurrency(coin.current_price.toFixed(2))}
                                </span>

                            </div>

                        </div>

                    </div>
                )
            })}

        </div>

    )
};
