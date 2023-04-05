import { useState } from 'react'
import '../Styles/MarketData.css';
import { MainSearch } from '../Components/MainSearch';
import { MarketTable } from '../Components/MarketTable';
import { marketData } from '../APIs/ApiUrl';
import { Pagination } from '../Components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from './Spinner';
import { Error } from './TrendingCoinSlider';

export const MarketData = () => {

    const [page, setPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(50);

    const [search, setSearch] = useState('');

    const {
        data: cryptoData,
        isLoading,
        error,
        isError
    } = useQuery({
        queryKey: ['Crypto Data', page],
        queryFn: () => marketData(),
        keepPreviousData: true,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Spinner />;
    };

    if (isError) {
        return <Error>
            <h3>Error: {error.message}</h3>
        </Error>;
    };

    return (
        <div className='crypto--data'>

            <MainSearch setSearch={setSearch} />

            <MarketTable
                page={page}
                itemsPerPage={itemsPerPage}
                search={search}
                cryptoData={cryptoData}
            />

            {cryptoData && cryptoData?.length > 0 &&
                <Pagination
                    page={page}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    cryptoData={cryptoData}
                />
            }

        </div>
    )
};
