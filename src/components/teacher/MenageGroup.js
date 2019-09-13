import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

import GroupTable from './GroupTable';

function MenageGroup() {
    const {id} = decode(sessionStorage.getItem('token'));
    const [groups, setGroups] = useState([]);

    const fetchData = () => {
        Axios.post('http://localhost:5000/api/groups/getgroups', {teacherId: id}).then(res => {
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
                        <GroupTable key={group._id} value={group}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default MenageGroup
