import React, {useState} from 'react'

function Blank(props) {

    const [value, setValue] = useState({id: parseInt(props.index), empty: true, display: "       "});

    const drop = (e) => {
        e.preventDefault();
        const card = e.dataTransfer.getData('val');
        console.log("card:", card);
        console.log(value.id);
        setValue({...value, empty: false, display: card});
        props.updateBlank(value.id, card);
    }

    const touchDrop = () => {
        if (props.sel !== "") {
            setValue({...value, empty: false, display: props.sel});
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    if (value.empty === true) return(
        <p style={{borderStyle: 'dotted', float: 'left', minWidth: '50px'}} className="ml-2" onDrop={drop} onDragOver={dragOver} onTouchEnd={() => touchDrop()}>{value.display}</p>
    )
    else return(<p className="badge badge-primary ml-2" style={{display: 'inline-block', float: 'left'}} onDrop={drop} onDragOver={dragOver} onTouchEnd={() => touchDrop()}>{value.display}</p>)
}

export default Blank