import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../Utilities/FormatCurrency';
import { MdDeleteOutline } from 'react-icons/Md';
import { userAuth } from '../Context/AuthContext';
import { db } from '../Utilities/Firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export const DashboardAssets = ({ assets, setAsset }) => {

    const [balance, setBalance] = useState(0);

    const { currentUser } = userAuth();

    const coinRef = doc(db, 'users', `${currentUser?.email}`);

    //To calculate the total balance of the array of assets and updates 
    //the state of a component with the formatted currency value.

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < assets.length; i++) {
            total += parseInt(assets[i].price * assets[i].quantity)
        }
        const newBalance = `${formatCurrency(total)}`;
        setBalance(newBalance);
    }, [assets]);


    //This function sets up a listener for changes to the document in the 
    //Firestore database. Whenever the document changes, the callback function is 
    //called with the updated document data.

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc => {
            //This line updates the state of the component
            setAsset(doc.data()?.portfolio);
        }))
    }, [currentUser?.email]);


    //this function takes an index parameter and deletes the corresponding 
    //coin from an array of coins stored in a Firestore document. 

    const deleteSavedCoin = async (index) => {
        try {
            const newData = [...assets];
            newData.splice(index, 1)
            await updateDoc(coinRef, {
                portfolio: newData
            });
        } catch (err) {
            console.log(err);
        }
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
                                <th>24h %</th>
                                <th>Quantity</th>
                                <th>Holdings</th>
                                <th></th>
                            </tr>
                        </thead>

                        {assets.map((item, index) => {

                            let priceChange = item.percentage;

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
                                            <p
                                                style={priceChange > 0 ? { color: '#7CFC00' } :
                                                    { color: '#DC0000' }}
                                            >{priceChange.toFixed(2)}%</p>
                                        </td>

                                        <td>
                                            <p>{item.quantity}</p>
                                        </td>

                                        <td>
                                            <p>{formatCurrency(item.price * item.quantity)}</p>
                                        </td>

                                        <td>
                                            <MdDeleteOutline
                                                className='asset--delete--btn'
                                                onClick={() => deleteSavedCoin(index)}
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
