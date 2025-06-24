import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarker,faCalendar,faCaretDown,faPrint, faCubes,faTags,faDiamond,faFileAlt,faUser, faFileCsv, faFileExcel, faFilePdf, faColumns} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { Link } from 'react-router-dom';

const ProfitLossReports = () => {
    const [data, setData] = useState([
        {product:'Sefam', grossProfit:'BD 540.000'},
        {product:'Total', grossProfit:'Bd 540.000'}
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const textStyle={color:'black'}
  return (
    <div>
        <div className="wrapper thetop" style={textStyle}>
            <Header/>
            <Sidebar/>
            <div className=" content-wrapper ">
                <section className="content-header">
                    <h1>Profit / Loss Report </h1>
                    </section>
                    <section className="content">
                        <div className="row no-print">
                            <div className="col-md-3 col-md-offset-7 col-xs-6">
                                <div className="input-group">
                                    <span className="input-group-addon bg-light-blue">
                                       <FontAwesomeIcon icon={faMapMarker} />
                                    </span>
                                    <select className="form-control select2"id="profit_loss_location_filter">
                                        <option value="">All locations</option>
                                        <option value={4}>POS APPLICATION</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2 col-xs-6">
                                <div className="form-group pull-right">
                                    <div className="input-group">
                                        <button type="button"className="btn btn-primary"id="profit_loss_date_filter">
                                            <span>
                                                <FontAwesomeIcon icon={faCalendar} /> Filter by date
                                            </span>
                                                <FontAwesomeIcon icon={faCaretDown} />
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row">
                                <div id="pl_data_div">
                                    <div className="col-xs-6">
                                        <div className="box box-solid">
                                            <div className="box-body">
                                                <table className="table table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Opening Stock <br />
                                                                <small className="text-muted">(By purchase price)</small>:
                                                            </th>
                                                            <td>
                                                                <span className="display_currency"data-currency_symbol="true">BD 0.000</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Opening Stock <br />
                                                                <small className="text-muted">(By sale price)</small>:
                                                            </th>
                                                            <td>
                                                                <span id="opening_stock_by_sp">BD 0.000</span>
                                                            </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    Total purchase:<br />
                                                                    <small className="text-muted">(Exc. tax, Discount)</small>
                                                                </th>
                                                                <td>
                                                                    <span className="display_currency"data-currency_symbol="true">
                                                                        BD 400,000.000
                                                                    </span>
                                                                </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Stock Adjustment:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Expense:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total purchase shipping charge:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Purchase additional expenses:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total transfer shipping charge:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Sell discount:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total customer reward:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Sell Return:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Payroll:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-6">
                                                <div className="box box-solid">
                                                    <div className="box-body">
                                                        <table className="table table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <th>
                                                                        Closing stock <br />
                                                                        <small className="text-muted">(By purchase price)</small>:
                                                                    </th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 397,600.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Closing stock <br />
                                                                        <small className="text-muted">(By sale price)</small>:
                                                                    </th>
                                                                    <td>
                                                                        <span id="closing_stock_by_sp">BD 497,000.000</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Total Sales: <br />
                                                                        <small className="text-muted">(Exc. tax, Discount)</small>
                                                                    </th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 2,940.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total sell shipping charge:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Sell additional expenses:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Stock Recovered:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Purchase Return:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Purchase discount:</th>
                                                                    <td>
                                                                        <span className="display_currency"data-currency_symbol="true">
                                                                            BD 0.000
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            <tr>
                                                                <th>Total sell round off:</th>
                                                                <td>
                                                                    <span className="display_currency"data-currency_symbol="true">
                                                                        BD 0.000
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-xs-12">
                                            <div className="box box-solid">
                                                <div className="box-body">
                                                    <h3 className="text-muted mb-0">
                                                        Gross Profit:
                                                        <span className="display_currency" data-currency_symbol="true">
                                                            BD 540.000
                                                        </span>
                                                    </h3>
                                                    <small className="help-block">
                                                        (Total sell price - Total Purchase Price)
                                                    </small>
                                                    <h3 className="text-muted mb-0">
                                                        Net Profit:
                                                        <span className="display_currency" data-currency_symbol="true">
                                                            BD 540.000
                                                        </span>
                                                    </h3>
                                                    <small className="help-block">
                                                        Gross Profit + (Total sell shipping charge + Sell additional
                                                        expenses + Total Stock Recovered + Total Purchase discount + Total
                                                        sell round off ) <br /> - ( Total Stock Adjustment + Total Expense +
                                                        Total purchase shipping charge + Total transfer shipping charge +
                                                        Purchase additional expenses + Total Sell discount + Total customer
                                                        reward + Total Payroll )
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-print">
                                    <div className="col-sm-12">
                                        <button type="button"className="btn btn-primary pull-right"aria-label="Print"onclick="window.print();">
                                            <FontAwesomeIcon icon={faPrint} /> Print
                                        </button>
                                    </div>
                                </div>
                                <div className="row no-print">
                                    <div className="col-md-12">
                                        <div className="nav-tabs-custom">
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <Link to="#profit_by_products"data-toggle="tab"aria-expanded="true">
                                                       <FontAwesomeIcon icon={faCubes} aria-hidden="true" /> <b>Profit by products</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_categories"data-toggle="tab"aria-expanded="true">
                                                       <FontAwesomeIcon icon={faTags} aria-hidden="true" /> <b>Profit by categories</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_brands" data-toggle="tab" aria-expanded="true">
                                                      <FontAwesomeIcon icon={faDiamond} aria-hidden="true" /> <b>Profit by brands</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_locations"data-toggle="tab"aria-expanded="true">
                                                      <FontAwesomeIcon icon={faMapMarker} aria-hidden="true" /> <b>Profit by locations</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_invoice"data-toggle="tab"aria-expanded="true">
                                                      <FontAwesomeIcon icon={faFileAlt} aria-hidden="true" /> <b>Profit by invoice</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_date"data-toggle="tab"aria-expanded="true">
                                                      <FontAwesomeIcon icon={faCalendar} aria-hidden="true" /> <b>Profit by date</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_customer"data-toggle="tab"aria-expanded="true">
                                                      <FontAwesomeIcon icon={faUser} aria-hidden="true" /> <b>Profit by customer</b>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#profit_by_day"data-toggle="tab"aria-expanded="true">
                                                      <FontAwesomeIcon icon={faCalendar} aria-hidden="true" /><b>Profit by day</b> 
                                                    </Link>
                                                </li>
                                            </ul>
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
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="profit_by_products">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-striped"id="profit_by_products_table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Product</th>
                                                                    <th>Gross Profit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                                                    <tr key={index}>
                                                                        <td>{group.product}</td>
                                                                        <td>{group.grossProfit}</td>
                                                                    </tr>
                                                                    ))
                                                                ) : (
                                                                <tr></tr>
                                                                )}
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
                                                <p class="text-muted">
                                                    <b>Note:</b>
                                                    Profit by products/categories/brands only considers inline discount. Invoice discount is not considered.
                                                </p>
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
export default ProfitLossReports