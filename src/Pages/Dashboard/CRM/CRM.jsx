import React, { useState } from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import Footer from "../../../Components/Footer";
import NavbarCrm from "./NavbarCrm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";

const CRM = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const textStyle = {color:'black'}
    return(
<div>
  <div className="wrapper thetop" style={textStyle}>
   <Header/>
   <Sidebar/>
    <div className=" content-wrapper ">
      <section className="no-print">
        <NavbarCrm/>
      </section>
      <section className="content no-print">
        <div className="row">
          <div className="col-md-4">
            <div className="col-md-12">
              <div className="info-box info-box-new-style">
                <span className="info-box-icon bg-aqua">
                  <i className="fas fa-calendar-check" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Today's Follow ups</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="info-box info-box-new-style">
                <span className="info-box-icon bg-aqua">
                  <i className="fas fa-user-check" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">My Leads</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="info-box info-box-new-style">
                <span className="info-box-icon bg-aqua">
                  <i className="fas fa-exchange-alt" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">
                    My leads to customer conversion
                  </span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box box-solid">
              <div className="box-header with-border">
                <h3 className="box-title">My Follow ups</h3>
              </div>
              <div className="box-body p-10">
                <table className="table no-margin">
                  <tbody>
                    <tr>
                      <th>Scheduled</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Open</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Cancelled</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Completed</th>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row row-custom">
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-aqua">
                <i className="fas fa-user-friends" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Customers</span>
                <span className="info-box-number">3</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-aqua">
                <i className="fas fa-user-check" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Leads</span>
                <span className="info-box-number">0</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-yellow">
                <i className="fas fa fa-search" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Sources</span>
                <span className="info-box-number">0</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-yellow">
                <i className="fas fa-life-ring" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Life Stages</span>
                <span className="info-box-number invoice_due">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="box box-solid">
              <div className="box-body p-10">
                <table className="table no-margin">
                  <thead>
                    <tr>
                      <th>Sources</th>
                      <th>Total</th>
                      <th>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="text-center">
                        No data
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box box-solid">
              <div className="box-body p-10">
                <table className="table no-margin">
                  <thead>
                    <tr>
                      <th>Life Stages</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="text-center">
                        No data
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box box-solid">
              <div className="box-header with-border">
                <i className="fas fa fa-birthday-cake" />
                <h3 className="box-title">Birthdays</h3>
                <Link data-href="https://medipro.affinity-me.com/crm/campaigns/create"
                  className="btn btn-success btn-xs"id="wish_birthday">
                  <i className="fas fa-paper-plane" />
                  Send wishes
                </Link>
              </div>
              <div className="box-body p-10">
                <table className="table no-margin table-striped">
                  <caption>Today</caption>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="text-center">No data</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table no-margin table-striped">
                  <caption>Upcoming </caption>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Birthday on</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">No data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Follow ups by user</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-3">
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
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="followup_category_id">
                        Followup Category:*
                      </label>
                      <select className="form-control select2"style={{ width: "100%" }}id="followup_category_id"name="followup_category_id">
                        <option selected="selected" value="">
                          All
                        </option>
                      </select>
                    </div>
                  </div>
                  <br />
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
                      <th>None </th>
                      <th>Total follow ups </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
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
            <div className="table-responsive">
                  <table className="table table-bordered table-striped"id="lead_to_customer_conversion"style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Converted By</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                  </table>
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
export default  CRM