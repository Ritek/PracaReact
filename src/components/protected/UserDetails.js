import React, {useState, useEffect} from 'react'

function UserDetails(props) {

    const [user, setUser] = useState({login: props.login, email: props.email});

    useEffect(() => {
        setUser({login: props.login, email: props.email});
    }, [props]);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    return (
        <form className="card cardMargin">
            <h2 className="card-header">Your profile</h2>
            <div className="card-body labelStyle">
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

                <button className="btn btn-danger">Change Details</button>
            </div>
            <div className="card-footer">Worning! Changing detials will couse a logout!</div>
        </form>
    )
}

export default UserDetails
