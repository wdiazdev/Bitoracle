import { useState } from 'react';
import '../Styles/NavBar.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className='navbar--container'>
            <h3>BITORACLE</h3>
            <div className={click ? 'nav--menu active' : 'nav--menu'}>
                <a onClick={handleClick} className='focus-in-expand' href='#'>Home</a>
                <Link to='/login'><button id='login--btn'>Login</button></Link>
            </div>
            <div className='hamburger--menu' onClick={handleClick}>
                {click ? (<FaTimes size={35} />) : (<FaBars size={35} />)}
            </div>
        </nav >
    )
}
