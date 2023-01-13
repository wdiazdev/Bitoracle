import { useState } from 'react';
import '../Styles/NavBar.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';

export const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

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
        <nav className='navbar--container'>
            <Link to='/'><h3>BITORACLE</h3></Link>
            <div className={click ? 'nav--menu active' : 'nav--menu'}>

                {
                    user
                        ?
                        <>
                            <Link to='/account'>Account: {user && user.email}</Link>
                            <button
                                className='dash--btn'
                                onClick={handleLogout}
                            >Logout</button>
                            {error && <p className='signup--error'>{error}</p>}
                        </>
                        :
                        <Link to='/'>Home</Link>
                }

            </div>
            <div className='hamburger--menu' onClick={handleClick}>
                {click ? (<FaTimes size={35} />) : (<FaBars size={35} />)}
            </div>
        </nav >
    )
};
