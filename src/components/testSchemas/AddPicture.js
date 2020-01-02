import React, {useState, useEffect, useRef} from 'react'
import './stylePic.css'

function AddQuestion(props) {

    const [picture, setPicture] = useState({
        image: props.state.picture || undefined, 
        size: props.state.pictureSize || 80, 
        image64: props.state.image64 || undefined
    });

    const toBase64 = (file) => new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }) 

    const addPicture = async (event) => {
        if (event.target.files[0] !== undefined) {
            let temp = event.target.files[0];
            let x = await toBase64(event.target.files[0])
            setPicture({...picture, image: temp, image64: x});
        } else {
            setPicture({...picture, picture: undefined});
        }
    }

    const resize = (size) => {
        setPicture({...picture, size: size});
    }

    const delPicture = () => {
        setPicture({image: undefined, size: 80, image64: undefined});
        props.delPicture();
    }

    useEffect(() => {
        props.setPicture(picture);
    }, [picture])

    return (
        <div className="mb-1 mt-4">

            <div className="mb-1">
                <input 
                    id={`fi-${props.state.id}`} 
                    type="file" style={{display: 'none'}} 
                    onChange={(e) => addPicture(e)}
                />

            <div className="picture-div" style={{position: 'relative'}}>
                <div style={{margin: 'auto', maxWidth: '800px', maxHeight: '700px', }}>
                    <label htmlFor={`fi-${props.state.id}`} id={`li-${props.state.id}`}>
                        {picture.image64 !== undefined ?
                            <img className="img-fluid" 
                                width={picture.size+'%'} 
                                style={{border: '1px dashed blue', maxWidth: '800px', }}
                                src={picture.image !== undefined ? URL.createObjectURL(picture.image) : (`data:image/png;base64,${picture.image64}`)}
                            />
                            :
                            <p className="btn btn-primary">Add Picture</p>
                        }
                    </label>
                </div>
                
                {picture.image64 !== undefined &&
                    <div>
                        <p className="close" style={{fontSize: '30px'}} onClick={() => delPicture()}>&times;</p>
                        <input type="range" min="40" max="80" id="rangeVert" 
                            value={picture.size !== undefined ? picture.size : 80} 
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
