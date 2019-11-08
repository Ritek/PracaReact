import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function ChangeTimeModal(props) {

    const [time, setTime] = useState(props.testInfo.time);

    const handleClose = () => {
        props.closeTimeModal();
        props.updateTestTime(props.testInfo.id, time);
    }

    const handleTimeChange = (value) => {
        setTime(value);
    }

    useEffect(() => {
        console.log('time', time);
    }, [time])

    return (
        <Modal show={props.show} onHide={props.closeTimeModal} size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Change time for solving test</Modal.Title>
            </Modal.Header>

            <Modal.Body className="input-group">
                <div className="input-group">
                    Enter time students will have to solve the test. (In minutes)
                </div>


                <input type="text" className="form-control" value={time} 
                    onChange={(e) => handleTimeChange(e.target.value)}
                />
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => handleClose()}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeTimeModal
