import React, { useEffect, useState } from 'react'
import { userAuth } from '../Context/AuthContext';
import { db } from '../Utilities/Firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AiOutlineCloseCircle } from 'react-icons/Ai';
import { BsInfoSquare } from 'react-icons/Bs';
import { formatCurrency } from '../Utilities/formatCurrency';
import { useNavigate } from 'react-router-dom';

export const WatchList = () => {

    const [savedCoins, setSavedCoins] = useState([]);

    const { currentUser } = userAuth();

    const navigate = useNavigate();

    //This function sets up a listener for changes to the document in the 
    //Firestore database. Whenever the document changes, the callback function is 
    //called with the updated document data.

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc => {
            setSavedCoins(doc.data()?.savedCoins);
        }))
    }, [currentUser?.email]);

    const coinRef = doc(db, 'users', `${currentUser?.email}`);

    //this function takes an ID parameter and deletes the corresponding 
    //coin from an array of coins stored in a Firestore document. 

    const deleteSavedCoin = async (coinId) => {
        try {
            const deleteCoin = savedCoins.filter((i) => i.id !== coinId);
            await updateDoc(coinRef, {
                savedCoins: deleteCoin
            });
        } catch (err) {
            console.log(err);
        }
    };

    // console.log(savedCoins);

    return (
        <div className='watchlist--container'>

            <h2>Watchlist</h2>

            <table>
                <thead>
                    <tr className='watchlist--table--head'>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ATH</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                {savedCoins.map((item, index) => {
                    return (
                        <tbody key={item.id}>
                            <tr className='asset--table--row'>

                                <td className='td--name'>
                                    <img src={item.img} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p style={{
                                        textTransform: 'uppercase',
                                        color: 'var(--secondary--color)'
                                    }}>
                                        {item.symbol}
                                    </p>
                                </td>

                                <td>{formatCurrency(item.price)}</td>

                                <td>{formatCurrency(item.ath)}</td>

                                <td>
                                    <BsInfoSquare className='asset--delete--btn'
                                        onClick={() => navigate(`/coin/${item.id}`)}
                                    />
                                </td>

                                <td>
                                    <AiOutlineCloseCircle
                                        className='asset--delete--btn'
                                        onClick={() => deleteSavedCoin(item.id)}
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
