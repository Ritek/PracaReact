import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

function JoinGroup() {

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    const [values, setValues] = useState({userId: "", name: "", password: ""});
    const [message, setMessage] = useState({status: "", msg: ""});

    const focusInput = useRef(null);

    useEffect(() => {
        focusInput.current.focus();
        setUserId();
    }, []);

    const setUserId = () => {
        try {
            const {id} = decode(sessionStorage.getItem('token'));
            console.log("effect id:", id);
            setValues({...values, userId: id});
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
    
    const onSubmit = (event) => {
        event.preventDefault();

        if (values.name !== "" && values.password !== "") {
            let token = sessionStorage.getItem('token');
            Axios.post('/api/groups/joingroup', values, {headers: {authToken: token}}).then(res => {
                console.log(res.data);
                if (res.data === "Joined the group") {
                    setMessage({status: "ok", msg: "You have succesfuly joined the group"});
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("Please enter data");
        }
    }

    return (
        <div>
            {message.status === "ok" &&
                <div className="alert alert-success" style={cardStyle}>
                    <p>{message.msg}</p>
                </div>
            }

            <form className="card" style={cardStyle}>
                <div className="card-header">
                    <h1>Join group</h1>
                </div>
                <div className="card-body">
                    <input ref={focusInput} type="text" className="form-control" name="name" value={values.name} onChange={e => handleChange(e)} placeholder="Group name" required/>
                    <br />
                    <input type="text" className="form-control" name="password" value={values.password} onChange={e => handleChange(e)} placeholder="Group password" required/>
                    <br />
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={e => onSubmit(e)}>Join</button>
                </div>
            </form>
        </div>
    )
}

export default JoinGroup
