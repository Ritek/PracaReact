import React, {useState, useEffect, useRef} from 'react'
import './style.css';

import QuestionTop from './questionParts/QuestionTop'
import QuestionBot from './questionParts/QuestionBot'

import {Draggable} from 'react-beautiful-dnd'
import useQuestions from '../../hooks/useQuestions';

function Open(props) {

    const {handleTextChange, setPoints, state} = useQuestions(props.object, props.exNum, props.handleChange);

/*     const [text, setText] = useState({
        type: "open",
        points: props.object.points || "",
        instruction: props.object.instruction || "", 
        answer: props.object.answer || ""
    });

    const handleTextChange = (event) => {
        setText({...text, [event.target.name]: event.target.value});
    }  */

    /* useEffect(() => {
        //console.log(state);
        props.handleChange(props.exNum, state, "open");
    }, [state]) */


    return (
        <div className="card card-bot">
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints} points={state.points}/>
            
            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <div className="input-group">
                <textarea className="answer" name="answer" onChange={(e) => handleTextChange(e)} 
                placeholder="This is a place for a student's answer" value={state.answer}
                />
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default Open
