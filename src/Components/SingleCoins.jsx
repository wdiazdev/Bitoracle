import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { singleCoinMain } from '../APIs/ApiUrl';
import { formatCurrency } from '../Utilities/FormatCurrency';

export const SingleCoins = () => {

    const [singleCoin, setSingleCoin] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSingleCoin = async () => {
            try {
                const { data } = await axios.get(singleCoinMain);
                setSingleCoin(data);
            } catch (error) {
                console.log('Error fetching single coin data:', error);
            }
        }
        fetchSingleCoin();
    }, [singleCoinMain]);

    return (

        <div className='coins--container'>

            {singleCoin.map((coin) => {
                return (
                    <div
                        data-aos='fade-down-left'
                        data-aos-duration='1500'
                        key={coin.id}
                        onClick={() => navigate(`/coin/${coin.id}`)}
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
