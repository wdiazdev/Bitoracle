import axios from 'axios';
import { useEffect, useState } from 'react';
import { singleCoinMain } from '../APIs/ApiUrl';
import { formatCurrency } from '../Utilities/FormatCurrency';

export const SingleCoins = () => {

    const [singleCoin, setSingleCoin] = useState([]);

    const fetchSingleCoin = () => {
        axios.get(singleCoinMain)
            .then(res => {
                // console.log(res.data)
                setSingleCoin(res.data)
            }).catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        fetchSingleCoin();
    }, []);

    return (
        <div className='coins--container'>
            {
                singleCoin.map((coin, index) => {
                    return (
                        <div key={index} className='coin'>

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
                    )
                })
            }
        </div>
    )
};
