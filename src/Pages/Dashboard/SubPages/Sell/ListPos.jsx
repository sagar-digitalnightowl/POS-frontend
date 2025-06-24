import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall'

const ListPos = () => {
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchPOSList = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      const res = await apiCall({ method: "get", url: `` });

      if (res.status === 200) {
        setData(res?.data?.result)
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch POS list : ", error)
    } finally {
      setLoading(true);
    }
  }







  const textStyle = { color: 'black' };
  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header no-print"><h1>POS</h1></section>
          <section className="content no-print">
            <div className="box  box-solid " id="accordion">
              <div className="box-header with-border" style={{ cursor: "pointer" }}>
                <h3 className="box-title">
                  <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                    <i className="fa fa-filter" aria-hidden="true" /> Filters
                  </Link>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_location_id">Business Location:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_location_id" name="sell_list_filter_location_id">
                        <option selected="selected" value="">All</option>
                        <option value={4}>POS APPLICATION</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_customer_id">Customer:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_customer_id" name="sell_list_filter_customer_id">
                        <option selected="selected" value="">All</option>
                        <option value={3}> - Walk-In Customer (CO0001)</option>
                        <option value={4}> - test (CO0002)</option>
                        <option value={24}> - zamini (CO0004)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_payment_status">Payment Status:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_payment_status" name="sell_list_filter_payment_status">
                        <option selected="selected" value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_date_range">Date Range:</label>
                      <DatePicker selected={startDate} onChange={handleDateChange} startDate={startDate} endDate={endDate}
                        selectsRange placeholderText="Select a date range" className="form-control" id="sell_list_filter_date_range"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="created_by">User:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="created_by" name="created_by">
                        <option value="" selected="selected">All</option>
                        <option value={4}> POS APPLICATION ADMIN </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="shipping_status">Shipping Status:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="shipping_status" name="shipping_status">
                        <option selected="selected" value="">All</option>
                        <option value="ordered">Ordered</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <br />
                          <input className="input-icheck" id="only_subscriptions" name="only_subscriptions" type="checkbox" defaultValue={1} />
                          Subscriptions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">List POS</h3>
                <div className="box-tools">
                  <Link className="btn btn-block btn-primary" to="/pos/create">
                    <i className="fa fa-plus" /> Add
                  </Link>
                </div>
              </div>
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
              <div className="box-body">
                <input type="hidden" name="is_direct_sale" id="is_direct_sale" defaultValue={0} />
                <div style={{ overflowX: 'auto' }}>
                  <table className="table table-bordered table-striped ajax_view" id="sell_table">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Date</th>
                        <th>Invoice No.</th>
                        <th>Customer name</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        <th>Payment Status</th>
                        <th>Total amount</th>
                        <th>Total paid</th>
                        <th>Sell Due</th>
                        <th>Sell Return Due</th>
                        <th>Shipping Status</th>
                        <th>Total Items</th>
                        <th>Types of service</th>
                        <th>Custom Field 1</th>
                        <th>Added By</th>
                        <th>Sell note</th>
                        <th>Staff note</th>
                        <th>Shipping Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (data.map((group, index) => (
                        <tr key={index}>
                          <td style={textStyle}>
                            <DropdownButton id="dropdown-basic-button" title="Actions">
                              <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                              <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item>
                              <Dropdown.Item href="#/edit"> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                              <Dropdown.Item href="#/delete"> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                              <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                              <br />
                              <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                              <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                              <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                              <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item>
                            </DropdownButton>
                          </td>
                          <td>{group.date}</td>
                          <td>{group.invoiceNo}</td>
                          <td>{group.customerName}</td>
                          <td>{group.customerNumber}</td>
                          <td>{group.location}</td>
                          <td>{group.paymentStatus}</td>
                          <td>{group.paymentMethod}</td>
                          <td>{group.totalAmount}</td>
                          <td>{group.TotalPaid}</td>
                          <td>{group.sellDue}</td>
                          <td>{group.sellReturnDue}</td>
                          <td>{group.shippingStatus}</td>
                          <td>{group.totalItems}</td>
                          <td>{group.typesOfServices}</td>
                          <td>{group.customField1}</td>
                          <td>{group.addedBy}</td>
                          <td>{group.sellNote}</td>
                          <td>{group.staffNote}</td>
                          <td>{group.shippingDetails}</td>
                        </tr>
                      ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray font-17 footer-total text-center">
                        <td colSpan={6}>
                          <strong>Total:</strong>
                        </td>
                        <td className="footer_payment_status_count" />
                        <td className="payment_method_count" />
                        <td className="footer_sale_total" />
                        <td className="footer_total_paid" />
                        <td className="footer_total_remaining" />
                        <td className="footer_total_sell_return_due" />
                        <td colSpan={2} />
                        <td className="service_type_count" />
                        <td colSpan={7} />
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="pagination-custom justify-content-end" style={{ gap: 2 }}>
                  <div className={`page-item`}>
                    <button disabled={currentPage <= 1} onClick={() => paginate(currentPage - 1)} className="page-link1" style={{ color: 'black' }}>
                      Previous
                    </button>
                  </div>
                  {
                    Array(totalPage).fill(0).map((num, index) => (
                      <button onClick={() => paginate(index + 1)} className="page-link1" style={{ color: 'black' }}>
                        {index + 1}
                      </button>
                    ))
                  }
                  <div className={`page-item `}>
                    <button disabled={currentPage >= totalPage} onClick={() => paginate(currentPage + 1)} className="page-link1" style={{ color: 'black' }}>
                      Next
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>

  )
}

export default ListPos