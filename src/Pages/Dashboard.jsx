import '../Styles/Dashboard.css';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '../Components/Loader';
import { AssetList } from '../Components/AssetList';
import { numberWithCommas } from '../Utilities/FormatCurrency';

export const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const [asset, setAsset] = useState([]);

    const [balance, setBalance] = useState(0);

    const assetName = useRef(null);
    const price = useRef(null);
    const quantity = useRef(null);
    const date = useRef(null);

    const addAsset = (event) => {
        event.preventDefault();

        let d = date.current.value.split('-');
        let newD = new Date(d[0], d[1], d[2]);

        setAsset([...asset, {
            'assetName': assetName.current.value,
            'price': price.current.value,
            'quantity': quantity.current.value,
            'date': newD.getTime()
        }])
        assetName.current.value = '';
        price.current.value = null;
        quantity.current.value = null;
        date.current.value = null;
    }

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < asset.length; i++) {
            total += parseInt(asset[i].price * asset[i].quantity)
        }
        const newBalance = `$${numberWithCommas(total)}`;
        setBalance(newBalance);
    }, [asset]);

    //* LOADER

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, []);

    return (
        <>
            {loading
                ?
                <Loader />
                :
                <div className='dashboard'>

                    <div className='dash--container'>

                        <h2>Dashboard</h2>

                        <div className='dashboard--data'>

                            <div className='num1'>

                                <h3>Balance:</h3>

                                <div className='total--balance'>{balance}</div>

                                <form onSubmit={addAsset}>

                                    <div className='form--inner'>
                                        <input
                                            type='text'
                                            name='asset'
                                            id='asset'
                                            placeholder='Asset'
                                            required
                                            ref={assetName}
                                        />
                                        <input
                                            type='text'
                                            name='price'
                                            id='price'
                                            placeholder='Price'
                                            required
                                            ref={price}
                                        />
                                        <input
                                            type='number'
                                            name='quantity'
                                            id='quantity'
                                            placeholder='QTY'
                                            required
                                            ref={quantity}
                                        />
                                        <input
                                            type='date'
                                            name='date'
                                            id='date'
                                            placeholder='Date'
                                            ref={date}
                                        />
                                        <input type='submit' value='Add' className='signup--btn' />
                                    </div>

                                </form>

                            </div>

                            <div className='num2'>
                                <AssetList asset={asset} setAsset={setAsset} />
                            </div>

                        </div>

                    </div>

                </div>
            }
        </>
    )
};