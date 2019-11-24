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
        let temp = event.target.files[0];
        let x = await toBase64(event.target.files[0])
        setPicture({...picture, image: temp, image64: x});
    }

    const resize = (size) => {
        setPicture({...picture, size: size});
    }

    const delPicture = () => {
        setPicture({...picture, image: undefined});
    }

    useEffect(() => {
        console.log('type:', typeof(picture.image));
        //console.log("initial:", picture);
    }, [])

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
                    {picture.image !== undefined ?
                        <img className="img-fluid" 
                            width={picture.size+'%'} 
                            style={{border: '1px dashed blue', maxWidth: '800px', }}
                            //src={picture.name !== undefined ? URL.createObjectURL(picture.image) : "/"+picture.image}
                            src={picture.image.toString().includes('/') ? ("/"+picture.image) : URL.createObjectURL(picture.image)}
                            //src={props.state.image64 !== undefined ? props.state.picture : '...'}

                            //src={URL.createObjectURL(props.state.picture)}
                            //src={URL.createObjectURL(image.current)}
                        />
                        :
                        <p className="btn btn-primary">Add Picture</p>
                    }
                </label>
                {picture.image !== undefined &&
                    <div>
                        <p className="close" style={{fontSize: '20px'}} onClick={() => delPicture()}>&times;</p>
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
