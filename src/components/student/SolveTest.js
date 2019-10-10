import React, {useState, useEffect} from 'react'
import decode from 'jwt-decode'
import Axios from 'axios'

function SolveTest() {
    const {id} = decode(sessionStorage.getItem('token'));

    const [list, setList] = useState([]);

    useEffect(() => {
        console.log(id);
        Axios.post('/api/tests/studenttests', {id: id}).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            <h1>Assigned tests</h1>
        </div>
    )
}

export default SolveTest
