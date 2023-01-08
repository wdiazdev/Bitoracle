import { UserAuth } from '../Context/AuthContext';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const Dashboard = () => {

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
        <div className='dashboard'>

            <div className='dash--container'>

                <h2>Dashboard</h2>

                <div className='dash--nav'>

                    <p>Welcome: {user && user.email}</p>
                    <button
                        className='dash--btn'
                        onClick={handleLogout}
                    >Logout</button>

                    {error && <p className='signup--error'>{error}</p>}
                </div>
            </div>
        </div>
    )
}


