import React from 'react'
import '../Styles/MainSearch.css';

export const MainSearch = ({ setSearch }) => {
    return (
        <div className='search--bar--container'>
            <h3 className='search--Bar--header'>Search for your favorite cryptos</h3>
            <div className='input--container'>
                <input
                    className='main--search'
                    type='text'
                    onChange={e => setSearch(e.target.value.toLowerCase())
                    }
                    placeholder='Ex: Bitcoin, Ethereum...'
                />
            </div>
        </div>
    )
};
