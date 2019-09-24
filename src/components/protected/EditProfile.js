import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import UserDetails from './UserDetails';
import ChangePassword from './ChangePassword';

import './userDetails.css'

function EditProfile() {
    const [user, setUser] = useState({login: "", email: ""});

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        Axios.post('/api/userinfo/getdetails', {msg: 'hi'}, {headers: {authToken: token}}).then(res => {
            //console.log(res.data);
            setUser({...user, login: res.data.login, email: res.data.email});
        }).catch(error => {
            console.log(error);
        }); 
    }, []);

    return (
        <div>
            <UserDetails login={user.login} email={user.email}/>
            <ChangePassword />
        </div>
    )
}

export default EditProfile
