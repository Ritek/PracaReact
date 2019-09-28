import React, {useState, useEffect, useReducer} from 'react'
import Open from '../testSchemas/Open'

import update from 'immutability-helper';

import Modal from 'react-bootstrap/Modal'
export const ExerciseContext = React.createContext();

const reducer = (exercises, action) => {
    switch (action.type) {
        case 'addQuestion': 
            {
                let obj = {type: action.questionType}
                let arr = [...exercises];
                arr.push(obj);
                return arr;
            }
        case 'deleteQuestion':
            {
                let arr = [...exercises];
                arr.splice(action.index, 1);
                return arr;
            }
        case 'changeState':
                {
                    let arr = [...exercises];
                    arr[action.index] = action.object;
                    return arr;
                }
    }
}

function CreateTest() {

    const [exercises, dispatch] = useReducer(reducer, []);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

    const handleModalClose = (selected) => {
        console.log("got to handle");
        if (selected !== undefined) {
            console.log("option:", selected);
            dispatch({type: "addQuestion", questionType: selected});
        }
        setShowModal(false);
    } 

    const handleChange = (index, object, exType) => {
        console.log(index);
        console.log(object);

        dispatch({type: "changeState", object: object, index: index});
    }

    const handleDelete = (index) => {
        console.log(`Delete question ${index}`);
        dispatch({type: 'deleteQuestion', index: index});
    }

    useEffect(() => {
        console.log(exercises);
    }, [exercises])

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

            {
                exercises.map((ex, idx) => {
                    if (ex.type === "open") return (
                        <Open key={idx} exNum={idx} handleChange={handleChange} handleDelete={handleDelete}/>
                    )
                })
            }
            <button className="btn btn-primary" onClick={handleModalShow}>Add question</button>
        </div>
    )
}

export default CreateTest
