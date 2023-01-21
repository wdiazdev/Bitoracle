import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { singleCoin } from '../APIs/ApiUrl';
import '../Styles/CoinPage.css';
import { FaWindowClose } from "react-icons/fa";
import { numberWithCommas } from '../Utilities/FormatCurrency';

export const CoinPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [coin, setCoin] = useState({});

    const fetchCoin = () => {
        axios.get(singleCoin(id))
            .then(res => {
                // console.log(res.data)
                setCoin(res.data)
            }).catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    return (
        <div className='coin--page--container'>
            <div className='coin--info--container'>

                <nav className='coin--page--nav'>
                    {coin.image ? <div><img src={coin.image.large} alt={coin.name} /></div> : null}
                    <div><h2>{coin.name}</h2></div>
                    <div><FaWindowClose
                        className='close--btn'
                        onClick={() => navigate('/')}
                    /></div>
                </nav>
                {coin.description ? <p className='description'>{coin.description.en.split(". ")[0]}.</p> : null}
                <div className='coin--page--info'>
                    <div className='coin--page--info--1'>
                        <ul>
                            <li><p>Market Rank:</p>#{coin.market_cap_rank}</li>
                            {coin.market_data?.current_price ? <li><p>Price:</p>${numberWithCommas(coin.market_data.current_price.usd)}</li> : null}
                            {coin.market_data?.market_cap ? <li><p>Market Cap:</p>${numberWithCommas(coin.market_data.market_cap.usd)}</li> : null}
                            {coin.market_data?.total_volume ? <li><p>24 Hour Trading Vol:</p>${numberWithCommas(coin.market_data.total_volume.usd)}</li> : null}
                            {coin.market_data?.max_supply ? <li><p>Max Supply:</p>{numberWithCommas(coin.market_data.max_supply)}</li> : null}
                            {coin.market_data?.total_supply ? <li><p>Total Supply:</p>{numberWithCommas(coin.market_data.total_supply)}</li> : null}
                            {coin.market_data?.circulating_supply ? <li><p>Circulating Supply:</p>{numberWithCommas(coin.market_data.circulating_supply)}</li> : null}
                            {coin.market_data?.high_24h ? <li><p>24 Hour High:</p>${numberWithCommas(coin.market_data.high_24h.usd)}</li> : null}
                            {coin.market_data?.low_24h ? <li><p>24 Hour Low:</p>${numberWithCommas(coin.market_data.low_24h.usd)}</li> : null}
                            {coin.market_data?.ath ? <li><p>All Time High:</p>${numberWithCommas(coin.market_data.ath.usd)}</li> : null}
                            {coin.market_data?.ath_change_percentage ?
                                <li style={coin.market_data.ath_change_percentage.usd > 0 ? { color: '#7CFC00' } : { color: '#DC0000' }}>
                                    <p>From ATH:</p>{numberWithCommas(coin.market_data.ath_change_percentage.usd.toFixed(2))}%
                                </li> : null}
                        </ul>
                    </div>
                    <div className='coin--page--info--2'>



                    </div>
                </div>
            </div>
        </div>
    )
}
