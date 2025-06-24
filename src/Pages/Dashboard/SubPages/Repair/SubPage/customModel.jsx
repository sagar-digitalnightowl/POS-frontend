import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="primary" onClick={() => console.log('Individual')}>
          Individual
        </Button>
        <Button variant="secondary" onClick={() => console.log('Business')}>
          Business
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;