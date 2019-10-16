import React, {useState, useEffect} from 'react'

function Choices(props) {

    const [state, setState] = useState(props.question);

    const changeChoice = (value) => {
        state.answer = value;
        setState({...state, answer: value});
    }

    useEffect(() => {
        props.updateTest(state, props.questionNum);
    }, [state.answer])

    return (
        <table>
            <thead>
                <tr>
                    <th style={{width: '10%'}}></th>
                    <th style={{width: '90%'}}></th>
                </tr>
            </thead>
            <tbody>
            {state.choices !== undefined &&
                state.choices.map((choice, index) => (
                    <tr key={index}>
                        <td><input type="radio" className="checkmark" name="choice" value={choice} 
                            onClick={(e) => changeChoice(e.target.value)}/>
                        </td>
                        <td style={{paddingLeft: '10px', paddingBottom: '8px'}}>{choice}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default Choices
