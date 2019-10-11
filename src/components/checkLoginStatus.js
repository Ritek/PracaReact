import decode from 'jwt-decode';
import Axios from 'axios';

const getNewToken = async (refToken) => {
    //console.log('sending request for new token');
    await Axios.post('/api/user/checkRefreshToken', {refreshToken: refToken, withCredentials: true})
    .then(res => {
        //console.log("newToken", res.data.newToken);
        sessionStorage.setItem('token', res.data.newToken);
    }).catch(error => {
        console.log(error);
    });
    //console.log('after request');
}

/* const checkExpired = (token) => {
    try {
        const {exp} = decode(token);

        if ( (exp * 1000) < (new Date().getTime()) ) {
            return true;
        } else return false;

    }   catch(error) {
        return true;
    }
} */

const isActive = (token) => {
    try {
        const {exp} = decode(token);

        if ( Date.now() > (exp * 1000) ) {
            return false
        } else return true;

    }   catch(error) {
        return false;
    }
}

export default function checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');
    //console.log('checking token');

    // if returns false protected route won't let you in
    if (!token || !refreshToken) {
        //console.log('no tokens');
        return false;
    } else {
        //console.log('there are tokens');
        if (isActive(token)) {
            //console.log('token is not expired');
            return true;
        }
        else {
            //console.log('token expired');
            if (isActive(refreshToken)) {
                //console.log('refresh token is not expired');
                getNewToken(refreshToken);
                return true;
            } else {
                //console.log('refresh token is expired');
                sessionStorage.clear();
                return false;
            }
        }
    }
}
