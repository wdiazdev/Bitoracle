import React from 'react'
import { formatCurrency } from '../Utilities/FormatCurrency';
import { MdDeleteOutline } from 'react-icons/Md';

export const DashboardAssets = ({ balance, assets, setAsset }) => {

    function handleRemoveItem(index) {
        const newData = [...assets];
        newData.splice(index, 1);
        setAsset(newData);
    };

    return (
        <>
            {assets.length > 0 ?
                <div className='assets--container'>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'baseline',
                    }}
                    >
                        <h2 style={{
                            color: '#0995e0',
                            marginRight: '0.3rem'
                        }}
                        >
                            Balance:
                        </h2>
                        <p
                            style={{
                                fontSize: '1.4rem',
                            }}
                        >
                            {balance}
                        </p>
                    </div>

                    <table>
                        <thead>
                            <tr className='assets--table--head'>
                                <th>Name</th>
                                <th>Market Price</th>
                                <th>Quantity</th>
                                <th>Holdings</th>
                                <th></th>
                            </tr>
                        </thead>

                        {assets.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className='asset--table--row'>

                                        <td className='td--name'>
                                            <img src={item.img} alt={item.name} />
                                            <p>{item.name}</p>
                                        </td>

                                        <td>
                                            <p>{formatCurrency(item.price)}</p>
                                        </td>

                                        <td>
                                            <p>{item.quantity}</p>
                                        </td>

                                        <td>
                                            <p>{formatCurrency(item.price * item.quantity)}</p>
                                        </td>

                                        <td>
                                            <MdDeleteOutline
                                                className='asset--delete'
                                                onClick={() => handleRemoveItem(index)}
                                            />
                                        </td>
                                    </tr>

                                </tbody>
                            )
                        })}
                    </table>

                </div>
                :
                null
            }
        </>
    )
};
