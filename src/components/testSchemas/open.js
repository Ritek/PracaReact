import React from 'react'
import './style.css';

import QuestionTop from './questionParts/QuestionTop'
import QuestionBot from './questionParts/QuestionBot'
import useQuestions from '../../hooks/useQuestions';

import AddPicture from './AddPicture';

function Open(props) {

    const {handleTextChange, setPoints, state, handleRegularChange, setPicture, deletePicture} = useQuestions(props.object, props.exNum, props.handleChange);

    return (
        <div className="card card-bot">
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints} points={state.points}/>
            
            <AddPicture setPicture={setPicture} deletePicture={deletePicture}/>

            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <div className="input-group mb-4">
                <textarea className="answer" name="answer" onChange={(e) => handleTextChange(e)} 
                placeholder="This is a place for a student's answer" value={state.answer}
                />
            </div>

            <div className="input-group">
                <textarea className="regularExpression" name="regularExpression" onChange={(e) => handleRegularChange(e)} rows="4"
                placeholder={"Enter regular expressions if you plan to use experimental automatic check. \r\nRemember every caracter matters during grading. Eg.\r\nsearched term\r\nand one more"} value={state.regularExpression}
                />
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default Open
