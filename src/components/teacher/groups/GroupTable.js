import React from 'react'
import {Link} from 'react-router-dom';

function GroupTable(props) {

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


            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '50%'}}>Student email</th>
                            <th scope="col" style={{width: '50%'}}>Student login</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.value.members !== undefined ?
                            props.value.members.map((value, index) => {
                            return <tr key={index}>
                                <td>{value[2]}</td>
                                <td>{value[1]}</td>
                            </tr>
                        }) :
                        <tr>
                            <th colSpan="2">No students assigned to the group</th>
                        </tr>
                        }
                    </tbody>
                </table>
                
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '50%'}}>Test name</th>
                            <th scope="col" style={{width: '50%'}}>Test password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.value.tests.length !== 0 ? 
                            props.value.tests.map((value, index) => (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.password}</td>
                            </tr>
                            )) : 
                            <tr>
                                <th colSpan="2">There are no tests assigned to this group</th>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GroupTable
