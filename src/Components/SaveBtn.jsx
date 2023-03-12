import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/Ai';
import { userAuth } from '../Context/AuthContext';

export const SaveBtn = ({ coin }) => {

    const [save, setSave] = useState(false);

    const { currentUser } = userAuth();

    const handleSave = () => setSave(!save);

    const handleClick = () => {
        if (!currentUser) {
            alert('Please login or create a new account!')
        }
    };

    return (
        <>
            {save && currentUser ?
                <button className='save--btn'
                    style={{
                        background: 'none',
                        color: 'inherit',
                        border: 'none',
                        padding: '0.2rem',
                        font: 'inherit',
                        cursor: 'pointer',
                        outline: 'inherit',
                    }}
                    onClick={handleSave}

                >
                    <AiFillStar
                        className='save--btn--icon filled'
                        style={{ color: '#0995e0', fontSize: '1rem' }}
                    />
                </button>
                :
                <button
                    className='save--btn'
                    style={{
                        background: 'none',
                        color: 'inherit',
                        border: 'none',
                        padding: '0.2rem',
                        font: 'inherit',
                        cursor: 'pointer',
                        outline: 'inherit',
                    }}
                    onClick={handleSave}
                >
                    <AiOutlineStar
                        className='save--btn--icon'
                        style={{ color: '#0995e0', fontSize: '1rem' }}
                        onClick={handleClick}
                    />
                </button>}
        </>
    )
};
