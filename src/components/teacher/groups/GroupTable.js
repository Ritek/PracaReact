import React from 'react'
import {Link} from 'react-router-dom';

function GroupTable(props) {

    return (
        <div className="card mb-5">
            <div className="card-header">
                <div className="row">
                    <div className="col sm">Name: {props.value.name} <br />Password: {props.value.password}</div>
                    <div className="col sm text-right">
                        <button className="btn btn-danger mr-1">Delete</button>
                        <Link to={`menagegroups/${props.value._id}`} className="btn btn-primary" >Edit</Link>
                    </div>
                </div>
            </div>


            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '50%'}}>Student email</th>
                            <th scope="col" style={{width: '50%'}}>Student login</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.value.members.length !== 0 ?
                            props.value.members.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.email}</td>
                                <td>{value.login}</td>
                            </tr>
                        }) :
                        <tr>
                            <th colSpan="2">No students assigned to the group</th>
                        </tr>
                        }
                    </tbody>
                </table>
                
                {props.value.tests.length === 0 &&
                    <p>There are currently no tests added to the group!</p>
                }
                {props.value.tests.length === 1 &&
                    <p>One test added to the group!</p>
                }
                {props.value.tests.length > 1 &&
                    <p>{props.value.length} added to the group!</p>
                }
            </div>
        </div>
    )
}

export default GroupTable
