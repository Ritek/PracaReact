import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

function MenageGroup() {
    const {id} = decode(sessionStorage.getItem('token'));
    const [groups, setGroups] = useState([]);

    const fetchData = () => {
        Axios.post('http://localhost:5000/api/groups/getgroups', {teacherId: id}).then(res => {
            setGroups(res);
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {
                
            }
        </div>
    )
}

export default MenageGroup
