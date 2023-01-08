import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoData from '../Components/CryptoData';
import '../Styles/Home.css';
import { formatCurrency } from '../Utilities/FormatCurrency';

export const Home = () => {

    const [singleCoin, setSingleCoin] = useState([]);

    const singleCoinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    const fetchSingleCoin = () => {
        axios.get(singleCoinURL)
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
        <div>
            <div className='main--container'>
                <div className='main--info'>

                    <h1>BitOracle</h1>

                    <div className='main--hero'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita unde at repellat. Tempore eum dicta consequatur, ut fuga inventore cumque esse, quisquam, similique quia excepturi labore pariatur harum assumenda voluptates!</p>
                        <button to='signup' className='btn'>Sign Up</button>
                    </div>
                </div>

                <div className='coins--container'>
                    {
                        singleCoin.map((coin, index) => {
                            return (
                                <div key={index} className='coin'>

                                    <img src={coin.image} alt={coin.name} />

                                    <div className='main--price--symbol'>


                                        <span className='main--price'>
                                            {formatCurrency(coin.current_price.toFixed(2))}
                                        </span>

                                        <div className='main--symbol--rank'>

                                            <div className='main--rank'>
                                                #{coin.market_cap_rank}
                                            </div>

                                            <div>
                                                {coin.symbol.toUpperCase()}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <CryptoData />
        </div>
    )
};
