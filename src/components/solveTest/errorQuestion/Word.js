import React from 'react'

function Word(props) {

    let x;
    if (props.word.includes('[')) {
        x = props.word.substring(1,props.word.length-1);
        let arr = x.split(',');
        if (arr[1] === 'true') return (<p className="alert alert-success mr-2" style={{float: 'left', display: 'inline-block', paddingTop: '5px', paddingBottom: '5px'}} >{arr[0]}</p>)
        else return (<p className="alert alert-danger mr-2" style={{float: 'left', display: 'inline-block', paddingTop: '5px', paddingBottom: '5px'}} >{arr[0]}</p>)
    }
    else return (<p className="mr-2" style={{float: 'left', paddingTop: '5px'}}>{props.word}</p>)
}

export default Word
