import React, { useState,useEffect } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { faBan, faBook, faBox, faCheckCircle, faColumns, faDollarSign, faEdit, faExclamationCircle, faEye, faFileAlt, faFileCsv, faFileExcel, faFilePdf, faFilter, faInfoCircle, faPlus, faPrint, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { Link,useNavigate } from 'react-router-dom';

const ListInvoice = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const navigate = useNavigate();

    const fetchInvoices = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/repair/invoice/getAllInvoice`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // You may need to add authentication headers, like Bearer token, if required
              // 'Authorization': `Bearer ${yourToken}`
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch invoices');
          }
    
          const result = await response.json();
          // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
          if (result) {
            console.log(result.result);
            
              setData(result.result)
          } else {
            throw new Error('Failed to fetch invoices');
          }  
        } catch (error) {
          setError(error.message);
        }
      };
      
    const deleteInvoice = async (id) => {
        try {
          setLoading(true);
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/repair/invoice/deleteInvoice/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // You may need to add authentication headers, like Bearer token, if required
              // 'Authorization': `Bearer ${yourToken}`
            },
          });
    
          if (!response.ok) {
            toast.error("Failed to delete invoice. Please try again later");
            throw new Error('Failed to delete invoice');
          }
    
          const result = await response.json();
          // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
          if (result) {
              toast.success("Invoice deleted Succesfully")
              fetchInvoices();
          } else {
            toast.error("Failed to invoice. Please try again later");
            throw new Error('Failed to invoice');
          }  
        } catch (error) {
          setError(error.message);
        }
      };

    useEffect(()=>{
      if(!loading){
        fetchInvoices()
      };
    },[loading]);
    const textStyle = { color: 'black' };
  return (
  <div style={textStyle}>
    <div className="wrapper thetop">
      <Header/>
      <Sidebar/>
    <div className=" content-wrapper ">
      <Navbar/>
      <section className="content-header no-print">
        <h1>Invoices </h1>
      </section>
      <section className="content no-print">
        <div className="box  box-solid " id="accordion">
          <div className="box-header with-border" style={{ cursor: "pointer" }}>
            <h3 className="box-title">
              <a data-toggle="collapse" data-parent="#accordion"href="#collapseFilter">
                 <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
              </a>
            </h3>
          </div>
          <div id="collapseFilter" className="panel-collapse active collapse  in "aria-expanded="true">
            <div className="box-body">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_location_id"> Business Location: </label>
                  <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_location_id" name="sell_list_filter_location_id">
                    <option selected="selected" value=""> All </option>
                    <option value={4}> POS APPLICATION TRADING COMPANY W.L.L (BL0001)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_customer_id"> Customer: </label>
                  <select className="form-control select2" style={{ width: "100%" }} id="sell_list_filter_customer_id"name="sell_list_filter_customer_id">
                    <option selected="selected" value=""> All</option>
                    <option value={3}> - Walk-In Customer (CO0001)</option>
                    <option value={4}> - test (CO0002)</option>
                    <option value={24}> - zamini (CO0004)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_payment_status">
                    Payment Status:
                  </label>
                  <select className="form-control select2"style={{ width: "100%" }}id="sell_list_filter_payment_status"name="sell_list_filter_payment_status">
                    <option selected="selected" value=""> All</option>
                    <option value="paid">Paid</option>
                    <option value="due">Due</option>
                    <option value="partial">Partial</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sell_list_filter_date_range">
                    Date Range:
                  </label>
                  <input placeholder="Select a date range" className="form-control" readOnly="" name="sell_list_filter_date_range"type="text"id="sell_list_filter_date_range"/>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="created_by">User:</label>
                  <select className="form-control select2" style={{ width: "100%" }}id="created_by"name="created_by">
                    <option value="" selected="selected">
                      All
                    </option>
                    <option value={4}> POS APPLICATION ADMIN </option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="repair_status_id">Status:</label>
                  <select className="form-control select2"style={{ width: "100%" }}id="repair_status_id"name="repair_status_id">
                    <option selected="selected" value="">All</option>
                  </select>
                </div>
              </div>
            </div>
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
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a href="#pending_repair_tab" data-toggle="tab"aria-expanded="true">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-orange" />
                    Pending
                    <FontAwesomeIcon
                    icon={faInfoCircle}
                      className="fa fa-info-circle text-info hover-q no-print "
                      aria-hidden="true"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="auto bottom"
                      data-content="Status which are not marked as completed will be displayed here."
                      data-html="true"
                      data-trigger="hover"
                    />{" "}
                  </a>
                </li>
                <li>
                  <a href="#completed_repair_tab"data-toggle="tab"aria-expanded="true">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                    Completed
                    <FontAwesomeIcon
                    icon={faInfoCircle}
                      className="fa fa-info-circle text-info hover-q no-print "
                      aria-hidden="true"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="auto bottom"
                      data-content="Status which are marked as completed will be displayed here."
                      data-html="true"
                      data-trigger="hover"
                    />{" "}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="pending_repair_tab">
                  <div className="row">
                    <div className="col-md-12 mb-12">
                      <Link target="_blank" className="btn btn-sm btn-primary pull-right"to="/repairs-addinvoice">
                      <FontAwesomeIcon icon={faPlus} /> Add
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped ajax_view" id="pending_repair_table">
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Date</th>
                          <th>
                            Delivery Date
                            <FontAwesomeIcon
                            icon={faInfoCircle}
                              className="fa fa-info-circle text-info hover-q no-print "
                              aria-hidden="true"
                              data-container="body"
                              data-toggle="popover"
                              data-placement="auto bottom"
                              data-content="The date the technician should return the item after repairing to the customer."
                              data-html="true"
                              data-trigger="hover"
                            />
                          </th>
                          <th>Job sheet number</th>
                          <th>Invoice No.</th>
                          <th>Added By</th>
                          <th>Customer name</th>
                          <th>Brand</th>
                          <th>Device Model</th>
                          <th>Serial Number</th>
                          <th>Status</th>
                          <th>Location</th>
                          <th>Repair Warranty</th>
                          <th>Payment Status</th>
                          <th>Total amount</th>
                          <th>Payment due</th>
                          <th>Sell Return Due</th>
                        </tr>
                      </thead>
                      <tbody>
                    {currentItems.map((user, index) => (
                      <tr key={index}>
                        
                       <td style={textStyle}>
                        {/* {setId(user._id)} */}
                        <DropdownButton id="dropdown-basic-button" title="Actions">
                            {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                            <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                            <Dropdown.Item href="#/edit" onClick={()=>navigate(`/editproduct/${user._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                            <Dropdown.Item href="#/delete" onClick={()=>deleteInvoice(user._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                            {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                            <br/>
                            <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                            <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                            <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                            <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item> */}
                        </DropdownButton>
                       </td>
                        <td style={textStyle}>{user.repairCompletedOn}</td>
                        <td style={textStyle}>{user.deliveryDate}</td>
                        <td style={textStyle}>{user.jobSheet}</td>
                        <td style={textStyle}>{user.invoiceNo}</td>
                        <td style={textStyle}>{user.problemReportedByTheCustomer}</td>
                        <td style={textStyle}>{user.customer}</td>
                        <td style={textStyle}>{user.brand}</td>
                        <td style={textStyle}>{user.deviceModel}</td>
                        <td style={textStyle}>{user.serialNumber}</td>
                        <td style={textStyle}>{user.status}</td>
                        <td style={textStyle}>{user.productSerialNo}</td>
                      </tr>
                    ))}                      
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane" id="completed_repair_tab">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped ajax_view"id="sell_table">
                      <tfoot>
                        <tr className="bg-gray font-17 footer-total text-center">
                          <td colSpan={10}>
                            <strong>Total:</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
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
      </section>
    </div>
    <Footer/>
  </div>
</div>
  )
}

export default ListInvoice