import React, {useState, useEffect, useRef} from 'react'
import './stylePic.css'

function AddQuestion(props) {

    const [picture, setPicture] = useState({image: undefined, size: 80});

    const addPicture = (event) => {
        /* if (event.target.files[0] !== undefined) {
            const obj = {image: event.target.files[0], size: 80}
            props.setPicture(obj);
        } */
        setPicture({...picture, image: event.target.files[0]});
    }

    const resize = (size) => {
        setPicture({...picture, size: size});
    }

    const delPicture = () => {
        setPicture({...picture, image: undefined});
    }

    useEffect(() => {
        props.setPicture(picture);
    }, [picture])

    return (
        <div className="mb-4 mt-4">
            <div /* style={{border: '1px solid black'}} */ className="mb-4">
                <input 
                    id={`fi-${props.state.id}`} 
                    type="file" style={{display: 'none'}} 
                    onChange={(e) => addPicture(e)}
                />

            <div htmlFor={`fi-${props.state.id}`} className="picture-div" style={{position: 'relative'}}>
                <label htmlFor={`fi-${props.state.id}`}>
                    {/* props.state.picture */ picture.image ?
                        <img className="img-fluid" 
                            width={/* props.state.picture.size */picture.size+'%'} 
                            style={{border: '1px dashed blue', maxWidth: '800px', }}
                            src={URL.createObjectURL(picture.image)}
                            //src={URL.createObjectURL(props.state.picture.image)}
                            //src={URL.createObjectURL(image.current)}
                        />
                        :
                        <p className="btn btn-primary">Add Picture</p>
                    }
                </label>
                {/* props.state.picture */ picture.image !== undefined &&
                    <div>
                        <p className="close" style={{fontSize: '20px'}} onClick={() => delPicture()}>&times;</p>
                        <input type="range" min="40" max="80" id="rangeVert" 
                            value={picture.size} 
                            className="slider text-left" 
                            onChange={(e) => resize(e.target.value)}
                        />
                    </div>
                }   
            </div>
        </div>
    </div>
    )
}

export default AddQuestion
