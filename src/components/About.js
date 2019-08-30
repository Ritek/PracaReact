import React, {useContext, useState} from 'react';
import '../App.css';

import { UserContext } from '../App';
import MyInput from './MyInput';

function About() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>About</h1>
      <p>Hello {user}</p>

      <MyInput />
    </div>
  );
}

export default About;
