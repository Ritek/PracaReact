import React, {useContext, useState} from 'react';
import '../App.css';
//import {Link} from 'react-router-dom';
import Axios from 'axios';

import { UserContext, UserLoginContext } from '../App';
import useInput from '../hooks/useInput';

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
        email: "",
        password: "",
        password2: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput({...input, [name]: value});
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();

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
            <form className="card-body"> {/* ${error.login && 'is-invalid'} */}
                <input type="text" className={`form-control`} placeholder="Enter your login" name="login" value={input.login} onChange={e => handleChange(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Enter your email" name="email" value={input.email} onChange={e => handleChange(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Enter your password" name="password" value={input.password} onChange={e => handleChange(e)}></input><br />
                <br />

                <input type="text" className="form-control" placeholder="Repeat the password" name="password2" value={input.password2} onChange={e => handleChange(e)}></input><br />
                <br />

                <button type="submit" className="btn btn-primary" onClick={e => handleSubmit(e)}>Register</button>
                <br />
            </form>
            <div className="card-footer text-muted">
                
            </div>
        </div>
    </div>
    );
}

export default Register;
