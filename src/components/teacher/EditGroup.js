import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function EditGroup({match}) {

    const newStudents = {
        width: '100%',
    }

    const newStudentBox = {
        marginBottom: '100px',
    }

    const cross = {
        textDecoration: 'line-thrue',
    }

    const buttonStyle = {
        minWidth: '150px',
        margin: 'auto',
        marginBottom: '20px',
    }

    const [group, setGroup] = useState({}) 
    const [selected, setSelected] = useState([]);
    const [textArea, setTextArea] = useState("");

    const fetchData = (groupId) => {
        Axios.post('/api/groups/getgroup', {groupId: groupId}).then(res => {
            setGroup(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const addToArray = (index) => {
        let idx = selected.indexOf(index);
        if (idx === -1) {
            console.log('added');
            setSelected([...selected, index]);
        } else {
            console.log('deleted');
            let newState = [...selected];
            newState.splice(idx, 1);
            setSelected(newState);
        }
    }

    useEffect(() => {
        const groupId = match.params.id;
        fetchData(groupId);
    }, [])

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const clearTextArea = () => {
        console.log('Clear');
        setTextArea("");
    }

    const handleTextArea = (event) => {
        setTextArea(event.target.value);
    }

    const addStudent = () => {
        console.log("state:", textArea);
        const arr = textArea.split("\n");

        console.log(arr);

        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/addmembers', {groupId: group._id, members: arr}, {headers: {authToken: token}}).then(res => {
            console.log(res);
            clearTextArea();
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteStudents = () => {
        console.log('OK');

        let groupCopy = group.members.slice();
        let newArray = [];
        for (let i=0;i<groupCopy.length;i++) {
            if (!selected.includes(i)) newArray.push(groupCopy[i]);
        }
        
        console.log(newArray);

        let cos = group;
        cos.members = newArray;
        console.log(cos);
        setGroup(cos);

        window.location.reload(false);

        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/deletemembers', {groupId: group._id, members: newArray}, {headers: {authToken: token}}).then(res => {
            console.log(res);
            let groupCopy = group;
            groupCopy.members = newArray;
            console.log(groupCopy);
            setGroup(groupCopy);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="card" style={newStudentBox}>
                <div className="card-header">Add new students by email</div>
                <div className="card-body">
                    <textarea style={newStudents} value={textArea} onChange={(e) => handleTextArea(e)}>

                    </textarea> 
                    <button className="btn btn-primary" onClick={() => addStudent()}>Add students</button>
                </div>
                <div className="card-footer">
                    TIP! You can add multiple students by entering each in seperete line.<br />
                    Do not use punctuation marks!
                </div>
            </div>


            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">login</th>
                            <th scope="col">email</th>
                            <th scope="col">check</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        group.members !== undefined && group.members.map((value, index) => (
                            <tr key={index} style={cross}>
                                <td>{value[1]}</td>
                                <td>{value[2]}</td>
                                <td><input type="checkbox" onClick={() => addToArray(index)}/></td>
                            </tr>
                        ))
                    } 
                    </tbody>           
                </table>
                <button className="btn btn-danger" style={buttonStyle} onClick={() => deleteStudents()}>Delete selected</button>
            </div>
        </div>
    )
}

export default EditGroup
