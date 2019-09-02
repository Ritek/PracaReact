import React, {useState, useRef, useEffect} from 'react';
import '../App.css';
import {Link, withRouter} from 'react-router-dom';
import Axios from 'axios';

import useForm from '../hooks/useForm';
import validate from './validateRegister';

function Register() {

    const focusInput = useRef(null);

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    useEffect(() => {
        focusInput.current.focus();
    }, [])

    const { values, handleChange, handleSubmit, errors, handleServerError, serverError, clearForm, blockSubmit } = useForm(submit, validate);

    function submit() {
        console.log(values);
        let newUser = {
            login: values.login,
            email: values.email,
            password: values.password,
        };

        Axios.post('http://localhost:5000/api/user/register', newUser).then(res => {
            console.log(res.data);
            handleServerError('Success');
            clearForm();
            blockSubmit();
        }).catch(error => {
            console.log("Error: " + error.response.status);
            handleServerError('Duplicate');
        });
    }

    return (
    <div>
        { serverError.status === 'success' && <div className="alert alert-success" style={cardStyle}>{serverError.msg}</div> }
        { serverError.status !== 'success' && serverError.status !== '' && <div className="alert alert-danger" style={cardStyle}>{serverError.msg}</div> }

        <div className="card" style={cardStyle}>

            <div className="card-header">
                <h1>Registration</h1>
            </div>
            <form className="card-body">
                <p className="font-italic">Login will only be used for greetings. You do not have to give one now.</p>
                <input ref={focusInput} type="text" className={"form-control"} placeholder="Enter your login" name="login" value={values.login} onChange={e => handleChange(e)}></input><br />
                <br />

                <input type="text" className={errors.email ? "form-control is-invalid": "form-control"} placeholder="Enter your email" name="email" value={values.email} onChange={e => handleChange(e)}></input><br />
                {errors.email && <p className='text-danger'>{errors.email}</p>}
                <br />

                <input type="text" className={errors.password ? "form-control is-invalid": "form-control"} placeholder="Enter your password" name="password" value={values.password} onChange={e => handleChange(e)}></input><br />
                {errors.password && <p className='text-danger'>{errors.password}</p>}
                <br />

                <input type="text" className={errors.password2 ? "form-control is-invalid": "form-control"} placeholder="Repeat the password" name="password2" value={values.password2} onChange={e => handleChange(e)}></input><br />
                {errors.password2 && <p className='text-danger'>{errors.password2}</p>}
                <br />

                <button type="submit" className="btn btn-primary" onClick={e => handleSubmit(e)}>Register</button>
                <br />
            </form>
            <div className="card-footer text-muted">
                <Link to='/login'><p>Already have an account? Log in here >></p></Link>
            </div>
        </div>
    </div>
    );
}

export default Register;
