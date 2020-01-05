import React from 'react'
import ShowPoints from './ShowPoints'

function Choices(props) {
    return (
        <div className="card mb-5" >
            <ShowPoints 
                points={props.question.points} 
                correct={props.question.correct} 
                changePoints={props.changePoints}
                exNum={props.exNum}
                canEdit={props.canEdit}
            />

            <div className={props.question.correct === props.question.points ? 'alert alert-success card-body' : 'alert alert-danger card-body'}>
                <table className="table-borderless">
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}></th>
                            <th style={{width: '90%'}}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props.question.choices.map((choice, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" name="choice" value={choice} 
                                        disabled checked={choice === props.question.answer? true : false}/>
                                    </td>
                                    <td style={{paddingLeft: '10px', paddingBottom: '8px'}}>{choice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Choices
