import React from 'react'

export const SearchBar = ({ filteredData, handleFilter, handleSelect }) => {

    return (
        <div className='search'>
            <h4>Add an Asset:</h4>
            <input
                type='text'
                onChange={handleFilter}
                placeholder='Ex: Bitcoin, Ethereum...'
                autoComplete='off'
                className='input--search'
            />

            {filteredData.length != 0 &&
                <div className='filtered--container'>
                    {filteredData.slice(0, 2).map((coin) => {
                        return (
                            <button
                                key={coin.id}
                                className='data--result'
                                onClick={handleSelect}
                            >
                                <img src={coin.image} alt={coin.name} />
                                <span
                                    id='asset'
                                >
                                    {coin.name}
                                </span>
                            </button>
                        )
                    })}
                </div>
            }
        </div>
    )
};
