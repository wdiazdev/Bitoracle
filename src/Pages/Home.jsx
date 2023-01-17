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
                        {user ? <Link to='/account'><button className='dash--btn'>Account</button></Link> :
                            <Link to='/signin'><button className='dash--btn'>Log in</button></Link>
                        }
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
