import React, {useContext} from 'react';
import '../App.css';

import { UserContext } from '../App';
import {Link} from 'react-router-dom';

function Nav() {
    const user = useContext(UserContext);    

    const navStyle = {
        color: 'white',
    }

    let loginButton;
    if (user != '') {
        loginButton = <Link style={navStyle} to='/login'> <li>Login</li> </Link>;
    } else {
        loginButton = 'logout';
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
