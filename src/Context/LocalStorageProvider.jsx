import React, { createContext, useEffect, useState } from 'react'

export const LocalStorageContext = createContext(null);

export const LocalStorageProvider = ({ children }) => {

    const [localStorageData, setLocalStorageData] = useState(
        JSON.parse(localStorage.getItem('Portfolio')) || {}
    );

    const updateLocalStorageData = (newData) => {
        setLocalStorageData(newData);
        localStorage.setItem('Portfolio', JSON.stringify(newData));
    };


    return (
        <LocalStorageContext.Provider
            value={{ localStorageData, updateLocalStorageData }}
        >
            {children}
        </LocalStorageContext.Provider>
    )
};
