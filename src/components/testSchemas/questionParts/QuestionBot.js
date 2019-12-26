import React from 'react'

function QuestionBot(props) {
    return (
        <div className="card-footer text-left">
            <button className="btn btn-primary mr-2" 
                onClick={() => props.moveQuestion("up", props.index)}>
                <h5>&#8593;</h5>
            </button>
            <button className="btn btn-primary" 
                onClick={() => props.moveQuestion("down", props.index)}>
                <h5>&#8595;</h5>
            </button>
        </div>
    )
}

export default QuestionBot
