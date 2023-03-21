import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

export const LowestHolding = ({ assets, balance }) => {

    const [chartOptions, setChartOptions] = useState({});

    const [chartSeries, setChartSeries] = useState([]);

    const [lowestTotal, setLowestTotal] = useState(0);

    const [lowestName, setLowestName] = useState('');

    const [img, setImg] = useState('');

    useEffect(() => {
        let lowestAssetTotal = assets.reduce((min, asset) => {
            return asset.total < min ? asset.total : min;
        }, Infinity);

        let lowestAsset = assets.find((asset) => asset.total === lowestAssetTotal);

        setLowestTotal(parseInt(lowestAssetTotal));
        setLowestName(lowestAsset ? lowestAsset.name : null);
        setImg(lowestAsset ? lowestAsset.img : null);
    }, [assets]);

    useEffect(() => {
        setChartOptions({
            chart: {
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: '60%',
                        background: 'transparent',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.24
                        }
                    },
                    track: {
                        background: '#333',
                        strokeWidth: '100%',
                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            show: true,
                            color: '#0995e0',
                            fontSize: '1.2rem'
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
                            color: '#fff',
                            fontSize: '40px',
                            show: true,
                        },
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#ABE5A1'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Percent'],
        });

        setChartSeries([lowestTotal / balance * 100]);
    }, [lowestTotal, lowestName, balance]);

    return (
        <>
            {assets.length > 1 ?
                <div className='radial--chart--container lowest'>
                    <img src={img} alt="" />
                    <h2>Lowest holding</h2>
                    <h3>{lowestName}</h3>
                    {assets.length > 0 ?
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="radialBar"
                            height={200}
                        />
                        :

                        null
                    }
                </div>
                :
                null
            }
        </>
    )
};