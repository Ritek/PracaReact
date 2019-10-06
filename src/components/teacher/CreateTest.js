import React, {useState, useEffect, useReducer} from 'react'

import Open from '../testSchemas/open'
import TrueFalse from '../testSchemas/TrueFalse'
import Choices from '../testSchemas/Choices'
import Blanks from '../testSchemas/Blanks'

import ModalTest from './ModalTest'

import Axios from 'axios'

import update from 'immutability-helper';

//import useDND from '../../hooks/useDND'

function CreateTest(props) {
    // State
    const [test, setTest] = useState({
        name: "", 
        questions: []
    });
    //const forceUpdate = React.useCallback(() => dispatch({}), []);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);

    const handleChange = (index, object, exType) => {
        let arr = [...test.questions];
        arr[index] = object;
        setTest({questions: arr});
    }

    const setTestName = (event) => {
        setTest({...test, name: event.target.value})
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

        //console.log("oldPos: ", oldPos);
        //console.log("newPos: ", newPos);

        let copyArr = [...test.questions];
        //[copyArr[oldPos].id, copyArr[newPos].id] = [copyArr[newPos].id, copyArr[oldPos].id];
        //[copyArr[oldPos].type, copyArr[newPos].type] = [copyArr[newPos].type, copyArr[oldPos].type];

        [copyArr[oldPos], copyArr[newPos]] = [copyArr[newPos], copyArr[oldPos]];
        /* let temp = copyArr[oldPos];
        copyArr[oldPos] = copyArr[newPos];
        copyArr[newPos] = temp; */
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

            <div className="card">
                <div className="card-body">
                    <input type="text" onChange={(e) => setTestName(e)} placeholder="Test name" />
                </div>
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
