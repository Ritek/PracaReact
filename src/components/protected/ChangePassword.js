import React, {useState} from 'react'

function ChangePassword() {
    const [password, setPassword] = useState({oldPassword: "", newPassword: ""})

    const handleChange = (event) => {
        setPassword({...password, [event.target.name]: event.target.value});
    }

    return (
        <form className="card cardMargin">
            <h2 className="card-header">Change Password</h2>
            <div className="card-body labelStyle">

                <div className="form-group formGroup">
                    <label htmlFor="oldPassword">Old password:</label>
                    <input type="text" className="form-control" id="oldPassword" name="oldPassword" 
                        value={password.newPassword}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="newPassword">New password:</label>
                    <input type="text" className="form-control" id="newPassword" name="newPassword" 
                        value={password.oldPassword}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <button className="btn btn-danger submitButton">Change password</button>
            </div>
            <div className="card-footer">Worning! Changing password will couse a logout!</div>
        </form>
    )
}

export default ChangePassword
