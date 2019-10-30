import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';
import useCheckForbidden from '../../hooks/validateCaracters'

function JoinGroup() {
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

    const focusInput = useRef(null);

    useEffect(() => {
        focusInput.current.focus();
    }, []);

    useEffect(() => {
        let ans = filterForbidden(inputs)
        setErrors(ans);
    }, [inputs]);

    useEffect(() => {
        if (errors.nameError || errors.passwordError || inputs.name === "" || inputs.password === "") setDisableSubmit(true);
        else setDisableSubmit(false);
    }, [errors]);

    useEffect(() => {
        if (message.status === "ok") setInputs({name: "", password: ""});
    }, [message])

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }
    
    const onSubmit = (event) => {
        event.preventDefault();

        let token = sessionStorage.getItem('token');
        console.log(id);
        
        let newMember = {
            id: id,
            name: inputs.name,
            password: inputs.password,
        }

        Axios.post('/api/groups/joingroup', newMember, {headers: {authToken: token}}).then(res => {
            console.log(res.data);
            if (res.data === "Joined the group") {
                setMessage({status: "ok", msg: "You have succesfuly joined the group"});
            }
        }).catch(error => {
            console.log(error.response);
            console.log(error.response.data);
            setMessage({status: "error", msg: error.response.data});
        });
    }

    return (
        <div>
            {message.status === "ok" &&
                <div className="alert alert-success" style={cardStyle}>
                    <p>{message.msg}</p>
                </div>
            }

            {message.status === "error" &&
                <div className="alert alert-danger" style={cardStyle}>
                    <p>{message.msg}</p>
                </div>
            }

            <form className="card" style={cardStyle}>
                <div className="card-header">
                    <h1>Join group</h1>
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

                    <button type="submit" className="btn btn-primary" onClick={e => onSubmit(e)} disabled={disableSubmit}>Join</button>
                </div>
            </form>
        </div>
    )
}

export default JoinGroup
