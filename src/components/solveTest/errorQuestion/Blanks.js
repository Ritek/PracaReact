import React from 'react'
import BlankLines from './BlankLines'

function Blanks(props) {
    return (
        <div className="card">
            <div className="card-body">
                {
                    props.question.sentencesArr.map((line, idx) => (
                        <BlankLines key={idx} line={line}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Blanks
