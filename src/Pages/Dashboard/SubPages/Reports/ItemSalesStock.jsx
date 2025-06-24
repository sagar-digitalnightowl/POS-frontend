import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faSearch, faFilter, faDownload, faFilePdf, faFileCsv, faPrint, faFileExcel, faColumns } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer';

const ItemSalesStock = () => {
    const[data, setData] = useState([
        {item:'Sefam', lastMonthSalesQty:'6',avgFourMonthSalesQty:'0',currentStockLevel:'1024'}
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

    const textStyle= {color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
        <Header/>
        <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Item Sales and Stock Report</h1>
        </section>
        <section className="content no-print">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse" data-parent="#accordion"to="#collapseFilter">
                      <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <form method="GET"
                      action="https://medipro.affinity-me.com/reports/stock-report"
                      acceptCharset="UTF-8"id="product_sell_stock_report_form">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="location_id">Search Product:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <select className="form-control select2" required="" id="product_id"name="product_id">
                              <option selected="selected" value="">Please Select</option>
                              <option>Anish</option>
                              <option>Sefam</option>
                              <option >Mohit</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faMapMarker} />
                            </span>
                            <select className="form-control select2" required="" id="location_id"name="location_id">
                              <option selected="selected" value="">Please Select</option>
                              <option value={4}>POS APPLICATION </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_sr_date_filter"> Date Range:</label>
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
              <div className="nav-tabs-custom">
                <div className="tab-content">
                  <div>
                    <div className="btn-group" style={{ marginBottom: 10 }}>
                      <Link className="btn btn-success" to="https://medipro.affinity-me.com/items-sales-stock/download-excel"style={{ marginRight: 10 }}>
                      <FontAwesomeIcon icon={faDownload} /> Download Excel
                      </Link>
                      <Link to="https://medipro.affinity-me.com/items-sales-stock/download-pdf" className="btn btn-primary"title="PDF"target="_blank">
                      <FontAwesomeIcon icon={faFilePdf} /> Download Pdf
                      </Link>
                    </div>
                  </div>
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
                  <div className="tab-pane active" id="psr_detailed_tab">
                      <table className="table table-bordered table-striped" id="product_sell_and_stock_report_table">
                        <thead>
                          <tr>
                            <th>ITEM</th>
                            <th>Last month sales qty</th>
                            <th>Average 4 month sales qty</th>
                            <th>Current stock level</th>
                          </tr>
                        </thead>
                        <tbody>
                    {currentItems.map((user, index) => (
                      <tr key={index}>
                        <td style={textStyle}>{user.item}</td>
                        <td style={textStyle}>{user.lastMonthSalesQty}</td>
                        <td style={textStyle}>{user.avgFourMonthSalesQty}</td>
                        <td style={textStyle}>{user.currentStockLevel}</td>
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

export default ItemSalesStock