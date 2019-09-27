import React, {useContext} from 'react';
import '../App.css';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function About() {

  return (
    <div>
      <h1>Home</h1>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Header</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>A modal body</p>
        </Modal.Body>

        <Modal.Footer>
          <p>A footer</p>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default About;
