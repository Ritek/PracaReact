import React from 'react'
import {Link} from 'react-router-dom'

function TestsFromGroup(props) {
    return (
        <tr>
            <td>{props.test.testName}</td>
            <td>{props.test.testTime} min</td>
            <td><Link to={`solvetest/${props.test.testId}`} className="btn btn-primary" >Start</Link></td>
        </tr>
    )
}

export default TestsFromGroup
