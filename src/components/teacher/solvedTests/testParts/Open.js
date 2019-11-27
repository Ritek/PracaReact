import React from 'react'

function Open(props) {
    return (
        <div>
            <div>
                <h4>Instrunctions</h4>
                <p>{props.question.instruction}</p>
            </div>
            <div>
                <h4>Answer</h4>
                <p>{props.question.answer}</p>
            </div>
        </div>
    )
}

export default Open
