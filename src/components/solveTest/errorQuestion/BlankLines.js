import React from 'react'
import Word from './Word'

function BlankLines(props) {
    let arr = props.line.split(" ");

    return (
        <div>
            {
                arr.map((word, idx) => (
                    <Word key={idx} word={word}/>
                ))
            }
        </div>
    )
}

export default BlankLines
