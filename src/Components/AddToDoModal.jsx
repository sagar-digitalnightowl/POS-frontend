import React from 'react';

const AddToDoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90%',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Add To Do</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.2em', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Task</label>
          <input type="text" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Assign To</label>
          <input type="text" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Priority</label>
          <select style={{ width: '100%', padding: '8px', margin: '5px 0' }}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Status</label>
          <select style={{ width: '100%', padding: '8px', margin: '5px 0' }}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Start Date</label>
          <input type="date" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>End Date</label>
          <input type="date" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Estimated Hours</label>
          <input type="number" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description</label>
          <textarea style={{ width: '100%', padding: '8px', margin: '5px 0' }}></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Upload Document</label>
          <input type="file" style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 15px', marginRight: '10px' }}>Close</button>
          <button style={{ padding: '10px 15px' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddToDoModal;
