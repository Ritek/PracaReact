import React, {useContext, useState} from 'react';
import '../App.css';
//import {Link} from 'react-router-dom';
import Axios from 'axios';

import useForm from '../hooks/useForm';
import validate from './validateRegister';

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

    const { values, handleChange, handleSubmit, errors } = useForm(submit, validate);

    function submit() {
        console.log("Submitted Succesfully");
    }

    return (
    <div>
        <div className="card" style={cardStyle}>
            <div className="card-header">
                <h1>Login</h1>
            </div>
            <form className="card-body"> {/* ${error.login && 'is-invalid'} */}
                <input type="text" className={`form-control`} placeholder="Enter your login" name="login" value={values.login} onChange={e => handleChange(e)}></input><br />

                <input type="text" className="form-control" placeholder="Enter your email" name="email" value={values.email} onChange={e => handleChange(e)}></input><br />
                {errors.email && <p className='text-danger'>{errors.email}</p>}

                <input type="text" className="form-control" placeholder="Enter your password" name="password" value={values.password} onChange={e => handleChange(e)}></input><br />
                {errors.password && <p>{errors.password}</p>}

                <input type="text" className="form-control" placeholder="Repeat the password" name="password2" value={values.password2} onChange={e => handleChange(e)}></input><br />
                {errors.password2 && <p>{errors.email}</p>}

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
