import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { singleCoin } from '../APIs/ApiUrl';
import '../Styles/CoinPage.css';
import { FaWindowClose } from "react-icons/fa";
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
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    //* LOADER

    useEffect(() => {
        setLoading(false)
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
                                <CoinPageInfo coin={coin} />
                                <CoinPageChart coin={coin} id={id} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};
