import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter, faPlus, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook,
  faFileAlt, faShoppingCart, faBox, faMoneyBillAlt, faUndo, faTruck
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Footer from '../../../../Components/Footer'
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';

const AllSale = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const fetchSales = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      const res = await apiCall({ method: "get", url: `/admin/sell/saleList/getAllSales?${params.toString()}` });

      if (res.status === 200) {
        setData(res?.data?.result)
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch all sales : ", error)
    } finally {
      setLoading(true);
    }
  }

  const deleteSale = async (id) => {
    if (!id) return;
    setLoading(true);
    try {

      const res = await apiCall({ method: "delete", url: `/admin/sell/saleList/deleteSales/${id}` });

      if (res.status === 200) {
        fetchSales();
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete sale : ", error)
    } finally {
      setLoading(true);
    }
  }


  useEffect(() => {
    fetchSales();
  }, [currentPage])



  const textStyle = { color: 'black' };

  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header no-print"><h1>Sales </h1></section>
          <section className="content no-print">
            <div className="box  box-solid " id="accordion">
              <div className="box-header with-border" style={{ cursor: "pointer" }}>
                <h3 className="box-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} className="fa fa-filter" aria-hidden="true" /> Filters
                  </a>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true" >
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_location_id"> Business Location: </label>
                      <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_location_id" name="sell_list_filter_location_id" >
                        <option selected="selected" value="">All</option>
                        <option value={4}>POS APPLICATION TRADING COMPANY W.L.L (BL0001) </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_customer_id"> Customer: </label>
                      <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_customer_id" name="sell_list_filter_customer_id" >
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
                      <input placeholder="Select a date range" className="form-control" readOnly="" name="sell_list_filter_date_range" type="text" id="sell_list_filter_date_range" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="created_by">User:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="created_by" name="created_by" >
                        <option value="" selected="selected"> All </option>
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
            </div>{" "}
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All sales</h3>
                <div className="box-tools">
                  <Link className="btn btn-block btn-primary" to="/sell/create">
                    <FontAwesomeIcon icon={faPlus} /> Add
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
                        <th>Payment Date</th>
                        <th>Payment Method</th>
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
                        <th>Table</th>
                        <th>Service staff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user, index) => (
                        <tr key={index}>
                          <td style={textStyle}>
                            <DropdownButton id="dropdown-basic-button" title="Actions">
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                              <Dropdown.Item onClick={() => navigate(`/sell/edit/${user?._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                              <Dropdown.Item onClick={() => deleteSale(user?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                              {/* <Dropdown.Item href="#/editShipping"> <FontAwesomeIcon icon={faTruck} /> Edit Shopping</Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/printInvoice"> <FontAwesomeIcon icon={faPrint} /> Print Invoice </Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/packingSlip">  <FontAwesomeIcon icon={faFileAlt} /> Packing Slip</Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/deliveryNote">  <FontAwesomeIcon icon={faFileAlt} /> Deliver Note</Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/receipt">  <FontAwesomeIcon icon={faFileAlt} /> Receipt </Dropdown.Item> */}
                              {/* <br /> */}
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faMoneyBillAlt} /> View Payments </Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faUndo} /> Sell Return </Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> Invoice URL </Dropdown.Item> */}
                              {/* <Dropdown.Item href="#/view">  <FontAwesomeIcon icon={faEnvelope} /> New Sale Notification </Dropdown.Item> */}
                            </DropdownButton>
                          </td>
                          <td style={textStyle}>{user.saleDate}</td>
                          <td style={textStyle}>{user.invoiceNo}</td>
                          <td style={textStyle}>{user?.customer?.firstName} {user?.customer?.middleName} {user?.customer?.lastName}</td>
                          <td style={textStyle}>{user?.customer?.mobileNo}</td>
                          <td style={textStyle}>{user.Location}</td>
                          <td style={textStyle}>{user?.payments?.paidOn}</td>
                          <td style={textStyle}>{user?.payments?.paymentMethod}</td>
                          <td style={textStyle}>{user.totalAmount}</td>
                          <td style={textStyle}>{user.totalPaid}</td>
                          <td style={textStyle}>{user.sellDue}</td>
                          <td style={textStyle}>{user.sellReturnDue}</td>
                          <td style={textStyle}>{user.shippingStatus}</td>
                          <td style={textStyle}>{user.totalItems}</td>
                          <td style={textStyle}>{user.typesOfService}</td>
                          <td style={textStyle}>{user.customField1}</td>
                          <td style={textStyle}>{user.addedBy}</td>
                          <td style={textStyle}>{user.sellNote}</td>
                          <td style={textStyle}>{user.staffNote}</td>
                          <td style={textStyle}>{user.shippingDetails}</td>
                          <td style={textStyle}>{user.table}</td>
                          <td style={textStyle}>{user.serviceStaff}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tbody />
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

export default AllSale