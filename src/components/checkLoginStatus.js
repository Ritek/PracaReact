import decode from 'jwt-decode';
import Axios from 'axios';

const getNewToken = (refToken) => {
    Axios.post('http://localhost:5000/api/user/checkRefreshToken', refToken).then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data);
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
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
        console.log('before false');
        return false;
    } else {
        if (!checkExpired(token)) return true;
        else {
            if (!checkExpired(refreshToken)) {
                getNewToken(refreshToken);
                return true;
            } else {
                localStorage.clear();
                return false;
            }
        }
    }
}
