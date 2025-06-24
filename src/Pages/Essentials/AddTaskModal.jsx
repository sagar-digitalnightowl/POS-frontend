import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    overflowY: 'auto',
    padding: '20px',
  };

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '600px', // Increase max width for better readability
    boxSizing: 'border-box',
    maxHeight: '90vh', // Max height for better fit on the screen
    overflowY: 'auto', // Allow internal scrolling if content overflows
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={modalStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h4 style={{ margin: 0 }}>Add To Do</h4>
          <button style={closeButtonStyle} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div>
          <form method="POST" action="/essentials/todo" acceptCharset="UTF-8" id="task_form" noValidate="novalidate">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="task">Task:*</label>
                    <input className="form-control" required name="task" type="text" id="task" aria-required="true" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="users">Assigned To:*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <select
                        className="form-control select2"
                        multiple
                        required
                        style={{ width: '100%', height: '100%' }}
                        name="users[]"
                        aria-required="true"
                      >
                        <option value={4}> POS ADMIN </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select className="form-control select2" style={{ width: '100%', height: '100%' }} id="priority" name="priority">
                      <option value="">Please Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select className="form-control select2" style={{ width: '100%', height: '100%' }} id="status" name="status">
                      <option value="">Please Select</option>
                      <option value="new">New</option>
                      <option value="in_progress">In-Progress</option>
                      <option value="on_hold">On Hold</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Start Date:*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      <input required readOnly name="date" type="text" defaultValue="31/07/2024 16:12" id="date" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="end_date">End Date:</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      <input className="form-control datepicker text-center" readOnly name="end_date" type="text" id="end_date" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="estimated_hours">Estimated Hours:</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FontAwesomeIcon icon={faClock} />
                      </span>
                      <input className="form-control" name="estimated_hours" type="text" id="estimated_hours" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="to_do_description">Description:</label>
                    <textarea className="form-control" id="to_do_description" name="description" cols={50} rows={5} />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="document_upload">Upload Document:</label>
                    <input className="form-control-file" type="file" id="document_upload" name="document_upload" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary" onClick={onSave}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
