import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

function CheckGraded() {
    const [tests, setTests] = useState();
    const [filter, setFilter] = useState("");

    const handleFilter = (value) => {
        setFilter(value);
    }

    useEffect(() => {
        Axios.post('/api/tests/studentsolved').then(res => {
            console.log("res:", res.data);
            setTests(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <div className="mb-5">
                <h2>Those tests were graded</h2>
            </div>

            <div className="mb-5">
                <div className="input-group card-body">
                    <input className="form-control" placeholder="enter name to filter" onChange={(e) => handleFilter(e.target.value)}></input>
                </div>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Test name</th>
                            <th>Group name</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {tests !== undefined &&
                            tests.map((test, idx) => (
                                test.name.includes(filter) &&
                                <tr key={idx}>
                                    <td>{test.name}</td>
                                    <td>{test.groupName}</td>
                                    <td>{test.time}m</td>
                                    <td><Link className="btn btn-primary" to={'/user/checkgraded/'+test._id}>Check</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CheckGraded
