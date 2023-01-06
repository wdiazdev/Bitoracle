import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency'
import '../Styles/Table.css';
import { useState } from 'react';
import '../Styles/SearchBar.css';
import { FaSearch } from 'react-icons/fa';

export default function Table({ cryptoData }) {

    const [search, setSearch] = useState('');


    return (

        <>
            <div className='search--bar--container'>
                <div className='search--input'>
                    <input
                        type='text'
                        placeholder='Search here...'
                        onChange={e => setSearch(e.target.value.toLowerCase())}
                    />
                    <div className='icon'><FaSearch /></div>
                </div>
            </div>

            <div className='table--container'>
                <table>
                    <thead>
                        <tr className='table--head'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Market Cap</th>
                            <th>Circulating Supply</th>
                        </tr>
                    </thead>

                    {
                        cryptoData.filter((coin) => coin.name.toLowerCase().includes(search) ||
                            coin.symbol.toLowerCase().includes(search)
                        )
                            .map((coin, index) => {

                                let priceChange = coin.price_change_percentage_24h;

                                return (
                                    <tbody>
                                        <tr key={index}>

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

                                            <td className='col--price'>{numberWithCommas(coin.circulating_supply.toFixed(0))}</td>

                                        </tr>
                                    </tbody>
                                )
                            })}
                </table>
            </div >
        </>
    )
};
