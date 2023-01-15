import '../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';
import TableRow from '../Components/TableRow';

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
        setLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    const handleFilter = (event) => {
        const searchCoin = event.target.value.toLocaleLowerCase()
        const newFilter = cryptoData.filter((coin) => {
            return coin.name.toLowerCase().includes(searchCoin) ||
                coin.symbol.toLowerCase().includes(searchCoin)
        });
        if (searchCoin === '') {
            setFilteredData([]);
        } else
            setFilteredData(newFilter);
    };

    const handleSelect = (e) => {
        e.preventDefault()
        const selectedCoin = document.getElementById('asset').innerText.toLocaleLowerCase();
        if (selectedCoin === filteredData.name) {
            return setFilteredData(selectedCoin)
        }
        console.log(filteredData)
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
                                <h4>Add an Asset:</h4>
                                <input
                                    type='text'
                                    name='asset'
                                    id='asset'
                                    placeholder='Ex: Bitcoin, Ethereum...'
                                    autoComplete='off'
                                    className='input--search'
                                    onChange={handleFilter}
                                />
                                {filteredData.length != 0 &&
                                    <div className='filtered--container'>
                                        {filteredData.map((coin, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    className='data--result'
                                                    onClick={handleSelect}
                                                >
                                                    <img src={coin.image} alt={coin.name} />
                                                    <span
                                                        id='selected'

                                                    >
                                                        {coin.name}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                }
                            </div>

                            <div className='portfolio--container'>

                                <h4>Current Balance:</h4>

                                <table className='dashboard--table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th>price</th>
                                            <th>Quantity</th>
                                            <th>AVG. Buy Price</th>
                                            <th>Holdings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableRow filteredData={filteredData} />

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
};