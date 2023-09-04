import { MarketData } from "../Components/MarketData"
import { GlobalMarketData } from "../Components/GlobalMarketData"
import "../Styles/Home.css"
import { Link } from "react-router-dom"
import { SingleCoins } from "../Components/SingleCoins"
import { TrendingCoinSlider } from "../Components/TrendingCoinSlider"
import { Footer } from "../Components/Footer"
import { userAuth } from "../Context/AuthContext"

const Home = () => {
  const { currentUser } = userAuth()

  return (
    <div>
      <div className="main--container">
        <header className="main--info" data-aos="fade-right" data-aos-duration="700" data-aos-easing="ease-in-sine">
          <h1>BitOracle</h1>

          <div className="main--hero">
            <div className="sub--headings" data-aos="fade-left" data-aos-duration="1500">
              <h2>The World's</h2>
              <h2>Fastest Growing</h2>
              <h2>Crypto Web App</h2>
            </div>

            <p data-aos="fade-left" data-aos-duration="1500">
              BitOracle is one of the most useful tools available to crypto traders and investors.
            </p>

            <div className="main--btns" data-aos="zoom-in" data-aos-duration="2000">
              {currentUser ? (
                <Link to="/account">
                  <button className="main--btn">Dashboard</button>
                </Link>
              ) : (
                <Link to="/signin">
                  <button className="main--btn">Login</button>
                </Link>
              )}

              {!currentUser && (
                <Link to="/signup">
                  <button className="main--btn">Sign Up</button>
                </Link>
              )}
            </div>
          </div>
        </header>
        <SingleCoins />
      </div>
      <main>
        <GlobalMarketData />
        <TrendingCoinSlider />
        <MarketData />
      </main>
      <Footer />
    </div>
  )
}

export default Home
