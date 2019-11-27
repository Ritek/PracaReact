import React from 'react'

function ShowPoints(props) {
    return (
        <div className="card-header">
            <p>
                <input type="number" style={{width: '50px'}}
                    value={props.correct !== undefined ? props.correct : ""} disabled={!props.canEdit}
                    onChange={(e) => props.changePoints(props.exNum, e.target.value)} 
                />
                / {props.points} p
            </p>
        </div>
    )
}

export default ShowPoints
