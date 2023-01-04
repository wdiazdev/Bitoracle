import React from 'react'
import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency'
import '../Styles/Table.css';

export default function Table({ cryptoData }) {
    return (
        <div className='table--container'>

            <table>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Market Cap</th>
                        <th>Circulating Supply</th>
                    </tr>
                </thead>

                {cryptoData.map((coin, index) => {
                    return (
                        <tbody>
                            <tr key={index}>

                                <td>{coin.market_cap_rank}</td>

                                <td className='coin--name--img'>
                                    <img src={coin.image} alt={coin.name} />
                                    {coin.name}


                                </td>

                                <td>{formatCurrency(coin.current_price.toFixed(2))}</td>

                                <td>{coin.price_change_percentage_24h}</td>

                                <td>{numberWithCommas(coin.market_cap.toFixed(0))}</td>

                                <td>{numberWithCommas(coin.circulating_supply.toFixed(0))}</td>

                            </tr>
                        </tbody>

                    )
                })}
            </table>
        </div>
    )
};
