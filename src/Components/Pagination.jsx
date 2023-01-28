import React from 'react'
import '../Styles/Pagination.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

export const Pagination = ({ page, setPage, cryptoData }) => {

    const totalNumber = cryptoData.length / 10;

    const next = () => {
        if (page === totalNumber) {
            return null;
        } else {
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1);
        }
    }

    return (
        <ul className='pagination'>

            <li onClick={prev}>
                <FaArrowAltCircleLeft className='pagination--icon' />
            </li>

            <li>...</li>

            <li onClick={prev}>{page - 1}</li>

            <li>{page}</li>

            <li onClick={next}>{page + 1}</li>

            <li>...</li>

            <li onClick={() => setPage(totalNumber)}>{totalNumber}</li>

            <li onClick={next}>
                <FaArrowAltCircleRight className='pagination--icon' />
            </li>

        </ul>
    )
};
