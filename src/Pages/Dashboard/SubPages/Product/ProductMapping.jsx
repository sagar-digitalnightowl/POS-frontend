import React, { useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductMapping = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState();
  const [accountName, setAccountName] = useState("");
  const [representativeName, setRespresentativeName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [mappedPercentage, setMappedPercentage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => setShowModal(true);

  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  }
  const handleSave = () => {
    const newData = { "accountName": accountName, "representativeName": representativeName, "itemDescription": itemDescription, "mappedPercentage": Number(mappedPercentage) };
    addProductMapping(newData);
    clear();
    setShowModal(false);
  };

  const clear = () => {
    setAccountName('');
    setRespresentativeName('');
    setItemDescription('')
    setMappedPercentage(0);
  }

  const handleEdit = (id) => {
    setId(id);
    getProductMapping(id);
  }

  const handleEditSave = () => {
    const newData = { "accountName": accountName, "representativeName": representativeName, "itemDescription": itemDescription, "mappedPercentage": Number(mappedPercentage) };
    editProductMapping(newData);
    setShowEditModal(false);
    setAccountName('');
    setRespresentativeName('');
    setItemDescription('')
    setMappedPercentage(0);
  }

  const fetchProductMappings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productMapping/getAllProductMapping?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product mappings');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result.result)
        setTotalPage(result.totalPage);
      } else {
        throw new Error('Failed to fetch product mappings');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getProductMapping = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productMapping/getProductMapping/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product mapping');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setAccountName(result.result.accountName);
        setRespresentativeName(result.result.representativeName);
        setItemDescription(result.result.itemDescription)
        setMappedPercentage(result.result.mappedPercentage);
        setShowEditModal(true)
      } else {
        throw new Error('Failed to fetch unit');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const addProductMapping = async (data) => {
    try {

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productMapping/addProductMapping`, {
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
      toast.success("Product Mapping added successfully");

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

  const editProductMapping = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productMapping/updateProductMapping/${id}`, {
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
      toast.success("Product Mapping updated successfully");
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

  const deleteProductMapping = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productMapping/deleteProductMapping/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete product mapping. Please try again later");
        throw new Error('Failed to delete product mapping');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Product mapping deleted Succesfully")
        fetchProductMappings();
      } else {
        toast.error("Failed to delete product mapping.Please try again later");
        throw new Error('Failed to delete product mapping');
      }
    } catch (error) {
      setError(error.message);
    }
  };


  useEffect(() => {
    if (!loading) {
      fetchProductMappings()
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
            <h1>Products Mapping</h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box  box-solid " id="accordion">
                  <div className="box-header with-border" style={{ cursor: "pointer" }}>
                    <h3 className="box-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                        <i className="fa fa-filter" aria-hidden="true" /> Filters
                      </a>
                    </h3>
                  </div>
                  <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                    <div className="box-body">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_mapping_representative_id">
                            Representative:
                          </label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-user" />
                            </span>
                            <select className="form-control select2" id="product_mapping_representative_id" name="product_mapping_representative_id">
                              <option selected="selected" value="">
                                All
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_mapping_customer_id">
                            Customer:
                          </label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-user" />
                            </span>
                            <select
                              className="form-control select2"
                              id="product_mapping_customer_id"
                              name="product_mapping_customer_id"
                            >
                              <option selected="selected" value=""> All </option>
                              <option value={3}>- Walk-In Customer (CO0001)</option>
                              <option value={4}> - test (CO0002)</option>
                              <option value={24}> - zamini (CO0004)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box box-primary">
                  <div className="box-body">
                    <div className="tab-content">
                      <div className="tab-pane active" id="product_list_tab">
                        <button className="btn btn-primary pull-right" onClick={() => {clear(); setShowModal(true)}} >
                          <i className="fa fa-plus" /> Add
                        </button>
                        <br />
                        <br />
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
                    <div className="table-responsive">
                      <table
                        className="table table-bordered table-striped"
                        id="products_mapping_table"
                      >
                        <thead>
                          <tr>

                            <th>Account Name</th>
                            <th>Representative Name</th>
                            <th>Item Description</th>
                            <th>Mapped Percentage</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((user, index) => (
                            <tr key={index}>
                              <td>{user.accountName}</td>
                              <td>{user.representativeName}</td>
                              <td>{user.itemDescription}</td>
                              <td>{user.mappedPercentage}</td>
                              <td>
                                <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => handleEdit(user._id)}>
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteProductMapping(user._id)}>
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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


                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="invoice print_section" id="receipt_section"></section>
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Product Mapping</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name"> Account Name:</label>
                  <input
                    placeholder='Account Name'
                    type="text"
                    className="form-control"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="representativename">Representative Name</label>
                  <input
                    placeholder='Representative Name'
                    type="text"
                    className="form-control"
                    id="representativeName"
                    value={representativeName}
                    onChange={(e) => setRespresentativeName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemdescription">Item Description</label>
                  <input
                    placeholder='Item Description'
                    type="text"
                    className="form-control"
                    id="itemDescription"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mappedpercentage">Mapped Percentage</label>
                  <input
                    placeholder='Mapped Percentage'
                    type="text"
                    className="form-control"
                    id="mappedPercentage"
                    value={mappedPercentage}
                    onChange={(e) => setMappedPercentage(e.target.value)}
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
                <h4 className="modal-title">Edit Product Mapping</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name"> Account Name:</label>
                  <input
                    placeholder='Account Name'
                    type="text"
                    className="form-control"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="representativename">Representative Name</label>
                  <input
                    placeholder='Representative Name'
                    type="text"
                    className="form-control"
                    id="representativeName"
                    value={representativeName}
                    onChange={(e) => setRespresentativeName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemdescription">Item Description</label>
                  <input
                    placeholder='Item Description'
                    type="text"
                    className="form-control"
                    id="itemDescription"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mappedpercentage">Mapped Percentage</label>
                  <input
                    placeholder='Mapped Percentage'
                    type="text"
                    className="form-control"
                    id="mappedPercentage"
                    value={mappedPercentage}
                    onChange={(e) => setMappedPercentage(e.target.value)}
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

export default ProductMapping