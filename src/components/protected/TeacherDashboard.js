import React from 'react'
import {Link} from 'react-router-dom'

import './userDetails.css'

function TeacherDashboard() {
    return (
        <div>
            <div className="row">
                <Link className="col-sm tile" to='/user/creategroup'>
                    <div className="box">
                        <i className="fas fa-cloud image"></i><br/>
                        <p className="link">Create group</p>
                    </div>
                </Link><br />
                <Link className="col-sm tile" to='/user/menagegroups'>
                    <div className="box">
                        <i className="fas fa-cloud image"></i><br/>
                        <p className="link">Menage groups</p>
                    </div>
                </Link><br />

                <div className="w-100" />

                <Link className="col-sm tile" to='/user/createtest'>
                    <div className="box">
                        <i className="fas fa-cloud image"></i><br/>
                        <p className="link">Create test</p>
                    </div>
                </Link><br />
                <Link className="col-sm tile" to='/user/testlist'>
                    <div className="box">
                        <i className="fas fa-cloud image"></i><br/>
                        <p className="link">Your tests</p>
                    </div>
                </Link><br />

                <div className="w-100" />

                <Link className="col-sm tile" to='/user/allsolvedtests'>
                    <div className="box">
                        <i className="fas fa-cloud image"></i><br/>
                        <p className="link">Solved Tests</p>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default TeacherDashboard
