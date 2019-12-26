import React from 'react';
import './Home.css'
import {ReactComponent as Logo} from '../justTest.svg'
import {Link} from 'react-router-dom'

function Home() {

  return (
    <div>
      <div className="home"></div>
      <div className="info">
        <Logo className="logo" style={{color: "white"}}/>
        <div className="text">
          <h2>Welcome to JustTest</h2>
          <p>If this is your first visit, click <Link to='/about'>here</Link> to read more about our great tool.</p>
          <p>Intrested? Click <Link to='/register'>here</Link> and check out how WE can help YOU.</p>
        </div>
      </div>
	  </div>
  );
}

export default Home;
