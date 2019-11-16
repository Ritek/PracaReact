import React from 'react'

function Choices(props) {
    return (
        <div className="card" >
            <div className={props.question.correct === true ? 'alert alert-success card-body' : 'alert alert-danger card-body'}>
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
