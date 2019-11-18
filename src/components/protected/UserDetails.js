import React, {useState, useEffect} from 'react'

function UserDetails(props) {

    const [user, setUser] = useState({login: props.user.login, email: props.user.email, 
        avatar: props.user.avatar, oldPassword: "", newPassword: ""});

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    return (
        <form className="card" style={{maxWidth: '50%', margin: 'auto'}}>
            <h2 className="card-header">Your profile</h2>
            <div className="card-body labelStyle">

                <div className="mb-4">
                    {user.avatar !== undefined && user.avatar !== null &&
                        <img src={user.avatar} className="img-thumbnail" style={{maxWidth: '200px', maxHeight: '200px'}} />
                    }
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="login">Login:</label>
                    <input type="login" className="form-control" id="login" name="login" 
                        value={user.login}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" 
                        value={user.email}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="oldPassword">Old password:</label>
                    <input type="text" className="form-control" id="oldPassword" name="oldPassword" 
                        value={user.oldPassword}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="newPassword">New password:</label>
                    <input type="text" className="form-control" id="newPassword" name="newPassword" 
                        value={user.newPassword}
                        onChange={e => handleChange(e)} 
                    />
                </div>

                <button className="btn btn-danger">Change Details</button>
            </div>
            <div className="card-footer">Worning! Changing detials will couse a logout!</div>
        </form>
    )
}

export default UserDetails
