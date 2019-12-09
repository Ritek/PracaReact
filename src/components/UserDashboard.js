import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';

function UserDashboard() {
    let role;
    try {
        let cos = decode(sessionStorage.getItem('token'));
        role = cos.role;
    } catch(error) {
        console.log(error);
    }
    

    return (
        <div>
            {role === 'student' &&
                <Redirect to="/user/studentdashboard" />
            }

            {role === 'teacher' &&
                <Redirect to="/user/teacherdashboard" />
            }
        </div>
    )
}

export default UserDashboard
