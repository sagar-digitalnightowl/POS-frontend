import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import Footer from '../../Components/Footer'
import { apiCall } from '../../utils/apiCall'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SalesTarget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [editSaleTargetId, setEditSaleTargetId] = useState('');

  const [formData, setFormData] = useState({
    employee: '',
    totalSalesAmountFrom: '',
    totalSalesAmountTo: '',
    commissionPercentage: '',
  });


  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      employee: '',
      totalSalesAmountFrom: '',
      totalSalesAmountTo: '',
      commissionPercentage: '',
    })
    setEditSaleTargetId('');
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

  const fetchAllSaleTarget = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/hrm/salesTarget/getAllSalesTarget`,
      })

      if (res.status === 200) {
        setData(res?.data?.result)
        setTotalPage(res?.data?.totalPage)
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in get all sale target : ", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchAllSaleTarget();
  }, [currentPage])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (editSaleTargetId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/hrm/salesTarget/updateSalesTarget/${editSaleTargetId}`,
          data: formData
        });

        if (res.status === 200) {
          handleCloseModal();
          fetchAllSaleTarget();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/hrm/salesTarget/addSalesTarget`,
        data: formData
      })

      if (res.status === 201) {
        handleCloseModal();
        fetchAllSaleTarget();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in add/edit sale target : ", error)
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (data) => {
    setFormData({
      employee: data?.employee?._id,
      totalSalesAmountFrom: data?.totalSalesAmountFrom,
      totalSalesAmountTo: data?.totalSalesAmountTo,
      commissionPercentage: data?.commissionPercentage,
    });
    setEditSaleTargetId(data?._id);
    setShowModal(true);
  }

  const deleteSaleTarget = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/hrm/salesTarget/deleteSalesTarget/${id}`,
      })

      if (res.status === 200) {
        fetchAllSaleTarget();
      } else {
        setError(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in delete sale target : ", error)
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
            <div className="box-header">
              <h3 className="box-title">Sales Targets</h3>
              <div className="box-tools">
                <button type="button" className="btn btn-block btn-primary btn-modal" onClick={() => setShowModal(true)}>
                  <i className="fa fa-plus" /> Add
                </button>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-solid">
                  <div className="box-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped" id="sales_target_table">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Total Sales Amount From</th>
                            <th>Total Sales Amount To</th>
                            <th>Commission Percentage</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data?.length > 0 ?
                              data?.map(group => (
                                <tr key={group?._id}>
                                  <td>{group?.employee?.firstName} {group?.employee?.lastName}</td>
                                  <td>{group?.totalSalesAmountFrom}</td>
                                  <td>{group?.totalSalesAmountTo}</td>
                                  <td>{group?.commissionPercentage}</td>
                                  <td>
                                    <DropdownButton id="dropdown-basic-button" title="Actions">
                                      {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                      <Dropdown.Item onClick={() => handleEdit(group)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                      <Dropdown.Item onClick={() => deleteSaleTarget(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                              : <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>No data found</td>
                              </tr>
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>

      {showModal && (
        <div className="modal" style={{
          display: 'block',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1050'
        }}>
          <div className="modal-dialog" style={{
            position: 'relative',
            margin: 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '600px'
          }}>
            <form onSubmit={handleSubmit} className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Set Sales Target</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="form-group">
                    <label>Employee</label>
                    <select
                      className="form-control"
                      name='employee'
                      value={formData?.employee}
                      onChange={handleChange}
                      required
                    >
                      <option value="">select</option>
                      {
                        employees.map(emp => (
                          <option key={emp?._id} value={emp?._id}>{emp?.firstName} {emp?.lastName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Total Sales Amount From</label>
                    <input
                      type="number"
                      className="form-control"
                      name='totalSalesAmountFrom'
                      value={formData?.totalSalesAmountFrom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Total Sales Amount To</label>
                    <input
                      type="number"
                      className="form-control"
                      name='totalSalesAmountTo'
                      value={formData.totalSalesAmountTo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Commission Percentage</label>
                    <input
                      type="number"
                      className="form-control"
                      name='commissionPercentage'
                      value={formData.commissionPercentage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddField}
                >
                  + Add More
                </button> */}
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
  )
}

export default SalesTarget
