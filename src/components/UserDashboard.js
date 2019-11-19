import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';

function UserDashboard() {
    const {role} = decode(sessionStorage.getItem('token'));

    const colStyle = {
        height: '200px',
        backgroundColor: 'blue',
        padding: '5px',
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
