import React from 'react'

export const QtyDashCoin = ({ activeCurrency, handleAmount, addAsset }) => {

    return (
        <>
            <form onSubmit={addAsset}>



                <h2>
                    Enter your
                    <span
                        style={{
                            color: '#0995e0',
                            padding: '0 0.4rem'
                        }}
                    >
                        {activeCurrency?.name}
                    </span>
                    quantity?
                </h2>

                <input
                    id='search'
                    type='number'
                    min='0'
                    placeholder='Ex: 17'
                    autoComplete='off'
                    required
                    onChange={(event) => handleAmount(event)}
                />

                <button
                    type='submit'
                    className='main--btn'
                >
                    Add Asset
                </button>

            </form>

        </>
    )
};
