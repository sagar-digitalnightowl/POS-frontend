import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faEye, faFileCsv, faFileExcel, faFilePdf, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer';

const RegisterReport = () => {
  const[data, setData] = useState([
    {openTime:'24/06/2024',closeTime:'24/06/2024',location:'POS APPLICATION',user:'Anish kumar anish@test.com',totalCardSlips:'BD 0.00', totalCheque:'BD 0.00', totalBankTransfer:'BD 0.00'}
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
          <h1>Register Report</h1>
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
                    <form method="GET"
                      action="https://medipro.affinity-me.com/reports/stock-report"
                      acceptCharset="UTF-8"id="register_report_filter_form">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="register_user_id">User:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="register_user_id"name="register_user_id">
                            <option selected="selected" value="">All Users</option>
                            <option value={4}> POS ADMIN </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="register_status">Status:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="register_status"name="register_status">
                            <option selected="selected" value="">All</option>
                            <option value="open">Open</option>
                            <option value="close">Close</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="spr_date_filter">Date Range:</label>
                            <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                            selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                            />
                        </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-body" style={{ overflowX: 'auto' }}>
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
                  <table className="table table-bordered table-striped"id="register_report_table">
                    <thead>
                      <tr>
                        <th>Open Time</th>
                        <th>Close Time</th>
                        <th>Location</th>
                        <th>User</th>
                        <th>Total Card Slips</th>
                        <th>Total cheques</th>
                        <th>Total Cash</th>
                        <th>Total bank transfer</th>
                        <th>Total advance payment</th>
                        <th>Benefit Pay</th>
                        <th>Custom Payment 1</th>
                        <th>Custom Payment 2</th>
                        <th>Custom Payment 3</th>
                        <th>Custom Payment 4</th>
                        <th>Custom Payment 5</th>
                        <th>Other Payments</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                      <td>{user.openTime}</td>
                      <td>{user.closeTime}</td>
                      <td>{user.location}</td>
                      <td>{user.user}</td>
                      <td>{user.totalCardSlips}</td>
                      <td>{user.totalCheque}</td>
                      <td>{user.totalCash}</td>
                      <td>{user.totalBankTransfer}</td>
                      <td>{user.totalAdvancedPayment}</td>
                      <td>{user.benefitPay}</td>
                      <td>{user.customePayment2}</td>
                      <td>{user.customePayment3}</td>
                      <td>{user.customePayment3}</td>
                      <td>{user.customePayment4}</td>
                      <td>{user.customePayment5}</td>
                      <td>{user.otherPayments}</td>
                      <td>{user.total}</td>
                      <td>
                            <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${user.username}`)}>
                                <FontAwesomeIcon icon={faEye} />View
                            </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
                    <tfoot>
                      <tr className="bg-gray font-17 text-center footer-total">
                        <td colSpan={4}>
                          <strong>Total:</strong>
                        </td>
                        <td className="footer_total_card_payment" />
                        <td className="footer_total_cheque_payment" />
                        <td className="footer_total_cash_payment" />
                        <td className="footer_total_bank_transfer_payment" />
                        <td className="footer_total_advance_payment" />
                        <td className="footer_total_custom_pay_1" />
                        <td className="footer_total_custom_pay_2" />
                        <td className="footer_total_custom_pay_3" />
                        <td className="footer_total_custom_pay_4" />
                        <td className="footer_total_custom_pay_5" />
                        <td className="footer_total_custom_pay_6" />
                        <td className="footer_total_custom_pay_7" />
                        <td className="footer_total_other_payments" />
                        <td className="footer_total" />
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
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  </div>
  )
}

export default RegisterReport