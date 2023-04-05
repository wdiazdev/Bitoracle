import React, { useState } from 'react'
import '../Styles/Pagination.css';
import NextIcon from '../assets/nexticon.png';

export const Pagination = (
    {
        page,
        setPage,
        cryptoData,
        itemsPerPage,
        setItemsPerPage }) => {

    const handlePage = (selectedPage) => {
        const totalPages = Math.ceil(cryptoData.length / itemsPerPage);

        if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
            setPage(selectedPage);
            window.scroll(0, 1200);
        }
    };

    return (

        <div className='pagination'>

            <img
                src={NextIcon}
                alt='preview'
                className={page > 1 ? 'prev--btn' : 'pagination--disable'}
                onClick={() => handlePage(page - 1)}
            />

            {
                [...Array(cryptoData.length / itemsPerPage)].map((_, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => handlePage(i + 1)}
                            className={page === i + 1 ? 'pagination--selected' : 'pagination--btn'}
                        >
                            {i + 1
                            }
                        </button>
                    )
                })
            }

            <img
                src={NextIcon}
                alt='next'
                onClick={() => handlePage(page + 1)}
                className={page < Math.ceil(cryptoData.length / itemsPerPage) ? '' : 'pagination--disable'}
            />

            <p>Show:</p>

            <select
                onChange={e => {
                    setItemsPerPage(e.target.value);
                    console.log(`Selected value: ${e.target.value}`);
                }}
                value={itemsPerPage}
                className='pages'
            >
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>All</option>
            </select>

        </div >
    )
};