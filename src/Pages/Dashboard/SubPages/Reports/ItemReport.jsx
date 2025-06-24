import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faFilter, faMapMarker, faPrint, faUser } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';

const ItemReport = () => {
    const [data, setData] = useState([
        {product:'sefam',sku:'0161',purchaseDate:'21/06/2024',purchase:'PO2024/001',supplier:'Seeam',purchasePrice:'BD 400.000',sellDate:'22/06/2024',sale:"001",customer:'Anish Kumar',
            location:'POS APPLICATION', sellQuantity:'6 box',sellingPrice:'BD 490.000', subTotal:'BD 2940.000'}
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

    const textStyle={color:'black'};
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <input type="hidden" id="view_export_buttons" />
        <section className="content-header">
          <h1>Items Report</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </a>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in "aria-expanded="true">
                  <div className="box-body">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_supplier_id">Supplier:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faUser} />
                          </span>
                          <select className="form-control select2"id="ir_supplier_id"name="ir_supplier_id">
                            <option selected="selected" value="">All</option>
                            <option value={23}> - Seeam(CO0003)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_purchase_date_filter">Purchase Date:</label>
                        <input placeholder="Select a date range"className="form-control"readOnly=""
                           name="ir_purchase_date_filter"type="text"id="ir_purchase_date_filter"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_customer_id">Customer:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faUser} />
                          </span>
                          <select className="form-control select2"id="ir_customer_id"name="ir_customer_id">
                            <option selected="selected" value=""> All</option>
                            <option value={3}>- Walk-In Customer (CO0001)</option>
                            <option value={4}> - test (CO0002)</option>
                            <option value={24}> - zamini (CO0004)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_sale_date_filter">Sell Date:</label>
                        <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                          selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="ir_location_id">Business Location:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                          <FontAwesomeIcon icon={faMapMarker } />
                          </span>
                          <select className="form-control select2"required=""id="ir_location_id"name="ir_location_id">
                            <option selected="selected" value="">Please Select</option>
                            <option value={4}>POS APPLICATION</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped" id="items_report_table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>SKU</th>
                          <th>Description</th>
                          <th>Purchase Date</th>
                          <th>Purchase</th>
                          <th>Lot Number</th>
                          <th>Batch No</th>
                          <th>Serial No</th>
                          <th>Supplier</th>
                          <th>Purchase Price</th>
                          <th>Sell Date</th>
                          <th>Sale</th>
                          <th>Customer</th>
                          <th>Location</th>
                          <th>Sell Quantity</th>
                          <th>Selling Price</th>
                          <th>Subtotal</th>
                        </tr>
                    </thead>
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.product}</td>
                                    <td>{user.sku}</td> 
                                    <td>{user.description}</td>
                                    <td>{user.purchaseDate}</td>
                                    <td>{user.purchase}</td>
                                    <td>{user.lotNumber}</td>
                                    <td>{user.batchNo}</td>
                                    <td>{user.serialhNo}</td>
                                    <td>{user.supplier}</td>
                                    <td>{user.purchasePrice}</td>
                                    <td>{user.sellDate}</td>
                                    <td>{user.sale}</td>
                                    <td>{user.customer}</td>
                                    <td>{user.location}</td>
                                    <td>{user.sellQuantity}</td>
                                    <td>{user.sellingPrice}</td>
                                    <td>{user.subTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                      <tfoot>
                        <tr className="bg-gray font-17 text-center footer-total">
                          <td colSpan={9}>
                            <strong>Total:</strong>
                          </td>
                          <td id="footer_total_pp"className="display_currency"data-currency_symbol="true"/>
                          <td colSpan={4} />
                          <td id="footer_total_qty" />
                          <td id="footer_total_sp"className="display_currency"data-currency_symbol="true"/>
                          <td id="footer_total_subtotal"className="display_currency"data-currency_symbol="true"/>
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
      </div>
      <Footer/>
    </div>
  </div>
  )
}

export default ItemReport