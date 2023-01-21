import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleCoin } from '../APIs/ApiUrl';

export const CoinPage = () => {

    const { id } = useParams();

    const [coin, setCoin] = useState([]);

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

    console.log(coin)
    return (
        <div>{coin.name}</div>
    )
}
