import React, {useState, useEffect, useReducer} from 'react'
import Open from '../testSchemas/open'

import update from 'immutability-helper';

import Modal from 'react-bootstrap/Modal'

function CreateTest() {
    // State
    const [test, setTest] = useState({name: "", questions: []});
    //const forceUpdate = React.useCallback(() => dispatch({}), []);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

    const handleModalClose = (selected) => {
        console.log("got to handle");
        if (selected !== undefined) {
            let obj = {id: test.questions.length, type: selected}
            let arr = [...test.questions];
            arr.push(obj);
            setTest({questions: arr});
        }
        setShowModal(false);
    } 

    const handleChange = (index, object, exType) => {
        let arr = [...test.questions];
        arr[index] = object;
        setTest({questions: arr});
    }

    const handleDelete = (index) => {
        let arr = [...test.questions];
        if (arr.length === 1) arr = [];
        else arr.splice(index, 1);
        setTest({questions: arr});
    }

    const handleReorder = (direction, oldPos) => {
        let newPos;
        if (direction === "up") newPos = oldPos-1;
        else newPos = oldPos+1; 

        if (newPos === -1) newPos = 0;
        if (newPos === test.questions.length) newPos = test.questions.length-1;

        //console.log("oldPos: ", oldPos);
        //console.log("newPos: ", newPos);

        let copyArr = [...test.questions];
        [copyArr[oldPos].id, copyArr[newPos].id] = [copyArr[newPos].id, copyArr[oldPos].id];
        setTest({questions: copyArr});
    }

    useEffect(() => {
        console.log('effect - render');
    }, [test.questions]);

    useEffect(() => {
        console.log('initial state:', test.questions);
    }, []);

    return (
        <div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Header</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>Choose a type of question to add</h3>
                    <div className="row">
                        <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("open")}>Open</button>
                        <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("truefalse")}>True or false</button>
                        <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("blancs")}>Blancs</button>
                        <button className="btn btn-primary col-sm-6 mb-2" onClick={() => handleModalClose("options")}>Options</button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <p>A footer</p>
                </Modal.Footer>
            </Modal>
            <div id="questionList">
            {test.questions !== undefined &&
                test.questions.map((ex, idx) => {
                    if (ex.type === "open") return (
                        <Open key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                })
            }
            </div>
            <button className="btn btn-primary" onClick={handleModalShow}>Add question</button>
        </div>
    )
}

export default CreateTest
