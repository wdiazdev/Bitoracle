import React from 'react'
import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency'
import '../Styles/Table.css';

export default function Table({ cryptoData }) {
    return (
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

                {cryptoData.map((coin, index) => {

                    //? priceChange created to store 24h % change to better style color

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
                                    //? Conditional Styles if price change > 0
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
    )
};
