import React, {useState, useEffect} from 'react'
import './style.css'

function Open(props) {
    const [state, setState] = useState(props.question);

    const handleTextChange = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;

        setState({...state, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        props.updateTest(state, props.questionNum);
    }, [state.answer])

    return (
        <div>
            <textarea className="textarea" style={{width: '100%'}} name="answer" value={state.answer}
                onChange={(e) => handleTextChange(e)}
            />
        </div>
    )
}

export default Open
