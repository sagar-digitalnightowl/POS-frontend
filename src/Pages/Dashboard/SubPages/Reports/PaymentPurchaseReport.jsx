import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEye, faFileCsv, faFileExcel, faFilePdf, faFilter, faMapMarker, faPrint, faUser } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'

const PaymentPurchaseReport = () => {
    const[data, setData] = useState([
        {referenceNo:'PP2024/001', paidOn:'22/06/2024',amount:'1,00,000',supplier:'Anish',paymentMethod:'CASH',purchase:'PO2024/001'}
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
          <h1>Purchase Payment Report</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border"style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} aria-hidden="true" />  Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <form method="GET" action="#" acceptCharset="UTF-8" id="purchase_payment_report_form">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="supplier_id">Supplier:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faUser} />
                            </span>
                            <select className="form-control select2"required=""id="supplier_id"name="supplier_id">
                              <option selected="selected" value="">Please Select</option>
                              <option value={23}> - Seeam(CO0003)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faMapMarker} />
                            </span>
                            <select className="form-control select2"required=""id="location_id"name="location_id">
                              <option selected="selected" value="">Please Select
                              </option>
                              <option value={4}>POS APPLICATION</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_pr_date_filter">Date Range:</label>
                          <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                          selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                         />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>{" "}
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
                    <table className="table table-bordered table-striped"id="purchase_payment_report_table">
                      <thead>
                        <tr>
                          <th>Reference No</th>
                          <th>Paid on</th>
                          <th>Amount</th>
                          <th>Supplier</th>
                          <th>Payment Method</th>
                          <th>Purchase</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                      <td>{user.referenceNo}</td>
                      <td>{user.paidOn}</td>
                      <td>{user.amount}</td>
                      <td>{user.supplier}</td>
                      <td>{user.paymentMethod}</td>
                      <td>{user.purchase}</td>
                      <td>
                            <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${user.username}`)}>
                                <FontAwesomeIcon icon={faEye} />View
                            </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
                      <tfoot>
                        <tr className="bg-gray font-17 footer-total text-center">
                          <td colSpan={3}>
                            <strong>Total:</strong>
                          </td>
                          <td>
                            <span
                              className="display_currency"
                              id="footer_total_amount"
                              data-currency_symbol="true"
                            />
                          </td>
                          <td colSpan={4} />
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
        <section className="invoice print_section" id="receipt_section"></section>
      </div>
      <Footer/>
    </div>
  </div>
  )
}

export default PaymentPurchaseReport