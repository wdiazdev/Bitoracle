import { useRef, useState } from 'react';
import '../Styles/SignUp.css';
import { UserAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {

    const [error, setError] = useState();

    const emailRef = useRef();

    const passwordRef = useRef();

    const passwordConfirmRef = useRef();

    const { createUser } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            await createUser(emailRef.current.value, passwordRef.current.value)
            console.log('Signed Up Successfully')
            navigate('/account')
        } catch (e) {
            setError('Failed to create an account')
            console.log(e.message)
        }
    };

    return (
        <div className='signup'>

            <form
                className='form'
                onSubmit={handleSubmit}
            >

                <h2>Sign up</h2>

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

                <div className='signup--input--container'>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmpassword'
                        ref={passwordConfirmRef}
                        required />
                </div>

                <button
                    type='submit'
                    className='signup--btn'
                >
                    Sign up
                </button>

                {error && <p className='signup--error'>{error}</p>}

            </form>

            <div>Already have an account?<Link to='/signin'> Sign In</Link></div>

        </div>
    )
}
