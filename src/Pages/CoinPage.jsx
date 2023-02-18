import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactHTMLParser from "react-html-parser";
import { singleCoin } from '../APIs/ApiUrl';
import '../Styles/CoinPage.css';
import { Loader } from '../Components/Loader';
import { CoinPageInfo } from '../Components/CoinPageInfo';
import { CoinPageChart } from '../Components/CoinPageChart';

export const CoinPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [coin, setCoin] = useState({});

    const [loading, setLoading] = useState(true);

    const fetchCoin = async () => {
        const { data } = await axios.get(singleCoin(id));
        setCoin(data)
        // console.log(data)
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    //* LOADER

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <>
            {
                loading
                    ?
                    <Loader />
                    :
                    <div className='coin--page--container'>

                        <div className='coin--info--container'>

                            {coin.image ? <img src={coin.image.large} alt={coin.name} className='coin--img--bg' /> : null}

                            <nav className='coin--page--nav'>

                                <div className='img--name--symbol'>

                                    {coin.image ? <img src={coin.image.large} alt={coin.name} /> : null}
                                    <h2>{coin.name}</h2>
                                    <span>{coin.symbol}</span>

                                </div>

                                <button
                                    className='close--btn'
                                    onClick={() => navigate('/')}
                                >
                                    x
                                </button>

                            </nav>


                            <div className='coin--page--info'>
                                <CoinPageInfo coin={coin} />
                                <CoinPageChart coin={coin} id={id} />
                            </div>

                            {coin.description ? <p className='description'>{ReactHTMLParser(coin.description.en.split(". ")[0])}.</p> : null}
                        </div>

                    </div>
            }
        </>
    )
};
