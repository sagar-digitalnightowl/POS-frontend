import React, { useEffect, useState } from "react";
import Header from "../../../../Components/Header";
import Sidebar from "../../../../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faFileCsv,
  faPrint,
  faFileExcel,
  faFilePdf,
  faColumns,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import Footer from "../../../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiCall } from "../../../../utils/apiCall";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DeliveryNote = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchDeliveryNotes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      const res = await apiCall({
        method: "get",
        url: `/admin/sell/deliveryList/getAllDeliveryNote?${params.toString()}`,
      });

      if (res.status === 200) {
        setData(res?.data?.result);
        setTotalPage(res?.data?.totalPage);
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in fetch DeliveryNotes list : ", error);
    } finally {
      setLoading(true);
    }
  };


  const deleteDeliveryNote = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/sell/deliveryList/deleteDeliveryNote/${id}`,
      });

      if (res.status === 200) {
        fetchDeliveryNotes()
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in fetch delete deleteDeliveryNote : ", error);
    } finally {
      setLoading(true);
    }
  }



  useEffect(() => {
    fetchDeliveryNotes();
  }, [currentPage]);


  const textStyle = { color: "black" };
  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>
              {" "}
              Delivery Note <small>Manage Delivery Notes</small>
            </h1>
          </section>
          <section className="content">
            <div className="box  box-solid " id="accordion">
              <div
                className="box-header with-border"
                style={{ cursor: "pointer" }}
              >
                <h3 className="box-title">
                  <Link
                    data-toggle="collapse"
                    data-parent="#accordion"
                    to="#collapseFilter"
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      className="fa fa-filter"
                      aria-hidden="true"
                    />{" "}
                    Filters
                  </Link>
                </h3>
              </div>
              <div
                id="collapseFilter"
                className="panel-collapse active collapse  in "
                aria-expanded="true"
              >
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="sell_list_filter_date_range">
                        Date Range:
                      </label>
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
                </div>
              </div>
            </div>
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All Delivery Notes</h3>
                <div className="box-tools">
                  <Link
                    to="/add-delivery-note"
                    className="btn btn-block btn-primary"
                  >
                    <FontAwesomeIcon icon={faPlus} className="fa fa-plus" /> Add
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
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search..."
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-striped"
                    id="delivery_note_table"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Delivery Note No</th>
                        <th>Dated</th>
                        <th>Sales Order Invoice No</th>
                        <th>Total Quantitiy</th>
                        <th>Items Delivered</th>
                        <th>Items In This DN</th>
                        <th>Terms of Delivery</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{group?.deliveryNoteNumber}</td>
                            <td>{group?.deliveryDate}</td>
                            <td>{group?.saleOrder?.invoiceNo}</td>
                            <td>{group.totalQuantity}</td>
                            <td>{group.itemsDelivered}</td>
                            <td>{group.itemsInThisDN}</td>
                            <td>{group.termsOfDelivery}</td>
                            <td>
                              <DropdownButton
                                id="dropdown-basic-button"
                                title="Actions"
                              >
                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item
                                  onClick={() => navigate(`/edit-delivery-note/${group?._id}`)}
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faEdit} /> Edit{" "}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteDeliveryNote(group?._id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </Dropdown.Item>
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
                          <td colSpan="5" className="text-center">
                            <b>No Data Available</b>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="pagination-custom justify-content-end"
                  style={{ gap: 2 }}
                >
                  <div className={`page-item`}>
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="page-link1"
                      style={{ color: "black" }}
                    >
                      Previous
                    </button>
                  </div>
                  {Array(totalPage)
                    .fill(0)
                    .map((num, index) => (
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link1"
                        style={{ color: "black" }}
                      >
                        {index + 1}
                      </button>
                    ))}
                  <div className={`page-item `}>
                    <button
                      disabled={currentPage >= totalPage}
                      onClick={() => paginate(currentPage + 1)}
                      className="page-link1"
                      style={{ color: "black" }}
                    >
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

export default DeliveryNote;
