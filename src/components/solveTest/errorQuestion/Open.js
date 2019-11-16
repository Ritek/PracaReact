import React from 'react'

function Open(props) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <p>{} / {props.question.points} p</p>
            </div>

            <div className="card-body text-left">
                {
                    props.question.answer.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Open
