import React from 'react'

function Choice(props) {
    return (
        <tr>
            <th>
                {String.fromCharCode(props.index + 65)}
            </th>

            <td>
                <input name="choice" type="radio" value={String.fromCharCode(props.index + 65)} checked={String.fromCharCode(props.index + 65) === props.checked ? "True" : "False"}
                    onChange={(e) => props.setChoicesAnswer(props.index, e.target.value)} 
                />
            </td>

            <td>
                <textarea onChange={(e) => props.setChoiceText(e, props.index)} value={props.value}></textarea>
            </td>

            <td>
                <p className="close-btn" style={{marginRight: "auto", marginLeft: 'auto'}} onClick={() => props.delChoice(props.index)}>&times;</p>
            </td>
        </tr>
    )
}

export default Choice
