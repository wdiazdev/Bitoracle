import React, { useContext, useState, useEffect } from "react"
import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()

    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // const signIn = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password)
    // }

    // const logout = () => {
    //     return signOut(auth)
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};