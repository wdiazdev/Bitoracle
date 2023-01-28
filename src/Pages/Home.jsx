import { MarketData } from '../Components/MarketData';
import { GlobalMarketData } from '../Components/GlobalMarketData';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { SingleCoins } from '../Components/SingleCoins';
import { TrendingCoins } from '../Components/TrendingCoins';
import { UserAuth } from '../Context/AuthContext';

export const Home = () => {

    const { user } = UserAuth();

    return (
        <div>
            <div className='main--container'>

                <div className='main--info'>

                    <h1>BitOracle</h1>

                    <div className='main--hero'>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita unde at repellat. Tempore eum dicta consequatur, ut fuga inventore cumque esse, quisquam, similique quia excepturi labore pariatur harum assumenda voluptates!</p>

                        <div className='main--btns'>

                            {user ? <Link to='/account'><button className='dash--btn'>Dashboard</button></Link> :
                                <Link to='/signin'><button className='dash--btn'>Log in</button></Link>
                            }

                            {!user ? <Link to='/signup'><button className='dash--btn'>Sign Up</button></Link> : null}

                        </div>

                    </div>

                </div>
                <SingleCoins />
            </div>
            <GlobalMarketData />
            <TrendingCoins />
            <MarketData />
        </div>
    )
};
