import React, {useState, useEffect} from 'react'
import placeholder from '../../placeholder.png'

function UserDetails(props) {

    const [image, setImage] = useState(undefined);

    useEffect(() => {
        if (props.user.avatarPrev !== undefined) setImage(props.user.avatarPrev);
        else if (props.user.avatarPrev === undefined && props.user.avatar === undefined) setImage(placeholder);
        else setImage(`data:image/png;base64,${props.user.avatar}`);
    }, [props.user.avatar, props.user.avatarPrev]) 

    const imageStyle = {
        maxWidth: '200px', 
        maxHeight: '200px', 
        cursor: 'pointer',
    }

    useEffect(() => {
        console.log('render');
    }, [])

    return (
        <div className="card" style={{width: '80%', margin: 'auto'}}>
            <h2 className="card-header">Your profile</h2>
            <div className="card-body labelStyle">

                <div className="mb-4">
                    {
                        <label htmlFor="file-input">
                            <img src={image} className="img-thumbnail" style={imageStyle} />
                        </label>
                    }
                    <input id="file-input" type="file" name="avatar" style={{display: 'none'}} 
                        onChange={(e) => props.handleUserChange(e)}/>
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="login">Login:</label>
                    <input type="login" className="form-control" id="login" name="login" 
                        value={props.user.login}
                        onChange={e => props.handleUserChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" 
                        value={props.user.email}
                        onChange={e => props.handleUserChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="oldPassword">Old password:</label>
                    <input type="text" className="form-control" id="oldPassword" name="oldPassword" 
                        value={props.user.oldPassword}
                        onChange={e => props.handleUserChange(e)} 
                    />
                </div>

                <div className="form-group formGroup">
                    <label htmlFor="newPassword">New password:</label>
                    <input type="text" className="form-control" id="newPassword" name="newPassword" 
                        value={props.user.newPassword}
                        onChange={e => props.handleUserChange(e)} 
                    />
                </div>

                <div className="form-group formGroup text-center">
                    <button className="btn btn-danger"
                        style={{marginTop: '10px'}} 
                        onClick={() => props.updateChanges()}>Save Changes
                    </button>
                </div>
            </div>
            <div className="card-footer">Worning! Changing detials will couse a logout!</div>
        </div>
    )
}

export default UserDetails
