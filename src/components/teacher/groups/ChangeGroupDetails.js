import React, {useState, useEffect} from 'react'

function ChangeGroupDetails(props) {

    const [details, setDetails] = useState({name: props.name, password: props.password});
    const [errors, setErrors] = useState({nameError: false, passwordError: false});
    const [submitDissabled, setSubmitDissabled] = useState(true);

    const handleChange = (event) => {
        setDetails({...details, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        let err = props.filterForbidden(details);
        setErrors(err);
    }, [details])

    useEffect(() => {
        if (details.name !== props.name || details.password !== props.password) {
            if (errors.nameError === true || errors.passwordError === true) setSubmitDissabled(true);
            else setSubmitDissabled(false);
        }
    }, [errors])

    return (
        <div className="card">
            <h2 className="card-header">Change group details</h2>
            <div className="card-body text-left">

                <label htmlFor="name">Name:</label>
                <div className="input-group mb-5">
                    <input type="text" id="name" name="name" 
                        className={errors.nameError === true ? "form-control is-invalid" : "form-control"}
                        value={details.name}
                        onChange={e => handleChange(e)} 
                    />
                    <div className="invalid-feedback">
                        Name should only contain letters and numbers! 
                    </div>
                </div>

                <label htmlFor="password">Passowrd:</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="password" name="password"
                        className={errors.passwordError === true ? "form-control is-invalid" : "form-control"} 
                        value={details.password}
                        onChange={e => handleChange(e)} 
                    />
                    <div className="invalid-feedback">
                        Passowrd should only contain letters and numbers! 
                    </div>
                </div>

            </div>
            <div className="card-footer text-right">
                <button className="btn btn-danger" 
                    disabled={submitDissabled}>Change Details
                </button>
            </div>
        </div>
    )
}

export default ChangeGroupDetails
