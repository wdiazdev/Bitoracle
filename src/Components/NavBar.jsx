import { useState } from 'react';
import '../Styles/NavBar.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className='navbar--container'>
            <Link to='/'><h3>BITORACLE</h3></Link>
            <div className={click ? 'nav--menu active' : 'nav--menu'}>
                <a onClick={handleClick} className='focus-in-expand' href='#'>Home</a>
                <Link to='/signin'><button id='signup--btn'>Log in</button></Link>
            </div>
            <div className='hamburger--menu' onClick={handleClick}>
                {click ? (<FaTimes size={35} />) : (<FaBars size={35} />)}
            </div>
        </nav >
    )
};
