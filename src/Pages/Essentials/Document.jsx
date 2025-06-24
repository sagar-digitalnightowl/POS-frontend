import React, { useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import EssentialHeader from './EssentialHeader'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'

const Document = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const textStyle = { color: 'black' };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <EssentialHeader />
          </section>
          <section className="content">
            <h4>
              All documents <small> Manage all your documents</small>
            </h4>
            <div className="box box-solid">
              <div className="box-header">
                <h4 className="box-title">All documents</h4>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-sm btn-primary add_doc" onClick={toggleFormVisibility}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add
                  </button>
                </div>
              </div>
              {showForm && ( // Conditionally render the form
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form method="POST" action="https://medipro.affinity-me.com/essentials/document" acceptCharset="UTF-8" id="upload_document_form" encType="multipart/form-data">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="name">Document:*</label>
                                <input required="" accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png" name="name" type="file" id="name" />
                                <p className="help-block">
                                  <br />
                                  Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                </p>
                              </div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea className="form-control" rows={4} cols={50} name="description" id="description" defaultValue={""} />
                              </div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-sm-4">
                              <button type="submit" className="btn btn-primary btn-sm">
                                Submit
                              </button>
                              &nbsp;
                              <button type="button" className="btn btn-danger btn-sm cancel_btn" onClick={toggleFormVisibility}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                        <br />
                        <hr />
                      </form>
                    </div>
                  </div>
                </div>
              )}
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped documents">
                        <thead>
                          <tr>
                            <th> Name</th>
                            <th> Description</th>
                            <th> Uploaded Date</th>
                            <th> Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.uploadedDate}</td>
                              <td>
                                {/* Add appropriate actions here */}
                              </td>
                            </tr>
                          ))}
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
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Document;
