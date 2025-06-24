import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { Link } from 'react-router-dom'

const ListSellReturn = () => {
    const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
    const [endDate, setEndDate] = useState(new Date());
  
    const handleDateChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const textStyle={color:"black"}
  return (
<div style={textStyle}>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header no-print">
        <h1>Sell Return </h1>
      </section>
      <section className="content no-print">
        <div className="box  box-solid " id="accordion">
          <div className="box-header with-border" style={{ cursor: "pointer" }}>
            <h3 className="box-title">
              <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                <i className="fa fa-filter" aria-hidden="true" /> Filters
              </Link>
            </h3>
          </div>
          <div id="collapseFilter" className="panel-collapse active collapse  in "aria-expanded="true">
            <div className="box-body">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_location_id">Business Location:</label>
                  <select className="form-control select2"style={{ width: "100%" }}id="sell_list_filter_location_id"name="sell_list_filter_location_id">
                    <option selected="selected" value="">All</option>
                    <option value={4}>MIDDLE PEARL TRADING COMPANY W.L.L (BL0001)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_customer_id">
                    Customer:
                  </label>
                  <select className="form-control select2"style={{ width: "100%" }}id="sell_list_filter_customer_id"name="sell_list_filter_customer_id">
                    <option selected="selected" value="">All</option>
                    <option value={3}> - Walk-In Customer (CO0001)</option>
                    <option value={4}> - test (CO0002)</option>
                    <option value={24}> - zamini (CO0004)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_date_range">Date Range:</label>
                  <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                    selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="created_by">User:</label>
                  <select className="form-control select2" style={{ width: "100%" }} id="created_by" name="created_by">
                    <option value="" selected="selected">All</option>
                    <option value={4}> POS APPLICATION ADMIN </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">Sell Return</h3>
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
              <table className="table table-bordered table-striped ajax_view" id="sell_return_table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Invoice No.</th>
                    <th>Parent Sale</th>
                    <th>Customer name</th>
                    <th>Location</th>
                    <th>Payment Status</th>
                    <th>Total amount</th>
                    <th>Payment due</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (currentItems.map((group, index) => (
                        <tr key={index}>
                            <td>{group.date}</td>
                            <td>{group.invoiceNo}</td>
                            <td>{group.parentSale}</td>
                            <td>{group.customername}</td>
                            <td>{group.Location}</td>
                            <td>{group.PaymentStatus}</td>
                            <td>{group.TotalAmount}</td>
                            <td>{group.PaymentDue}</td>
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
                <tfoot>
                  <tr className="bg-gray font-17 text-center footer-total">
                    <td colSpan={5}>
                      <strong>Total:</strong>
                    </td>
                    <td id="footer_payment_status_count_sr" />
                    <td>
                      <span className="display_currency" id="footer_sell_return_total" data-currency_symbol="true"/>
                    </td>
                    <td>
                      <span className="display_currency" id="footer_total_due_sr" data-currency_symbol="true"/>
                    </td>
                    <td />
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

export default ListSellReturn