import React from 'react'

function QuestionTop(props) {

    return (
        <div className="card-header">
            <span>
                <div className="row">
                    <p className="col-sm-11 text-left font-weight-bold">
                        <input className="points-input" type="number" min="0" max="99" 
                        value={props.points}
                        onChange={(e) => props.setPoints(e.target.value)} />p
                    </p>
                    <p className="col-sm-1 close-btn" style={{right: "20px", position: "absolute"}} onClick={() => props.handleDelete(props.exNum)}>&times;</p>
                </div>
                <div className="row">
                    <h3 className="col-sm-6 text-left">Question {props.exNum+1}</h3>
                </div> 
            </span>
        </div>
    )
}

export default QuestionTop
