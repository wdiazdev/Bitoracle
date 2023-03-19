import React from 'react'
import '../Styles/MainSearch.css';

export const MainSearch = ({ setSearch }) => {
    return (
        <div
            className='search--bar--container'
            data-aos='fade-up'
            data-aos-duration='3000'
        >

            <h3>Search for your favorite cryptos</h3>

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
