import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import CryptoList from './Components/CryptoList'
import Pagination from './Components/Pagination';

function App() {

  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(8);


  const fetchCryptoData = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        // console.log(res.data)
        setCryptoData(res.data)
      }).catch(err => {
        console.log(err)
      })
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const lastPageIndex = currentPage * coinsPerPage

  const firstPageIndex = lastPageIndex - coinsPerPage

  const currentCoinPage = cryptoData.slice(firstPageIndex, lastPageIndex)


  return (
    <div className="App">
      <CryptoList cryptoData={currentCoinPage} />
      <Pagination
        totalCoins={cryptoData.length}
        coinsPerPage={coinsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default App