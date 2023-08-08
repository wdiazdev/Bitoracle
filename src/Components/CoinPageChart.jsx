import React, { useState } from "react"
//!NEED TO HAVE FOR CHART TO WORK
import Chart from "chart.js/auto"
import { Line } from "react-chartjs-2"
import { historicalChartData } from "../APIs/ApiUrl"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "./Spinner"
import { Error } from "./TrendingCoinSlider"

export const CoinPageChart = ({ coin, id }) => {
  const [days, setDays] = useState(1)

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["Coin Chart"],
    queryFn: () => historicalChartData(id, days),
    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <Error>
        <h3>Error: {error.message}</h3>
      </Error>
    )
  }

  return (
    <div className="coin--page--info--2" data-aos="fade-up" data-aos-duration="1000">
      <Line
        data={{
          labels: data.prices?.map((crypto) => {
            let date = new Date(crypto[0])
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`
            return days === 1 ? time : date.toLocaleDateString()
          }),
          datasets: [
            {
              data: data.prices?.map((crypto) => crypto[1]),
              label: `Price (Past ${days} Days) in USD`,
              borderColor: "#0995e0",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 2,
            },
          },
        }}
      />
      <div className="charts--btn--container">
        <button className="chart-btn" onClick={() => setDays(1)}>
          1D
        </button>
        <button className="chart-btn" onClick={() => setDays(7)}>
          7D
        </button>
        <button className="chart-btn" onClick={() => setDays(30)}>
          30D
        </button>
        <button className="chart-btn" onClick={() => setDays(365)}>
          365D
        </button>
      </div>
    </div>
  )
}
