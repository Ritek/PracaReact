import React from 'react'
import ShowPoints from './ShowPoints'

function TrueFalse(props) {
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
                <table className="table">
                    <thead style={{display: 'none'}}>
                        <tr>
                            <th style={{width: '90%'}}></th>
                            <th style={{width: '10%'}}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props.question.subquestions.map((sub, index) => (
                                <tr key={index} className={sub[2] === "incorect" ? 'alert alert-danger' : 'alert alert-success'}>
                                    <td>{sub[0]}</td>
                                    <td>{sub[1]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TrueFalse
