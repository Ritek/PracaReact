import React from 'react'
import Modal from 'react-bootstrap/Modal'

function TestDetails(props) {

    const handleModalClose = () => {
        props.setShowSave(false);
    }

    return (
        <Modal show={props.showSave} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Save test</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <label htmlFor="testName">Name:</label>
                <input type="text" className="form-control mb-2" id="testName" name="testName" />

                <label htmlFor="testTags">Tags:</label>
                <input type="text" className="form-control mb-4" id="testTags" name="testTags" />
            </Modal.Body>

            <Modal.Footer>
                <p>A footer</p>
            </Modal.Footer>
        </Modal>
    )
}
export default TestDetails
