import React, {useState} from 'react'
import '../../../src/App.css'
import {Link} from 'react-router-dom';

function GroupTable(props) {

    const addStudentButton = {
        backgroundColor: "Transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        overflow: "hidden",

        height: "100%",
        width: "100%",
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col sm">Name: {props.value.name} <br />Password: {props.value.password}</div>
                    <div className="col sm text-right">
                        <button className="btn btn-danger mr-1">Delete</button>
                        <Link to={`menagegroups/${props.value._id}`} className="btn btn-primary" >Edit</Link>
                    </div>
                </div>
            </div>
            <table className="card-body table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Student email</th>
                        <th scope="col">Student login</th>
                    </tr>
                </thead>

                <tbody>
                    {props.value.members.map((value, index) => {
                        return <tr key={index}>
                            <td>{value[2]}</td>
                            <td>{value[1]}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="card-footer">
                <button style={addStudentButton}>Add student</button>
            </div>
        </div>
    )
}

export default GroupTable
