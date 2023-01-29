import React from 'react'

export const MainSearch = ({ setSearch }) => {
    return (
        <div className='search--bar--container'>
            <h2>Search for your favorite cryptos</h2>
            <div className='input--container'>
                <input
                    type='text'
                    onChange={e => setSearch(e.target.value.toLowerCase())
                    }
                    placeholder='Ex: Bitcoin, Ethereum...'
                />
            </div>
        </div>
    )
};
