import React from 'react'

function Subquestions(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th style={{width: '80%'}}>Question</th>
                    <th style={{width: '10%'}}>True</th>
                    <th style={{width: '10%'}}>False</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.subquestions.map((ques, index) => (
                        <tr key={index}>
                            <td>{ques[0]}</td>
                            <td>T</td>
                            <td>F</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Subquestions
