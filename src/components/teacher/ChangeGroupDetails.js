import React, {useState, useEffect} from 'react'

function ChangeGroupDetails(props) {

    const newStudentBox = {
        marginBottom: '100px',
        marginTop: '100px',
    }

    const [details, setDetails] = useState({name: props.name, password: props.password});

    useEffect(() => {
        setDetails({name: props.name, password: props.password});
    }, [props]);

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }

    return (
        <form className="card cardMargin" style={newStudentBox}>
            <h2 className="card-header">Change group details</h2>
            <div className="card-body labelStyle">

                <div className="form-group formGroup">
                    <label htmlFor="login">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" 
                        value={details.name}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="email">Passowrd:</label>
                    <input type="text" className="form-control" id="password" name="password" 
                        value={details.password}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <button className="btn btn-danger">Change Details</button>
            </div>
        </form>
    )
}

export default ChangeGroupDetails
