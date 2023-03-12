import React from 'react'

export const SearchDashCoin = ({ searchCoin, handleSelect, handleSearch }) => {
    return (
        <>
            <form>

                <h2 style={{
                    color: '#0995e0'
                }}
                >
                    Search:
                </h2>

                <input
                    id='search'
                    type='text'
                    onChange={(event) => handleSearch(event)}
                    placeholder='Ex: Bitcoin, ETH...'
                    autoComplete='off'
                    required
                />

                {searchCoin.length > 0 && searchCoin.slice(0, 3).map((coin) => {
                    return (
                        <div
                            key={coin.id}
                            className='search--result'
                        >
                            <div className='result' onClick={handleSelect} id={coin.id}>

                                <div className='result--name'>
                                    <img src={coin.image} alt={coin.name} />
                                    {coin.name}
                                </div>

                                <div className='result--symbol'>
                                    {coin.symbol}
                                </div>

                            </div>
                        </div>
                    )
                })}

            </form>
        </>
    )
};
