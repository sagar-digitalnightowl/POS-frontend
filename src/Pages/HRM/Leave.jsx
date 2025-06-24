import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import HeaderHrm from './HeaderHrm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { addMonths, setDayOfYear } from 'date-fns';
import Footer from '../../Components/Footer';
import { apiCall } from '../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Leave = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [editLeaveId, setEditLeaveId] = useState('');

  const [formData, setFormData] = useState({
    employee: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });


  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      employee: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    })
    setEditLeaveId('');
  }


  const fetchAllLeaves = async () => {
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/leaves/getAllLeaves`
      })

      if (res?.status === 200) {
        setData(res?.data?.result)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch all leave : ", error)
    } finally {
      setLoading(false);
    }
  }

  const deleteLeave = async (id) => {
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/leaves/deleteLeave/${id}`
      })

      if (res?.status === 200) {
        fetchAllLeaves();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete leave : ", error)
    } finally {
      setLoading(false);
    }
  }

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/userManagement/user/getUsers`,
      })

      if (res.status === 200) {
        setEmployees(res?.data?.result)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all employees : ", error)
    } finally {
      setLoading(false);
    }
  }

  const fetchLeaveType = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/leaveType/getLeaveTypes`,
      })

      if (res.status === 200) {
        setLeaveTypes(res?.data?.result)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all leave type : ", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaveType();
    fetchEmployees();
    fetchAllLeaves();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  console.log(formData, "form data")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editLeaveId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/leaves/updateLeave/${editLeaveId}`,
          data: formData
        })

        if (res.status === 200) {
          handleCloseModal();
          fetchAllLeaves();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/leaves/addLeave`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
        fetchAllLeaves();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit leave : ", error)
    } finally {
      setLoading(false);
    }
  };

  const handleEditLeave = (data) => {
    setFormData({
      employee: data?.employee?._id,
      leaveType: data?.leaveType?._id,
      startDate: data?.startDate,
      endDate: data?.endDate,
      reason: data?.reason,
    });
    setEditLeaveId(data?._id);
    setShowModal(true);
  }


  const textStyle = { color: 'black' };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <HeaderHrm />
          </section>
          <section className="content-header">
            <h1>Leave</h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-solid" id="accordion">
                  <div className="box-header with-border" style={{ cursor: 'pointer' }}>
                    <h3 className="box-title">
                      <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                        <i className="fa fa-filter" aria-hidden="true" /> Filters
                      </Link>
                    </h3>
                  </div>
                  <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                    <div className="box-body">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="user_id_filter">Employee:</label>
                          <select className="form-control select2" style={{ width: '100%' }} id="user_id_filter" name="user_id_filter">
                            <option selected="selected" value="">
                              All
                            </option>
                            <option value={4}>POS ADMIN</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="status_filter">Status:</label>
                          <select className="form-control select2" name="status_filter" required="" id="status_filter" style={{ width: '100%' }}>
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="leave_type_filter">Leave Type:</label>
                          <select className="form-control select2" style={{ width: '100%' }} id="leave_type_filter" name="leave_type_filter">
                            <option selected="selected" value="">
                              All
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="leave_filter_date_range">Date Range:</label>
                          <DatePicker
                            // selected={startDate} 
                            // onChange={handleDateChange} 
                            // startDate={startDate} 
                            // endDate={endDate}
                            selectsRange placeholderText="Select a date range" className="form-control" id="sell_list_filter_date_range"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box box-solid">
                  <div className="box-header">
                    <h3 className="box-title">All Leaves</h3>
                    <div className="box-tools">
                      <button type="button" className="btn btn-block btn-primary btn-modal" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus" /> Add
                      </button>
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
                      <table className="table table-bordered table-striped" id="leave_table">
                        <thead>
                          <tr>
                            <th>Leave Type</th>
                            <th>Employee</th>
                            <th>Reason</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? (
                            data.map((group, index) => (
                              <tr key={index}>
                                <td>{group?.leaveType?.leaveType}</td>
                                <td>{group.employee?.firstName} {group.employee?.lastName} </td>
                                <td>{group?.reason}</td>
                                {/* <td>{group.status}</td> */}
                                <td>
                                  <DropdownButton id="dropdown-basic-button" title="Actions">
                                    {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                    <Dropdown.Item onClick={() => handleEditLeave(group)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                    <Dropdown.Item onClick={() => deleteLeave(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                              <td colSpan="7" className="text-center">
                                <b>No Data Available</b>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" id="user_leave_summary" />
          </section>
        </div>
        <Footer />
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ marginTop: '10%', maxWidth: '500px' }}>
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Add Leave</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="employee">Select Employee:</label>
                  <select
                    type="text"
                    className="form-control"
                    id="employee"
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {
                      employees.map(emp => (
                        <option key={emp?._id} value={emp?._id}>{emp?.firstName} {emp?.lastName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="leaveType">Leave Type:</label>
                  <select
                    className="form-control"
                    id="leaveType"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Leave Type</option>
                    {
                      leaveTypes.map(type => (
                        <option key={type?._id} value={type?._id}>{type?.leaveType}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate?.substring(0, 10) || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate?.substring(0, 10) || ''}
                    onChange={handleChange}
                    required />
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Reason:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
