import { useNavigate } from 'react-router-dom';
import { formatCurrency, numberWithCommas } from '../Utilities/FormatCurrency';
import { SaveBtn } from './SaveBtn';

export const MarketTable = ({ page, itemsPerPage, search, cryptoData, setPage }) => {

    const navigate = useNavigate();

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
        <div className='table--container'>

            <table>

                <thead>
                    <tr className='table--head'>
                        <th></th>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Market Cap</th>
                        <th>Circulating Supply</th>
                    </tr>
                </thead>

                {handleSearch().slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage).map((coin) => {

                    const priceChange = coin.price_change_percentage_24h.toFixed(2)

                    return (
                        <tbody key={coin.id} >
                            <tr className='table--body--rows'>
                                <td><SaveBtn coin={coin} /></td>

                                <td className='col--rank'>{coin.market_cap_rank}</td>

                                <td
                                    className='col--name'
                                    onClick={() => navigate(`/coin/${coin.id}`)}
                                >
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
                                    {priceChange}%
                                </td>

                                <td className='col--price'>
                                    {coin.market_cap ? '$' + numberWithCommas(coin.market_cap.toFixed(0)) : null}
                                </td>

                                <td className='col--price'>
                                    {coin.circulating_supply ? numberWithCommas(coin.circulating_supply.toFixed(0)) : null}
                                </td>
                            </tr>

                        </tbody>
                    )
                })}

            </table>

        </div >
    )
};
