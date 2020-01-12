import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'

import UserDetails from './UserDetails';
import './userDetails.css'
import useCheckForbidden from '../../hooks/validateCaracters'

function EditProfile() {
    const [user, setUser] = useState({login: undefined, email: undefined, avatar: undefined, avatarPrev: undefined, oldPassword: "", newPassword: "", touched: false});
    const [userErrors, setUserErrors] = useState({loginError: false, loginMsg: "", emailError: false, emailMsg: ""});
    const [reload, setReload] = useState(false);
    const [blockSub, setBlockSub] = useState({block: false, msg: ""});

    const {checkString} = useCheckForbidden();

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
        }).then(() => {
            sessionStorage.removeItem('token');
            setReload(true);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        if ( user.touched === false ) setUser({...user, touched: true});

        if ( user.touched === true && user.newPassword.length < 6 ) {
            setBlockSub({block: true, msg: "Password has to have at lest 6 characters!"});
        } 
        else if ( user.touched === true && user.newPassword === user.oldPassword) {
            setBlockSub({block: true, msg: "New password has to be different then the old password!"});
        }
        else if ( user.touched === true && user.oldPassword === "") {
            setBlockSub({block: true, msg: "Enter old password!"});
        }
        else setBlockSub({block: false, msg: "" });

        if ( user.oldPassword === "" && user.newPassword === "" ) {
            setUser({...user, touched: false});
            setBlockSub({block: false, msg: "" });
        }
    }, [user.newPassword, user.oldPassword]);

    useEffect(() => {
        if (user.login !== undefined) {
            if ( checkString(user.login) ) {
                setUserErrors({...userErrors, loginError: true, loginMsg: 'Only letters and numbers allowed!'});
            } else setUserErrors({...userErrors, loginError: false, loginMsg: ''});
        }
    }, [user.login])

    useEffect(() => {
        if (user.login !== undefined) {
            let regex = RegExp(/\S+@\S+\.\S+/);
            if ( !regex.test(user.email) ) {
                setUserErrors({...userErrors, emailError: true, emailMsg: 'Wrong format of email!'});
            } else setUserErrors({...userErrors, emailError: false, emailMsg: ''});
        }
    }, [user.email])

    useEffect(() => {
        console.log(">",userErrors);
    }, [userErrors])

    return (
        <div>
            {reload === true &&
                <Redirect to="/" />
            }

            {user.login !== undefined &&
                <UserDetails user={user} 
                    handleUserChange={handleUserChange} 
                    updateChanges={updateChanges} 
                    userErrors={userErrors}
                    blockSub={blockSub}
                />
            }
        </div>
    )
}

export default EditProfile
