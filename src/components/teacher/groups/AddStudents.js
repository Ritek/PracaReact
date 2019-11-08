import React, {useState} from 'react'
import Axios from 'axios'

import Modal from 'react-bootstrap/Modal'

function AddStudents(props) {

    const [textArea, setTextArea] = useState("");

    const clearAndClose = () => {
        setTextArea("");
        props.handleClose();
    }

    const handleTextChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`
        setTextArea(event.target.value);
    } 

    const addStudent = () => {
        const arr = textArea.split("\n");
        //console.log(arr);
        console.log('groupId', props.groupId);

        Axios.post('/api/groups/addmembers', {groupId: props.groupId, members: arr}).then(res => {
            //console.log('res:', res);
            props.fetchData(props.groupId);
            clearAndClose();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Modal show={props.showModal} onHide={clearAndClose} /* dialogClassName={myModal} */>
            <Modal.Header closeButton>
                <Modal.Title>Add new students by email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <textarea style={{width: '100%'}} value={textArea} onChange={(e) => handleTextChange(e)}>
                    </textarea> 
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => addStudent()}>Add students</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddStudents