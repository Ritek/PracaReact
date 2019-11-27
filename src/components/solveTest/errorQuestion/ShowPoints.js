import React from 'react'

function ShowPoints(props) {
    return (
        <div className="card-header">
            <p>
                <input type="text" style={{width: '50px'}} pattern="[0-9\.]+" max={props.points} min={0}
                    value={props.correct !== undefined ? props.correct : ""} disabled={!props.canEdit}
                    onChange={(e) => props.changePoints(props.exNum, e.target.value, props.points)} 
                />
                / {props.points} p
            </p>
        </div>
    )
}

export default ShowPoints
