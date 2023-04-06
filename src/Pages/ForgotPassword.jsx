import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { userAuth } from '../Context/AuthContext';

const ForgotPassword = () => {

    const [error, setError] = useState();

    const [message, setMessage] = useState();

    const emailRef = useRef();

    const { resetPassword } = userAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('')
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch (e) {
            setError('Failed to reset password')
            console.log(e.message)
        }
    };

    return (
        <div className='signup'>

            <form
                className='form'
                onSubmit={handleSubmit}
            >

                <h2>Reset Password</h2>

                {error && <p className='signup--error'>{error}</p>}

                {message && <p className='reset--pass--msg'>{message}</p>}

                <div className='signup--input--container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        ref={emailRef}
                        required />
                </div>

                <button
                    type='submit'
                    className='signup--btn'
                >
                    Reset Password
                </button>

                <Link to='/signin'>Log in</Link>
            </form>

            <div>Don't have an account?<Link to='/signup'> Sign Up</Link></div>

        </div>
    )
};

export default ForgotPassword;