import { useState } from 'react';
import '../Styles/NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../Context/AuthContext';

export const NavBar = () => {

    const [error, setError] = useState();

    const { currentUser, logout } = userAuth();

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
        <nav className='navbar--container'>

            <Link to='/'><h3>BITORACLE</h3></Link>

            {
                currentUser
                    ?
                    <>
                        <Link to='/account'>Welcome: {currentUser && currentUser.email}</Link>
                        <button
                            className='main--btn'
                            onClick={handleLogout}
                        >Logout</button>
                        {error && <p className='signup--error'>{error}</p>}
                    </>
                    :
                    <Link to='/'>Home</Link>
            }

        </nav >
    )
};
