import React, {useState, useEffect} from 'react'
import './style.css'

function Subquestions(props) {

    const [state, setState] = useState(props.question);

    const changeAnswer = (value, index) => {
        let temp = state.subquestions;
        temp[index][1] = value;
        setState({...state, subquestions: temp});
    }

    useEffect(() => {
        props.updateTest(state, props.questionNum);
    }, [state])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th style={{width: '80%'}}>Question</th>
                    <th style={{width: '10%'}}>True</th>
                    <th style={{width: '10%'}}>False</th>
                </tr>
            </thead>

            <tbody>
                {state.subquestions !== undefined &&
                    state.subquestions.map((ques, index) => (
                        <tr key={index}>
                            <td>{ques[0]}</td>
                            <td className="text-center"><input type="radio" className="checkmark" 
                                name={`tf${index}`} value="true" onClick={() => changeAnswer('true', index)}/>
                            </td>
                            <td className="text-center"><input type="radio" className="checkmark" 
                                name={`tf${index}`} value="false" onClick={() => changeAnswer('false', index)}/>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Subquestions
