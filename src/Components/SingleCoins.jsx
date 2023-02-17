import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { singleCoinMain } from '../APIs/ApiUrl';
import { formatCurrency } from '../Utilities/FormatCurrency';

export const SingleCoins = () => {

    const [singleCoin, setSingleCoin] = useState([]);

    const navigate = useNavigate();

    const fetchSingleCoin = async () => {
        const { data } = await axios.get(singleCoinMain);
        setSingleCoin(data);
    }

    useEffect(() => {
        fetchSingleCoin();
    }, []);

    return (

        <div className='coins--container'>

            {singleCoin.map((coin) => {
                return (
                    <div onClick={() => navigate(`/coin/${coin.id}`)}>

                        <div key={coin.id} className='coin'>

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
