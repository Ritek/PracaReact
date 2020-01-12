import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import TestsFromGroup from './TestsFromGroup'

function AssignedTests() {

    const [list, setList] = useState(undefined);

    useEffect(() => {
        Axios.post('/api/tests/studenttests').then(res => {
            console.log(res.data);
            setList(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            {list !== undefined && list.length !== 0 ?
                list.map((group, index) => (
                    <div key={index} className="card" style={{marginBottom: '70px'}}>
                        <div className="card-header"><h3>Tests from - {group[0].groupName}</h3></div>

                        
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
                                        group.map((test, idx) => (
                                            <TestsFromGroup key={idx} test={test}/>
                                        ))
                                    }
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                ))
                :
                <div className="jumbotron">
                    <h1>No test to solve!</h1>
                    <h3>Looks like you have not been been assigned any test.</h3>
                </div>
            }
        </div>
    )
}

export default AssignedTests
