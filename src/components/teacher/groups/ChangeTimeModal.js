import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function ChangeTimeModal(props) {

    const [time, setTime] = useState({time: props.testInfo.time, autoCheck: props.testInfo.autoCheck});

    const handleClose = () => {
        props.closeTimeModal();
        props.updateTestTime(props.testInfo.id, time.time, time.autoCheck);
    }

    const handleTimeChange = (event) => {
        console.log(event.target.value);
        if (event.target.name === "autoCheck") {
            let temp;
            if (event.target.value === "true") temp = true;
            else temp = false;
            setTime({...time, autoCheck: temp});
        }
        else setTime({...time, [event.target.name]: event.target.value});
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


                <div className="input-group">
                    <input type="text" name="time" className="form-control mb-3" placeholder={props.testInfo.time}
                        onChange={(e) => handleTimeChange(e)}
                    />
                </div>

                
                <div className="input-group">
                    <label htmlFor="autocheck" className="form-check-label mr-1">Use expermiental autocheck</label>
                    <select id="autocheck" name="autoCheck" onChange={(e) => handleTimeChange(e)}>
                        {props.testInfo.autoCheck === true ?
                            <>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </>
                            :
                            <>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </>
                        }
                    </select>
                </div>
                
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => handleClose()}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeTimeModal
