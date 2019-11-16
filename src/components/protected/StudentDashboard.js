import React from 'react'
import {Link} from 'react-router-dom'

function StudentDashboard() {
    return (
        <div className='row'>
            <Link className="col-sm" to='/user/joingroup'>Join group</Link><br />
            <Link className="col-sm" to='/user/solvetest'>Solve test</Link><br />
            <Link className="col-sm" to='/user/checkgraded'>Check Graded</Link><br />
        </div>
    )
}

export default StudentDashboard
