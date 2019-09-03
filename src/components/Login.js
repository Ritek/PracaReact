import React, {useContext, useState, useEffect} from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';
import { LoginContext } from '../App';

function Login(props) {
    //const setLogin = useContext(LoginContext);
    const setLogin = props.value;

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        //console.log('State changed');
    }, [setLogin]) 

    const [serverError, setServerError] = useState({msg: ""});

    const clearInputs = () => {
        setInput({...input, password: ""});
    }

    const handleState = (event) => {
        const value = event.target.value;
        setInput({...input, [event.target.name]: value})
        //console.log(event.target.value);
    }

    const login = (event) => {
        
        event.preventDefault();
        //console.log(input);

        Axios.post('http://localhost:5000/api/user/login', input).then(res => {
            console.log(res.data);
            setServerError({msg: "ok"});

            localStorage.setItem('token', res.data);
            setLogin(true);
        }).catch(error => {
            setServerError({msg: "Could not log in. Wrong email or password"});
            clearInputs();
        });
    }

    return (
    <div>
        {serverError.msg === "ok" &&
            <Redirect to='/' />
        }

        {serverError.msg !== "" && serverError.msg !== "ok" &&
            <div className="alert alert-danger" style={cardStyle}>{serverError.msg}</div>
        }

        <div className="card" style={cardStyle}>
            <div className="card-header">
                <h1>Login</h1>
            </div>
            <form className="card-body">
                <input type="text" className="form-control" placeholder="Enter your email" name="email" value={input.email} onChange={e => handleState(e)}></input><br />
                <br />
                <input type="text" className="form-control" placeholder="Enter your password" name="password" value={input.password} onChange={e => handleState(e)}></input><br />
                <br />
                <button className="btn btn-primary" onClick={e => login(e)}>Log in</button>
                <br />
            </form>
            <div className="card-footer text-muted">
                <Link to='/register'><p>You don't have an account? Sign up now and try out >></p></Link>
            </div>
        </div>
    </div>
    );
}

export default Login;
