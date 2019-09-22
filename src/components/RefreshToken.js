import React from 'react'
import Axios from 'axios'

function RefreshToken() {
    let refreshToken = sessionStorage.getItem('refreshToken'); 
    let success = false;
    await Axios.post('api/user/checkRefreshToken', {refreshToken: refToken, withCredentials: true})
    .then(res => {
        //console.log("newToken", res.data.newToken);
        sessionStorage.setItem('token', res.data.newToken);
    }).catch(error => {
        console.log(error);
    });
    return (success);
}

export default RefreshToken
