import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFilter, faUser, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RegularSalesSheet = () => {
    const[data, setData] = useState([
        {accountName:'Anish Kumar', representativeName:'Test', location:'POS APPLIACTION'}
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
          <h1>Regular Sales Sheet Report</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border"style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                      <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                  <div className="box-body">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_representative_id">Representative:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faUser} />
                          </span>
                          <select className="form-control select2" id="ir_representative_id"name="ir_representative_id">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_customer_id">Customer:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faUser} />
                          </span>
                          <select className="form-control select2" id="ir_customer_id"name="ir_customer_id">
                            <option selected="selected" value=""> All</option>
                            <option value={3}>- Walk-In Customer (CO0001)</option>
                            <option value={4}> - test (CO0002)</option>
                            <option value={24}> - zamini (CO0004)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="sale_date_filter">Sell Date:</label>
                        <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                        selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                    />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_location_id">Business Location:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faMapMarker} />
                          </span>
                          <select className="form-control select2" required="" id="location_id"name="ir_location_id">
                            <option selected="selected" value=""> Please Select</option>
                            <option value={4}> POS APPLICATION </option>
                          </select>
                        </div>
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
                    <table className="table table-bordered table-striped" id="regular_sales_sheet_report_table">
                      <thead>
                        <tr>
                          <th>Account Name</th>
                          <th>Invoice date</th>
                          <th>Representative Name</th>
                          <th>Invoice Number</th>
                          <th>Item Description</th>
                          <th>Item Quantity</th>
                          <th>Location</th>
                          <th>Value</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                    {currentItems.map((user, index) => (
                      <tr key={index}>
                        <td style={textStyle}>{user.accountName}</td>
                        <td style={textStyle}>{user.invoicedate}</td>
                        <td style={textStyle}>{user.representativeName}</td>
                        <td style={textStyle}>{user.invoiceNumber}</td>
                        <td style={textStyle}>{user.itemDescription}</td>
                        <td style={textStyle}>{user.itemQuantity}</td>
                        <td style={textStyle}>{user.location}</td>
                        <td style={textStyle}>{user.value}</td>
                        <td style={textStyle}>{user.subTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                      <tfoot>
                        <tr className="bg-gray font-17 text-center footer-total">
                          <td colSpan={6}>
                            <strong>Total:</strong>
                          </td>
                          <td id="footer_total_qty" />
                          <td id="footer_total_sp"className="display_currency"data-currency_symbol="true"/>
                          <td id="footer_total_subtotal" className="display_currency" data-currency_symbol="true"/>
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
        </section>
      </div>
    </div>
  </div>
  )
}

export default RegularSalesSheet