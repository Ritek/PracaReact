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
            {/* <p>Your dashbord</p>
            <Link to='/user/creategroup'>Create group</Link><br />
            <Link to='/user/menagegroups'>Menage groups</Link><br />
            <Link to='/user/createtest'>Create test</Link><br />
            <Link to='/user/testlist'>Your tests</Link><br />

            <Link to='/user/joingroup'>Join group</Link><br />
            <Link to='/user/solvetest'>Solve test</Link><br /> */}
            {role === 'student' &&
                <Redirect to="/user/studentdashboard" />
            }

            {role === 'teacher' &&
                <Redirect to="/user/teacherdashboard" />
            }

            Role: {role}.
        </div>
    )
}

export default UserDashboard
