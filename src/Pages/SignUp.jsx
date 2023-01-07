import { useRef, useState } from 'react';
import '../Styles/SignUp.css';
import { useAuth } from '../Context/AuthContext';

export const SignUp = () => {

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();

    const passwordRef = useRef();

    const passwordConfirmRef = useRef();

    const { signUp } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setLoading(true);
            setError('')
            await signUp(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to sign up')
        }
        setLoading(false)
    };

    return (
        <div className='signup'>

            <h2>Sign up</h2>

            <form
                className='form'
                onSubmit={handleSubmit}
            >

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
                    disabled={loading}
                >
                    Sign up
                </button>

                {error && <p className='signup--error'>{error}</p>}

            </form>

            <div>Already have an account? Log In</div>

        </div>
    )
}
