import decode from 'jwt-decode';
import Axios from 'axios';

const getNewToken = (refToken) => {
    Axios.post('http://localhost:5000/api/user/checkRefreshToken', refToken).then(res => {
        console.log(res.data);
        sessionStorage.setItem('token', res.data);
    }).catch(error => {
        console.log(error);
    });
}

const checkExpired = (token) => {
    try {
        const {exp} = decode(token);

        if ( (exp * 1000) < (new Date().getTime()) ) {
            return true;
        } else return false;

    }   catch(error) {
        return true;
    }
}

export default function checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');

    // if returns false protected route won't let you in
    if (!token || !refreshToken) {
        console.log('no tokens');
        return false;
    } else {
        if (!checkExpired(token)) return true;
        else {
            if (!checkExpired(refreshToken)) {
                console.log('refresh token still works');
                getNewToken(refreshToken);
                return true;
            } else {
                console.log('refreshToken ran out');
                sessionStorage.clear();
                return false;
            }
        }
    }
}
