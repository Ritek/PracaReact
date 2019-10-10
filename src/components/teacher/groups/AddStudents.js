import React, {useState} from 'react'
import Axios from 'axios'

function AddStudents(props) {

    const [textArea, setTextArea] = useState("");

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

        window.location.reload(false);

        let token = sessionStorage.getItem('token');
        Axios.post('/api/groups/addmembers', {groupId: props.groupId, members: arr}, {headers: {authToken: token}}).then(res => {
            console.log(res);
            clearTextArea();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card mb-5 mt-5">
            <div className="card-header">Add new students by email</div>
            <div className="card-body">
                <textarea style={{width: '100%'}} value={textArea} onChange={(e) => handleTextArea(e)}>

                </textarea> 
                <button className="btn btn-primary" onClick={() => addStudent()}>Add students</button>
            </div>
            <div className="card-footer">
                TIP! You can add multiple students by entering each in seperete line.<br />
                Do not use punctuation marks after emails!
            </div>
        </div>
    )
}

export default AddStudents
