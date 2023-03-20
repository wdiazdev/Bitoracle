import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

export const RadialBar = ({ assets, balance }) => {

    const [chartOptions, setChartOptions] = useState({});

    const [chartSeries, setChartSeries] = useState([]);

    const [highestTotal, setHighestTotal] = useState(0);

    const [highestName, setHighestName] = useState('');

    const [img, setImg] = useState('');

    useEffect(() => {
        let highestAssetTotal = assets.reduce((acc, max) => {
            return max.total > acc ? max.total : acc;
        }, 0);

        let highestAsset = assets.find((asset) => asset.total === highestAssetTotal);

        let name = highestAsset ? highestAsset.name : '';

        let img = highestAsset ? highestAsset.img : '';

        setHighestTotal(highestAssetTotal);
        setHighestName(name);
        setImg(img);
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

        setChartSeries([highestTotal / balance * 100]);
    }, [highestTotal, highestName]);

    return (
        <>
            {assets.length > 0 ?
                <div className='radial--chart--container'>
                    <img src={img} alt="" />
                    <h2>Biggest holding</h2>
                    <h3>{highestName}</h3>
                    {assets.length > 0 ?
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="radialBar"
                            height={250}
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
