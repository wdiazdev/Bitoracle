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

    const [search, setSearch] = useState('');

    const fetchCryptoData = async () => {
        const { data } = await axios.get(marketDataUrl);
        setCryptoData(data);
        console.log(cryptoData)
    }

    useEffect(() => {
        fetchCryptoData();
    }, [page, search]);

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
                handleSearch={handleSearch}
            />
            <Pagination
                page={page}
                setPage={setPage}
                cryptoData={cryptoData} />
        </div>
    )
};
