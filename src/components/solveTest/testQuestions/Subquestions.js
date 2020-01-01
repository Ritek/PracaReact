import React, {useState, useEffect} from 'react'
import './style.css'
import ShowImage from './ShowImage';

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
        <div>
            {state.picture !== undefined &&
                <ShowImage image={state.picture} size={state.pictureSize}/>
            }

            <table className="table">
                <thead>
                    <tr>
                        <th style={{width: '60%'}}>Question</th>
                        <th style={{width: '20%'}} className="text-center">True</th>
                        <th style={{width: '20%'}} className="text-center">False</th>
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
        </div>
    )
}

export default Subquestions
