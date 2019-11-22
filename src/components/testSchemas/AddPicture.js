import React, {useState, useEffect} from 'react'
import './stylePic.css'

function AddQuestion(props) {

    const [picture, setPicture] = useState({image: undefined, size: '80'});

    const addPicture = (event) => {
        setPicture({...picture, image: event.target.files[0]})
    }

    const deletePicture = () => {
        setPicture({...picture, image: undefined});
        props.deletePicture();
    }

    const resize = (size) => {
        setPicture({...picture, size: size});
    }

    useEffect(() => {
        console.log(picture);
        props.setPicture(picture);
    }, [picture])

    return (
        <div className="mb-4 mt-4">
        <div /* style={{border: '1px solid black'}} */ className="mb-4">
            <input id="file-input" type="file" name="picture" style={{display: 'none'}} 
                onChange={(e) => addPicture(e)}
            />

            <div htmlFor="file-input" className="picture-div" style={{position: 'relative'}}>
                <label htmlFor="file-input">
                    {picture.image !== undefined ?
                        <img className="img-fluid" 
                            width={picture.size+'%'} 
                            style={{border: '1px dashed blue', maxWidth: '800px', }}
                            src={URL.createObjectURL(picture.image)}
                        />
                        :
                        <p className="btn btn-primary">Add Picture</p>
                    }
                </label>
                {picture.image !== undefined &&
                    <div>
                        <p className="close" style={{fontSize: '20px'}} onClick={() => deletePicture()}>&times;</p>
                        <input type="range" min="40" max="80" id="rangeVert" value={picture.size} className="slider text-left" onChange={(e) => resize(e.target.value)}/>
                    </div>
                }   
            </div>
        </div>
    </div>
    )
}

export default AddQuestion
