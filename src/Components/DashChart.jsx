import React from 'react';
import Chart from "react-apexcharts";

export const DashChart = ({ assets }) => {

    const arrOfNames = assets.map((item) => item.name);

    const arrOfHoldings = assets.map((item) =>
        ((item.price).toFixed(0) * item.quantity));

    return (
        <>
            {assets.length > 0 ?
                <div className='assets--chart--container'>
                    <h2>Holdings</h2>
                    <Chart
                        type='donut'
                        width={450}
                        height={450}
                        series={arrOfHoldings}


                        options={{
                            labels: arrOfNames,
                            title: {
                                text: undefined,
                            },
                            fill: {
                                type: "gradient"
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        labels: {
                                            show: true,
                                            total: {
                                                show: true,
                                            }
                                        }
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,
                            },
                            legend: {

                                offsetX: 0,
                                offsetY: 0,

                                itemMargin: {
                                    horizontal: 0,
                                    vertical: 1,
                                },
                                markers: {
                                    width: 12,
                                    height: 12,
                                    radius: 12,
                                },
                                labels: {
                                    colors: undefined,
                                    useSeriesColors: true,
                                },
                            },
                            yaxis: {
                                labels: {
                                    formatter: function (val) {
                                        return "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                                    }
                                }
                            }
                        }
                        }
                    />
                </div>
                :
                null
            }
        </>
    )
};
