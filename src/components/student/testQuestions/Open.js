import React, {useState, useEffect} from 'react'
import './style.css'

function Open(props) {
    const [state, setState] = useState(props.question);

    const handleTextChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        props.updateTest(state, props.questionNum);
    }, [state.answer])

    return (
        <div>
            <input className="textarea" style={{width: '100%'}} name="answer" value={state.answer}
                onChange={(e) => handleTextChange(e)}
            />
        </div>
    )
}

export default Open
