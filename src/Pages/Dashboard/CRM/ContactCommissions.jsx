import React, { useState } from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faFilter, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'

const ContactCommissions = () => {
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
          <h1>Commissions</h1>
        </section>
        <section className="content no-print">
          <div className="box  box-solid " id="accordion">
            <div className="box-header with-border" style={{ cursor: "pointer" }}>
              <h3 className="box-title">
                <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                <FontAwesomeIcon icon={faFilter} /> Filters
                </Link>
              </h3>
            </div>
            <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
              <div className="box-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="contact_id_filter">Contact:</label>
                      <select className="form-control select2"id="contact_id_filter"name="contact_id_filter">
                        <option selected="selected" value="">All</option>
                        <option value={3}> - Walk-In Customer (CO0001)</option>
                        <option value={4}> - test (CO0002)</option>
                        <option value={23}>Seeam - (CO0003)</option>
                        <option value={24}> - zamini (CO0004)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="crm_contact_id">Contact person:</label>
                      <select className="form-control select2"id="crm_contact_id"name="crm_contact_id">
                        <option selected="selected" value="">All</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="location_id">Location:</label>
                      <select className="form-control select2"id="location_id"name="location_id">
                        <option selected="selected" value="">All</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="commission_date_range">Date Range:</label>
                      <input
                        placeholder="Select a date range"
                        className="form-control"
                        readOnly=""
                        name="commission_date_range"
                        type="text"
                        id="commission_date_range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="box box-primary">
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
              <div className="table-responsive">
                <table className="table table-bordered table-striped"id="commission_table"style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Invoice Date</th>
                      <th>Contact</th>
                      <th>Name</th>
                      <th>Mobile Number</th>
                      <th>Invoice No.</th>
                      <th>Location</th>
                      <th>Total commission</th>
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
                                                <td>{group.invoiceDate}</td>
                                                <td>{group.contact}</td>
                                                <td>{group.name}</td>
                                                <td>{group.mobileNo}</td>
                                                <td>{group.invoiceNo}</td>
                                                <td>{group.location}</td>
                                                <td>{group.totalCommission}</td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                                        </tr>
                                        )}
                                    </tbody>
                  <tbody />
                  <tfoot>
                    <tr className="bg-gray font-17 footer-total text-center">
                      <td colSpan={6}>
                        <strong>Total:</strong>
                      </td>
                      <td className="footer_total_commission" />
                    </tr>
                  </tfoot>
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
      <Footer/>
    </div>
  </div>
  )
}

export default ContactCommissions