import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'
import { apiCall } from '../../utils/apiCall'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const LeavrType = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLeaveTypeId, setEditLeaveTypeId] = useState('')
  const [formData, setFormData] = useState({
    leaveType: '',
    maxLeaveCount: '',
    interval: ''
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      leaveType: '',
      maxLeaveCount: '',
      interval: ''
    });
    fetchAllLeaveType();
    setEditLeaveTypeId('')
  }

  const fetchAllLeaveType = async () => {
    setLoading(true);
    try {
      const param = new URLSearchParams();
      param.append('page', currentPage);

      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/leaveType/getAllLeaveType?${param.toString()}`,
      })

      if (res.status === 200) {
        setData(res?.data?.result)
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

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editLeaveTypeId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/leaveType/updateLeaveType/${editLeaveTypeId}`,
          data: formData
        })

        if (res.status === 200) {
          handleCloseModal();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/leaveType/addLeaveType`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit leave type : ", error)
    } finally {
      setLoading(false);
    }
  };


  const deleteLeaveType = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/leaveType/deleteLeaveType/${id}`,
      })

      if (res.status === 200) {
        fetchAllLeaveType();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete leave type : ", error)
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (data) => {
    setEditLeaveTypeId(data?._id)
    setFormData({
      leaveType: data?.leaveType,
      maxLeaveCount: data?.maxLeaveCount,
      interval: data?.interval
    });
    setIsModalOpen(true);
  }


  useEffect(() => {
    fetchAllLeaveType();
  }, [currentPage])


  const textStyle = { color: 'black' };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="no-print">
            <HeaderHrm />
          </section><section className="content-header"><h1>Leave Type</h1></section>
          <section className="content">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">All leave types</h3>
                <div className="box-tools">
                  <button type="button" className="btn btn-block btn-primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Add
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
                  <table className="table table-bordered table-striped" id="leave_type_table">
                    <thead>
                      <tr>
                        <th>Leave Type</th>
                        <th>Max Leave Count</th>
                        <th>Interval</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.length > 0 ?
                          data.map(leaveType => (
                            <tr key={leaveType?._id}>
                              <td>{leaveType?.leaveType}</td>
                              <td>{leaveType?.maxLeaveCount}</td>
                              <td>{leaveType?.interval}</td>
                              <td>
                                <DropdownButton id="dropdown-basic-button" title="Actions">
                                  {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                  <Dropdown.Item onClick={() => handleEdit(leaveType)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                  <Dropdown.Item onClick={() => deleteLeaveType(leaveType?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                          :
                          <tr>
                            <td colSpan={10} style={{ textAlign: 'center' }}>No Data Found</td>
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
            </div>
          </section>
        </div>
        <Footer />
      </div>
      {isModalOpen && (
        <div
          className="modal"
          id="add_leave_type_modal"
          style={{
            display: 'block',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1050',
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,.2)',
            borderRadius: '6px',
            boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)',
            width: '550px',
            height: '450px',
            maxWidth: '95vw',
          }}
        >
          <div className="modal-dialog" style={{ width: '100%' }}>
            <form className="modal-content" onSubmit={handleSave}>
              <div className="modal-header" style={{ display: 'flex', justifyContent: 'left' }}>
                <h4 className="modal-title">Add Leave Type</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Leave Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.leaveType}
                    onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                    style={{ width: 'calc(100% - 20px)', margin: '0 10px' }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Leave Count</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData?.maxLeaveCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxLeaveCount: e.target.value }))}
                    style={{ width: 'calc(100% - 20px)', margin: '0 10px' }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Leave Count Interval</label>
                  <div className="form-check">
                    <input
                      id='Current Month'
                      className="form-check-input"
                      type="radio"
                      name="interval"
                      value="Current Month"
                      checked={formData.interval === "Current Month"}
                      onChange={(e) => setFormData(prev => ({ ...prev, interval: e.target.value }))}
                      required
                    />
                    <label htmlFor='Current Month' className="form-check-label">Current Month</label>
                  </div>
                  <div className="form-check">
                    <input
                      id='Current Financial Year'
                      className="form-check-input"
                      type="radio"
                      name="interval"
                      value="Current Financial Year"
                      checked={formData.interval === "Current Financial Year"}
                      onChange={(e) => setFormData(prev => ({ ...prev, interval: e.target.value }))}
                      required
                    />
                    <label htmlFor='Current Financial Year' className="form-check-label">Current Financial Year</label>
                  </div>
                  <div className="form-check">
                    <input
                      id='None'
                      className="form-check-input"
                      type="radio"
                      name="interval"
                      value="None"
                      checked={formData.interval === "None"}
                      onChange={(e) => setFormData(prev => ({ ...prev, interval: e.target.value }))}
                      required
                    />
                    <label htmlFor='None' className="form-check-label">None</label>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
  )
}
export default LeavrType