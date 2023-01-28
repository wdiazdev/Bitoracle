import React, { useEffect, useState } from 'react'
import { numberWithCommas } from '../Utilities/FormatCurrency';

export const HighAndLowIndicator = ({ coin }) => {

    const [greenIndicator, setGreenIndicator] = useState();

    const high = coin.market_data?.high_24h ? coin.market_data.high_24h.usd : null;

    const low = coin.market_data?.low_24h ? coin.market_data.low_24h.usd : null;

    const price = coin.market_data?.current_price ? coin.market_data.current_price.usd : null;

    useEffect(() => {
        let total = high - low;
        let greenRange = ((high - price) * 100) / total;
        setGreenIndicator(Math.ceil(greenRange))
    }, [price, low, high])

    return (
        <>
            <div className='indicator'>

                <span className='low--indicator' style={{ width: `${100 - greenIndicator}%` }}>&nbsp;</span>
                <span className='high--indicator' style={{ width: `${greenIndicator}%` }}>&nbsp;</span>

            </div>

            {coin.market_data?.high_24h ?
                <li>
                    <div className='high--low--container'>

                        <div className='high--low--range'>
                            <p>24H Low</p>${numberWithCommas(coin.market_data.low_24h.usd.toFixed(2))}
                        </div>

                        <div className='high--low--range'>
                            <p>24H High</p>${numberWithCommas(coin.market_data.high_24h.usd.toFixed(2))}
                        </div>

                    </div>

                </li>

                : null}
        </>
    )
};



