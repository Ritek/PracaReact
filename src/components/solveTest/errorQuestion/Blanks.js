import React from 'react'
import BlankLines from './BlankLines'

function Blanks(props) {
    return (
        <div className="card">
            <div className="card-body">
                {
                    props.question.answer.map((line, idx) => (
                        <div>
                            <BlankLines key={idx} line={line}/>
                            <div style={{clear: 'both'}} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Blanks
