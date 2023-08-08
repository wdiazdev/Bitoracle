import React from "react"
import { useNavigate } from "react-router-dom"

export const TrendingCard = ({ coin }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div
        className="card"
        onClick={() => {
          console.log(`Navigating to /coin/${coin.id}`)
          navigate(`/coin/${coin.id}`)
        }}
      >
        <img src={coin.large} alt={coin.name} />
        <h3>{coin.name}</h3>
        <span># {coin.market_cap_rank}</span>
      </div>
    </div>
  )
}
