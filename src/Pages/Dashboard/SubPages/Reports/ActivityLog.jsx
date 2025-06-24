import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ActivityLog = () => {
  const[data, setData] = useState([
    {subjectType:'User',action:'Login', by:'POS APPLICATION ADMIN'},
    {subjectType:'User',action:'Login', by:'POS APPLICATION ADMIN'},
    {subjectType:'User',action:'Login', by:'POS APPLICATION ADMIN'},
    {subjectType:'User',action:'Login', by:'POS APPLICATION ADMIN'},
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
          <h1>Activity Log</h1>
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
                <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="al_users_filter">By:</label>
                        <select className="form-control select2"style={{ width: "100%" }}id="al_users_filter"name="al_users_filter">
                          <option selected="selected" value="">All</option>
                          <option value={4}> POS APPLICATION ADMIN </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="subject_type">Subject Type:</label>
                        <select className="form-control select2"style={{ width: "100%" }}id="subject_type"name="subject_type">
                          <option selected="selected" value="">All</option>
                          <option value="contact">Contact</option>
                          <option value="user">User</option>
                          <option value="sell">Sell</option>
                          <option value="purchase">Purchase</option>
                          <option value="sales_order">Sales Order</option>
                          <option value="purchase_order">Purchase Order</option>
                          <option value="sell_return">Sell Return</option>
                          <option value="purchase_return">Purchase Return</option>
                          <option value="sell_transfer">Stock Transfer</option>
                          <option value="stock_adjustment">Stock Adjustment</option>
                          <option value="expense">Expense</option>
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
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped"id="activity_log_table">
                      <thead>
                        <tr>
                          <th>Invoice Date</th>
                          <th>Subject Type</th>
                          <th>Action</th>
                          <th>By</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                      <td>{user.invoiceDate}</td>
                      <td>{user.subjectType}</td>
                      <td>{user.action}</td>
                      <td>{user.by}</td>
                      <td>{user.note}</td>
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
      <Footer/>
    </div>
  </div>
  )
}
export default ActivityLog