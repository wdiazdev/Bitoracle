import { MarketData } from '../Components/MarketData';
import { GlobalMarketData } from '../Components/GlobalMarketData';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { SingleCoins } from '../Components/SingleCoins';

export const Home = () => {
    return (
        <div>
            <div className='main--container'>

                <div className='main--info'>

                    <h1>BitOracle</h1>

                    <div className='main--hero'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita unde at repellat. Tempore eum dicta consequatur, ut fuga inventore cumque esse, quisquam, similique quia excepturi labore pariatur harum assumenda voluptates!</p>
                        <Link to='/signin'><button className='dash--btn'>Log in</button></Link>
                    </div>
                </div>
                <SingleCoins />
            </div>
            <GlobalMarketData />
            <MarketData />
        </div>
    )
};
