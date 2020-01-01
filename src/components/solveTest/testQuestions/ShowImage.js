import React from 'react'

function ShowImage(props) {

    const picStyle = {
        display: 'block', 
        marginLeft: 'auto', 
        marginRight: 'auto',
    }

    return (
        <div style={{border: 'solid 1px black'}}>
            <img src={"/"+props.image} width={`${props.size-10}%`} style={picStyle}/>
        </div>
    )
}

export default ShowImage
