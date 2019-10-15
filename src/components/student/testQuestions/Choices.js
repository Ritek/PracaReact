import React from 'react'

function Choices(props) {
    return (
        <div>
            {
                props.choices.map((choice, index) => (
                    <p key={index}><input type="radio" name="choice"/>{choice}</p>
                ))
            }
        </div>
    )
}

export default Choices
