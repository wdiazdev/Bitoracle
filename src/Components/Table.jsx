import React from 'react'
import { formatCurrency } from '../Utilities/FormatCurrency'
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
                            <tr>
                                <td>Rank</td>
                                <td></td>
                                <td>Price</td>
                                <td>24h</td>
                                <td>Market cap</td>
                                <td>Supply</td>
                            </tr>
                        </tbody>

                    )
                })}
            </table>
        </div>
    )
};
