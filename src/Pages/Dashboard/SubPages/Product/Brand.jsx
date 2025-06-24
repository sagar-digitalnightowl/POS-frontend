import React, { useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Brand = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [useForRepair, setUseForRepair] = useState('');
  const [id, setId] = useState();


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => {
    setBrandName("");
    setShortDescription("");
    setUseForRepair(false);
    setShowModal(true)
  };
  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  }
  const handleSave = () => {
    const newData = { "name": brandName, "shortDescription": shortDescription, "useForRepair": useForRepair };
    addBrand(newData);
    setBrandName('');
    setShortDescription('');
    setUseForRepair('')
    setShowModal(false);
  };

  const handleEdit = (id) => {
    setId(id);
    getBrand(id);
  }

  const handleEditSave = () => {
    const newData = { "name": brandName, "shortDescription": shortDescription, "useForRepair": useForRepair };
    editBrand(newData);
    setShowEditModal(false);
    setBrandName('');
    setShortDescription('');
    setUseForRepair('')
  }

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: currentPage})
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getAllBrand?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch units');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result.result)
        setTotalPage(result?.totalPage)
      } else {
        throw new Error('Failed to fetch brands');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  const getBrand = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getBrand/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch unit');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setBrandName(result.result.name);
        setShortDescription(result.result.shortDescription);
        setUseForRepair(result.result.useForRepair);
        setShowEditModal(true)
      } else {
        throw new Error('Failed to fetch unit');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const addBrand = async (data) => {
    try {
      console.log(data);

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/addBrand`, {
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
      toast.success("Brand added successfully");
      fetchBrands();

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

  const editBrand = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/updateBrand/${id}`, {
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
      toast.success("Brand updated successfully");
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

  const deleteBrand = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/deleteBrand/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete unit. Please try again later");
        throw new Error('Failed to delete brand');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Brand deleted Succesfully")
        fetchBrands();
      } else {
        toast.error("Failed to delete brand.Please try again later");
        throw new Error('Failed to delete brand');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchBrands()
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
            <h1> Brands <small>Manage your brands</small></h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All your brands</h3>
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
                  <table className="table table-bordered table-striped" id="brands_table">
                    <thead>
                      <tr>
                        <th>Brands</th>
                        <th>Note</th>
                        <th>Use For Repair</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.shortDescription}</td>
                          <td>{user.useForRepair ? "True" : "False"}</td>
                          <td>
                            <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => handleEdit(user._id)}>
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteBrand(user._id)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
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
            <div className="modal fade brands_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
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
                <h4 className="modal-title">Add Brand</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name"> Brand Name:</label>
                  <input
                    placeholder='Brand Name'
                    type="text"
                    className="form-control"
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Short Description</label>
                  <input
                    placeholder='Short Name'
                    type="text"
                    className="form-control"
                    id="shortDescription"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    lassName="form-check-input"
                    id="useForRepair"
                    value={useForRepair}
                    checked={useForRepair}
                    onChange={(e) => setUseForRepair(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="useForRepair">Use for repair?</label>
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
                <h4 className="modal-title">Edit Brand</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name"> Brand Name:</label>
                  <input
                    placeholder='Brand Name'
                    type="text"
                    className="form-control"
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Short Description</label>
                  <input
                    placeholder='Short Name'
                    type="text"
                    className="form-control"
                    id="shortDescription"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    lassName="form-check-input"
                    id="useForRepair"
                    value={useForRepair}
                    checked={useForRepair}
                    onChange={(e) => setUseForRepair(e.target.checked)}
                    readOnly
                  />
                  <label className="form-check-label" htmlFor="useForRepair">Use for repair?</label>
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
      <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
    </div>
  )
}

export default Brand