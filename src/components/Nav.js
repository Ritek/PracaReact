import React, {useState, useContext} from 'react';
import '../App.css';

import {Link} from 'react-router-dom';

function Nav(props) { 
    const [login, setLogin] = props.value;
    let loginButton;
    let dashboard;
    let about;

    const navStyle = {
        color: 'white',
    }

    const handleLogOut = () => {
        setLogin(false);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
    }

    if (login === false) {
        loginButton = <Link style={navStyle} to='/login'> <li>Login</li> </Link>;
    } else {
        loginButton = <Link style={navStyle} to='/'> <li onClick={handleLogOut}>Log out</li> </Link>;
    }

    if (login === false) {
        dashboard = <Link style={navStyle} to='/'> <li>Home</li> </Link>;
    } else {
        dashboard = <Link style={navStyle} to='/user'> <li>Home</li> </Link>;
    }

    if (login === false) {
        about = <Link style={navStyle} to='/about'> <li>About</li> </Link>;
    } else {
        about = <Link style={navStyle} to='/edituser'> <li>Profile</li> </Link>;
    }

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                {dashboard}
                {about}
                {loginButton}
            </ul>
        </nav>
    );
}

export default Nav;
