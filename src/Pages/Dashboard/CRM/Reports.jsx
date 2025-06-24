import React, { useState } from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'
import NavbarCrm from './NavbarCrm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'

const Reports = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
        <Header/>
        <Sidebar/>
      <div className=" content-wrapper ">
        <section className="no-print">
          <NavbarCrm/>
        </section>
        <section className="content-header no-print">
          <h1>Reports</h1>
        </section>
        <section className="content no-print">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Follow ups by user</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="follow_up_user_date_range">
                          Date Range:
                        </label>
                        <input
                          placeholder="Select a date range"
                          className="form-control"
                          readOnly=""
                          name="follow_up_user_date_range"
                          type="text"
                          id="follow_up_user_date_range"
                        />
                      </div>
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
                  <table className="table table-bordered table-striped"id="follow_ups_by_user_table"style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Scheduled</th>
                        <th>Open</th>
                        <th>Cancelled</th>
                        <th>Completed</th>
                        <th>Others </th>
                        <th>Total follow ups </th>
                      </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                            <tr key={index}>
                                <td>
                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </td>
                                <td>{group.user}</td>
                                <td>{group.schedule}</td>
                                <td>{group.open}</td>
                                <td>{group.cancelled}</td>
                                <td>{group.completed}</td>
                                <td>{group.others}</td>
                                <td>{group.totalFollowUp}</td>
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Follow ups by contacts</h3>
                </div>
                <div className="box-body">
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
                  <table className="table table-bordered table-striped"id="follow_ups_by_contact_table"style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Contact</th>
                        <th>Scheduled</th>
                        <th>Open</th>
                        <th>Cancelled</th>
                        <th>Completed</th>
                        <th>Others </th>
                        <th>Total follow ups </th>
                      </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                            <tr key={index}>
                                <td>
                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </td>
                                <td>{group.contact}</td>
                                <td>{group.schedule1}</td>
                                <td>{group.openq1}</td>
                                <td>{group.cancelled1}</td>
                                <td>{group.completed1}</td>
                                <td>{group.others1}</td>
                                <td>{group.totalFollowUp1}</td>
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
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Leads to customer conversion</h3>
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
                  <table className="table table-bordered table-striped"id="lead_to_customer_conversion"style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Converted By</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                            <tr key={index}>
                                <td>
                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </td>
                                <td>{group.convertedBy}</td>
                                <td>{group.total}</td>
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
          </div>
        </section>
      </div>
    <Footer/>
    </div>
  </div>
  )
}

export default Reports