import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../../../../../Components/Header';
import Sidebar from '../../../../../Components/Sidebar';
import Footer from '../../../../../Components/Footer';
import './SalesCommissionAgents.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';



const SalesCommissionAgents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    salesCommissionPercentage: ""
  })
  // const [prefix, setPrefix] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [contactNumber, setContactNumber] = useState();
  // const [address, setAddress] = useState('');
  // const [salesCommissionPercentage, setSalesCommissionPercentage] = useState();
  const [body, setBody] = useState({});
  const [editBody, setEditBody] = useState({});


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => setShowAddModal(true);

  const handleModalClose = () => {
    setFormData({
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      address: "",
      salesCommissionPercentage: ""
    })
    setId('')
    setShowAddModal(false);
    setShowEditModal(false);
  };


  const handleEditButtonClick = (props) => {
    setId(props._id)
    setFormData(props);
    setShowEditModal(true);
  };

  const handleEdit = () => {
    updateAgent(id);
    // fetchUsers();
    // setShowEditModal(false);
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams();
      params.append('page', currentPage)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/selseCommissionAgent/getAllSelseAgents?${params.toString()}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result.result);
        setTotalPage(result.totalPage);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const addAgents = async () => {
    try {
      setLoading(true);
      // console.log("payload : ", body);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/selseCommissionAgent/addSelseAgent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`

        },
        credentials: "include",
        body: JSON.stringify({ ...formData, contactNumber: Number(formData?.contactNumber), salesCommissionPercentage: Number(formData?.salesCommissionPercentage) }),
      });

      if (response.ok) {
        fetchUsers();
        setFormData({
          prefix: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          address: "",
          salesCommissionPercentage: ""
        });
        setShowAddModal(false);
      }

      const data = await response.json();
      if (response.status === 400) {
        toast.error(data.error);
        throw new Error('Failed to add agent');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Sales Commission Agent is added")
        setLoading(false);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAgent = async (userID) => {

    try {

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/selseCommissionAgent/deleteSelseAgent/${userID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        toast.error("Unable to delete Agent")
        throw new Error('Failed to delete user');
      }

      const result = await response.json();

      if (result.message) {
        toast.success("Agent Deleted Successfully")
        setData(prevData => {
          const updatedData = prevData.filter(user => user._id !== userID);
          return updatedData;
        });
        fetchUsers();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const updateAgent = async (userID) => {
    try {
      // console.log(userID);
      // console.log("Edit Body", editBody);
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/selseCommissionAgent/updateSelseAgent/${userID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, contactNumber: Number(formData?.contactNumber), salesCommissionPercentage: Number(formData?.salesCommissionPercentage) }),
      });

      if (response.ok) {
        fetchUsers();
        setFormData({
          prefix: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          address: "",
          salesCommissionPercentage: ""
        });
        setShowEditModal(false);
      }

      const data = await response.json();
      if (response.status === 400) {
        toast.error(data.error);
        throw new Error('Failed to add agent');
      }

      const result = await response.json();

      if (result.message === 'User Updated Successfully') {
        toast.success("Agent updated successfully")
        setTimeout(() => {
          console.log("Users after update");
          fetchUsers();
        }, 7000);

      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (id) updateAgent(id);
  }, [body])


  const textStyle = { color: 'black' };

  return (
    <div style={textStyle}>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <h1> Sales Commission Agent<small className='ms-5'> Manage agents</small></h1>
        </section>
        <section className="content">
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">All Sales Commission Agent</h3>
              <div className="box-tools">
                <button type="button" className="btn btn-block btn-primary btn-modal" onClick={handleAddButtonClick}>
                  <span><i className="fa fa-plus" /> Add</span>
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
              <div className="table-responsive">
                <table className="table table-bordered table-striped" id="users_table">
                  <thead>
                    <tr>
                      <th>Prefix</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Contact Number</th>
                      <th>Address</th>
                      <th>Sales Commission Percentage (%)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user, index) => (
                      <tr key={index}>
                        <td>{user.prefix}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.contactNo}</td>
                        <td>{user.address}</td>
                        <td>{user.salesCommissionPercentage}</td>
                        <td>
                          {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => handleEditButtonClick(user)}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteAgent(user._id)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button> */}

                          <DropdownButton id="dropdown-basic-button" title="Actions">
                            {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                            <Dropdown.Item
                              onClick={() => handleEditButtonClick(user)}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteAgent(user?._id)}
                            >
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

        </section>
      </div>
      <Footer />

      {showAddModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Sales Commission Agents</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Prefix</label>
                  <input
                    placeholder='Mr/Mrs'
                    type="text"
                    className="form-control"
                    id="prefix"
                    value={formData?.prefix}
                    onChange={(e) => setFormData(prev => ({ ...prev, prefix: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">First Name</label>
                  <input
                    placeholder='First Name'
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={formData?.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Last Name</label>
                  <input
                    placeholder='Last Name'
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={formData?.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Email</label>
                  <input
                    placeholder='Email'
                    type="text"
                    className="form-control"
                    id="email"
                    value={formData?.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Contact No</label>
                  <input
                    placeholder='Contact Number'
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    value={formData?.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Address</label>
                  <input
                    placeholder='Address'
                    type="text"
                    className="form-control"
                    id="address"
                    value={formData?.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Sales Commission Percentage</label>
                  <input
                    placeholder='Sales Commission Percentage'
                    type="number"
                    className="form-control"
                    id="salesCommissionPercentage"
                    value={formData?.salesCommissionPercentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, salesCommissionPercentage: e.target.value }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={addAgents}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Sales Commission Agents</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Prefix</label>
                  <input
                    placeholder='Mr/Mrs'
                    type="text"
                    className="form-control"
                    id="prefix"
                    value={formData?.prefix}
                    onChange={(e) => setFormData(prev => ({ ...prev, prefix: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">First Name</label>
                  <input
                    placeholder='First Name'
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={formData?.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Last Name</label>
                  <input
                    placeholder='Last Name'
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={formData?.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Email</label>
                  <input
                    placeholder='Email'
                    type="text"
                    className="form-control"
                    id="email"
                    value={formData?.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Contact No</label>
                  <input
                    placeholder='Contact Number'
                    type="number"
                    className="form-control"
                    id="contactNumber"
                    value={formData?.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Address</label>
                  <input
                    placeholder='Address'
                    type="text"
                    className="form-control"
                    id="address"
                    value={formData?.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Sales Commission Percentage</label>
                  <input
                    placeholder='Sales Commission Percentage'
                    type="number"
                    className="form-control"
                    id="salesCommissionPercentage"
                    value={formData?.salesCommissionPercentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, salesCommissionPercentage: e.target.value }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SalesCommissionAgents;
