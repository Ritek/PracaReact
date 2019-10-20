import React from 'react'

import QuestionTop from './questionParts/QuestionTop'
import QuestionBot from './questionParts/QuestionBot'
import useQuestions from '../../hooks/useQuestions'

function Blanks(props) {

    const {handleTextChange, setPoints, state, makeBlanks, blanksLines} = useQuestions(props.object, props.exNum, props.handleChange);

    return (
        <div className="card card-bot">
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints} points={state.points}/>

            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <textarea placeholder="Enter sentences line by line. If you want to create a blank use brackets eg. [example]" 
                style={{width: "100%"}} onChange={(e) => makeBlanks(e)} value={state.sentences} rows={blanksLines().toString()}>
            </textarea>

            <div className="card-body mt-2 mb-2">
                {state.blanks !== undefined && state.blanks !== null &&
                    state.blanks.map((blank, index) => (
                        <div className="badge badge-primary mr-2 mb-2" key={index}><h3>{blank}</h3></div>
                    ))
                }
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default Blanks
