import React, { useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Warranties = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => setShowModal(true);
  const handleModalClose = () => {
    setName('');
    setDescription('');
    setDuration('');
    setShowModal(false);
    setShowEditModal(false);
  }
  const handleSave = () => {
    const newData = { "name": name, "description": description, "duration": Number(duration) };
    addWarranty(newData);
    setName('');
    setDescription('');
    setDuration('');
    setShowModal(false);
  };

  const handleEdit = (id) => {
    setId(id);
    getWarranty(id);
  }

  const handleEditSave = () => {
    const newData = { "name": name, "description": description, "duration": Number(duration) };
    editWarranty(newData);
    setShowEditModal(false);
    setName('');
    setDescription('');
    setDuration('');
    setShowModal(false);
  }

  const fetchWarranty = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/warranty/getAllWarranty?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch warranty');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result.result)
        setTotalPage(result.totalPage)
      } else {
        throw new Error('Failed to fetch warranty');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getWarranty = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/warranty/getWarranty/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch warranty');
      }

      const result = await response.json();

      console.log(result, "result")
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        // console.log(result.result);

        setName(result.result.name);
        setDescription(result.result.description);
        setDuration(result.result.duration);
        setShowEditModal(true)
      } else {
        throw new Error('Failed to fetch warranty');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const addWarranty = async (data) => {
    try {

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/warranty/addWarranty`, {
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
      toast.success("Warranty added successfully");

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

  const editWarranty = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/warranty/updateWarranty/${id}`, {
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
      toast.success("Warranty updated successfully");
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

  const deleteWarranty = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/warranty/deleteWarranty/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete product mapping. Please try again later");
        throw new Error('Failed to delete warranty');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Warranty deleted Succesfully")
        fetchWarranty();
      } else {
        toast.error("Failed to delete warranty.Please try again later");
        throw new Error('Failed to delete warranty');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchWarranty()
    };
  }, [currentPage]);


  const textStyle = { color: 'black' };



  return (
    <div style={textStyle}>
      <>
        <div className="wrapper thetop">
          <Header />
          <Sidebar />
          <div className=" content-wrapper ">
            <section className="content-header"> <h1>Warranties </h1></section>
            <section className="content">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">All Warranties</h3>
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
                  <table className="table table-bordered table-striped" id="warranty_table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td>{group.name}</td>
                            <td>{group.description}</td>
                            <td>{group.duration}</td>
                            <td>
                              <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => handleEdit(group._id)}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                              </button>
                              <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteWarranty(group._id)}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No Data Available</td>
                        </tr>
                      )}
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
            </section>
            <div className="scrolltop no-print">
              <div className="scroll icon">
                <i className="fas fa-angle-up" />
              </div>
            </div>
            <section className="invoice print_section" id="receipt_section"></section>
          </div>
          <Footer />
        </div>
        {showModal && (
          <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Unit</h4>
                  <button type="button" className="close" onClick={handleModalClose}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      placeholder='Name'
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="shortname">Description</label>
                    <input
                      placeholder='Description'
                      type="text"
                      className="form-control"
                      id="shortname"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="allowDecimal">Duration</label>
                    <input
                      placeholder='Duration'
                      type="text"
                      className="form-control"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
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
      </>
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Warranty</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    placeholder='name'
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    placeholder='description'
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    placeholder='Duration'
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
          {/* {console.log(name, description, duration)} */}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Warranty</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    placeholder='name'
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    placeholder='description'
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    placeholder='Duration'
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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

export default Warranties