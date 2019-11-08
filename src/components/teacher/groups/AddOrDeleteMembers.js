import React, {useState, useEffect} from 'react'
import Axios from 'axios'


import AddStudents from './AddStudents'

function AddOrDeleteMembers(props) {

    const [selected, setSelected] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [group, setGroup] = [props.group, props.setGroup];

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const addToArray = (index) => {
        let temp = [...selected];

        if (temp.indexOf(index) === -1) temp.push(index);
        else temp.splice(temp.indexOf(index), 1);

        console.log(temp);

        setSelected(temp);
    }

    const deleteStudents = () => {
        let groupCopy = [...group.members];
        let newArray = [];
        for (let i=0;i<groupCopy.length;i++) {
            if (selected.indexOf(i) === -1) newArray.push(groupCopy[i]);
        } 
        console.log("newArray", newArray);

        Axios.post('/api/groups/deletemembers', {groupId: props.group._id, members: newArray}).then(res => {
            console.log(res);
            setSelected([]);
            props.deleteMembers(newArray);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card mb-4">
            <AddStudents showModal={showModal} handleClose={handleClose} groupId={group._id} fetchData={props.fetchData}/>  

            <div className="card-header">
                <h3>Students in group</h3>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">email</th>
                            <th scope="col">login</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        group.members !== undefined && group.members.map((value, index) => (
                            <tr key={value.id}>
                                <td>{value.email}</td>
                                <td>{value.login}</td>
                                <td><input type="checkbox" checked={checkboxes[index]} onClick={() => addToArray(index)}/></td>
                            </tr>
                        ))
                    } 
                    </tbody>           
                </table>
            </div>
            <div className="card-footer text-right">
                <button className="btn btn-primary mr-2" onClick={() => handleShow()}>Add students</button>
                <button className="btn btn-danger" onClick={() => deleteStudents()} disabled={selected.length > 0 ? false : true}>Delete selected</button>
            </div>
        </div>
    )
}

export default AddOrDeleteMembers
