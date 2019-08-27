import React, {useContext} from 'react';
import '../App.css';

import { UserContext } from '../App';

function About() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>About</h1>
      <p>Hello {user}</p>
    </div>
  );
}

export default About;
