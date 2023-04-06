import { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import { marketData } from '../APIs/ApiUrl';
import { SearchDashCoin } from '../Components/SearchDashCoin';
import { QtyDashCoin } from '../Components/QtyDashCoin';
import { DashboardAssets } from '../Components/DashboardAssets';
import { DashChart } from '../Components/DashChart';
import { WatchList } from '../Components/WatchList';
import { userAuth } from '../Context/AuthContext';
import { db } from '../Utilities/Firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { HighestHolding } from '../Components/HighestHolding';
import { LowestHolding } from '../Components/LowestHolding';
import { useQuery } from '@tanstack/react-query';
import { Error } from '../Components/TrendingCoinSlider';

const Dashboard = () => {

    const [searchCoin, setSearchCoin] = useState([]);

    const [activeCurrency, setActiveCurrency] = useState([]);

    const [amount, setAmount] = useState(0);

    const [balance, setBalance] = useState(0);

    const [assets, setAsset] = useState([]);

    const { currentUser } = userAuth();

    const dbUserID = doc(db, 'users', `${currentUser?.email}`);

    const {
        data: cryptoData,
        error,
        isError
    } = useQuery({
        queryKey: ['Dashboard Data'],
        queryFn: () => marketData(),
        keepPreviousData: true,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isError) {
        return <Error>
            <h3>Error: {error.message}</h3>
        </Error>;
    };


    // This function is called when the user types something in a search input
    const handleSearch = (event) => {
        event.preventDefault();

        const searchValue = event.target.value.toLowerCase();

        const searchResult = cryptoData.filter(
            (coin) =>
                coin.name.toLowerCase().includes(searchValue) ||
                coin.symbol.toLowerCase().includes(searchValue)
        );

        setSearchCoin(searchValue ? searchResult : '');
    };

    const handleSelect = (event) => {
        event.preventDefault();

        const id = event.currentTarget.id;
        const activeCurrency = cryptoData.find((item) => item.id === id);

        setActiveCurrency(activeCurrency);
        setSearchCoin([]);
    };


    // Updates the amount state and clears the searchCoin state if the value is not a number
    const handleAmount = (event) => {
        const value = parseInt(event.target.value);

        setAmount(isNaN(value) ? 0 : value);
        setSearchCoin([]);
    };

    const addAssetAndSaveToPortfolio = async (event) => {
        event.preventDefault();

        if (currentUser?.email) {
            await updateDoc(dbUserID, {
                portfolio: arrayUnion({
                    id: activeCurrency.id,
                    name: activeCurrency.name,
                    price: activeCurrency.current_price,
                    percentage: activeCurrency.price_change_percentage_24h,
                    img: activeCurrency.image,
                    quantity: amount,
                    total: amount * activeCurrency.current_price
                })
            })
        } else {
            alert('An error occurred')
        }

        setSearchCoin([]);
        setActiveCurrency([]);
        setAmount(0);
    };

    /*
   useEffect hook is triggered whenever the assets dependency changes. 
   It calculates the total balance of assets by iterating through the assets 
   array and summing the product of each asset's price and quantity.
    */

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < assets.length; i++) {
            total += parseInt(assets[i].price * assets[i].quantity);
        }
        setBalance(total);
    }, [assets, setBalance]);

    return (
        <>
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
                            balance={balance}
                            assets={assets}
                            setAsset={setAsset}
                        />

                    </div>

                    <div className='highest--lowest'>

                        <HighestHolding
                            assets={assets}
                            balance={balance}
                        />

                        <LowestHolding
                            assets={assets}
                            balance={balance}
                        />

                    </div>

                    <WatchList />

                </div>

            </div>
        </>
    )
};

export default Dashboard;