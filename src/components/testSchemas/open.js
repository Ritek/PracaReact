import React, {useState} from 'react'

function open() {

    textareaStyle = {
        marginTop: '10%',
        height: '300px',
    }

    const [instruction, setInstruction] = useState("");

    const handleChange = (event) => {
        setInstruction({...instruction, instruction: event.target.value});
    }

    return (
        <div>
            <textarea onChange={(e) => handleChange(e)}/>
            <textarea style={textareaStyle}/>
        </div>
    )
}

export default open
