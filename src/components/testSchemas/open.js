import React, {useState, useEffect} from 'react'
import {ExerciseContext} from '../teacher/CreateTest'
import './style.css';

import useQuestions from '../../hooks/useQuestions';

function Open(props) {

    const {handleQuestionChange, state} = useQuestions(props.object, props.exNum, props.handleChange);

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
            <div className="card-header">
                <span>
                    <div className="row">
                        <p className="col-sm-11 text-left font-weight-bold">2p</p>
                        <p className="col-sm-1 close-btn" onClick={() => props.handleDelete(props.exNum)}>&times;</p>
                    </div>
                    <h3 className="font-weight-bold text-left">Exercise nr. {props.exNum+1}</h3> 
                </span>
            </div>
            
            <div className="input-group">
                <textarea className="centerObj" name="instruction" onChange={(e) => handleQuestionChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <div className="input-group">
                <textarea className="centerObj" name="answer" onChange={(e) => handleQuestionChange(e)} 
                placeholder="This is a place for a student's answer" value={state.answer}/>
            </div>
        </div>
    )
}

export default Open
