import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../Styles/MarketData.css';
import { numberWithCommas } from '../Utilities/FormatCurrency';
import { globalMarketDataURL } from '../APIs/ApiUrl'
import '../Styles/GlobalData.css';

export const GlobalMarketData = () => {

    const [globalData, setGlobalData] = useState([]);

    const fetchGlobalData = async () => {
        const { data } = await axios.get(globalMarketDataURL);
        setGlobalData(data);
    }

    useEffect(() => {
        fetchGlobalData();
    }, []);

    return (
        <div>
            {
                Object.values(globalData).map((data, index) => {
                    return (
                        <div key={index}>
                            <div className='global--market--data'>

                                <div>
                                    Coins: <span>{numberWithCommas(data.active_cryptocurrencies)}</span>
                                </div>

                                <div>
                                    Exchanges: <span>{data.markets}</span>
                                </div>

                                <div className='coins--dominance'>
                                    Dominance:
                                    <div>
                                        BTC  <span>{data.market_cap_percentage.btc.toFixed(2)}%</span>
                                    </div>
                                    <div>
                                        ETH  <span>{data.market_cap_percentage.eth.toFixed(2)}%</span>
                                    </div>
                                </div>

                                <div>
                                    Market Cap:  <span>{numberWithCommas(data.total_market_cap.usd.toFixed(0))}</span>
                                </div>

                                <div>
                                    24h Vol:  <span>{numberWithCommas(data.total_volume.usd.toFixed(0))}</span>
                                </div>

                            </div>


                        </div>
                    )
                })
            }
        </div>
    )
};
