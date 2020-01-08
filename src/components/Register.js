import React, {useRef, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
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
    }, []);

    useEffect(() => {
        console.log();
    }, [])

    const { values, handleChange, handleChangeType, handleSubmit, errors, handleServerError, serverError, clearForm, blockSubmit } = useForm(submit, validate);

    function submit() {
        console.log(values);
        let newUser = {
            login: values.login,
            email: values.email,
            password: values.password,
            type: values.type,
        };

        Axios.post('api/user/register', newUser).then(res => {
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
            <form className="form card-body">
                <p className="font-italic">You do not have to provide login now. You will be able o change it later.</p>

                <div className="input-group">
                    <input ref={focusInput} type="text" id="login" name="login"
                        value={values.login} onChange={e => handleChange(e)} placeholder="Login"
                        className={ errors.login ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        {errors.login}
                    </div>
                </div>

                <div className="input-group">
                    <input type="text" name="email" 
                        value={values.email} onChange={e => handleChange(e)} placeholder="Email" required
                        className={ errors.email ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        {errors.email}
                    </div>
                </div>

                <div className="input-group">
                    <input type="text" name="password" 
                        value={values.password} onChange={e => handleChange(e)} placeholder="Password" required
                        className={ errors.password ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        {errors.password}
                    </div>
                </div>

                <div className="input-group">
                    <input type="text" name="password2" 
                        value={values.password2} onChange={e => handleChange(e)} placeholder="Repeat password" required
                        className={ errors.password2 ? 'form-control is-invalid' : 'form-control'}
                    /> 
                    <div className="invalid-feedback">
                        {errors.password2}
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-group-prepand">
                        <label className="input-group-text" htmlFor="isTeacher">Account type</label>
                    </div>
                    <select 
                        name="isTeacher"
                        onChange={(e) => handleChangeType(e.target.value)} 
                        className="custom-select" id="isTeacher"
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>

                <div className="input-group">
                    <button type="submit" className="btn btn-primary"
                        onClick={e => handleSubmit(e)} style={{margin: 'auto'}}>Create account
                    </button>
                </div>
            </form>
            <div className="card-footer text-muted">
                <Link to='/login'><p>Already have an account? Log in here >></p></Link>
            </div>
        </div>
    </div>
    );
}

export default Register;
