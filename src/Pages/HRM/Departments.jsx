import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import HeaderHrm from './HeaderHrm';
import Footer from '../../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { apiCall } from '../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Departments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);

  const [editDepartmentId, setEditDepartmentId] = useState('');
  const [formData, setFormData] = useState({
    department: '',
    departmentId: '',
    description: ''
  });

  const handleCloseModal = () => {
    setEditDepartmentId('')
    setFormData({
      department: '',
      departmentId: '',
      description: ''
    });
    setShowModal(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const fetchAllDepartments = async () => {
    setLoading(true);
    try {
      const param = new URLSearchParams();
      param.append('page', currentPage);
      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/department/getAllDepartment?${param.toString()}`
      });

      if (res.status === 200) {
        setData(res?.data?.result)
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all department : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editDepartmentId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/department/updateDepartment/${editDepartmentId}`,
          data: formData
        })

        if (res.status === 200) {
          handleCloseModal();
          fetchAllDepartments();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/department/addDepartment`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
        fetchAllDepartments();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit department : ", error)
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (data) => {
    setFormData({
      department: data?.department,
      departmentId: data?.departmentId,
      description: data?.description
    });
    setEditDepartmentId(data?._id)
    setShowModal(true);
  }


  const deleteDepartments = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/department/deleteDepartment/${id}`
      });

      if (res.status === 200) {
        fetchAllDepartments();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete department : ", error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllDepartments();
  }, [currentPage])


  const textStyle = { color: 'black' };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <input type="hidden" id="view_export_buttons" />
          <section className="no-print">
            <HeaderHrm />
          </section>
          <section className="content-header">
            <h1>Departments<small>Manage Departments</small></h1>
          </section>
          <section className="content">
            <input type="hidden" id="category_type" defaultValue="hrm_department" />
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title" />
                <div className="box-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-modal"
                    onClick={() => setShowModal(true)}
                  >
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
                  <table className="table table-bordered table-striped" id="category_table">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Department ID</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length > 0 ? (
                        data?.map((group, index) => (
                          <tr key={index}>
                            <td>{group?.department}</td>
                            <td>{group?.departmentId}</td>
                            <td>{group?.description}</td>
                            <td>

                              <DropdownButton id="dropdown-basic-button" title="Actions">
                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item
                                  onClick={() => handleEdit(group)}
                                > <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteDepartments(group?._id)}
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
                          <td colSpan="4" className="text-center"><b>No Data Available</b></td>
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
          </section>
        </div>
        <Footer />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Add Department</h4>
              <span className="close" onClick={handleCloseModal} style={{ color: 'black', fontSize: 20 }}>&times;</span>
            </div>
            <form onSubmit={handleSubmit} style={{ color: 'black' }}>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData?.department}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="departmentId">Department ID</label>
                <input
                  type="text"
                  id="departmentId"
                  name="departmentId"
                  value={formData?.departmentId}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <button type="submit" style={saveButtonStyle}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgb(0,0,0)',
  backgroundColor: 'rgba(0,0,0,0.4)',
};

const modalContentStyle = {
  backgroundColor: '#fefefe',
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%',
  maxWidth: '500px',
  position: 'relative' // Added relative positioning for the close button
};

const saveButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  margin: '10px 0',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
};

const inputStyle = {
  height: '40px',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  boxSizing: 'border-box',
};

export default Departments;
