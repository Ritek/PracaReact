import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import decode from 'jwt-decode'

import AddStudents from './AddStudents'
import DeleteStudents from './DeleteStudents'

import ChangeGroupDetails from './ChangeGroupDetails'
import ShowGroupTests from './ShowGroupTests'

function EditGroup({match}) {
    const {id} = decode(sessionStorage.getItem('token'));
    const [group, setGroup] = useState({});
    const [userTests, setUserTests] = useState([]);

    const fetchData = (groupId) => {
        Axios.post('/api/groups/getgroup', {groupId: groupId}).then(res => {
            //console.log('getGroup', res.data);
            setGroup(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const getAllTests = () => {
        Axios.post('/api/tests/gettests', {id: id}).then(res => {
            //console.log("getAllTests", res.data);
            setUserTests(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const addNewTest = (selected) => {
        let groupId = match.params.id;
        Axios.post('/api/groups/addtests', {id: id, groupId: groupId, tests: selected}).then(res => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteTest = (selected) => {
        console.log('del', selected)
        let groupId = match.params.id;
        Axios.post('/api/groups/deletetests', {id: id, groupId: groupId, tests: selected}).then(res => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const groupId = match.params.id;
        fetchData(groupId);
        getAllTests();
    }, []);

    return (
        <div>
            <AddStudents groupId={match.params.id} />
            <DeleteStudents group={group} setGroup={setGroup} />

            { group.name !== undefined && userTests.length !== 0 &&
                <ShowGroupTests fun="add" group={group} setGroup={setGroup} 
                addNewTest={addNewTest} userTests={userTests} do='add'
                />
            }

            {group.name !== undefined && userTests.length !== 0 &&
                <ShowGroupTests fun="delete" group={group} setGroup={setGroup} 
                deleteTest={deleteTest} userTests={userTests} do="delete"
                />
            }


            {group.name !== undefined &&
                <ChangeGroupDetails name={group.name} password={group.password} />
            }  
            
        </div>
    )
}

export default EditGroup
