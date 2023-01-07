import { useEffect, useState } from 'react'
import axios from 'axios';
import Table from './Table';
import Pagination from './Pagination';
import SearchInput from './SearchInput';

export default function CryptoData() {

    const [cryptoData, setCryptoData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [coinsPerPage, setCoinsPerPage] = useState(25);

    const [search, setSearch] = useState('');

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

    const fetchCryptoData = () => {
        axios.get(url)
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

    const lastPageIndex = currentPage * coinsPerPage

    const firstPageIndex = lastPageIndex - coinsPerPage

    const currentCoinPage = cryptoData.slice(firstPageIndex, lastPageIndex)

    return (
        <div>
            <SearchInput
                search={search}
                setSearch={setSearch}
                cryptoData={cryptoData}
            />

            <Table
                cryptoData={currentCoinPage}
                search={search}
            />
            <Pagination
                totalCoins={cryptoData.length}
                coinsPerPage={coinsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}
