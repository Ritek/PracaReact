import React, {useState, useEffect} from 'react'
import Axios from 'axios';

import GroupTable from './GroupTable';

function MenageGroup() {
    const [groups, setGroups] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getUserGroups();
    }, []);

    const getUserGroups = () => {
        Axios.post('/api/groups/getgroups').then(res => {
            setGroups(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteGroup = (groupId) => {
        Axios.post('/api/groups/deletegroup', {groupId: groupId}).then(res => {
            getUserGroups();
        }).catch(error => {
            console.log(error);
        });
    }

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
                        <GroupTable key={group._id} value={group} deleteGroup={deleteGroup}/>
                    ))
                }

                {filter !== "" &&
                    groups.map(group => {
                        if (group.name.includes(filter)) return(<GroupTable key={group._id} value={group} deleteGroup={deleteGroup}/>)
                    })
                }
            </ul>
        </div>
    )
}

export default MenageGroup
