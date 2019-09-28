import React, {useState} from 'react';
import '../App.css';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function About() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h1>Home</h1>

      <Button variant="primary" onClick={handleShow}>Show modal</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Header</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>A modal body</p>
        </Modal.Body>

        <Modal.Footer>
          <p>A footer</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default About;
