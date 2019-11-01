import React, {useState} from 'react'
import Axios from 'axios'


import AddStudents from './AddStudents'

function AddOrDeleteMembers(props) {

    const [selected, setSelected] = useState([]);
    const [group, setGroup] = [props.group, props.setGroup];

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const addToArray = (index) => {
        let temp = [...selected];

        if (temp.indexOf(index) === -1) temp.push(index);
        else temp.splice(temp.indexOf(index), 1);

        setSelected(temp);
    }

    const deleteStudents = () => {
        let groupCopy = [...group.members];
        let newArray = [];
        for (let i=0;i<groupCopy.length;i++) {
            if (selected.indexOf(groupCopy[i]) === -1) newArray.push(groupCopy[i]);
        }

        console.log(newArray);

        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/deletemembers', {groupId: group._id, members: newArray}, {headers: {authToken: token}}).then(res => {
            console.log(res);
            props.deleteMembers(newArray);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card mb-4">
            <AddStudents showModal={showModal} handleClose={handleClose} groupId={group._id}/>  

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
                            <tr key={index}>
                                <td>{value.email}</td>
                                <td>{value.login}</td>
                                <td><input type="checkbox" onClick={() => addToArray(index)}/></td>
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
