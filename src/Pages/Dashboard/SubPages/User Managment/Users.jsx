import React, { useState, useEffect } from 'react';
import Header from '../../../../Components/Header';
import Sidebar from '../../../../Components/Sidebar';
import Footer from '../../../../Components/Footer';
import './user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';


const Users = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [roleID, setRoleID] = useState([]);
  const [roles, setRoles] = useState([]);
  const [value, setValue] = useState(0);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/user/getAllUser?${params.toString()}`, {
        method: 'GET',
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
      if (result.result.length > 0) {
        if (data)
          setData(result.result);
          setTotalPage(result.totalPage);
      } else {
        setData([]);
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };


  const fetchRole = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/getAllRole`, {
        method: 'GET',
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
      if (result) {
        setRoles(result.result.roles)
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteUser = async (userID) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/user/deleteUser/${userID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      const result = await response.json();

      if (result.message === 'User Deleted Successfully') {
        console.log("reached")
        setData(prevData => {
          const updatedData = prevData.filter(user => user._id !== userID);
          return updatedData;
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    if (!loading) { // Prevents auto-fetch while deletion is happening
      fetchRole();
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage])

  // const memoizedRoles = useMemo(() => roles, [roles]);



  // useEffect(() => {
  //   if (memoizedRoles.length > 0 && data.length > 0) {
  //     const updatedData = data.map(user => {
  //       const userRole = memoizedRoles.find(role => role._id === user.userProfile.role); // Find the role by ID
  //       return {
  //         ...user,
  //         roleName: userRole ? userRole.roleName : 'Unknown Role', // Add roleName to the user
  //       };
  //     });
  //     setData(updatedData); // Update the users data with roleName
  //   }
  // }, [memoizedRoles, data]);



  const textStyle = { color: 'black' };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper" >
        <section className="content-header">
          <h1> Users <small>Manage users</small></h1>
        </section>
        <section className="content" style={textStyle}>
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">All users</h3>
              <div className="box-tools">
                <div className="btn btn-block btn-primary" >
                  <span onClick={() => navigate("/users/create")}><FontAwesomeIcon icon={faPlus} /> Add</span>
                </div>
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
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user, index) => (
                      <tr key={index}>

                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user?.userProfile?.role?.roleName}</td>
                        <td>{user.email}</td>
                        <td>
                          {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => navigate(`/users/edit/${user?._id}`)}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteUser(user._id)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button> */}


                          <DropdownButton id="dropdown-basic-button" title="Actions">
                            {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                            <Dropdown.Item
                              onClick={() => navigate(`/users/edit/${user?._id}`)}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteUser(user._id)}
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
    </div>
  );
};

export default Users;
