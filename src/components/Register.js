import React, {useContext, useState} from 'react';
import '../App.css';
//import {Link} from 'react-router-dom';
import Axios from 'axios';

import { UserContext, UserLoginContext } from '../App';

function Register() {
  const user = useContext(UserContext);
  const setUser = useContext(UserLoginContext);

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    const [input, setInput] = useState({
        login: "",
        loginError: "",

        email: "",
        password: "",
        password2: "",
    });

    const handleState = (event) => {
        const value = event.target.value;
        setInput({...input, [event.target.name]: value});
    }

    const login = (event) => {
        
        event.preventDefault();
        //console.log(input);

        Axios.post('http://localhost:5000/api/user/register', input).then(res => {
            //console.log(res.data);
            setUser(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
    <div>
        <div className="card" style={cardStyle}>
            <div className="card-header">
                <h1>Login</h1>
            </div>
            <form className="card-body">
                <input type="text" className="form-control" placeholder="Enter your login" name="login" value={input.login} onChange={e => handleState(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Enter your email" name="email" value={input.email} onChange={e => handleState(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Enter your password" name="password" value={input.password} onChange={e => handleState(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Repeat the password" name="password2" value={input.password2} onChange={e => handleState(e)}></input><br />
                <br />

                <button id="submit" className="btn btn-primary" onClick={e => login(e)}>Register</button>
                <br />
            </form>
            <div className="card-footer text-muted">
                
            </div>
        </div>
    </div>
    );
}

export default Register;
