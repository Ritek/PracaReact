import React, {useState, useEffect} from 'react'

function Blanks(props) {

    const [state, setState] = useState(props.question);

    useEffect(() => {

    }, [state]);

    return (
        <div>
            {state.sentences !== undefined &&
                state.sentences.map((sentence, index) => (
                    <p key={index}>{sentence}</p>
                ))
            }
        </div>
    )
}

export default Blanks
