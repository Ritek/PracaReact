import React from 'react'
import ShowPoints from './ShowPoints'

function Open(props) {
    return (
        <div className="card mb-5">
            <ShowPoints 
                points={props.question.points} 
                correct={props.question.correct} 
                changePoints={props.changePoints}
                exNum={props.exNum}
                canEdit={props.canEdit}
            />

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
