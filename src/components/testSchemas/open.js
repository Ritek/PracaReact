import React, {useState, useEffect} from 'react'
import {ExerciseContext} from '../teacher/CreateTest'
import './style.css';

function Open(props) {

    const marginStyle = {
        marginBottom: '2vh',
    }

    const centerObj = {
        width: '100%',
    }

    const [text, setText] = useState({
        type: "open",
        points: "",
        instruction: "", 
        answer: ""
    });

    const handleTextChange = (event) => {
        setText({...text, [event.target.name]: event.target.value});
    } 

    useEffect(() => {
        props.handleChange(props.exNum, text, "open");
    }, [text])

    return (
        <div style={{marginBottom: '4vh'}} className="card">
            <div className="card-header">
                <span>
                    <p className="text-right close-btn" onClick={() => props.handleDelete(props.exNum)}>&times;</p>
                    <h3 className="font-weight-bold text-left">Exercise nr. {props.exNum+1}</h3> 
                </span>
            </div>
            
            <div className="input-group" style={marginStyle}>
                <textarea style={centerObj} name="instruction" onChange={(e) => handleTextChange(e)} 
                placeholder="You can enter instructions here"/>
            </div>
            
            <div className="input-group">
                <textarea style={centerObj} name="answer" onChange={(e) => handleTextChange(e)} 
                placeholder="This is a place for a student's answer"/>
            </div>
        </div>
    )
}

export default Open
