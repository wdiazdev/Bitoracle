import { useEffect, useState } from 'react'
import '../Styles/MarketData.css';
import { MainSearch } from '../Components/MainSearch';
import { MarketTable } from '../Components/MarketTable';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';
import { Pagination } from '../Components/Pagination';

export const MarketData = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [page, setPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(50);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const { data } = await axios.get(marketDataUrl);
                setCryptoData(data);
            } catch (error) {
                console.log('Error fetching crypto data:', error);
            }
        };

        fetchCryptoData();
    }, [page, search, itemsPerPage, marketDataUrl]);

    const handleSearch = () => {
        if (search.length > 0) {
            setPage(1);
        }
        return cryptoData.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(search) ||
                crypto.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <div className='crypto--data'>
            <MainSearch setSearch={setSearch} />
            <MarketTable
                page={page}
                itemsPerPage={itemsPerPage}
                handleSearch={handleSearch}
            />
            {cryptoData.length > 0 &&
                <Pagination
                    page={page}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setPage={setPage}
                    cryptoData={cryptoData}
                />
            }
        </div>
    )
};
