import { useEffect, useState } from 'react'
import '../Styles/MarketData.css';
import { Pagination } from '@mui/material';
import { MainSearch } from '../Components/MainSearch';
import { MarketTable } from '../Components/MarketTable';
import { marketDataUrl } from '../APIs/ApiUrl';
import axios from 'axios';

export const MarketData = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState('');


    const fetchCryptoData = async () => {
        const { data } = await axios.get(marketDataUrl);
        setCryptoData(data);
    }

    useEffect(() => {
        fetchCryptoData();
    }, [page, search]);

    const handleSearch = () => {
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
                cryptoData={cryptoData}
                page={page}
                search={search}
                handleSearch={handleSearch}
            />
            <Pagination
                className='pagination'
                count={parseInt((handleSearch()?.length / 25).toFixed(0))}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 1200);
                }}
            />
        </div>
    )
};
