import CryptoCard from "./CryptoCard"

export default function CryptoList({ cryptoData }) {
    return (
        <div className='crypto--list'>
            {
                cryptoData.map((coin, index) => {
                    return (
                        <CryptoCard
                            key={index}
                            image={coin.image}
                            name={coin.name}
                            symbol={coin.symbol}
                            price={coin.current_price}
                        />
                    )
                })
            }
        </div>
    )
}
