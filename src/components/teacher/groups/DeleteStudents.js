import React, {useState} from 'react'
import Axios from 'axios'

function DeleteStudents(props) {

    const cross = {
        textDecoration: 'line-thrue',
    }

    const buttonStyle = {
        minWidth: '150px',
        margin: 'auto',
        marginBottom: '20px',
    }

    const [selected, setSelected] = useState([]);
    const [group, setGroup] = [props.group, props.setGroup];

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
        <div className="card mb-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">email</th>
                        <th scope="col">login</th>
                        <th scope="col">check</th>
                    </tr>
                </thead>
                <tbody>
                {
                    group.members !== undefined && group.members.map((value, index) => (
                        <tr key={index} style={cross}>
                            <td>{value.email}</td>
                            <td>{value.login}</td>
                            <td><input type="checkbox" onClick={() => addToArray(index)}/></td>
                        </tr>
                    ))
                } 
                </tbody>           
            </table>
            <button className="btn btn-danger" style={buttonStyle} onClick={() => deleteStudents()}>Delete selected</button>
        </div>
    )
}

export default DeleteStudents
