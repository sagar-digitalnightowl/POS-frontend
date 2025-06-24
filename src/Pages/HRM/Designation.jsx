import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { apiCall } from '../../utils/apiCall'
import { Dropdown, DropdownButton } from 'react-bootstrap'

const Designation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);

  const [editDesignationId, setEditDesignationId] = useState('');
  const [formData, setFormData] = useState({
    designation: '',
    description: ''
  });

  const handleCloseModal = () => {
    setEditDesignationId('')
    setFormData({
      designation: '',
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


  const fetchAllDesignation = async () => {
    setLoading(true);
    try {
      const param = new URLSearchParams();
      param.append('page', currentPage);
      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/designation/getAllDesignation?${param.toString()}`
      });

      if (res.status === 200) {
        setData(res?.data?.result)
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all Designation : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editDesignationId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/designation/updateDesignation/${editDesignationId}`,
          data: formData
        })

        if (res.status === 200) {
          handleCloseModal();
          fetchAllDesignation();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/designation/addDesignation`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
        fetchAllDesignation();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit Designation : ", error)
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (data) => {
    setFormData({
      designation: data?.designation,
      description: data?.description
    });
    setEditDesignationId(data?._id)
    setShowModal(true);
  }


  const deleteDesignation = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/designation/deleteDesignation/${id}`
      });

      if (res.status === 200) {
        fetchAllDesignation();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete Designation : ", error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllDesignation();
  }, [currentPage])

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
            <h1>Designations <small>Manage designations</small></h1>
          </section>
          <section className="content">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title" />
                <div className="box-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={() => setShowModal(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped" id="category_table">
                    <thead>
                      <tr>
                        <th>Designation</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ?
                        data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.designation}</td>
                            <td>{item.description}</td>
                            <td>
                              <DropdownButton id="dropdown-basic-button" title="Actions">
                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item
                                  onClick={() => handleEdit(item)}
                                > <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteDesignation(item?._id)}
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
                        :
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center' }}>No data found</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1050,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="modal-dialog" style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            width: '90%',
            maxWidth: '500px',
            overflow: 'hidden'
          }}>
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header" style={{
                padding: '15px',
                borderBottom: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h4 className="modal-title" style={{ margin: 0 }}>{editDesignationId ? "Edit" : "Add"} Designation</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ padding: '15px' }}>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={formData?.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData?.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer" style={{
                padding: '10px 15px',
                borderTop: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
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

export default Designation
