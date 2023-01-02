import React from 'react'

export default function CryptoCard({ image, name, symbol, price }) {
    return (
        <div className='card'>
            <div className='card--image'>
                <img src={image} alt={name} />
            </div>
            <div className='card--info'>
                <h2>{name}</h2>
                <span>{symbol}</span>
                <span>{price}</span>
            </div>
        </div>
    )
}
