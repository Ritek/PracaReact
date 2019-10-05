import React from 'react'

function Choice(props) {
    return (
        <tr>
            <th>
                {String.fromCharCode(props.index + 65)}
            </th>

            <td>
                <input name="choice" type="radio"
                    onChange={() => props.setChoicesAnswer(props.index)} 
                />
            </td>

            <td>
                <textarea onChange={(e) => props.setChoiceText(e, props.index)}></textarea>
            </td>

            <td>
                <p className="close-btn" style={{marginRight: "auto", marginLeft: 'auto'}} onClick={() => props.delChoice(props.index)}>&times;</p>
            </td>
        </tr>
    )
}

export default Choice
