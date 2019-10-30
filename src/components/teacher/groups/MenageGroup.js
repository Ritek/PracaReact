import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import decode from 'jwt-decode';

import GroupTable from './GroupTable';

function MenageGroup() {
    const {id} = decode(sessionStorage.getItem('token'));
    const [groups, setGroups] = useState([]);
    const [filter, setFilter] = useState("");

    const deleteStudent = (studentId) => {
        console.log(studentId);
    }

    useEffect(() => {
        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/getgroups', {teacherId: id}, {headers: {authToken: token}}).then(res => {
            setGroups(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3>Filter by name</h3>
                    <div className="input-group">
                        <input type="text" className="form-control" value={filter} onChange={(e) => handleFilter(e)} />
                    </div>
                </div>
            </div>

            <ul>
                {filter === "" &&
                    groups.map(group => (
                        <GroupTable key={group._id} value={group} />
                    ))
                }

                {filter !== "" &&
                    groups.map(group => {
                        if (group.name.includes(filter)) return(<GroupTable key={group._id} value={group} />)
                    })
                }
            </ul>
        </div>
    )
}

export default MenageGroup
