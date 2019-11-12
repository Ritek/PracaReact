import React from 'react'

function Choice(props) {
    return (
        <tr>
            <th>
                {String.fromCharCode(props.index + 65)}
            </th>

            <td>
                {/* <input type="checkbox" value={String.fromCharCode(props.index + 65)} 
                    onChange={(e) => props.setChoicesAnswer(props.index, e.target.value)}
                    checked={props.checked === String.fromCharCode(props.index + 65) && props.checked !== undefined ? true : false}
                /> */}
                <input type="checkbox" value={String.fromCharCode(props.index + 65)} 
                    onChange={(e) => props.setChoicesAnswer(props.index, e.target.value, props.value)}
                    checked={props.checked[0] === String.fromCharCode(props.index + 65) && props.checked !== undefined ? true : false}
                />
            </td>

            <td>
                <textarea onChange={(e) => props.setChoiceText(e, props.index, String.fromCharCode(props.index + 65))} value={props.value}></textarea>
            </td>

            <td>
                <p className="close-btn" style={{marginRight: "auto", marginLeft: 'auto'}} onClick={() => props.delChoice(props.index)}>&times;</p>
            </td>
        </tr>
    )
}

export default Choice
