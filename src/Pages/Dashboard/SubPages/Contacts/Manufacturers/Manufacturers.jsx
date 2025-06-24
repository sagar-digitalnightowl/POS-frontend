import React, { useState, useEffect } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const Manufacturers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchManufacturers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/getAllManufacturer?${params.toString()}`, {
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
      if (result) {
        setData(result.result)
        setTotalPage(result.totalPage)
        // setData(result.result.roles)
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteManufacturer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/deleteManufacturer/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete user. Please try again later");
        throw new Error('Failed to delete user');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("User deleted Succesfully")
        fetchManufacturers();
      } else {
        toast.error("Failed to delete user. Please try again later");
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchManufacturers();
    }
  }, [currentPage]);
  const textStyle = { color: 'black' };

  const handleEdit = (manufacturerId) => {
    navigate(`/manufacturers/${manufacturerId}`)
  }

  console.log(totalPage, "total page")

  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper " style={{ color: 'black' }}>
          <section className="content-header">
            <h1>Manufacturers</h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All Manufacturers</h3>
                <div className="box-tools">
                  <Link to="/manufacturers/addmanufacturers" className="btn btn-block btn-primary">
                    <span onClick={() => navigate("/manufacturers/addmanufacturers")}><i className="fa fa-plus" /> Add</span>
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
                    <input type="text" className="form-control form-control-sm" placeholder="Search..." onChange={(e) => console.log(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped ar_table" id="all_ar">
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((manufacturer, index) => (
                        <tr key={index} role="row" className="odd">
                          <td>
                            <img src={manufacturer.profilePhotoUrl} width={60} />
                          </td>
                          <td>{manufacturer.name}</td>
                          <td>{manufacturer.phoneNumber}</td>
                          <td>{manufacturer.email}</td>
                          <td>
                            <DropdownButton id="dropdown-basic-button" title="Actions">
                              {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                                                        <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                              <Dropdown.Item href="#/edit" onClick={() => handleEdit(manufacturer._id)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                              <Dropdown.Item href="#/delete" onClick={() => deleteManufacturer(manufacturer._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                              {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                                                        <br />
                                                        <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                                                        <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                                                        <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                                                        <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item> */}
                            </DropdownButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="pagination-custom justify-content-end">
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
            <div className="modal fade customer_groups_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
          </section>
        </div>
        <Footer />
      </div>
      <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Manufacturers