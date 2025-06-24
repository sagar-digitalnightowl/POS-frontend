import React, { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Subscription = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
const textStyle = {color:"black"}
return(
<div>
  <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Active Subscription </h3>
          </div>
          <div className="box-body">
            <div className="col-md-4">
              <div className="box box-success">
                <div className="box-header with-border text-center">
                  <h2 className="box-title">Professional ERP with NHRA</h2>
                  <div className="box-tools pull-right">
                    <span className="badge bg-green">Running </span>
                  </div>
                </div>
                <div className="box-body text-center">
                  Start Date : 29/10/2023 <br />
                  End Date : 29/10/2024 <br />
                  Remaining 116 day(s)
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="clearfix" />
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">All Subscriptions</h3>
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
            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover"id="all_subscriptions_table">
                    <thead>
                      <tr>
                        <th>Package Name </th>
                        <th>Start Date</th>
                        <th>Trial End Date</th>
                        <th>End Date</th>
                        <th>Price</th>
                        <th>Paid Via</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Created By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (currentItems.map((group, index) => (
                        <tr key={index}>
                          <td>{group.packageName}</td>
                          <td>{group.startDate}</td>
                          <td>{group.trialEndDate}</td>
                          <td>{group.endDate}</td>
                          <td>{group.price}</td>
                          <td>{group.paidVia}</td>
                          <td>{group.transactionId}</td>
                          <td>{group.status}</td>
                          <td>{group.creditedAt}</td>
                          <td>{group.creditedBy}</td>
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
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Packages</h3>
          </div>
          <div className="box-body">
            <div className="col-md-4">
              <div className="box box-success hvr-grow-shadow">
                <div className="box-header with-border text-center">
                  <h2 className="box-title">Basic nhra</h2>
                </div>
                <div className="box-body text-center">
                  <i className="fa fa-check text-success" />
                  1 Business Locations <br />
                  <br />
                  <i className="fa fa-check text-success" />
                  2 Users <br />
                  <br />
                  <i className="fa fa-check text-success" />
                  1000 Products <br />
                  <br />
                  <i className="fa fa-check text-success" />
                  1000 Invoices <br />
                  <br />
                  <i className="fa fa-check text-success" />5 Trial Days <br />
                  <br />
                  <h3 className="text-center">
                    <span className="display_currency"data-currency_symbol="true">500.0000</span>
                    <small>/ 1 Years</small>
                  </h3>
                </div>
                <div className="box-footer bg-gray disabled text-center">
                  <Link to="https://medipro.affinity-me.com/subscription/7/pay"className="btn btn-block btn-success">
                    Pay &amp; Subscribe
                  </Link>
                  NHRA
                </div>
              </div>
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
export default Subscription