import React, {useState, useEffect} from 'react'
import AddTestsModal from './AddTestsModal'
import ChangeTimeModal from './ChangeTimeModal'

function AddOrDeleteTest(props) {

    const [tests, setTests] = useState({inGroup: [], notInGroup: []});

    const [addSelect, setAddSelect] = useState([]);
    const [delSelect, setDelSelect] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = (logic) => {
        if (logic === true) props.addNewTests(addSelect)
        setShowModal(false);
    }

    const [timeModal, setTimeModal] = useState(false);
    const showTimeModal = (id, time) => {
        setTimeInfo({id: id, time: time});
        setTimeModal(true);
    }
    const closeTimeModal = () => setTimeModal(false);

    const [timeInfo, setTimeInfo] = useState({id: undefined, time: undefined});

    useEffect(() => {
        console.log("props.allTests", props.userTests.inGroup);
        console.log("props.groupTests", props.userTests.notInGroup);
    }, [])

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
        console.log('!', props.userTests);
        setTests(props.userTests);
    }, [props.userTests])

    useEffect(() => {
        setAddSelect([]);
    }, [showModal])

    useEffect(() => {
        console.log('New tests:', addSelect);
    }, [addSelect])

    useEffect(() => {
        console.log('Del tests:', delSelect);
    }, [delSelect])

    useEffect(() => {
        console.log('timeId', timeInfo);
    }, [timeInfo])

    return (
        <div className="card mb-4">

            <AddTestsModal tests={tests} showModal={showModal} handleClose={handleClose} 
                addNewTests={addNewTests}
            />

            {timeInfo.time !== undefined &&
                <ChangeTimeModal show={timeModal} closeTimeModal={closeTimeModal} 
                    updateTestTime={props.updateTestTime} testInfo={timeInfo}
                />
            }

            <div className="card-header">
                <h3>Add or delete tests</h3>
            </div>

            <div className="card-body">
                {tests.inGroup.length > 0 ?
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Tags</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tests.inGroup.map((test, index) => (
                                    <tr key={test.id}>
                                        <th>{test.name}</th>
                                        <th>{test.tags}</th>
                                        <th><button className="btn btn-primary" onClick={() => showTimeModal(test.id, test.time)}>{test.time} m</button></th>
                                        <th><input type="checkbox" onClick={() => delSelectedTests(test.id)}></input></th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div className="jumbotron">
                        <h3>Group has no tests assigned.</h3>
                    </div>
                }
                
            </div>

            <div className="card-footer text-right">
                <button className="btn btn-primary mr-2" onClick={() => handleShow()}>Add test</button>

                <button className="btn btn-danger" onClick={() => props.deleteTests(delSelect)} 
                    disabled={delSelect.length > 0 ? false : true}>Delete selected
                </button>
            </div>
            
        </div>
    )
}

export default AddOrDeleteTest
