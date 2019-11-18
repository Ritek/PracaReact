import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import UserDetails from './UserDetails';
import ChangePassword from './ChangePassword';

import './userDetails.css'

function EditProfile() {
    const [user, setUser] = useState({login: undefined, email: undefined, avatar: undefined});

    useEffect(() => {
        console.log(user);
    }, [user])

    useEffect(() => {
        console.log('getdetails');
        Axios.post('/api/userinfo/getdetails').then(res => {
            setUser({login: res.data.login, email: res.data.email, avatar: `static${res.data.imgPath}`});
        }).catch(error => {
            console.log(error);
        }); 

    }, []);

    return (
        <div>
            {user.login !== undefined &&
                <UserDetails user={user}/>
            }
        </div>
    )
}

export default EditProfile
