import React from 'react'
import {Link} from 'react-router-dom'

function TeacherDashboard() {

    const tile = {
        minWidth: '300px',
        minHeigth: '100px',

        backgroundColor: 'gray',
        height: '25vh',

        marginBottom: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }

    return (
        <div>
            <div className="row">
                <Link className="col-sm" style={tile} to='/user/creategroup'>Create group</Link><br />
                <Link className="col-sm" style={tile} to='/user/menagegroups'>Menage groups</Link><br />

                <div className="w-100" />

                <Link className="col-sm" style={tile} to='/user/createtest'>Create test</Link><br />
                <Link className="col-sm" style={tile} to='/user/testlist'>Your tests</Link><br />
            </div>
        </div>
    )
}

export default TeacherDashboard
