import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import decode from 'jwt-decode'

import DeleteStudents from './AddOrDeleteMembers'

import ChangeGroupDetails from './ChangeGroupDetails'
import ShowGroupTests from './ShowGroupTests'
import AddOrDeleteTest from './AddOrDeleteTest'

import useCheckForbidden from '../../../hooks/validateCaracters'

function EditGroup({match}) {
    const {id} = decode(sessionStorage.getItem('token'));
    const [group, setGroup] = useState({});
    const [userTests, setUserTests] = useState(undefined);

    const {filterForbidden} = useCheckForbidden();

    const deleteMembers = (students) => {
        console.log('Delete');
        setGroup({...group, members: students});
    }

    const fetchData = (groupId) => {
        console.log("groupId:", groupId);
        Axios.post('/api/groups/getgroup', {groupId: groupId}).then(res => {
            console.log('!!!getGroup', res.data);
            setGroup(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const getAllTests = () => {
        Axios.post('/api/tests/gettests', {id: id}).then(res => {
            console.log("getAllTests", res.data);
            setUserTests(res.data.userTests);
        }).catch(error => {
            console.log(error);
        });
    }

    const addNewTests = (selected) => {
        let groupId = match.params.id;
        Axios.post('/api/groups/addtests', {groupId: groupId, tests: selected}).then(res => {
            //console.log(res);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteTests = (selected) => {
        console.log('del', selected)
        let groupId = match.params.id;
        Axios.post('/api/groups/deletetests', {groupId: groupId, tests: selected}).then(res => {
            //console.log(res);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        console.log('match:', match.params.id);
        fetchData(match.params.id);
        getAllTests();
    }, []);

    return (
        <div>
            <DeleteStudents group={group} deleteMembers={deleteMembers} />


            {userTests !== undefined &&
                <AddOrDeleteTest allTests={userTests} groupTests={group.tests} 
                    addNewTests={addNewTests} deleteTests={deleteTests}
                />
            }
    

            {group.name !== undefined &&
                <ChangeGroupDetails name={group.name} password={group.password} filterForbidden={filterForbidden}/>
            }  
            
        </div>
    )
}

export default EditGroup