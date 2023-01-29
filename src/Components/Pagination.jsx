import React from 'react'
import '../Styles/Pagination.css';
import NextIcon from '../assets/nexticon.png';

export const Pagination = ({ page, setPage, cryptoData, itemsPerPage, setItemsPerPage }) => {

    const handlePage = (selectedPage) => {
        if (selectedPage >= 1 &&
            selectedPage <= cryptoData.length / itemsPerPage &&
            selectedPage !== page)
            setPage(selectedPage);
    };

    return (
        <div className='pagination'>

            <img
                src={NextIcon}
                alt='preview'
                className={page > 1 ? 'prev--btn' : 'pagination--disable'}
                onClick={() => handlePage(page - 1)}
                onChange={window.scroll(0, 1200)}
            />

            {
                [...Array(cryptoData.length / itemsPerPage)].map((_, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => handlePage(i + 1)}
                            onChange={window.scroll(0, 1200)}
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
                className={page < cryptoData.length / itemsPerPage ? '' : 'pagination--disable'}
                onChange={window.scroll(0, 1200)}
            />

        </div >
    )
};