import React from 'react'

export const AssetItem = ({ asset, index, removeAsset }) => {

    let date = new Date(asset.date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const handleRemove = i => {
        removeAsset(i);
    }

    return (
        <div className='asset--item'>
            <button
                className='remove--asset'
                onClick={() => handleRemove(index)}
            >
                X
            </button>
            <div className='asset--name'>{asset.assetName}</div>
            <div className='asset--price'>{asset.price}</div>
            <div className='asset--qty'>{asset.quantity}</div>
            <div className='asset--date'>{month + '/' + day + '/' + year}</div>
        </div >
    )
};