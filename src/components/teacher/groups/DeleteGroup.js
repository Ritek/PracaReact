import React from 'react'
import Modal from 'react-bootstrap/Modal'

function DeleteGroup(props) {
    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                If you click yes the group will be permanently deleted. 
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-success" onClick={() => props.handleCloseModal()}>No</button>
                <button className="btn btn-danger" onClick={() => props.deleteGroup()}>Yes</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteGroup
