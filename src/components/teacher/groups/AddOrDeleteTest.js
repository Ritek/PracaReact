import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function AddOrDeleteTest(props) {

    const [tests, setTests] = useState({testsInGroup: [], testsNotInGroup: []});

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    const filterTests = () => {
        let inGroup = [];
        let notInGroup = [];

        for (let i=0;i<props.allTests.length;i++) {
            if (props.groupTests.indexOf(props.allTests[i]._id) !== -1) inGroup.push(props.allTests[i]);
            else notInGroup.push(props.allTests[i]);
        }

        setTests({testsInGroup: inGroup, testsNotInGroup: notInGroup});
    }

    useEffect(() => {
        console.log("!>", props.allTests);
        console.log("!>", props.groupTests);

        filterTests();
    }, [])

    useEffect(() => {
        console.log('Filtered:', tests);
    }, [tests])

    const showTestsModal = () => {

    }

    return (
        <div className="card mb-4">

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select tests to add</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>cos</th>
                                <th>cos</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Cos</td>
                                <td>Cos</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>

            <div className="card-header">
                New add or delete
            </div>

            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>cos</th>
                            <th>cos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tests.testsInGroup.map((test, index) => (
                                <tr key={index}>
                                    <th>{test.name}</th>
                                    <th>{test.name}</th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="card-footer text-right">
                <button className="btn btn-primary mr-2" onClick={() => handleShow()}>Add test</button>
                <button className="btn btn-danger">Delete selected</button>
            </div>
            
        </div>
    )
}

export default AddOrDeleteTest
