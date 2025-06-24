import React, { useState } from 'react';
import Header from '../../../Components/Header';
import Sidebar from '../../../Components/Sidebar';
import NavbarCrm from './NavbarCrm';
import Footer from '../../../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faInfoCircle, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';

const LifeStage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const textStyle = { color: 'black' };
  const [modalOpen, setModalOpen] = useState(false);
  const [lifeStage, setLifeStage] = useState('');
  const [description, setDescription] = useState('');

  const handleAddButtonClick = () => { setModalOpen(true); };

  const handleCloseButtonClick = () => { setModalOpen(false); };

  const handleSaveButtonClick = () => {
    console.log('lifeStage:', lifeStage);
    console.log('Description:', description);
    setModalOpen(false);
  };

  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <NavbarCrm />
          </section>
          <section className="content-header">
            <h1>Sources<small>Manage Source</small>
              <FontAwesomeIcon icon={faInfoCircle}
                aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                data-content="Sources are used when adding leads" data-html="true" data-trigger="hover"
              />
            </h1>
          </section>
          <section className="content">
            <input type="hidden" id="category_type" defaultValue="source" />
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title" />
                <div className="box-tools">
                  <button type="button" className="btn btn-block btn-primary btn-modal" onClick={handleAddButtonClick}>
                  <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </div>
              </div>
              <div className="box-body">
                <div className="custom-controls">
                  <div className="custom-control show-entries">
                    <h5>Show</h5>
                    <select className="form-control1">
                      <option value="all">25</option>
                      <option value="admin">50</option>
                      <option value="user">100</option>
                      <option value="user">500</option>
                      <option value="user">1000</option>
                      <option value="user">All</option>
                    </select>
                    <h5>entries</h5>
                  </div>
                  <div className="custom-control export-buttons">
                    <button className="btn btn-success btn-sm export-btn">
                      <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
                    </button>
                    <button className="btn btn-primary btn-sm export-btn">
                      <FontAwesomeIcon icon={faPrint} /> Print
                    </button>
                    <button className="btn btn-warning btn-sm export-btn">
                      <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
                    </button>
                    <button className="btn btn-danger btn-sm export-btn">
                      <FontAwesomeIcon icon={faFilePdf} /> Export to PDF
                    </button>
                    <button className="btn btn-info btn-sm export-btn">
                      <FontAwesomeIcon icon={faColumns} /> Column Visibility
                    </button>
                  </div>
                  <div className="custom-control search-bar">
                    <input type="text" className="form-control form-control-sm" placeholder="Search..." onChange={(e) => console.log(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped" id="category_table">
                    <thead>
                      <tr>
                        <th> Life Stage </th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                            <tr key={index}>
                                <td>{group.lifeStage}</td>
                                <td>{group.description}</td>
                                <td>
                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </td>
                            </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                            </tr>
                            )}
                        </tbody>
                  </table>
                </div>
                <ul className="pagination-custom justify-content-end">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link1" style={{ color: 'black' }}>
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link1" style={{ color: 'black' }}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link1" style={{ color: 'black' }}>
                            Next
                        </button>
                    </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      {modalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Add</h2>
            <div>
              <label>Life Stage:</label>
              <input type="text"
                value={lifeStage}
                onChange={(e) => setLifeStage(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label>Description:</label>
              <input type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={buttonContainerStyle}>
              <button onClick={handleSaveButtonClick} style={saveButtonStyle}>Save</button>
              <button onClick={handleCloseButtonClick} style={closeButtonStyle}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 1000,
  width: '500px',
  height: '400px',
  overflow: 'auto',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px',
  width: '100%',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
};

const saveButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const closeButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default LifeStage;
