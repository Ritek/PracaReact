import React from 'react';
import './Home.css'
import {ReactComponent as Logo} from '../justTest.svg'
import {Link} from 'react-router-dom'

function Home() {

  return (
    <div>
      <div className="home"></div>
      <div className="info">
        <Logo className="logo" style={{width: '40vw'}}/>
        <div className="text">
          <h2>Welcome to JustTest</h2>
          <p>If this is your first visit, click <Link to='/about'>here</Link> to read more about our great tool.</p>
          <p>Intrested? Click <Link to='/register'>here</Link> to create an account and check out how we can help you.</p>
        </div>
      </div>
	  </div>
  );
}

export default Home;
