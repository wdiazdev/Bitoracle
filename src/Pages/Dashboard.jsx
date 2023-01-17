import '../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';
import { SearchBar } from '../Components/SearchBar';
import { Portfolio } from '../Components/Portfolio';

export const Dashboard = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [selectedData, setSelectedData] = useState([]);

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

    //? Handle input filtered data / SearchBar component

    const handleFilter = (event) => {
        const searchCoin = event.target.value;
        const newFilter = cryptoData.filter((coin) => {
            return coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchCoin.toLowerCase())
        });
        if (searchCoin === '') {
            setFilteredData([]);
        } else
            setFilteredData(newFilter);
    };

    //? Handle Selected crypto / Search component data result

    const handleSelect = (e) => {
        e.preventDefault()
        const selectedCoin = document.getElementById('asset').innerText;
        if (selectedCoin === filteredData.name || filteredData.symbol) {
            return setSelectedData(filteredData[0])
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
                            <SearchBar
                                filteredData={filteredData}
                                handleFilter={handleFilter}
                                handleSelect={handleSelect}
                            />
                            <Portfolio filteredData={filteredData} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
};