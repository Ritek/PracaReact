import React, {useState, useContext} from 'react';
import '../App.css';

import {Link} from 'react-router-dom';

function Nav(props) { 
    const [login, setLogin] = props.value;
    let loginButton;

    const navStyle = {
        color: 'white',
    }

    const handleLogOut = () => {
        setLogin(false);
        localStorage.removeItem('token');
    }

    if (login === false) {
        loginButton = <Link style={navStyle} to='/login'> <li>Login</li> </Link>;
    } else {
        loginButton = <Link style={navStyle} to='/'> <li onClick={handleLogOut}>Log out</li> </Link>;
    }

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/about'>
                    <li>About</li>
                </Link>
                {loginButton}
            </ul>
        </nav>
    );
}

export default Nav;
