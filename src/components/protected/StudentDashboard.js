import React from 'react'
import {Link} from 'react-router-dom'

import './userDetails.css'

function StudentDashboard() {
    return (
        <div className='row'>
            <Link className="col-sm tile" to='/user/joingroup'>
                <div className="box">
                    <i className="fas fa-user-plus"></i>
                    <p className="link">Join group</p>
                </div>
            </Link>

            <Link className="col-sm tile" to='/user/solvetest'>
                <div className="box">
                    <i className="fas fa-file-contract"></i>
                    <p className="link">Solve test</p>
                </div>
            </Link>

            <div className="w-100" />

            <Link className="col-sm tile" to='/user/checkgraded'>
                <div className="box">
                    <i className="far fa-check-square"></i>
                    <p className="link">Check Graded</p>
                </div>
            </Link>
        </div>
    )
}

export default StudentDashboard
