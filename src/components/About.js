import React from 'react';
import '../App.css';
import './Home.css'
import exaple1 from '../example1.jpg'
import exaple4 from '../example4.jpg'

import {Link} from 'react-router-dom'

function About() {
  return (
    <div className="about">
      <h1>About us</h1>

      <div style={{marginBottom: '50px'}}>
        <p>JustTest is a simple but powerfull tool for creating tests and quizes.</p>
        <img src={exaple1} style={{width: '100%', height: '100%'}}/>
      </div>

      <div style={{marginBottom: '100px'}}>
        <p>It is easy to work with and has no learning curve.</p>
        <p>Creating a test takes just few minutes so you can focus on whats important.</p>
      </div>

      <div style={{marginBottom: '100px'}}>
        <div className="row">
          <div className="col-sm">
            <img src={exaple4} style={{width: '100%', height: '100%'}}/>

          </div>
          <div className="col-sm" style={{margin: 'auto'}}>
            <p style={{fontWeight: 'bold'}}>No laptop?</p>
            <p>JustTest works on mobile devices as well.</p>
          </div>
        </div>
      </div>

      <div>
        <p>Clean and minimalistic. The right tool for your needs.</p>
        <p>Why don't you try it out? Click <Link to="/register">here</Link> and create an account.</p>
      </div>
    </div>
  );
}

export default About;
