import React from 'react'
import '../Styles/Pagination.css';
import NextIcon from '../assets/nexticon.png';

export const Pagination = ({ page, setPage, cryptoData }) => {

    const totalNumber = cryptoData.length / 10;

    const next = () => {
        if (page === totalNumber) {
            return null;
        } else {
            setPage(page + 1);
        }
    };

    const prev = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1);
        }
    }

    const nextThreePages = () => {
        if (page + 3 >= totalNumber) {
            setPage(totalNumber - 1)
        } else {
            setPage(page + 3)
        }
    };

    const prevThreePages = () => {
        if (page - 3 <= 1) {
            setPage(totalNumber + 1)
        } else {
            setPage(page - 2)
        }
    };

    return (
        <ul className='pagination'>

            <img src={NextIcon} alt='preview' onClick={prev} className='prev--btn' />

            <li onClick={prevThreePages}>...</li>


            <li onClick={prev}>{page - 1}{" "}</li>


            <li>{page}</li>


            {page + 1 !== totalNumber && page !== totalNumber ? <li onClick={next}>{page + 1}</li> : null}


            {page + 1 !== totalNumber && page !== totalNumber ? <li onClick={nextThreePages}>...</li> : null}

            {page !== totalNumber ? <li onClick={() => setPage(totalNumber)}>{totalNumber}</li> : null}


            <img src={NextIcon} alt='next' onClick={next} />

        </ul >
    )
};
