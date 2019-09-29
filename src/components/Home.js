import React, {useState, useEffect} from 'react';
import '../App.css';

function About() {
  const [state, setState] = useState();

  const addKey = () => {
    setState({['newKey']: 'newValue'});
  }

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => addKey()}>Click</button>
    </div>
  );
}

export default About;
