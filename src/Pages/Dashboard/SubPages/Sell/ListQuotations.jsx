import React, { useState, useEffect } from 'react';
import Header from '../../../../Components/Header';
import Sidebar from '../../../../Components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faEdit, faTrash, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer';
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

// Dummy data for customers
// const customers = [
//   { id: 1, name: 'John Doe', phone: '1234567890', billingAddress: '123 Main St', shippingAddress: '456 Elm St' },
//   { id: 2, name: 'Jane Smith', phone: '0987654321', billingAddress: '789 Maple St', shippingAddress: '101 Oak St' },
//   // Add more dummy customers here
// ];


const ListQuotations = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const fetchQuotationList = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      const res = await apiCall({ method: "get", url: `/admin/sell/quotationList/getAllQuotation?${params.toString()}` });

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

  useEffect(() => {
    fetchQuotationList();
  }, [currentPage]);

  const deleteQuotation = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({ method: "delete", url: `/admin/sell/quotationList/deleteQuotation/${id}` });

      if (res.status === 200) {
        fetchQuotationList();
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

        <div className="content-wrapper">
          <section className="content-header no-print">
            <h1>List quotations <small /></h1>
          </section>

          <section className="content no-print">
            <div className="box box-solid" id="accordion">
              <div className="box-header with-border" style={{ cursor: 'pointer' }}>
                <h3 className="box-title">
                  <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} className="fa fa-filter" aria-hidden="true" /> Filters
                  </Link>
                </h3>
              </div>

              <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_location_id">Business Location:</label>
                      <select className="form-control select2" style={{ width: '100%' }} id="sell_list_filter_location_id" name="sell_list_filter_location_id">
                        <option selected="selected" value="">All</option>
                        <option value={4}>POS APPLICATION</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_customer_id">Customer:</label>
                      <select className="form-control select2" style={{ width: '100%' }} id="sell_list_filter_customer_id" name="sell_list_filter_customer_id">
                        <option selected="selected" value="">All</option>
                        <option value={3}>Walk-In Customer (CO0001)</option>
                        <option value={4}>test (CO0002)</option>
                        <option value={24}>zamini (CO0004)</option>
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
                      <select className="form-control select2" style={{ width: '100%' }} id="created_by" name="created_by">
                        <option value="" selected="selected">All</option>
                        <option value={4}>POS APPLICATION ADMIN</option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="customer_search">Search Customer:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_search"
                        placeholder="Enter customer name or phone number"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  {selectedCustomer && (
                    <div className="col-md-12">
                      <div>
                        <h4>Billing Address:</h4>
                        <p>{selectedCustomer.billingAddress}</p>
                        <h4>Shipping Address:</h4>
                        <p>{selectedCustomer.shippingAddress}</p>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            <div className="box box-primary">

              <div className="box-header">
                <h3 className="box-title" />
                <div className="box-tools">
                  <Link className="btn btn-block btn-primary" to="/create/quotation">
                    <FontAwesomeIcon icon={faPlus} className="fa fa-plus" /> Add Quotation
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
                <div className="table-responsive">
                  <table className="table table-bordered table-striped ajax_view" id="sell_table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reference No</th>
                        <th>Customer name</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        <th>Total Items</th>
                        <th>Added By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (data.map((group, index) => (
                        <tr key={index}>
                          <td>{group.saleDate}</td>
                          <td>{group.invoiceNo}</td>
                          <td>{group?.customer?.firstName} {group?.customer?.middleName} {group?.customer?.lastName}</td>
                          <td>{group?.customer?.mobileNo}</td>
                          <td>{group.Location}</td>
                          <td>{group.TotalAmount}</td>
                          <td>{group.PaymentDue}</td>
                          <td>
                            {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button> */}
                            <DropdownButton id="dropdown-basic-button" title="Actions">
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                              <Dropdown.Item onClick={() => navigate(`/edit/quotation/${group?._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                              <Dropdown.Item onClick={() => deleteQuotation(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                        </tr>
                      ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                        </tr>
                      )}
                    </tbody>
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
  );
};

export default ListQuotations;
