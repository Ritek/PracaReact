import React, {useState, useRef, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';
import useCheckForbidden from '../../../hooks/validateCaracters'

import {Redirect} from 'react-router-dom'

function CreateGroup() {
    const focusInput = useRef(null);
    const {id} = decode(sessionStorage.getItem('token'));

    const {filterForbidden} = useCheckForbidden();

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    const [inputs, setInputs] = useState({name: "", password: ""});
    const [errors, setErrors] = useState({nameError: false, passwordError: false});

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [message, setMessage] = useState({status: "", msg: ""});

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        focusInput.current.focus();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        //console.log(inputs);
        //console.log("userId:", inputs.userId);

        const newGroup = { 
            id: id,
            name: inputs.name,
            password: inputs.password,
        }

        //console.log(newGroup);
 
        Axios.post('/api/groups/creategroup', newGroup, {headers: {authToken: sessionStorage.getItem('token')} }).then(res => {
            setRedirect(true);
        }).catch(error => {
            console.log(error);
            setMessage({status: "error", msg: error.response.data});
        });
    }

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        const ans = filterForbidden(inputs);
        setErrors(ans);
    }, [inputs]);

    useEffect(() => {
        if (errors.nameError || errors.passwordError || inputs.name === "" || inputs.password === "") setDisableSubmit(true);
        else setDisableSubmit(false);
    }, [errors])

    return (
        <div>
            
            {message.status === "error" &&
                <div className="alert alert-danger" style={cardStyle}>
                    <p>{message.msg}</p>
                </div>
            }

            <div className="card" style={cardStyle}>
                <div className="card-header">
                    <h1>Create group</h1>
                </div>
                <div className="card-body form-group">

                    <div className="input-group">
                        <input ref={focusInput} type="text" name="name" 
                            value={inputs.name} onChange={e => handleChange(e)} placeholder="Group name" required
                            className={ errors.nameError ? 'form-control is-invalid' : 'form-control'} 
                        />
                        <div className="invalid-feedback">
                            Name should only contain letters and numbers! 
                        </div>
                    </div>

                    <div className="input-group">
                        <input type="text" name="password" 
                            value={inputs.password} onChange={e => handleChange(e)} placeholder="Group password" required
                            className={ errors.passwordError ? 'form-control is-invalid' : 'form-control'}
                        /> 
                        <div className="invalid-feedback">
                            Password should only contain letters and numbers! 
                        </div>
                    </div>

                    <div className="input-group">
                        <button type="submit" className="btn btn-primary" disabled={disableSubmit}
                            onClick={e => onSubmit(e)} style={{margin: 'auto'}}>Create
                        </button>
                    </div>  
                    
                </div>
            </div>

            {redirect === true &&
                <Redirect to="/user/menagegroups" />
            }
        </div>
    )
}

export default CreateGroup
