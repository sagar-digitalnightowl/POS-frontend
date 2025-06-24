import React, { useState } from 'react';
import Header from '../../../../Components/Header';
import Sidebar from '../../../../Components/Sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faArrowCircleUp, faFilter, faInfoCircle, faMapMarker, faMinusCircle, faPrint, faSync, faUser } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 10;

const TaxReport = () => {
  const [activeTab, setActiveTab] = useState('#input_tax_tab');
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [inputTaxData] = useState([
    { date: '2024-06-01', referenceNo: 'INV123', supplier: 'Supplier A', taxNumber: 'TN123', totalAmount: 100, paymentMethod: 'Credit Card', discount: 5 },
  ]);
  const [outputTaxData] = useState([
    { date: '2024-06-02', invoiceNo: 'INV124', customer: 'Customer B', taxNumber: 'TN124', totalAmount: 200, paymentMethod: 'Cash', discount: 10 },
  ]);
  const [expenseTaxData] = useState([
    { date: '2024-06-03', referenceNo: 'EXP125', taxNumber: 'TN125', totalAmount: 150, paymentMethod: 'Bank Transfer' },
  ]);

  const [inputTaxPage, setInputTaxPage] = useState(0);
  const [outputTaxPage, setOutputTaxPage] = useState(0);
  const [expenseTaxPage, setExpenseTaxPage] = useState(0);

  const handleInputTaxPageClick = ({ selected }) => setInputTaxPage(selected);
  const handleOutputTaxPageClick = ({ selected }) => setOutputTaxPage(selected);
  const handleExpenseTaxPageClick = ({ selected }) => setExpenseTaxPage(selected);

  const textStyle = { color: 'black' };

  const renderTableRows = (data, page) => {
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={index}>
        <td style={textStyle}>{item.date}</td>
        <td style={textStyle}>{item.referenceNo}</td>
        <td style={textStyle}>{item.supplier}</td>
        <td style={textStyle}>{item.taxNumber}</td>
        <td style={textStyle}>{item.totalAmount}</td>
        <td style={textStyle}>{item.paymentMethod}</td>
        {item.discount !== undefined && <td style={textStyle}>{item.discount}</td>}
      </tr>
    ));
  };

  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Tax Report <small>Tax details for the selected date range</small>
            </h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-solid" id="accordion">
                  <div className="box-header with-border" style={{ cursor: 'pointer' }}>
                    <h3 className="box-title">
                      <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                        <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                      </Link>
                    </h3>
                  </div>
                  <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                    <div className="box-body">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="ir_customer_id">Contact:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <FontAwesomeIcon icon={faUser} />
                            </span>
                            <select className="form-control select2" id="ir_customer_id" name="ir_customer_id">
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value={3}>- Walk-In Customer (CO0001)</option>
                              <option value={4}> - test (CO0002)</option>
                              <option value={24}> - zamini (CO0004)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="item_sale_date_filter">Sell Date:</label>
                          <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            placeholderText="Select a date range"
                            className="form-control"
                            id="sell_list_filter_date_range"
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
                            <select className="form-control select2" required="" id="location_id" name="ir_location_id">
                              <option selected="selected" value="">
                                Please Select
                              </option>
                              <option value={4}> POS APPLICATION </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{' '}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="box box-solid">
                  <div className="box-header">
                    <h3 className="box-title">
                      Overall (Input - Output - Expense){' '}
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="Difference between total tax collected and total tax paid within the selected time period."
                        data-html="true"
                        data-trigger="hover"
                      />
                    </h3>
                  </div>
                  <div className="box-body">
                    <h3 className="text-muted">
                      Output Tax - Input Tax - Expense Tax:
                      <span className="tax_diff">
                        <FontAwesomeIcon icon={faSync} spin />
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-print">
              <div className="col-sm-12">
                <button type="button" className="btn btn-primary pull-right" aria-label="Print" onClick={() => window.print()}>
                  <FontAwesomeIcon icon={faPrint} /> Print
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className={activeTab === '#input_tax_tab' ? 'active' : ''}>
                      <Link to="#input_tax_tab" onClick={() => setActiveTab('#input_tax_tab')}>
                        <FontAwesomeIcon icon={faArrowCircleDown} aria-hidden="true" />
                        Input Tax
                      </Link>
                    </li>
                    <li className={activeTab === '#output_tax_tab' ? 'active' : ''}>
                      <Link to="#output_tax_tab" onClick={() => setActiveTab('#output_tax_tab')}>
                        <FontAwesomeIcon icon={faArrowCircleUp} aria-hidden="true" />
                        Output Tax
                      </Link>
                    </li>
                    <li className={activeTab === '#expense_tax_tab' ? 'active' : ''}>
                      <Link to="#expense_tax_tab" onClick={() => setActiveTab('#expense_tax_tab')}>
                        <FontAwesomeIcon icon={faMinusCircle} aria-hidden="true" />
                        Expense Tax
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div                 id="input_tax_tab">
                      <table className="table table-bordered table-striped" id="input_tax_table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Reference No</th>
                            <th>Supplier</th>
                            <th>Tax number</th>
                            <th>Total amount</th>
                            <th>Payment Method</th>
                            <th>Discount</th>
                          </tr>
                        </thead>
                        <tbody>{renderTableRows(inputTaxData, inputTaxPage)}</tbody>
                        <tfoot>
                          <tr className="bg-gray font-17 text-center footer-total">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td>
                              <span className="display_currency" id="sell_total" data-currency_symbol="true" />
                            </td>
                            <td className="input_payment_method_count" />
                            <td>&nbsp;</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div style={{ textAlign: 'right' }}>
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          pageCount={Math.ceil(inputTaxData.length / ITEMS_PER_PAGE)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handleInputTaxPageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                          previousLinkClassName={'page-link'}
                          nextLinkClassName={'page-link'}
                          breakClassName={'page-item'}
                          breakLinkClassName={'page-link'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          activeClassName={'active'}
                          activeLinkClassName={'page-link'}
                        />
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === '#output_tax_tab' ? 'active' : ''}`} id="output_tax_tab">
                      <table className="table table-bordered table-striped" id="output_tax_table" width="100%">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Customer</th>
                            <th>Tax number</th>
                            <th>Total amount</th>
                            <th>Payment Method</th>
                            <th>Discount</th>
                          </tr>
                        </thead>
                        <tbody>{renderTableRows(outputTaxData, outputTaxPage)}</tbody>
                        <tfoot>
                          <tr className="bg-gray font-17 text-center footer-total">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td>
                              <span className="display_currency" id="purchase_total" data-currency_symbol="true" />
                            </td>
                            <td className="output_payment_method_count" />
                            <td>&nbsp;</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div style={{ textAlign: 'right' }}>
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          pageCount={Math.ceil(outputTaxData.length / ITEMS_PER_PAGE)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handleOutputTaxPageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                          previousLinkClassName={'page-link'}
                          nextLinkClassName={'page-link'}
                          breakClassName={'page-item'}
                          breakLinkClassName={'page-link'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          activeClassName={'active'}
                          activeLinkClassName={'page-link'}
                        />
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === '#expense_tax_tab' ? 'active' : ''}`} id="expense_tax_tab">
                      <table className="table table-bordered table-striped" id="expense_tax_table" width="100%">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Reference No</th>
                            <th>Tax number</th>
                            <th>Total amount</th>
                            <th>Payment Method</th>
                          </tr>
                        </thead>
                        <tbody>{renderTableRows(expenseTaxData, expenseTaxPage)}</tbody>
                        <tfoot>
                          <tr className="bg-gray font-17 text-center footer-total">
                            <td colSpan={3}>
                              <strong>Total:</strong>
                            </td>
                            <td>
                              <span className="display_currency" id="expense_total" data-currency_symbol="true" />
                            </td>
                            <td className="expense_payment_method_count" />
                          </tr>
                        </tfoot>
                      </table>
                      <div style={{ textAlign: 'right' }}>
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          breakLabel={'...'}
                          pageCount={Math.ceil(expenseTaxData.length / ITEMS_PER_PAGE)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handleExpenseTaxPageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                          previousLinkClassName={'page-link'}
                          nextLinkClassName={'page-link'}
                          breakClassName={'page-item'}
                          breakLinkClassName={'page-link'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          activeClassName={'active'}
                          activeLinkClassName={'page-link'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TaxReport;
