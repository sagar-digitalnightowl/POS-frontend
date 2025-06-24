import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

const PreRepairChecklistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1000'
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    padding: '20px',
    position: 'relative'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
  };

  const saveButtonStyle = {
    marginTop: '20px',
    float: 'right',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <FontAwesomeIcon
          icon={faTimes}
          style={closeButtonStyle}
          onClick={onClose}
        />
        <h3>Pre Repair Checklist</h3>
        <p><strong>N/A = Not Applicable</strong></p>
        <p>No repair checklist</p>
        <button
          style={saveButtonStyle}
          onClick={() => {
            // Add save functionality here
            console.log('Save button clicked');
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </div>
    </div>
  );
};

export default PreRepairChecklistModal;
