import React, {useContext, useState} from 'react';
import '../App.css';

import MyInput from './MyInput';

function About(props) {
  return (
    <div>
      <h1>About</h1>
      {props.value ? <p>True</p> : <p>False</p>}
      <MyInput />
    </div>
  );
}

export default About;
