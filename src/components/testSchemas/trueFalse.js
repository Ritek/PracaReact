import React from 'react'

import useQuestions from '../../hooks/useQuestions';
import QuestionTop from './questionParts/QuestionTop'
import QuestionBot from './questionParts/QuestionBot'
import './style.css'

import SubquestionTrueFalse from './questionParts/SubquestionTrueFalse';

function TrueFalse(props) {

    const {handleTextChange, addTrueFalse, changeTrueFalseText, changeTrueFalseLogic, delSubquestion, setPoints, state} = useQuestions(props.object, props.exNum, props.handleChange);

    return (
        <div className="card card-bot">
            <QuestionTop exNum={props.exNum} handleDelete={props.handleDelete} setPoints={setPoints} points={state.points}/>
            
            <div className="input-group">
                <textarea className="instruction" name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here" value={state.instruction}/>
            </div>
            
            <div className="input-group">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: "70%"}}>Subquestions</th>
                            <th scope="col" style={{width: "20%"}}>True/False</th>
                            <th scope="col" style={{width: "10%"}}>del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.subquestions !== undefined &&
                            state.subquestions.map((ex, idx) => (
                                <SubquestionTrueFalse key={idx} index={idx} logic={state.subquestions[idx][1]} 
                                    changeTrueFalseLogic={changeTrueFalseLogic} changeTrueFalseText={changeTrueFalseText}
                                    delSubquestion={delSubquestion} ex={ex}
                                />
                            ))
                        }
                    </tbody>
                </table>
                <div className="card-body">
                    <button className="btn btn-primary" onClick={() => addTrueFalse()} >Add subquestion</button>
                </div>
            </div>

            <QuestionBot moveQuestion={props.handleReorder} index={props.exNum}></QuestionBot>
        </div>
    )
}

export default TrueFalse
