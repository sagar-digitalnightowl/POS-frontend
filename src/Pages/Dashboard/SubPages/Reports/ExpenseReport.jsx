import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { faColumns, faEye, faFileCsv, faFileExcel, faFilePdf, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../../../Components/Footer'


const Expensereport = () => {
    const[data, setData] = useState([
        {expenseCategory:'001', totalExpense:'2940.000'}
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
    <div><>
    <div className="wrapper thetop" style={textStyle}>
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Expense Report</h1>
        </section>
        <section className="content">
          <div className="row no-print">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                      <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <form method="GET"action="https://medipro.affinity-me.com/reports/expense-report"acceptCharset="UTF-8">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="location_id"name="location_id">
                            <option value="" selected="selected">All locations
                            </option>
                            <option value={4}>POS APPLICATION</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="category_id">Category:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="category_id"name="category">
                            <option selected="selected" value="">All</option>
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
                      <div className="col-sm-12">
                        <button type="submit"className="btn btn-primary pull-right">Apply Filters</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-body">
                  <div style={{ height: "400px !important" }}/>
                  <div id="dhfkaurqcmxobtylvjgnsewzi_loader"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      opacity: 1,
                      alignItems: "center",
                      height: 400
                    }}
                  >
                    <svg
                      width={50}
                      height={50}
                      viewBox="0 0 38 38"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="8.042%"
                          y1="0%"
                          x2="65.682%"
                          y2="23.865%"
                          id="a"
                        >
                          <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                          <stop
                            stopColor="#22292F"
                            stopOpacity=".631"
                            offset="63.146%"
                          />
                          <stop stopColor="#22292F" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)">
                          <path
                            d="M36 18c0-9.94-8.06-18-18-18"
                            id="Oval-2"
                            stroke="url(#a)"
                            strokeWidth={2}
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="0.9s"
                              repeatCount="indefinite"
                            />
                          </path>
                          <circle fill="#22292F" cx={36} cy={18} r={1}>
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="0.9s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </g>
                      </g>
                    </svg>
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
                  <table className="table" id="expense_report_table">
                    <thead>
                      <tr>
                        <th>Expense Categories</th>
                        <th>Total Expense</th>
                      </tr>
                    </thead>
                    <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                      <td>{user.expenseCategory}</td>
                      <td>{user.totalExpense}</td>
                    </tr>
                  ))}
                </tbody>
                    <tfoot>
                      <tr>
                        <td>Total</td>
                        <td>
                          <span className="display_currency" data-currency_symbol="true">
                            0
                          </span>
                        </td>
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
              </div>{" "}
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  </>
  </div>
  )
}

export default Expensereport