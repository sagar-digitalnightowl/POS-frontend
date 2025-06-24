import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faColumns, faFileCsv, faFileExcel, faFilePdf, faFilter, faPrint, faSync } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'

const SalesRepresentativeReport = () => {
  const [activeTab, setActiveTab] = useState('sr_sales_tab');

  const handleTabChange = (tabId) => {setActiveTab(tabId);
};

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
          <h1>Sales Representative Report</h1>
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
                    <form method="GET"action="https://medipro.affinity-me.com/reports/stock-report"acceptCharset="UTF-8"id="sales_representative_filter_form">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="sr_id">User:</label>
                          <select className="form-control select2" style={{ width: "100%" }}id="sr_id"name="sr_id">
                            <option selected="selected" value=""> All Users</option>
                            <option value={4}> POS APPLICATION</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="sr_business_id"> Business Location:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="sr_business_id"name="sr_business_id">
                            <option value="" selected="selected"> All locations </option>
                            <option value={4}>POS APPLICATION</option>
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
            <div className="col-sm-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Summary</h3>
                </div>
                <div className="box-body">
                  <h3 className="text-muted">
                    Total Sale - Total Sales Return:
                    <span id="sr_total_sales">
                      <FontAwesomeIcon icon={faSync} />
                    </span>
                    -
                    <span id="sr_total_sales_return">
                      <FontAwesomeIcon icon={faSync} />
                    </span>
                    =
                    <span id="sr_total_sales_final">
                      <FontAwesomeIcon icon={faSync} />
                    </span>
                  </h3>
                  <div className="hide" id="total_payment_with_commsn_div">
                    <h3 className="text-muted">
                      Total payment with commission:
                      <span id="total_payment_with_commsn">
                        <FontAwesomeIcon icon={faSync} />
                      </span>
                    </h3>
                  </div>
                  <div className="hide" id="total_commission_div">
                    <h3 className="text-muted">
                      Total Sale Commission:
                      <span id="sr_total_commission">
                        <FontAwesomeIcon icon={faSync} />
                      </span>
                    </h3>
                  </div>
                  <div className="hide" id="total_expense_div">
                    <h3 className="text-muted">
                      Total Paid Direct:
                      <span id="expense_total_commission">
                        <FontAwesomeIcon icon={faSync} />
                      </span>
                    </h3>
                  </div>
                  <h3 className="text-muted">
                    Total Expense:
                    <span id="sr_total_expenses">
                      <FontAwesomeIcon icon={faSync} />
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                <li className={activeTab === 'sr_sales_tab' ? 'active' : ''}>
                <Link to="#sr_sales_tab" onClick={() => handleTabChange('sr_sales_tab')} data-toggle="tab" aria-expanded="true">
                  <FontAwesomeIcon icon={faCog} aria-hidden="true" /> Sales Added
                </Link>
              </li>
              <li className={activeTab === 'sr_commission_tab' ? 'active' : ''}>
                <Link to="#sr_commission_tab" onClick={() => handleTabChange('sr_commission_tab')} data-toggle="tab" aria-expanded="true">
                  <FontAwesomeIcon icon={faCog} aria-hidden="true" /> Sales With Commission
                </Link>
              </li>
              <li className={activeTab === 'sr_expenses_tab' ? 'active' : ''}>
                <Link to="#sr_expenses_tab" onClick={() => handleTabChange('sr_expenses_tab')} data-toggle="tab" aria-expanded="true">
                  <FontAwesomeIcon icon={faCog} aria-hidden="true" /> Expenses
                </Link>
              </li>
                </ul>
                <div className="tab-content">
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
                <div className={`tab-pane ${activeTab === 'sr_sales_tab' ? 'active' : ''}`} id="sr_sales_tab">
                  <div className="table-responsive"  style={{ overflowX: 'auto' }}>
                      <table className="table table-bordered table-striped"id="sr_sales_report"style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Customer name</th>
                            <th>Location</th>
                            <th>Payment Status</th>
                            <th>Total amount</th>
                            <th>Total paid</th>
                            <th>Total remaining</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td id="sr_footer_payment_status_count" />
                            <td>
                              <span className="display_currency" id="sr_footer_sale_total" data-currency_symbol="true"/>
                            </td>
                            <td>
                              <span className="display_currency" id="sr_footer_total_paid"data-currency_symbol="true"/>
                            </td>
                            <td className="text-left">
                              <small>
                                Sell Due -
                                <span className="display_currency"id="sr_footer_total_remaining"data-currency_symbol="true"/>
                                <br />
                                Sell Return Due -
                                <span className="display_currency"id="sr_footer_total_sell_return_due"data-currency_symbol="true"/>
                              </small>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>{" "}
                  </div>
                  <div className={`tab-pane ${activeTab === 'sr_commission_tab' ? 'active' : ''}`} id="sr_commission_tab">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped"id="sr_sales_with_commission_table"style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Customer name</th>
                            <th>Location</th>
                            <th>Payment Status</th>
                            <th>Total amount</th>
                            <th>Total paid</th>
                            <th>Total remaining</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td id="footer_payment_status_count" />
                            <td>
                              <span className="display_currency"id="footer_sale_total"data-currency_symbol="true"/>
                            </td>
                            <td>
                              <span className="display_currency" id="footer_total_paid"data-currency_symbol="true"/>
                            </td>
                            <td className="text-left">
                              <small>
                                Sell Due -{" "}
                                <span className="display_currency"id="footer_total_remaining"data-currency_symbol="true"/>
                                <br />
                                Sell Return Due -{" "}
                                <span className="display_currency" id="footer_total_sell_return_due"data-currency_symbol="true"/>
                              </small>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>{" "}
                  </div>
                  <div className={`tab-pane ${activeTab === 'sr_expenses_tab' ? 'active' : ''}`} id="sr_expenses_tab">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped"id="sr_expenses_report"style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Reference No</th>
                            <th>Expense Category</th>
                            <th>Location</th>
                            <th>Payment Status</th>
                            <th>Total amount</th>
                            <th>Expense for</th>
                            <th>Expense note</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 text-center footer-total">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td id="er_footer_payment_status_count" />
                            <td>
                              <span className="display_currency"id="footer_expense_total"data-currency_symbol="true"/>
                            </td>
                            <td colSpan={2} />
                          </tr>
                        </tfoot>
                      </table>
                    </div>
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

export default SalesRepresentativeReport