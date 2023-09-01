import React, { useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/Ai"
import { userAuth } from "../Context/AuthContext"
import { db } from "../Utilities/Firebase"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"

export const SaveBtn = ({ coin }) => {
  const [save, setSave] = useState(false)

  const { currentUser } = userAuth()

  const dbUserID = doc(db, "users", `${currentUser?.email}`)

  const handleSaveCoin = async () => {
    if (currentUser?.email) {
      setSave(true)
      await updateDoc(dbUserID, {
        savedCoins: arrayUnion({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          img: coin.image,
          price: coin.current_price,
          ath: coin.ath,
        }),
      })
    }
  }

  const starStyled = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0.2rem",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
  }

  return (
    <>
      {currentUser ? (
        <button className="save--btn" style={starStyled} onClick={handleSaveCoin}>
          {save ? (
            <AiFillStar className="save--btn--icon filled" style={{ color: "#0995e0", fontSize: "1rem" }} />
          ) : (
            <AiOutlineStar className="save--btn--icon" style={{ color: "#0995e0", fontSize: "1rem" }} />
          )}
        </button>
      ) : (
        <button className="save--btn" style={starStyled} onClick={() => alert("Please login or create an account")}>
          <AiOutlineStar className="save--btn--icon" style={{ color: "#0995e0", fontSize: "1rem" }} />
        </button>
      )}
    </>
  )
}
