import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css';
import { Loader } from '../Components/Loader';
import { marketDataUrl } from '../APIs/ApiUrl';
import { SearchDashCoin } from '../Components/SearchDashCoin';
import { QtyDashCoin } from '../Components/QtyDashCoin';
import { DashboardAssets } from '../Components/DashboardAssets';
import { DashChart } from '../Components/DashChart';
import { WatchList } from '../Components/WatchList';
import { userAuth } from '../Context/AuthContext';
import { db } from '../Utilities/Firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const [cryptoData, setCryptoData] = useState([]);

    const [searchCoin, setSearchCoin] = useState([]);

    const [activeCurrency, setActiveCurrency] = useState([]);

    const [amount, setAmount] = useState(0);

    const [assets, setAsset] = useState([]);

    const { currentUser } = userAuth();

    const dbUserID = doc(db, 'users', `${currentUser?.email}`);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(marketDataUrl);
            setCryptoData(data);
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        const searchValue = event.target.value.toLowerCase();
        const searchResult = cryptoData.filter(
            (coin) =>
                coin.name.toLowerCase().includes(searchValue) ||
                coin.symbol.toLowerCase().includes(searchValue)
        );

        setSearchCoin(searchValue ? searchResult : []);
    };

    const handleSelect = (event) => {
        event.preventDefault();

        const id = event.currentTarget.id;
        const activeCurrency = cryptoData.find((item) => item.id === id);

        setActiveCurrency(activeCurrency);
        setSearchCoin([]);
    };

    const handleAmount = (event) => {
        const value = parseInt(event.target.value);

        setAmount(isNaN(value) ? 0 : value);
        setSearchCoin([]);
    };

    // const addAsset = (event) => {
    //     event.preventDefault();

    //     setSearchCoin([]);

    //     setAsset([...assets, {
    //         id: activeCurrency.id,
    //         name: activeCurrency.name,
    //         price: activeCurrency.current_price,
    //         img: activeCurrency.image,
    //         quantity: amount,
    //         total: amount * activeCurrency.current_price
    //     }])

    //     setSearchCoin([]);
    //     setActiveCurrency([]);
    //     setAmount(0);
    // }

    const addAssetAndSaveToPortfolio = async (event) => {
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

        if (currentUser?.email) {
            await updateDoc(dbUserID, {
                portfolio: arrayUnion({
                    id: activeCurrency.id,
                    name: activeCurrency.name,
                    price: activeCurrency.current_price,
                    img: activeCurrency.image,
                    quantity: amount,
                    total: amount * activeCurrency.current_price
                })
            })
        } else {
            alert('An error occurred')
        }
    }

    //LOADER
    useEffect(() => {
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 1000);

        setLoading(true);

        return () => {
            clearTimeout(timerId);
        };
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
                                            addAssetAndSaveToPortfolio={addAssetAndSaveToPortfolio}
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


                            <DashboardAssets
                                assets={assets}
                                setAsset={setAsset}
                            />

                        </div>

                        <WatchList />

                    </div>

                </div>
            }
        </>
    )
};