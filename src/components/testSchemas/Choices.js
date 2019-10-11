import React from 'react'
import './style.css';

import QuestionTop from './questionParts/QuestionTop'
import QuestionBot from './questionParts/QuestionBot'
import SingleChoice from './questionParts/Choice'

//import {Draggable} from 'react-beautiful-dnd'
import useQuestions from '../../hooks/useQuestions';

function Choices(props) {

    const {handleTextChange, setPoints, state, addChoice, delChoice, setChoiceText, setChoicesAnswer} = useQuestions(props.object, props.exNum, props.handleChange);

    return (
        <div className="card card-bot">
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints} points={state.points}/>

            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>

            <div className="card-body">
                <table style={{width: '100%'}}>
                    <thead>
                        {state.choices !== undefined &&
                            <tr>
                                <th scope="col" style={{width: "10%"}}>#</th>
                                <th scope="col" style={{width: "10%"}}>Ans</th>
                                <th scope="col" style={{width: "70%"}}>Subquestion</th>
                                <th scope="col" style={{width: "10%"}}>Del</th>
                            </tr>
                        }
                    </thead>
                    <tbody>
                        {state.choices !== undefined &&
                            state.choices.map((option, index) => (
                                <SingleChoice key={index} index={index} setChoiceText={setChoiceText} 
                                setChoicesAnswer={setChoicesAnswer} delChoice={delChoice} value={state.choices[index]} checked={state.answer}/> 
                            ))
                        }
                    </tbody>
                </table>

                <button className="btn btn-primary" onClick={() => addChoice()}>Add Choice</button>
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default Choices