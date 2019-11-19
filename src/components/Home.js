import React, {useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios'

function About() {

  const [state, setState] = useState({file: undefined});
  const [path, setPath] = useState({url: undefined});

  const onChangeHandler = (event) => {
    setState({file: event.target.files[0]});
  }

  const upload = () => {
    console.log('upload');
    const data = new FormData();
    data.append('image', state.file);

    Axios.post('api/post/image', data).then(res => {
      console.log(res.data);
      setPath({url: `static${res.data.path}`});
    }).catch(error => {
      console.log(error);
    });
  }

/*   useEffect(() => {
    console.log("state", state.file);
  }, [state]) */

  return (
    <div>
      <h1 className="mb-5">Home</h1>
      
      <div className="mb-5">
          <form method="post" action="/submit-form" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" onChange={(e) => onChangeHandler(e)}/>
            </div>
          </form>
      </div>

      <div>
        <button className="btn btn-primary" onClick={() => upload()}>Upload</button>
      </div>

      <div>
        {path.url !== undefined &&
          <img src={path.url} className="img-fluid"/>
        }
      </div>

	  </div>
  );
}

export default About;
