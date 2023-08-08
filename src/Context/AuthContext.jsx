import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../Utilities/Firebase"

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", email), {
        savedCoins: [],
        portfolio: [],
      })
      console.log("User created successfully")
    } catch (error) {
      console.log("Error creating user:", error.message)
    }
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const value = {
    createUser,
    logout,
    signIn,
    resetPassword,
    currentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const userAuth = () => {
  return useContext(UserContext)
}
