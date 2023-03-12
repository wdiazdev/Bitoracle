import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css';
import { Loader } from '../Components/Loader';
import { formatCurrency } from '../Utilities/FormatCurrency';
import { marketDataUrl } from '../APIs/ApiUrl';
import { SearchDashCoin } from '../Components/SearchDashCoin';
import { QtyDashCoin } from '../Components/QtyDashCoin';
import { DashboardAssets } from '../Components/DashboardAssets';
import { DashChart } from '../Components/DashChart';

export const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const [cryptoData, setCryptoData] = useState([]);

    const [searchCoin, setSearchCoin] = useState([]);

    const [activeCurrency, setActiveCurrency] = useState([]);

    const [amount, setAmount] = useState(0);

    const [balance, setBalance] = useState(0);

    const [assets, setAsset] = useState([]);

    const fetchCryptoData = async () => {
        const { data } = await axios.get(marketDataUrl);
        setCryptoData(data);
    };

    useEffect(() => {
        fetchCryptoData();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        let value = event.target.value.toLowerCase();

        let result = [];

        result = cryptoData.filter((coin) => {
            return coin.name.toLowerCase().includes(value) ||
                coin.symbol.toLowerCase().includes(value)
        });

        if (value === '') {
            setSearchCoin([]);
        } else {
            setSearchCoin(result)
        }
    };

    const handleSelect = (event) => {
        event.preventDefault();

        const id = event.currentTarget.id;
        const activeCurrency = cryptoData.filter((item) => item.id === id);

        setActiveCurrency(activeCurrency[0]);
        setSearchCoin([]);
    };

    const handleAmount = (event) => {
        let value = parseInt(event.target.value);

        setAmount(value);
        setSearchCoin([]);
    };

    const addAsset = (event) => {
        event.preventDefault();

        setSearchCoin([]);

        setAsset([...assets, {
            id: activeCurrency.id,
            name: activeCurrency.name,
            price: activeCurrency.current_price,
            img: activeCurrency.image,
            quantity: amount,
            total: amount * activeCurrency.current_price
        }])

        setSearchCoin([]);
        setActiveCurrency([]);
        setAmount(0);
    }


    //  TOTAL BALANCE LOGIC
    useEffect(() => {
        let total = 0;
        for (let i = 0; i < assets.length; i++) {
            total += parseInt(assets[i].price * assets[i].quantity)
        }
        const newBalance = `${formatCurrency(total)}`;
        setBalance(newBalance);
    }, [assets]);


    //  LOADER
    useEffect(() => {
        setLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <>
            {loading ?

                <Loader /> :

                <div className='dashboard--container'>

                    <div className='dashboard--wrapper'>

                        <div className="dashboard--data">

                            <div className='user--inputs'>
                                {
                                    activeCurrency.length != 0 ?


                                        <QtyDashCoin
                                            activeCurrency={activeCurrency}
                                            handleAmount={handleAmount}
                                            addAsset={addAsset}
                                        />

                                        :

                                        <SearchDashCoin
                                            handleSelect={handleSelect}
                                            handleSearch={handleSearch}
                                            searchCoin={searchCoin}
                                            activeCurrency={activeCurrency}
                                        />
                                }

                                <DashChart
                                    assets={assets}
                                />
                            </div>

                            <div>
                                <DashboardAssets
                                    balance={balance}
                                    assets={assets}
                                    setAsset={setAsset}
                                />
                            </div>

                        </div>

                    </div>

                </div>
            }
        </>
    )
};