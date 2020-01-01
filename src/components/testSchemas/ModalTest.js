import React from 'react'
import Modal from 'react-bootstrap/Modal'

function ModalTest(props) {

    const handleModalClose = (selected) => {
        if (selected !== undefined) {
            let obj = {id: props.test.questions.length, type: selected, points: ""}
            let arr = [...props.test.questions];
            arr.push(obj);
            props.setTest({...props.test, questions: arr});
        }
        props.setShowModal(false);
    }

    return (
        <Modal show={props.showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add question</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3>Choose a type of question to add</h3>
                <div className="row" style={{padding: '10px'}}>
                    <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("open")}>Open</button>
                    <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("truefalse")}>True or false</button>
                    <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("blanks")}>Blanks</button>
                    <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("choices")}>Choices</button>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <p>Click on blue button to add question.</p>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalTest
