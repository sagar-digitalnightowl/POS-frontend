import React from 'react';

const ApplicationTourModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Application Tour</h2>
        <p>Let's go through the application tour in seven quick steps.</p>
        <div className="modal-buttons">
          <button style={{ float: 'left' }}>Previous</button>
          <button style={{ float: 'left', marginLeft: '10px' }}>Next</button>
          <button style={{ float: 'right' }} onClick={onClose}>End Tour</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTourModal;
