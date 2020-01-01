import React from 'react'
import Modal from 'react-bootstrap/Modal'

function AddTestsModal(props) {
    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select tests to add</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                {props.tests !== undefined &&
                    props.tests.notInGroup !== undefined && props.tests.notInGroup.length > 0 &&
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Tags</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {props.tests.notInGroup !== undefined &&
                                props.tests.notInGroup.map((test, index) => (
                                    <tr key={index}>
                                        <td>{test.name}</td>
                                        <td>{test.tags.join()}</td>
                                        <td><input type="checkbox" onClick={() => props.addNewTests(test._id)}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

                {props.tests !== undefined &&
                    props.tests.notInGroup !== undefined && props.tests.notInGroup.length === 0 &&
                    <div className="jumbotron">
                        <h3>All your tests are already assigned to this group.</h3>
                    </div>
                }
            </Modal.Body>

            {
                props.tests.notInGroup !== undefined && props.tests.notInGroup.length > 0 &&
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => props.handleClose(true)}>Add selected</button>
                </Modal.Footer>
            }
        </Modal>
    )
}

export default AddTestsModal
