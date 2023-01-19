import React from 'react'
import { AssetItem } from './AssetItem';

export const AssetList = ({ asset, setAsset }) => {

    const removeAsset = i => {
        let temp = asset.filter((value, index) => index != i);
        setAsset(temp);
    }

    const sortByDate = (a, b) => {
        return a.date - b.date;
    }

    return (
        <div className='asset--list'>
            {
                asset.sort(sortByDate).map((value, index) => (
                    <AssetItem
                        key={index}
                        asset={value}
                        index={index}
                        removeAsset={removeAsset} />
                ))
            }

        </div>
    )
};
