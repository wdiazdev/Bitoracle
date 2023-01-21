import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { singleCoin } from '../APIs/ApiUrl';
import '../Styles/CoinPage.css';
import { FaWindowClose } from "react-icons/fa";

export const CoinPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [coin, setCoin] = useState([]);

    const fetchCoin = () => {
        axios.get(singleCoin(id))
            .then(res => {
                console.log(res.data)
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
                    <div><img src={coin.image.large} alt={coin.name} /></div>
                    <div><h2>{coin.name}</h2></div>
                    <div><FaWindowClose
                        className='close--btn'
                        onClick={() => navigate('/')}
                    /></div>
                </nav>
            </div>
        </div>
    )
}
