import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import Axios from 'axios'
import {Link} from 'react-router-dom'

function AssignedTests() {

    const {id} = decode(sessionStorage.getItem('token'));

    const [list, setList] = useState([]);

    useEffect(() => {
        Axios.post('/api/tests/studenttests', {id: id}).then(res => {
            console.log(res.data);
            setList(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            {list.length !== 0 && list !== undefined &&
                list.map((group, index) => (
                    <div key={index} className="card mb-4">
                        <div className="card-header"><h3>Tests from - {group.groupName}</h3></div>

                        <div className="card-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th style={{width: '20%'}}>Test name</th>
                                        <th style={{width: '60%'}}>Time (min)</th>
                                        <th style={{width: '20%'}}>Solve</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        group.tests.map((test, idx) => (
                                            <tr key={idx}>
                                                <td>{test.name}</td>
                                                <td>{test.time || 'unlimited'}</td>
                                                <td><Link to={`solvetest/${test.id}`} className="btn btn-primary" >Start</Link></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AssignedTests
