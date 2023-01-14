import '../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';

export const Dashboard = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);

    // const [selected, setSelected] = useState([]);

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
        const selectedCoin = document.getElementById('selected').innerText.toLocaleLowerCase();
        if (selectedCoin === filteredData.name) {
            setFilteredData(selectedCoin.name)
        }
        setFilteredData([])
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
                                <label htmlFor='asset'>Add an Asset:</label>
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
                                <h3>Current Balance:</h3>

                                <table>
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





                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                        </tr>






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


