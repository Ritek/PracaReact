import React, {useState, useRef, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

function CreateGroup() {
    const focusInput = useRef(null);
    const {id} = decode(sessionStorage.getItem('token'));

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    const [inputs, setInputs] = useState({userId: id, name: "", password: ""});

    useEffect(() => {
        focusInput.current.focus();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        console.log("userId:", inputs.userId);

        const newGroup = { 
            id: inputs.userId,
            name: inputs.name,
            password: inputs.password,
        }

        console.log(newGroup);
 
        Axios.post('http://localhost:5000/api/groups/creategroup', newGroup).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <div className="card" style={cardStyle}>
                <div className="card-header">
                    <h1>Create group</h1>
                </div>
                <form className="card-body">

                    <input ref={focusInput} type="text" className="form-control is-invalid" name="name" value={inputs.name} onChange={e => handleChange(e)} placeholder="Group name" required/>
                    <br/>
                    <p>lllll</p>

                    <br/>

                    <input type="text" className="form-control" name="password" value={inputs.password} onChange={e => handleChange(e)} placeholder="Group password" required/>
                    <br/>
                    <p></p>  

                    <button type="submit" className="btn btn-primary" onClick={e => onSubmit(e)}>Create</button>  

                </form>
            </div>
        </div>
    )
}

export default CreateGroup
