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
        let temp = [...selected];

        if (temp.indexOf(index) === -1) temp.push(index);
        else temp.splice(temp.indexOf(index), 1);

        setSelected(temp);
    }

    const deleteStudents = () => {
        let groupCopy = group.members.slice();
        let newArray = [];
        for (let i=0;i<groupCopy.length;i++) {
            if (!selected.includes(i)) newArray.push(groupCopy[i]);
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
        <div className="card mb-5">
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
                            <tr key={index} style={cross}>
                                <td>{value.email}</td>
                                <td>{value.login}</td>
                                <td><input type="checkbox" onClick={() => addToArray(index)}/></td>
                            </tr>
                        ))
                    } 
                    </tbody>           
                </table>
            </div>
            <button className="btn btn-danger" style={buttonStyle} onClick={() => deleteStudents()} disabled={selected.length > 0 ? false : true}>Delete selected</button>
        </div>
    )
}

export default DeleteStudents
