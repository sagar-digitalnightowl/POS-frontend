import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus, faInfoCircle, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ListPurchaseReturn = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchAllPurchaseReturns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      const res = await apiCall({
        method: "get",
        url: `/admin/purchase/purchaseReturn/getAllPurchaseReturn?${params.toString()}`,
      })

      if (res.status === 200) {
        setData(res?.data?.result)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetching all purchase returns : ", error)
    } finally {
      setLoading(false);
    }
  }



  const deletePurchaseReturn = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/purchase/purchaseReturn/deletePurchase/${id}`,
      })

      if (res.status === 200) {
        fetchAllPurchaseReturns();
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in deleting purchase returns : ", error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllPurchaseReturns();
  }, [currentPage]);

  const textStyle = { color: 'black' };
  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header no-print"><h1>Purchase Return </h1></section>
          <section className="content no-print">
            <div className="box  box-solid " id="accordion">
              <div className="box-header with-border" style={{ cursor: "pointer" }}>
                <h3 className="box-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                  </a>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_location_id">Business Location:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="purchase_list_filter_location_id" name="purchase_list_filter_location_id">
                        <option selected="selected" value="">All</option>
                        <option value={4}>POS APPLICATION TRADING COMPANY W.L.L (BL0001)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_date_range">Date Range:</label>
                      <input placeholder="Select a date range" className="form-control" readOnly="" name="purchase_list_filter_date_range" type="text" id="purchase_list_filter_date_range" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All Purchase Returns</h3>
                <div className="box-tools">
                  <Link className="btn btn-block btn-primary" to="/purchase-return/create">
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
                <div className="table-responsive">
                  <table className="table table-bordered table-striped ajax_view" id="purchase_return_datatable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reference No</th>
                        {/* <th>Parent Purchase</th> */}
                        {/* <th>Location</th> */}
                        <th>Supplier</th>
                        <th>Purchase Return Status</th>
                        <th>Grand Total</th>
                        {/* <th>Payment due &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faInfoCircle} className="text-info" data-toggle="tooltip" data-placement="bottom"
                            data-html="true" data-original-title="-ve value = Amount to receive <br> +ve value = Amount to pay" aria-hidden="true"
                          />
                        </th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td style={textStyle}>{group?.purchaseReturnDate}</td>
                            <td style={textStyle}>{group?.referenceNo}</td>
                            <td style={textStyle}>{group?.supplier?.firstName} {group?.supplier?.middleName} {group?.supplier?.lastName}</td>
                            {/* <td style={textStyle}>parentPurchase</td>
                            <td style={textStyle}>{group.location}</td> */}
                            <td style={textStyle}>{group?.purchaseReturnStatus}</td>
                            <td style={textStyle}>{group?.totalPurchaseReturnAmount}</td>
                            {/* <td style={textStyle}>paymentDue</td> */}
                            <td>

                              <DropdownButton id="dropdown-basic-button" title="Actions">
                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item onClick={() => navigate(`/purchase-return/edit/${group?._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deletePurchaseReturn(group?._id)}
                                > <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                {/* <Dropdown.Item href="#/delete"> <FontAwesomeIcon icon={faPrint} /> Print</Dropdown.Item> */}
                                {/* <Dropdown.Item href="#/labels">  <FontAwesomeIcon icon={faTags} />Labels</Dropdown.Item> */}
                                {/* <br /> */}
                                {/* <Dropdown.Item href="#/viewPayment">  <FontAwesomeIcon icon={faEye} /> View Payment</Dropdown.Item> */}
                                {/* <Dropdown.Item href="#/PurchaseReturn"><FontAwesomeIcon icon={faUndoAlt} /> Purchase Return</Dropdown.Item> */}
                                {/* <Dropdown.Item href="#/updateStatus"> <FontAwesomeIcon icon={faSyncAlt} /> Update Status</Dropdown.Item> */}
                                {/* <Dropdown.Item href="#/itemReceivedNotification"> <FontAwesomeIcon icon={faBell} /> Item Received Notification</Dropdown.Item> */}
                              </DropdownButton>

                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center" style={textStyle}><b>No Data Available</b></td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray font-17 text-center footer-total">
                        <td colSpan={5}>
                          <strong>Total:</strong>
                        </td>
                        <td id="footer_payment_status_count" />
                        <td>
                          <span className="display_currency" id="footer_purchase_return_total" data-currency_symbol="true" />
                        </td>
                        <td>
                          <span className="display_currency" id="footer_total_due" data-currency_symbol="true" />
                        </td>
                        <td />
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

export default ListPurchaseReturn