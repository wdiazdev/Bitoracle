import React from "react"
import { numberWithCommas } from "../Utilities/FormatCurrency"
import { globalMarketDataURL } from "../APIs/ApiUrl"
import "../Styles/GlobalData.css"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "./Spinner"

export const GlobalMarketData = () => {
  const {
    data: global,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Global Market Data"],
    queryFn: () => globalMarketDataURL(),
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

  if (global.data) {
    return (
      <>
        <section data-aos="fade-up" data-aos-duration="1000">
          <div>
            <div className="global--market--data">
              <div>
                Coins: <span>{numberWithCommas(global.data.active_cryptocurrencies)}</span>
              </div>

              <div>
                Exchanges: <span>{global.data.markets}</span>
              </div>

              <div className="coins--dominance">
                Dominance:
                <div>
                  BTC <span>{global.data.market_cap_percentage.btc.toFixed(2)}%</span>
                </div>
                <div>
                  ETH <span>{global.data.market_cap_percentage.eth.toFixed(2)}%</span>
                </div>
              </div>

              <div>
                Market Cap: <span>{numberWithCommas(global.data.total_market_cap.usd.toFixed(0))}</span>
              </div>

              <div>
                24h Vol: <span>{numberWithCommas(global.data.total_volume.usd.toFixed(0))}</span>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
