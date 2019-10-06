import React from 'react'

function SubquestionTrueFalse(props) {
    return (
        <tr>
            <th><textarea className="subquestion" name="subquestion" value={props.ex[0]}
                    placeholder="Enter question and select true or false" onChange={(e) => props.changeTrueFalseText(e, props.index)}>
                </textarea>
            </th>
            <th>
                <select onChange={(e) => props.changeTrueFalseLogic(e, props.index)} value={props.logic}>
                    <option value="True" >True</option>
                    <option value="False">False</option>
                </select>
            </th>
            <th>
                <p className="close-btn" onClick={() => props.delSubquestion(props.index)}>&times;</p>
            </th>
        </tr>
    )
}

export default SubquestionTrueFalse
