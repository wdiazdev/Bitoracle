import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "../Context/AuthContext"
import { FaRegFrown } from "react-icons/fa"
import { toast } from "sonner"

const SignIn = () => {
  const [passwordError, setPasswordError] = useState("")

  const emailRef = useRef()

  const passwordRef = useRef()

  const { signIn, currentUser } = userAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(emailRef.current.value, passwordRef.current.value)
      toast.success("Login Successfully!")
      console.log("Login Successfully")
      navigate("/account")
    } catch (e) {
      toast.error("Unable to login!")
      console.log(e.message)
    }
  }

  const handlePasswordChange = () => {
    const passwordValue = passwordRef.current.value
    if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters.")
    } else {
      setPasswordError("")
    }
  }

  return (
    <div className="signup">
      {currentUser ? (
        <p
          className="already--login"
          style={{
            fontSize: "2.5rem",
            color: "var(--primary--color)",
          }}
        >
          You are already logged in.
        </p>
      ) : (
        <>
          <div className="test--account">
            <p>Test account:</p>
            <p>User: test@test.com</p>
            <p>Password: test123</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <h2>Log In</h2>

            <div className="signup--input--container">
              <label htmlFor="email">Email</label>
              <input type="email" ref={emailRef} required />
            </div>

            <div className="signup--input--container">
              <label htmlFor="password">Password</label>
              <input type="password" ref={passwordRef} onChange={handlePasswordChange} required />
              <p>{passwordError}</p>
            </div>

            <button type="submit" className="signup--btn" disabled={passwordError}>
              {passwordError ? <FaRegFrown className="invalid--icon" /> : "Login"}
            </button>

            <Link to="/forgot-password">Forgot Password?</Link>
          </form>

          <div>
            Don't have an account?<Link to="/signup"> Sign Up</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default SignIn
