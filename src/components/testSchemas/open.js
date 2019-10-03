import React, {useState, useEffect, useRef} from 'react'
import {ExerciseContext} from '../teacher/CreateTest'
import './style.css';

import QuestionTop from './QuestionTop'
import QuestionBot from './QuestionBot'

import {Draggable} from 'react-beautiful-dnd'
import useQuestions from '../../hooks/useQuestions';

function Open(props) {

    const {handleQuestionChange, setPoints, state} = useQuestions(props.object, props.exNum, props.handleChange);

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
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints}/>
            
            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleQuestionChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <div className="input-group">
                <textarea className="answer" name="answer" onChange={(e) => handleQuestionChange(e)} 
                placeholder="This is a place for a student's answer" value={state.answer}
                />
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default Open
