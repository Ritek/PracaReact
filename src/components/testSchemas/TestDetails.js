import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function TestDetails(props) {

    const handleModalClose = () => {
        props.setShowSave(false);
    }

    return (
        <Modal show={props.showSave} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                
                <label htmlFor="testName">Name:</label>
                <input type="text" className="form-control mb-2" id="testName" name="testName" 
                    value={props.name} onChange={(e) => props.changeName(e)}
                />


                <label htmlFor="testTags">Tags:</label>
                <input type="text" className="form-control mb-4" id="testTags" name="testTags" 
                    value={props.tags} onChange={(e) => props.changeTags(e)}
                />

            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-primary mb-4">Save</button>
            </Modal.Footer>
        </Modal>
    )
}
export default TestDetails
