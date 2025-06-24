import React, { useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Categories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryCode, setCategorycode] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  }
  const handleSave = () => {
    const newData = { "name": categoryName, "categoryCode": categoryCode, "description": description };
    addCategory(newData);
    setTimeout(() => {
      setCategoryName('');
      setCategorycode('');
      setDescription('')
    }, 1000)
    setShowModal(false);
  };

  const handleEdit = (id) => {
    setId(id);
    fetchCategory(id);
  }

  const handleEditSave = () => {
    const newData = { "name": categoryName, "categoryCode": categoryCode, "description": description };
    editCategory(newData);
    setShowEditModal(false);
    setCategoryName('');
    setCategorycode('');
    setDescription('')
  }

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      params.append("page", currentPage)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/getAllCategory?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result?.result)
        setTotalPage(result?.totalPage)
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  const fetchCategory = async (id) => {
    try {
      // console.log("api");

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/getCategory/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setCategoryName(result.result.name)
        setCategorycode(result.result.categoryCode)
        setDescription(result.result.description)
        setShowEditModal(true)
      } else {
        throw new Error('Failed to fetch category');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const addCategory = async (data) => {
    try {
      // console.log(data);

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/addCategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // 5. Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Category added successfully");

    } catch (error) {
      console.error('Full Error:', error);
      toast.error(error.message.includes('Server error') ?
        'Server processing failed' :
        'Failed to send request'
      );
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/updateCategory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // 5. Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Category updated successfully");
      fetchCategories();
      setShowEditModal(false);

    } catch (error) {
      console.error('Full Error:', error);
      toast.error(error.message.includes('Server error') ?
        'Server processing failed' :
        'Failed to send request'
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/deleteCategory/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete category. Please try again later");
        throw new Error('Failed to delete category');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Category deleted Succesfully")
        fetchCategories();
      } else {
        toast.error("Failed to delete category. Please try again later");
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchCategories()
    };
  }, [currentPage]);
  const textStyle = { color: 'black' };



  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1> Categories <small>Manage your categories</small></h1>
          </section>
          <section className="content">
            <input type="hidden" id="category_type" defaultValue="product" />
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title" />
                <div className="box-tools">
                  <button type="button" className="btn btn-block btn-primary btn-modal" onClick={handleAddButtonClick}>
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
                  <table className="table table-bordered table-striped" id="category_table">
                    <thead>
                      <tr>
                        <th> Category </th>
                        <th>Category Code</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td style={textStyle}>{group.name}</td>
                            <td style={textStyle}>{group.categoryCode}</td>
                            <td style={textStyle}>{group.description}</td>
                            <td style={textStyle}>
                              <DropdownButton id="dropdown-basic-button" title="Actions">
                                {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                                                                <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item href="#/edit" onClick={() => handleEdit(group._id)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                <Dropdown.Item href="#/delete" onClick={() => deleteCategory(group._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                                                                <br/>
                                                                <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                                                                <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                                                                <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                                                                <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item> */}
                              </DropdownButton>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center" style={textStyle}>No Data Available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
            </div>
            <div className="modal fade category_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
          </section>
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder='Category Name'
                    type="text"
                    className="form-control"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Short Name</label>
                  <input
                    placeholder='Category Code'
                    type="text"
                    className="form-control"
                    id="categoryCode"
                    value={categoryCode}
                    onChange={(e) => setCategorycode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Description</label>
                  <input
                    placeholder='Description'
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
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
                <h4 className="modal-title">Edit Category</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder='Category Name'
                    type="text"
                    className="form-control"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Short Name</label>
                  <input
                    placeholder='Category Code'
                    type="text"
                    className="form-control"
                    id="categoryCode"
                    value={categoryCode}
                    onChange={(e) => setCategorycode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allowDecimal">Description</label>
                  <input
                    placeholder='Description'
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleEditSave}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Categories