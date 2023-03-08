import { MarketData } from '../Components/MarketData';
import { GlobalMarketData } from '../Components/GlobalMarketData';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { SingleCoins } from '../Components/SingleCoins';
import { TrendingCoins } from '../Components/TrendingCoins';
import { Footer } from '../Components/Footer';
import { userAuth } from '../Context/AuthContext';

export const Home = () => {

    const { currentUser } = userAuth();

    return (
        <div>
            <div className='main--container'>

                <div className='main--info'>

                    <h1>BitOracle</h1>

                    <div className='main--hero'>

                        <div className='sub--headings'>

                            <h2>The World's</h2>
                            <h2>Fastest Growing</h2>
                            <h2>Crypto Web App</h2>

                        </div>

                        <p> BitOracle is one of the most useful tools available to crypto traders and investors.</p>

                        <div className='main--btns'>

                            {currentUser ? <Link to='/account'><button className='main--btn'>Dashboard</button></Link> :
                                <Link to='/signin'><button className='main--btn'>Login</button></Link>
                            }

                            {!currentUser ? <Link to='/signup'><button className='main--btn'>Sign Up</button></Link> : null}

                        </div>

                    </div>

                </div>
                <SingleCoins />
            </div>
            <GlobalMarketData />
            <TrendingCoins />
            <MarketData />
            <Footer />
        </div>
    )
};
