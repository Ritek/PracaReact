import React, {useState, useEffect, useReducer} from 'react'

import Open from '../testSchemas/open'
import TrueFalse from '../testSchemas/TrueFalse'
import Choices from '../testSchemas/Choices'
import Blanks from '../testSchemas/Blanks'

import TestDetails from '../testSchemas/TestDetails'
import ModalTest from '../testSchemas/ModalTest'

import Axios from 'axios'

import update from 'immutability-helper';

//import useDND from '../../hooks/useDND'

function CreateTest(props) {
    // State
    const [test, setTest] = useState({
        name: "", 
        tags: "",
        questions: []
    });
    //const forceUpdate = React.useCallback(() => dispatch({}), []);

    // Modal
    const [showSave, setShowSave] = useState(false);
    const handleShowSave = () => setShowSave(true);

    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

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
        // to do dodaj zegarek
        // zabezpiecz przed printscreen
        // informacja zwriotna
        // automatyczny przyznawanie punktów
        // 
        if (newPos === -1) newPos = 0;
        if (newPos === test.questions.length) newPos = test.questions.length-1;

        let copyArr = [...test.questions];

        [copyArr[oldPos], copyArr[newPos]] = [copyArr[newPos], copyArr[oldPos]];
        setTest({questions: copyArr});
    }

    const getInitial = () => {
        setTest({name: "init name", questions: [
            {id: "0", points: "1", type: "open", instruction: "init instruction", answer: "answer init"},
            {answer: "BBB", choices: ["AAA", "BBB"], id: "1", instruction: "Choices init", points: "3", type: "choices"},
            {id: "2", type: "truefalse",  instruction: "Ex1", points: "1", subquestions: [["sub 1", "True"], ["sub 2", "False"], ["sub 3", "True"]]},
            {blanks: ["are", "becouse", "dnd"], id: 3, instruction: "blancs instr", points: "1", sentences: ["blancs [are] dope [becouse] of [dnd]"], type: "blancs"}
        ]})
    }

    useEffect(() => {
        console.log(test.questions);
    }, [test.questions]);

    useEffect(() => {
        if (props.test !== undefined) setTest(props.test);
    }, []);

    return (
        <div>
            <ModalTest test={test} setTest={setTest} showModal={showModal} handleModalShow={handleModalShow} setShowModal={setShowModal}/>
            <TestDetails showSave={showSave} setShowSave={setShowSave} handleShowSave={handleShowSave} />

            <div className="card mb-5">
                <button className="btn btn-primary" onClick={() => setShowSave(true)}>Save</button>
            </div>

            <div id="questionList">
            {test.questions !== undefined &&
                test.questions.map((ex, idx) => {
                    if (ex.type === "open") return (
                        <Open key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "truefalse") return (
                        <TrueFalse key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "choices") return (
                        <Choices key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                    else if (ex.type === "blancs") return (
                        <Blanks key={ex.id} exNum={idx} handleChange={handleChange} handleDelete={handleDelete} handleReorder={handleReorder} object={test.questions[idx]}/>
                    )
                })
            }
            </div>
            <button className="btn btn-primary" onClick={handleModalShow}>Add question</button>
            <br />
            <button onClick={() => getInitial()}>Get initial</button>
        </div>
    )
}

export default CreateTest
