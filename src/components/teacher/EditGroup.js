import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import AddStudents from './AddStudents'
import DeleteStudents from './DeleteStudents'
import ChangeGroupDetails from './ChangeGroupDetails'

function EditGroup({match}) {

    const [group, setGroup] = useState({}) 

    const fetchData = (groupId) => {
        Axios.post('/api/groups/getgroup', {groupId: groupId}).then(res => {
            setGroup(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const groupId = match.params.id;
        fetchData(groupId);
    }, []);

    return (
        <div>
            <AddStudents groupId={match.params.id} />

            <DeleteStudents group={group} setGroup={setGroup} />

            {group.name !== undefined &&
                <ChangeGroupDetails name={group.name} password={group.password} />
            }

            
            
        </div>
    )
}

export default EditGroup
