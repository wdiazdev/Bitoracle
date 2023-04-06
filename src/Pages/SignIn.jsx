import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../Context/AuthContext';

const SignIn = () => {

    const [error, setError] = useState();

    const emailRef = useRef();

    const passwordRef = useRef();

    const { signIn, currentUser } = userAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('')
            await signIn(emailRef.current.value, passwordRef.current.value)
            console.log('Login Successfully')
            navigate('/account')
        } catch (e) {
            setError('Unable to login')
            console.log(e.message)
        }
    };

    return (
        <div className='signup'>

            {
                currentUser ? <p
                    className='already--login'
                    style={{
                        fontSize: '2.5rem',
                        color: 'var(--primary--color)'
                    }}
                >You are already logged in.
                </p> :
                    <>
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
                                    ref={emailRef}
                                    required />
                            </div>

                            <div className='signup--input--container'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    ref={passwordRef}
                                    required />
                            </div>

                            <button
                                type='submit'
                                className='signup--btn'
                            >
                                Login
                            </button>

                            <Link to='/forgot-password'>Forgot Password?</Link>
                        </form>

                        <div>Don't have an account?<Link to='/signup'> Sign Up</Link></div>
                    </>
            }
        </div>
    )
};

export default SignIn;


