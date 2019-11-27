import React from 'react'
import BlankLines from './BlankLines'
import ShowPoints from './ShowPoints'

function Blanks(props) {
    return (
        <div className="card mb-5">
            <ShowPoints 
                points={props.question.points} 
                correct={props.question.correct} 
                changePoints={props.changePoints}
                exNum={props.exNum}
                canEdit={props.canEdit}
            />

            <div className="card-body">
                {
                    props.question.answer.map((line, idx) => (
                        <div key={idx}>
                            <BlankLines line={line}/>
                            <div style={{clear: 'both'}} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Blanks
