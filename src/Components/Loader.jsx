import React from 'react'
import '../Styles/Loader.css';

export const Loader = () => {
    return (
        <div className='loader--container'>
            <h2 className='loader--heading'>Getting your dashboard ready</h2>
            <div className="preloader">
                <div className="loader"></div>
            </div >
        </div>
    )
}
