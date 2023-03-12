import React, { useEffect, useState } from 'react'
import { userAuth } from '../Context/AuthContext';
import { db } from '../Utilities/Firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AiOutlineCloseCircle } from 'react-icons/Ai';


export const WatchList = () => {

    const [savedCoins, setSavedCoins] = useState([]);

    const { currentUser } = userAuth();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc => {
            setSavedCoins(doc.data()?.savedCoins);
        }))
    }, [currentUser?.email]);

    const coinRef = doc(db, 'users', `${currentUser?.email}`);

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
            {savedCoins.map((item, index) => {
                return (
                    <div key={index}>
                        <img src={item?.img} alt={item?.name} />
                        <AiOutlineCloseCircle onClick={() => deleteSavedCoin(item?.id)} />
                    </div>
                )
            })}
        </div>
    )
}
