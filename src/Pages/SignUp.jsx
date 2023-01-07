import { useState } from 'react';
import '../Styles/SignUp.css';
import { UserAuth } from '../Context/AuthContext';

export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { createUser } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await createUser(email, password)
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

    return (
        <div className='signup'>

            <h2>Sign up</h2>

            <form
                className='form'
                onSubmit={handleSubmit}
            >

                <div className='signin--input--container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>

                <div className='signin--input--container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <button type='submit' className='login--btn'>Sign up</button>

            </form>

            <div>Already have an account? Log In</div>

        </div>
    )
}
