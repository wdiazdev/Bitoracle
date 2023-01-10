import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GlobalMarketData = () => {

    const [globalData, setGlobalData] = useState();

    const url = 'https://api.coingecko.com/api/v3/global'

    const fetchGlobalData = () => {
        axios.get(url)
            .then(res => {
                setGlobalData(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        fetchGlobalData();
    }, []);

    return (
        <div>
            {/* {
                globalData.map((data, index) => {
                    return (
                        
                    )
                })



            } */}
        </div>
    )
};
