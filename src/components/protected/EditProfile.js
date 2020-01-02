import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'

import UserDetails from './UserDetails';
import './userDetails.css'

function EditProfile(props) {
    const [user, setUser] = useState({login: undefined, email: undefined, avatar: undefined, avatarPrev: undefined, oldPassword: "", newPassword: ""});

    const handleUserChange = (event) => {
        console.log('name', event.target.name);
        console.log('value', event.target.value);

        if (event.target.name === 'avatar') {
            setUser({...user, avatarPrev: URL.createObjectURL(event.target.files[0]), avatar: event.target.files[0]})
        } else setUser({...user, [event.target.name]: event.target.value})
    }

    const getUserDetails = () => {
        console.log('getdetails');
        Axios.post('/api/userinfo/getdetails').then(res => {
            setUser({...user, login: res.data.login, email: res.data.email, avatar: res.data.imgPath});
        }).catch(error => {
            console.log(error);
        });
    }

    const updateChanges = () => {
        console.log('Hi');
        let temp = user;
        delete temp.avatarPrev;

        const data = new FormData();
        data.append('image', user.avatar);
        data.append('user', JSON.stringify(temp));

        Axios.post('/api/userinfo/updateprofile', data).then(res => {
            console.log('Profile updated');
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div>
            {user.login !== undefined &&
                <UserDetails user={user} handleUserChange={handleUserChange} updateChanges={updateChanges}/>
            }
        </div>
    )
}

export default EditProfile
