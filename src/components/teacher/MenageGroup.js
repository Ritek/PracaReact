import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

import GroupTable from './GroupTable';

function MenageGroup() {
    const {id} = decode(sessionStorage.getItem('token'));
    const [groups, setGroups] = useState([]);

    const deleteStudent = (studentId) => {
        console.log(studentId);
        fetchData();
    }

    const fetchData = () => {
        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/getgroups', {teacherId: id}, {headers: {authToken: token}}).then(res => {
            setGroups(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {
                    groups.map(group => (
                        <GroupTable key={group._id} value={group} buttonFunction={deleteStudent}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default MenageGroup
