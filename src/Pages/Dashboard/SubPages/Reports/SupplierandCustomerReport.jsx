import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faFilter, faInfoCircle, faPrint } from '@fortawesome/free-solid-svg-icons';

const SupplierandCustomerReport = () => {
    const[data, setData] = useState([
        {contact:'ANISH', totalPurchase:'BD 400.000', totalPurchaseReturn:'BD 0.000',totalSale:'BD 0.000',totalSaleReturn:'BD 0.000',openingBalanceDue:'BD 0.000',due:'BD 0.000'}
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
    const [endDate, setEndDate] = useState(new Date());
    const handleDateChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Customers &amp; Suppliers Reports</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }} >
                  <h3 className="box-title">
                    <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="cg_customer_group_id"> Customer Group Name: </label>
                        <select className="form-control select2" style={{ width: "100%" }} id="cnt_customer_group_id"name="cnt_customer_group_id">
                          <option value="" selected="selected">
                            All
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select className="form-control select2"style={{ width: "100%" }}id="contact_type"name="contact_type">
                          <option value="" selected="selected">All</option>
                          <option value="customer">Customers</option>
                          <option value="supplier">Suppliers</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="cs_report_location_id">Location:</label>
                        <select className="form-control select2" style={{ width: "100%" }} id="cs_report_location_id"name="cs_report_location_id">
                          <option value="" selected="selected">All locations</option>
                          <option value={4}>POS APPLICATION</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="scr_contact_id">Contact:</label>
                        <select className="form-control select2" id="scr_contact_id" name="scr_contact_id">
                          <option selected="selected" value=""> All </option>
                          <option value={3}>Walk-In Customer - (CO0001)</option>
                          <option value={4}>test - (CO0002)</option>
                          <option value={23}> - Seeam(CO0003)</option>
                          <option value={24}>zamini - (CO0004)</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="scr_date_filter">Date Range:</label>
                        <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                        selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
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
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped"id="supplier_report_tbl">
                      <thead>
                        <tr>
                          <th>Contact</th>
                          <th>Total Purchase</th>
                          <th>Total Purchase Return</th>
                          <th>Total Sale</th>
                          <th>Total Sell Return</th>
                          <th>Opening Balance Due</th>
                          <th>
                            Due &nbsp;&nbsp;
                            <FontAwesomeIcon icon={faInfoCircle} data-toggle="tooltip" data-placement="bottom"
                              data-html="true"data-original-title="-ve value = Amount to pay <br> +ve value = Amount to receive"aria-hidden="true"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                    {currentItems.map((user, index) => (
                      <tr key={index}>
                        <td style={textStyle}>{user.contact}</td>
                        <td style={textStyle}>{user.totalPurchase}</td>
                        <td style={textStyle}>{user.totalPurchaseReturn}</td>
                        <td style={textStyle}>{user.totalSale}</td>
                        <td style={textStyle}>{user.totalSaleReturn}</td>
                        <td style={textStyle}>{user.openingBalanceDue}</td>
                        <td style={textStyle}>{user.due}</td>
                      </tr>
                    ))}
                  </tbody>
                      <tfoot>
                        <tr className="bg-gray font-17 footer-total text-center">
                          <td>
                            <strong>Total:</strong>
                          </td>
                          <td/>
                          <td/>
                          <td/>
                          <td/>
                          <td/>
                          <td/>
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
            </div>
          </div>
        </section>
      </div>
     <Footer/>
    </div>
  </div>
  )
}

export default SupplierandCustomerReport