import React, {useState, useEffect, useReducer} from 'react'
import Open from '../testSchemas/Open'

import update from 'immutability-helper';

import Modal from 'react-bootstrap/Modal'
//import {Droppable, DragDropContext} from 'react-beautiful-dnd';
import Dragula from 'react-dragula';
import './dragula.css'

//import useDND from '../../hooks/useDND'

const reducer = (exercises, action) => {
    switch (action.type) {
        case 'addQuestion': 
            {
                let obj = {id: action.id, type: action.questionType}
                let arr = [...exercises];
                arr.push(obj);
                return arr;
            }
        case 'deleteQuestion':
            {
                let arr = [...exercises];
                if (arr.length === 1) arr = [];
                else arr.splice(action.index, 1);
                return arr;
            }
        case 'changeState':
            {
                let arr = [...exercises];
                arr[action.index] = action.object;
                return arr;
            }
        case 'handleReorder':
            {
                let arrCopy = [...exercises];
                [arrCopy[action.oldPos], arrCopy[action.newPos]] = [arrCopy[action.newPos], arrCopy[action.oldPos]]; //ES6 swap
                //[arrCopy[action.oldPos].id, arrCopy[action.newPos].id] = [arrCopy[action.newPos].id, arrCopy[action.oldPos].id];
                //console.log("new", arrCopy);
                return arrCopy;
            }
    }
}

function CreateTest() {

    // State
    const [exercises, dispatch] = useReducer(reducer, []);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

    const handleModalClose = (selected) => {
        console.log("got to handle");
        if (selected !== undefined) dispatch({type: "addQuestion", questionType: selected, id: exercises.length});
        setShowModal(false);
    } 

    const handleChange = (index, object, exType) => {
        dispatch({type: "changeState", object: object, index: index});
    }

    const handleDelete = (index) => {
        //console.log(`Delete question ${index}`);
        dispatch({type: 'deleteQuestion', index: index});
    }

/*     useEffect(() => {
        console.log("exercises effect", exercises);
    }, [exercises]) */

    const dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = { };
            let drake = Dragula([document.querySelector('#questionList')], options);
            drake.on('drop', function(el, target, source, sybling) {
                let newPos, oldPos = el.id;

                console.log(sybling);
                if (sybling === null) newPos = target.childNodes.length-1;
                else {
                    if (newPos === undefined) newPos = 0;
                }

                //if (newPos === undefined) newPos = 0;

                console.log('oldPos:', oldPos);
                console.log('newPos:', newPos);

                //dispatch({type: 'handleReorder', oldPos: oldPos, newPos: newPos});
            });
        }
    }

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

            <div id="questionList" ref={dragulaDecorator} style={{marginBottom: "40px"}}>
                {
                    exercises.map((ex, idx) => {
                        if (ex.type === "open") return (
                            <Open key={idx} id={idx} exNum={ex.id} handleChange={handleChange} handleDelete={handleDelete} object={exercises[idx]}/>
                        )
                    })
                }
            </div>

            <button className="btn btn-primary" onClick={handleModalShow}>Add question</button>
        </div>
    )
}

export default CreateTest
