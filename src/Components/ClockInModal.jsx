import React, { useState } from 'react';

const ClockInModal = ({ isOpen, onClose }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    // Handle the save logic here
    console.log('IP Address:', ipAddress);
    console.log('Note:', note);
    onClose(); // Close the modal after saving
  };

  return (
    isOpen ? (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h2>Clock In</h2>
          <label>
            IP Address:
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Enter IP Address"
              style={inputStyle}
            />
          </label>
          <br />
          <label>
            Clock In Note:
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note"
              style={textareaStyle}
            />
          </label>
          <div style={buttonContainerStyle}>
            <button onClick={handleSave} style={buttonStyle}>Save</button>
            <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Close</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  marginLeft: '10px',
};

const buttonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
};

export default ClockInModal;
