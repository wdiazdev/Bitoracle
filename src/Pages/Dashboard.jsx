import '../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';

export const Dashboard = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchCryptoData = () => {
        axios.get(marketDataUrl)
            .then(res => {
                // console.log(res.data)
                setCryptoData(res.data)
            }).catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        fetchCryptoData();
    }, []);

    //* LOADER

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    const handleFilter = (event) => {
        const searchCoin = event.target.value
        const newFilter = cryptoData.filter((coin) => {
            return coin.name.toLowerCase().includes(searchCoin) ||
                coin.symbol.toLowerCase().includes(searchCoin)
        });
        if (searchCoin === '') {
            setFilteredData([]);
        } else
            setFilteredData(newFilter);
    };

    return (

        <>
            {loading
                ?
                <Loader />
                :
                <div className='dashboard'>

                    <div className='dash--container'>

                        <h2>Dashboard</h2>

                        <div className='dashboard--data'>

                            <div className='search'>
                                <label>Search for an asset:</label>
                                <input
                                    type='text'
                                    name='asset'
                                    placeholder='Ex: Bitcoin, Ethereum...'
                                    autoComplete='off'
                                    className='input--search'
                                    onChange={handleFilter}
                                />
                                {filteredData.length != 0 &&
                                    <div className='filtered--container'>
                                        {filteredData.map((coin, index) => {
                                            return (
                                                <div key={index} className='data--result'>
                                                    <img src={coin.image} alt={coin.name} />
                                                    <span>{coin.name}</span>
                                                </div>

                                            )

                                        })}
                                    </div>
                                }
                            </div>














                            <div className='assets'>
                                <h3>Total Portfolio Value:</h3>

                            </div>

                        </div>






















                    </div>
                </div>

            }
        </>
    )
};


