import React, {useContext, useEffect} from 'react';
import '../App.css';

import decode from 'jwt-decode';
import {Link} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import {AuthContext} from './AuthContext'

import {ReactComponent as Logo} from '../justTest.svg'

function NavBar(props) { 
    const [login, setLogin] = props.value;
    let user = {};
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        console.log('state:', isLoggedIn);
    }, [isLoggedIn])

    try {
        user = decode(sessionStorage.getItem('token'));
    } catch(error) {
        console.log(error);
    }

    let loginButton;
    let dashboard;
    let about;
    let home;

    const navStyle = {
        color: 'white',
        marginRight: '20px',
    }

    const handleLogOut = () => {
        //setLogin(false);
        setIsLoggedIn(false);
        sessionStorage.removeItem('token');
    }

    if (login === false) {
        loginButton = <Link style={navStyle} to='/login'> <li>Login</li> </Link>;
    } else {
        loginButton = <Link style={navStyle} to='/'> <li onClick={handleLogOut}>Log out</li> </Link>;
    }

    if (login === false) {
        dashboard = <Link style={navStyle} to='/'> <li>Home</li> </Link>;
        home = '/';
    } else {
        dashboard = <Link style={navStyle} to='/user'> <li>Home</li> </Link>;
        home ='/user';
    }

    if (login === false) {
        about = <Link style={navStyle} to='/about'> <li>About</li> </Link>;
    } else {
        about = <Link style={navStyle} to='/edituser'> <li>Profile</li> </Link>;
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href={home}><Logo><path style={{fill: 'white'}}></path></Logo></Navbar.Brand>

            {user.login !== undefined &&
                <Navbar.Text className="mr-auto">
                    Signed in as: {user.login}
                </Navbar.Text>
            }

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                
                <Nav>
                    {dashboard}
                    {about}
                    {loginButton}
                </Nav>
            </Navbar.Collapse>
            
        </Navbar>
    );
}

export default NavBar;


        {/* <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                {dashboard}
                {about}
                {loginButton}
            </ul>
        </nav> */}