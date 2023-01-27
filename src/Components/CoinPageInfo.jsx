import React from 'react'
import { numberWithCommas } from '../Utilities/FormatCurrency';

export const CoinPageInfo = ({ coin }) => {
    return (
        <div className='coin--page--info--1'>
            <ul>
                <li><p>Market Cap Rank:</p>#{coin.market_cap_rank}</li>
                {coin.market_data?.current_price ? <li><p>Price:</p>${numberWithCommas(coin.market_data.current_price.usd.toFixed(2))}</li> : null}
                {coin.market_data?.market_cap ? <li><p>Market Cap:</p>${numberWithCommas(coin.market_data.market_cap.usd)}</li> : null}
                {coin.market_data?.total_volume ? <li><p>24 Hour Trading Vol:</p>${numberWithCommas(coin.market_data.total_volume.usd)}</li> : null}
                {coin.market_data?.max_supply ? <li><p>Max Supply:</p>{numberWithCommas(coin.market_data.max_supply)}</li> : null}
                {coin.market_data?.total_supply ? <li><p>Total Supply:</p>{numberWithCommas(coin.market_data.total_supply)}</li> : null}
                {coin.market_data?.circulating_supply ? <li><p>Circulating Supply:</p>{numberWithCommas(coin.market_data.circulating_supply.toFixed(2))}</li> : null}
                {coin.market_data?.high_24h ? <li><p>24 Hour High:</p>${numberWithCommas(coin.market_data.high_24h.usd.toFixed(2))}</li> : null}
                {coin.market_data?.low_24h ? <li><p>24 Hour Low:</p>${numberWithCommas(coin.market_data.low_24h.usd.toFixed(2))}</li> : null}
                {coin.market_data?.ath ? <li><p>All Time High:</p>${numberWithCommas(coin.market_data.ath.usd.toFixed(2))}</li> : null}
                {coin.market_data?.ath_change_percentage ?
                    <li style={coin.market_data.ath_change_percentage.usd > 0 ? { color: '#7CFC00' } : { color: '#DC0000' }}>
                        <p>From ATH:</p>{numberWithCommas(coin.market_data.ath_change_percentage.usd.toFixed(2))}%
                    </li> : null}
            </ul>
        </div>
    )
};
