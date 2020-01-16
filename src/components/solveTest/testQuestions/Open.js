import React, {useState, useEffect} from 'react'
import './style.css'
import ShowImage from './ShowImage';

function Open(props) {
    const [state, setState] = useState(props.question);

    const handleTextChange = (event, value) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;

        setState({...state, answer: value});
    }

    useEffect(() => {
        props.updateTest(state, props.questionNum);
    }, [state.answer])

    return (
        <div>
            {state.picture !== undefined &&
                <ShowImage image={state.picture} size={state.pictureSize}/>
            }
            
            <textarea className="textarea" style={{width: '100%'}} name="answer" value={state.answer}
                placeholder='Type your answer here'
                onChange={(e) => handleTextChange(e, e.target.value)}
            />
        </div>
    )
}

export default Open
