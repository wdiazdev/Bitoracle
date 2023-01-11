import { useEffect, useState } from 'react'
import '../Styles/MarketData.css';
import axios from 'axios';
import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency';
import { Pagination } from '@mui/material';

export const MarketData = () => {

    const [cryptoData, setCryptoData] = useState([]);

    const [page, setPage] = useState(1);

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

    const handleSearch = () => {
        return cryptoData.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(search) ||
                crypto.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <div className='crypto--data'>

            <div className='search--bar--container'>
                <div className='input--container'>
                    <input
                        type='text'
                        onChange={e => setSearch(e.target.value.toLowerCase())
                        }
                        placeholder='Search for your crypto here...'
                    />
                </div>
            </div>

            <div className='table--container'>
                <table>
                    <thead>
                        <tr className='table--head'>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Market Cap</th>
                            <th>Circulating Supply</th>
                        </tr>
                    </thead>

                    {handleSearch().slice((page - 1) * 25, (page - 1) * 25 + 25).map((coin, index) => {

                        let priceChange = coin.price_change_percentage_24h;

                        return (
                            <tbody key={index}>
                                <tr>
                                    <td className='col--rank'>{coin.market_cap_rank}</td>

                                    <td className='col--name'>
                                        <img src={coin.image} alt={coin.name} />
                                        <div className='name--symbol'>
                                            <div>
                                                {coin.name}
                                            </div>
                                            <div className='symbol'>
                                                {coin.symbol.toUpperCase()}
                                            </div>
                                        </div>
                                    </td>

                                    <td className='col--price'>{formatCurrency(coin.current_price.toFixed(2))}</td>

                                    <td
                                        className='col--hr--change'
                                        style={priceChange > 0 ? { color: '#7CFC00' } : { color: '#DC0000' }}
                                    >
                                        {priceChange.toFixed(2)}%
                                    </td>

                                    <td className='col--price'>{numberWithCommas(coin.market_cap.toFixed(0))}</td>

                                    <td className='col--price'>
                                        {numberWithCommas(coin.circulating_supply.toFixed(0))}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div >

            <Pagination
                className='pagination'
                count={parseInt((handleSearch()?.length / 25).toFixed(0))}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 500);
                }}
            />
        </div>
    )
};
