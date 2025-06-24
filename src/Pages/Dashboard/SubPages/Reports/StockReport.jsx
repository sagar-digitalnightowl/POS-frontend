import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Footer from '../../../../Components/Footer'

const StockReport = () => {
    const[data, setData] = useState([
        {Sku:'0161',product:'Sefam',}
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
          <h1>Stock Report</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse" data-parent="#accordion"to="#collapseFilter">
                     <FontAwesomeIcon icon={faFilter}aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <form method="GET"
                      action="https://medipro.affinity-me.com/reports/stock-report"
                      acceptCharset="UTF-8"id="stock_report_filter_form">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="location_id"name="location_id">
                            <option value="" selected="selected">All locations</option>
                            <option value={4}> POS APPLICATION </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="category_id">Category:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="category_id"name="category">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="sub_category_id">Sub category:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="sub_category_id"name="sub_category">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="brand">Brand:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="brand"name="brand">
                            <option selected="selected" value="">All</option>
                            <option value={61}>Sanibel</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="unit">Unit:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="unit"name="unit">
                            <option selected="selected" value="">All</option>
                            <option value={4}>Pc(s)</option>
                            <option value={21}>box</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-group">
                            <label htmlFor="manufacturer_id">Manufacturer:</label>
                            <select className="form-control select2"style={{ width: "100%" }}id="manufacturer_id"name="manufacturer_id">
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value={1}>Nero Salinas</option>
                              <option value={49}>sefam</option>
                              <option value={52}>MAICO-Sanibel</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-group">
                            <label htmlFor="supplier_id">Supplier:</label>
                            <select className="form-control select2"id="supplier_id"name="supplier_id"style={{ width: "100% !important" }}>
                              <option value="">All</option>
                              <option value={23}>Seeam</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-group">
                            <label htmlFor="available_stock">Stock Availability:</label>
                            <select className="form-control select2"id="available_stock"name="available_stock"style={{ width: "100% !important" }}>
                              <option value="">All</option>
                              <option value="out">Out of Stock</option>
                              <option value="available">Available</option>
                            </select>
                          </div>
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
              <div className="box box-solid">
                <div className="box-body">
                  <table className="table no-border">
                    <tbody>
                      <tr>
                        <td><h4>Closing stock (By purchase price)</h4></td>
                        <td><h4>Closing stock (By sale price)</h4></td>
                        <td><h4>Potential profit</h4></td>
                        <td><h4>Profit Margin %</h4></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <div className="box box-solid">
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
                <div className="box-body" style={{ overflowX: 'auto' }}>
                    <table className="table table-bordered table-striped" id="stock_report_table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>SKU</th>
                                <th>Product</th>
                                <th>Variation</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Unit Selling Price</th>
                                <th>Current stock</th>
                                <th className="stock_price">Current Stock Value <br /><small>(By purchase price)</small></th>
                                <th>Current Stock Value <br /><small>(By sale price)</small></th>
                                <th>Potential profit</th>
                                <th>Total unit sold</th>
                                <th>Total Unit Transfered</th>
                                <th>Total Unit Adjusted</th>
                                <th>Lot Number</th>
                                <th>Batch No</th>
                                <th>Serial No</th>
                            </tr>
                            </thead>
                            <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                        <td style={textStyle}>
                      <Link to={`/product-stock-report`} className="btn btn-info btn-sm">
                        Product Stock Report
                      </Link>
                    </td>
                      <td style={textStyle}>{user.Sku}</td>
                      <td style={textStyle}>{user.product}</td> 
                      <td style={textStyle}>{user.varitiaon}</td>
                      <td style={textStyle}>{user.category}</td>
                      <td style={textStyle}>{user.location}</td>
                      <td style={textStyle}>{user.unitSellingPrice}</td>
                      <td style={textStyle}>{user.currentStock}</td>
                      <td style={textStyle}>{user.currentStockValue}</td>
                      <td style={textStyle}>{user.currentStock1}</td>
                      <td style={textStyle}>{user.potentialProfit}</td>
                      <td style={textStyle}>{user.totalUnitSold}</td>
                      <td style={textStyle}>{user.totalUnitTransfer}</td>
                      <td style={textStyle}>{user.totalUnitAdjusted}</td>
                      <td style={textStyle}>{user.lotNo}</td>
                      <td style={textStyle}>{user.batchNo}</td>
                      <td style={textStyle}>{user.serialNo}</td>
                    </tr>
                  ))}</tbody>
                        <tfoot>
                            <tr className="bg-gray font-17 text-center footer-total">
                                <td colSpan={7}>
                                    <strong>Total:</strong>
                                </td>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                            </tr>
                        </tfoot>
                    </table>
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

export default StockReport