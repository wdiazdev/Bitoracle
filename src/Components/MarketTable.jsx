import { useNavigate } from 'react-router-dom';
import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency';

export const MarketTable = ({ page, itemsPerPage, handleSearch }) => {

    const navigate = useNavigate();

    return (
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

                {handleSearch().slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage).map((coin) => {

                    let priceChange = coin.price_change_percentage_24h;

                    return (
                        <tbody key={coin.id} >
                            <tr onClick={() => navigate(`/coin/${coin.id}`)}>
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

                                <td className='col--price'>${numberWithCommas(coin.market_cap.toFixed(0))}</td>

                                <td className='col--price'>
                                    {numberWithCommas(coin.circulating_supply.toFixed(0))}
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div >
    )
};
