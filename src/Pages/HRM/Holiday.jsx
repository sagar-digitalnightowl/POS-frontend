import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faFilter, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiCall } from '../../utils/apiCall'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const Holiday = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState('');
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editHolidayId, setEditHolidayId] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: ""
  })


  const fetchAllHolidays = async () => {
    setLoading(true);
    try {
      const param = new URLSearchParams();
      param.append('page', currentPage);

      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/holiday/getAllHolidays?${param.toString()}`,
      })

      if (res.status === 200) {
        setData(res?.data?.result)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all holidays : ", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllHolidays();
  }, [currentPage])


  const handleCloseModal = () => {
    setEditHolidayId('')
    setFormData({
      name: "",
      date: "",
      description: ""
    })
    setIsModalOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editHolidayId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/holiday/updateHoliday/${editHolidayId}`,
          data: formData
        })

        if (res.status === 200) {
          handleCloseModal();
          fetchAllHolidays();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/holiday/addHoliday`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
        fetchAllHolidays();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit holiday : ", error)
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (data) => {
    setFormData({
      name: data?.name,
      date: data?.date,
      description: data?.description
    });
    setEditHolidayId(data?._id);
    setIsModalOpen(true);
  }


  const deleteHoliday = async (id) => {
    setLoading(true)
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/holiday/deleteHoliday/${id}`,
      })

      if (res.status === 200) {
        fetchAllHolidays();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete holiday : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const textStyle = { color: 'black' }
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="no-print">
            <HeaderHrm />
          </section>
          <section className="content-header">
            <h1>Holiday </h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
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
                          <label htmlFor="location_id">Business Location:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="location_id" name="location_id">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="holiday_filter_date_range">
                            Date Range:
                          </label>
                          <input
                            placeholder="Select a date range"
                            className="form-control"
                            readOnly=""
                            name="holiday_filter_date_range"
                            type="text"
                            id="holiday_filter_date_range"
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
                    <h3 className="box-title">All Holidays</h3>
                    <div className="box-tools">
                      <button type="button" className="btn btn-block btn-primary btn-modal" onClick={() => setIsModalOpen(true)}>
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
                      <table className="table table-bordered table-striped" id="holidays_table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? (data.map((group, index) => (
                            <tr key={index}>
                              <td>{group?.name}</td>
                              <td>{group?.date}</td>
                              <td>{group?.description}</td>
                              <td>
                                <DropdownButton id="dropdown-basic-button" title="Actions">
                                  {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                  <Dropdown.Item onClick={() => handleEdit(group)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                  <Dropdown.Item onClick={() => deleteHoliday(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                              <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                            </tr>
                          )}
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
            zIndex: 1050,
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '550px',
            height: 'auto',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <h4 className="modal-title">{editHolidayId ? "Edit" : "Add"} Holiday</h4>
            </div>

            <div className="modal-body">
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="leaveType">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  style={{ width: '100%', marginTop: '5px' }}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="maxLeaveCount">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  style={{ width: '100%', marginTop: '5px' }}
                  value={formData?.date?.substring(0, 10) || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Description</label>
                <div className="form-check">
                  <textarea
                    id="description"
                    className="form-check-input"
                    name="description"
                    value={formData?.description}
                    onChange={handleChange}
                    style={{ width: '100%', marginTop: '5px', color: 'black' }}
                  />
                </div>


              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}



    </div>
  )
}

export default Holiday