import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactHTMLParser from "react-html-parser";
import { fetchCoinData } from '../APIs/ApiUrl';
import '../Styles/CoinPage.css';
import { CoinPageInfo } from '../Components/CoinPageInfo';
import { CoinPageChart } from '../Components/CoinPageChart';
import { AiOutlineCloseCircle } from 'react-icons/Ai';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../Components/Spinner';
import { Error } from '../Components/TrendingCoinSlider';
import { Loader } from '../Components/Loader';

const CoinPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        data: coin,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['Coin Page', id],
        queryFn: () => fetchCoinData(id),
        keepPreviousData: true,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    if (isLoading) {
        return <Spinner />;
    };

    if (isError) {
        return <Error>
            <h3>Error: {error.message}</h3>
        </Error>;
    };

    return (
        <>
            {
                loading ?

                    <Loader /> :

                    <>
                        <div className='coin--page--container'>

                            <div className='coin--info--container'>

                                {coin.image ? <img src={coin.image.large} alt={coin.name} className='coin--img--bg' /> : null}

                                <nav className='coin--page--nav'>

                                    <div
                                        className='img--name--symbol'
                                        data-aos='fade-right'
                                        data-aos-duration='1000'
                                    >

                                        {coin.image ? <img src={coin.image.large} alt={coin.name} /> : null}
                                        <h2>{coin.name}</h2>
                                        <span>{coin.symbol}</span>

                                    </div>

                                    <AiOutlineCloseCircle
                                        className='asset--delete--btn'
                                        onClick={() => navigate(-1)}
                                    />

                                </nav>


                                <div className='coin--page--info'>
                                    <CoinPageInfo coin={coin} />
                                    <CoinPageChart id={id} />
                                </div>

                                {coin.description ?
                                    <p
                                        className='description'
                                        data-aos='fade-up'
                                        data-aos-duration='3000'
                                    >

                                        {ReactHTMLParser(coin.description.en.split(". ")[0])}.
                                    </p> : null}
                            </div>

                        </div>

                    </>
            }
        </>
    )
};

export default CoinPage;