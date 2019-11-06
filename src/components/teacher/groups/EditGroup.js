import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import decode from 'jwt-decode'

import AddOrDeleteMembers from './AddOrDeleteMembers'

import ChangeGroupDetails from './ChangeGroupDetails'
import AddOrDeleteTest from './AddOrDeleteTest'

import useCheckForbidden from '../../../hooks/validateCaracters'

function EditGroup({match}) {
    const [group, setGroup] = useState({});
    const [userTests, setUserTests] = useState({inGroup: undefined, notInGroup: undefined});

    const [timeoutActive, setActiveTimeout] = useState(undefined);

    const {filterForbidden} = useCheckForbidden();

    const deleteMembers = (students) => {
        console.log('Delete');
        setGroup({...group, members: students});
    }

    const fetchData = (groupId) => {
        console.log("groupId:", groupId);
        Axios.post('/api/groups/getgroup', {groupId: groupId}).then(res => {
            console.log('getGroup', res.data);
            setGroup(res.data.group);
            setUserTests({inGroup: res.data.inGroup, notInGroup: res.data.notInGroup});
        }).catch(error => {
            console.log(error);
        });
    }

    const addNewTests = (selected) => {
        let groupId = match.params.id;
        Axios.post('/api/groups/addtests', {groupId: groupId, tests: selected}).then(res => {
            //console.log(res);
            //window.location.reload();
            fetchData(groupId);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteTests = (selected) => {
        console.log('del', selected)
        let groupId = match.params.id;
        Axios.post('/api/groups/deletetests', {groupId: groupId, tests: selected}).then(res => {
            fetchData(groupId);
        }).catch(error => {
            console.log(error);
        });
    }

    const updateTestTime = (testId, time) => {
        console.log("update", testId, time);
        let groupId = match.params.id;
        
        let temp = [...userTests.inGroup];
        for (let i=0;i<temp.length;i++) if (temp[i].id === testId) temp[i].time = time

        Axios.post('/api/groups/updatetesttime', {groupId: groupId, testId: testId, time: time}).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
        
        setUserTests({...userTests, inGroup: temp});
    }


    useEffect(() => {
        if (timeoutActive === true) {
            clearTimeout()
        }
    }, [timeoutActive])

    useEffect(() => {
        //console.log('match:', match.params.id);
        fetchData(match.params.id);
    }, []);

    useEffect(() => {
        console.log("userTests", userTests)
    }, [userTests]);

    return (
        <div>
            <AddOrDeleteMembers group={group} deleteMembers={deleteMembers} fetchData={fetchData}/>


            {userTests.inGroup !== undefined && userTests.notInGroup !== undefined &&
                <AddOrDeleteTest userTests={userTests} updateTestTime={updateTestTime}
                    addNewTests={addNewTests} deleteTests={deleteTests}
                />
            }
    

            {group.name !== undefined &&
                <ChangeGroupDetails groupId={group.id} name={group.name} password={group.password} filterForbidden={filterForbidden}/>
            }  
            
        </div>
    )
}

export default EditGroup