import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function UserDashboard() {
    const colStyle = {
        height: '200px',
        backgroundColor: 'blue',
        padding: '5px',
    }

    return (
        <div>
            <p>Your dashbord</p>
            <Link to='/user/creategroup'>Create group</Link><br />
            <Link to='/user/joingroup'>Join group</Link><br />
            <Link to='/user/menagegroups'>Menage groups</Link><br />
            <Link to='/user/createtest'>Create test</Link><br />

            <div className="row">
                <div className="col-sm-6">
                    <div className='rounded' style={colStyle}>Create a group</div>
                </div>
                <div className="col-sm-6">
                    <div className='rounded' style={colStyle}>Menage groups</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 card">
                    1 of 2
                </div>
                <div className="col-sm-6 card">
                    2 of 2
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
