import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { HistoricalChart } from '../APIs/ApiUrl';

export const CoinPageChart = ({ coin, id }) => {

    const [chartData, setChartData] = useState();

    const [days, setDays] = useState(1);

    const fetchMarketData = async () => {
        const { data } = await axios.get(HistoricalChart(id, days));
        setChartData(data.prices)
    };

    useEffect(() => {
        fetchMarketData();
    }, [days]);

    return (
        <div className='coin--page--info--2'>
            <Line
                data={{
                    labels: chartData?.map((crypto) => {
                        let date = new Date(crypto[0]);
                        let time = date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [{
                        data: chartData?.map((crypto) => crypto[1]),
                        label: `Price (Past ${days} Days) in USD`,
                        borderColor: "#0995e0",
                    }],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 2,
                        },
                    },
                }}
            />
            <div className='charts--btn--container'>

                <button className='chart-btn' onClick={() => setDays(1)}>1D</button>
                <button className='chart-btn' onClick={() => setDays(7)}>7D</button>
                <button className='chart-btn' onClick={() => setDays(30)}>30D</button>
                <button className='chart-btn' onClick={() => setDays(365)}>365D</button>

            </div>
        </div>
    )
};