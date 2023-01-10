import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext';
import { NavBar } from '../Components/NavBar';

export const SignIn = () => {

    const [error, setError] = useState();

    const emailRef = useRef();

    const passwordRef = useRef();

    const { signIn } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('')
            await signIn(emailRef.current.value, passwordRef.current.value)
            console.log('Signed Up Successfully')
            navigate('/account')
        } catch (e) {
            setError('Unable to login')
            console.log(e.message)
        }
    };

    return (
        <div className='signup'>

            <form
                className='form'
                onSubmit={handleSubmit}
            >
                <h2>Log In</h2>

                {error && <p className='signup--error'>{error}</p>}

                <div className='signup--input--container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        ref={emailRef}
                        required />
                </div>

                <div className='signup--input--container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        ref={passwordRef}
                        required />
                </div>

                <button
                    type='submit'
                    className='signup--btn'
                >
                    Log In
                </button>

                <Link to='/forgot-password'>Forgot Password?</Link>
            </form>

            <div>Don't have an account?<Link to='/signup'> Sign Up</Link></div>

        </div>
    )
}


