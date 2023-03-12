import React from 'react'
import { formatCurrency } from '../Utilities/FormatCurrency';
import { MdDeleteOutline } from 'react-icons/Md';

export const DashboardAssets = ({ balance, assets, setAsset }) => {

    function handleRemoveItem(id) {
        const updatedItems = assets.filter(item => item.id !== id);
        setAsset(updatedItems);
    };

    return (
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
                    <tr>
                        <th>Name</th>
                        <th>Market Price</th>
                        <th>Quantity</th>
                        <th>Holdings</th>
                        <th></th>
                    </tr>
                </thead>

                {assets.map((item) => {
                    return (
                        <tbody key={item.id}>
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
                                        onClick={() => handleRemoveItem(item.id)}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    )
                })}
            </table>

        </div>
    )
};
