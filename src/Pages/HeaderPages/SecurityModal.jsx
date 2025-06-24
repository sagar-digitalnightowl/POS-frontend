import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SecurityModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px', // Adjust width as needed
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px',
          marginBottom: '10px'
        }}>
          <h4 style={{ margin: 0 }}>Security</h4>
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }} />
          </div>
          <div>
            <small>Password Pattern: At least 8 characters, including 1 uppercase letter, 1 number, and 1 special character.</small>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;
