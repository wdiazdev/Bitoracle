import { UserAuth } from '../Context/AuthContext';
import '../Styles/Account.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const Account = () => {

    const [error, setError] = useState();

    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            navigate('/')
            console.log('Successfully logged out')
        } catch (e) {
            setError('Failed to log out')
            console.log(e.message)
        }
    }

    return (
        <div className='account'>
            <h1>Account page</h1>
            <p>User Email: {user && user.email}</p>
            <button
                className='logout--btn'
                onClick={handleLogout}
            >Logout</button>
            {error && <p className='signup--error'>{error}</p>}
        </div>
    )
}


