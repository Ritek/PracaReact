import React, {useEffect} from 'react';
import '../App.css';

import MyInput from './MyInput';

function About(props) {
  useEffect(() => {
    console.log("call");
  }, [])

  return (
    <div>
      <h1>About</h1>
      {props.value ? <p>True</p> : <p>False</p>}
      <MyInput />
    </div>
  );
}

export default About;
