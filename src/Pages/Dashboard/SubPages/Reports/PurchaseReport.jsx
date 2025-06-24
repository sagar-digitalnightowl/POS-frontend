import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';


const PurchaseReport = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  const getAllPurchaseReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);

      const res = await apiCall({
        method: "get",
        url: `/admin/report/purchaseReport/getAllPurchaseReport?${params.toString()}`,
      })

      if (res.status === 200) {
        setData(res?.data?.result);
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch purchase reports : ", error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getAllPurchaseReport();
  }, [currentPage])




  const textStyle = { color: 'black' }
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header no-print">
            <h1>Report 606 (Purchase)</h1>
          </section>
          <section className="content no-print">
            <div className="box  box-solid " id="accordion">
              <div className="box-header with-border" style={{ cursor: "pointer" }}>
                <h3 className="box-title">
                  <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} /> Filters
                  </Link>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_location_id">Business Location:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="purchase_list_filter_location_id" name="purchase_list_filter_location_id" >
                        <option selected="selected" value="">All</option>
                        <option value={4}> POS APPLICATION </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_supplier_id"> Supplier:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="purchase_list_filter_supplier_id" name="purchase_list_filter_supplier_id">
                        <option selected="selected" value=""> All </option>
                        <option value={23}> - Seeam(CO0003)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_status">Purchase Status:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="purchase_list_filter_status" name="purchase_list_filter_status">
                        <option selected="selected" value="">All</option>
                        <option value="received">Received</option>
                        <option value="pending">Pending</option>
                        <option value="ordered">Ordered</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_payment_status"> Payment Status:</label>
                      <select className="form-control select2" style={{ width: "100%" }} id="purchase_list_filter_payment_status" name="purchase_list_filter_payment_status">
                        <option selected="selected" value=""> All </option>
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="purchase_list_filter_date_range">Date Range:</label>
                      <DatePicker selected={startDate} onChange={handleDateChange} startDate={startDate} endDate={endDate}
                        selectsRange placeholderText="Select a date range" className="form-control" id="sell_list_filter_date_range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped ajax_view" id="purchase_report_table" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Supplier</th>
                      <th>Reference No</th>
                      <th>Purchase Date</th>
                      <th>Payment Date</th>
                      <th>Total (Exc. discount)</th>
                      <th>Total (Exc. tax)</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Total (Inc. tax)</th>
                      <th>Payment Method</th>
                      <th>Payment Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ?
                      data.map((group, index) => (
                        <tr key={index}>
                          <td style={textStyle}>{group?._id}</td>
                          <td style={textStyle}>{group?.purchase?.supplier?.firstName} {group?.purchase?.supplier?.middleName} {group?.purchase?.supplier?.lastName}</td>
                          <td style={textStyle}>{group?.purchase?.referenceNo}</td>
                          <td style={textStyle}>{group?.purchase?.purchaseDate}</td>
                          <td style={textStyle}>{group?.purchase?.payments?.paidOn}</td>
                          <td style={textStyle}>{group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0)}</td>
                          <td style={textStyle}>{group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0) - (group?.purchase?.discountType === "Percentage" ?
                            (group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0) *
                              (group?.purchase?.discountAmount / 100)).toFixed(2)
                            : group?.purchase?.discountType === "Fixed" ?
                              group?.purchase?.discountAmount
                              : 0)}</td>
                          <td style={textStyle}>{
                            group?.purchase?.discountType === "Percentage" ?
                              (group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0) *
                                (group?.purchase?.discountAmount / 100)).toFixed(2)
                              : group?.purchase?.discountType === "Fixed" ?
                                group?.purchase?.discountAmount
                                : 0
                          }</td>
                          <td style={textStyle}>{group?.purchase?.purchaseTax}</td>
                          <td style={textStyle}>{group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0) - (group?.purchase?.discountType === "Percentage" ?
                            (group?.purchase?.products?.reduce((acc, product) => acc + product.totalAmount, 0) *
                              (group?.purchase?.discountAmount / 100)).toFixed(2)
                            : group?.purchase?.discountType === "Fixed" ?
                              group?.purchase?.discountAmount
                              : 0)}</td>
                          <td style={textStyle}>{group?.purchase?.payments?.paymentMethod}</td>
                          <td style={textStyle}>{group?.purchase?.payments?.amount}</td>
                        </tr>
                      ))
                      : <tr>
                        <td colSpan={20} style={{ textAlign: 'center' }}>No Data Found</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <div className="pagination-custom justify-content-end" style={{ margin: "30px 0px", gap: 2 }}>
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
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PurchaseReport