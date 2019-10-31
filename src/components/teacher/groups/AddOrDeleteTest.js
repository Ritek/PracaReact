import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

function AddOrDeleteTest(props) {

    const [tests, setTests] = useState({testsInGroup: [], testsNotInGroup: []});

    const [addSelect, setAddSelect] = useState([]);
    const [delSelect, setDelSelect] = useState([]);

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

    const addNewTests = (id) => {
        let temp = [...addSelect];

        if (temp.indexOf(id) === -1) temp.push(id);
        else temp.splice(temp.indexOf(id), 1);
        
        setAddSelect(temp);
    }

    const delSelectedTests = (id) => {
        let temp = [...delSelect];
        console.log('len', temp.length);

        if (temp.indexOf(id) === -1) temp.push(id);
        else temp.splice(temp.indexOf(id), 1);

        setDelSelect(temp);
    }

    useEffect(() => {
        setAddSelect([]);
    }, [showModal])

    useEffect(() => {
        console.log('New tests:', addSelect);
    }, [addSelect])

    useEffect(() => {
        console.log('Del tests:', delSelect);
    }, [delSelect])

    const myModal = {
        maxHeight: '80%',
    }

    return (
        <div className="card mb-4">

            <Modal show={showModal} onHide={handleClose} dialogClassName={myModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Select tests to add</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Tags</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {tests.testsNotInGroup !== undefined &&
                                tests.testsNotInGroup.map((test, index) => (
                                    <tr key={index}>
                                        <td>{test.name}</td>
                                        <td>{test.tags.join()}</td>
                                        <td><input type="checkbox" onClick={() => addNewTests(test._id)}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => props.addNewTests(addSelect)}>Add selected</button>
                </Modal.Footer>
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
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tests.testsInGroup.map((test, index) => (
                                <tr key={index}>
                                    <th>{test.name}</th>
                                    <th>{test.name}</th>
                                    <th><input type="checkbox" onClick={() => delSelectedTests(test._id)}></input></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="card-footer text-right">
                <button className="btn btn-primary mr-2" onClick={() => handleShow()}>Add test</button>
                <button className="btn btn-danger" onClick={() => props.deleteTests(delSelect)} disabled={delSelect.length > 0 ? false : true}>Delete selected</button>
            </div>
            
        </div>
    )
}

export default AddOrDeleteTest
