import { UserAuth } from '../Context/AuthContext';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';

export const Dashboard = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [error, setError] = useState();

    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(true);

    const { user, logout } = UserAuth();

    const navigate = useNavigate();

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

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            navigate('/')
            console.log('Successfully logged out')
        } catch (e) {
            setError('Failed to log out')
            console.log(e.message)
        }
    }

    //* LOADER

    useEffect(() => {
        setLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 3000)

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

                    <div className='dash--nav'>
                        <p>Welcome: {user && user.email}</p>

                        <button
                            className='dash--btn'
                            onClick={handleLogout}
                        >Logout</button>

                        {error && <p className='signup--error'>{error}</p>}
                    </div>

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
                                    <div className='data--result'>
                                        {filteredData.map((coin, index) => {
                                            return <span key={index}>{coin.name}</span>
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


