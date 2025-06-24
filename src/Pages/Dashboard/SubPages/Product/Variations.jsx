import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Variations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [variationName, setVariationName] = useState('');
  const [shortname, setShortname] = useState('');
  const [id, setId] = useState();
  const handleAddButtonClick = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false)
  }
  const handleSave = () => {
    const newData = { "variationName": variationName, "addVariationValue": shortname };
    setData(newData);

    addVariation(newData);
    setVariationName('');
    setShortname('');
    setShowModal(false);
  };

  const handleEdit = (id) => {
    console.log("Handle edit reached");
    setId(id);
    fetchVariation(id);
  }

  const handleEditSave = () => {
    const newData = { "variationName": variationName, "addVariationValue": shortname };
    editVariation(newData);
    setShowEditModal(false);
    setVariationName('');
    setShortname('');
  }

  const fetchVariations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/variation/getAllVariation?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result?.result)
        setTotalPage(result?.totalPage)
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(true)
    }
  };

  const fetchVariation = async (id) => {
    try {
      console.log("api");

      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/variation/getVariation/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setVariationName(result.result.variationName)
        setShortname(result.result.addVariationValue)
        setShowEditModal(true)
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(true)
    }
  };

  const deleteVariation = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/variation/deleteVariation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete product. Please try again later");
        throw new Error('Failed to delete product');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Product deleted Succesfully")
        fetchVariations();
      } else {
        toast.error("Failed to delete product. Please try again later");
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(true)
    }
  };

  const addVariation = async (data) => {
    try {
      console.log(data);

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/variation/addVariation`, {
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
      toast.success("Variation added successfully");
      navigate('/variations')

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

  const editVariation = async (variationdata) => {
    try {
      console.log(variationdata);
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/variation/updateVariation/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variationdata)
      });

      // 5. Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Variation updated successfully");
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

  useEffect(() => {
    if (!loading) {
      fetchVariations()
    };
  }, [currentPage]);
  
  const textStyle = { color: 'gray' }
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1> Variations <small>Manage product variations</small> </h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All variations</h3>
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
                  <table className="table table-bordered table-striped" id="variation_table" >
                    <thead>
                      <tr>
                        <th >Variations</th>
                        <th>Values</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td>{group.variationName}</td>
                            <td>{group.addVariationValue}</td>
                            <td style={textStyle}>
                              <DropdownButton id="dropdown-basic-button" title="Actions">
                                {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                            <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item href="#/edit" onClick={() => handleEdit(group._id)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                <Dropdown.Item href="#/delete" onClick={() => deleteVariation(group._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                          <td colSpan="4" className="text-center">No Data Available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="pagination-custom justify-content-end" style={{gap: 2}}>
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

            <div className="modal fade variation_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
          </section>
          <div className="scrolltop no-print">
            <div className="scroll icon">
              <i className="fas fa-angle-up" />
            </div>
          </div>
          <section className="invoice print_section" id="receipt_section"></section>
        </div>
        <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Today's profit
                </h4>
              </div>
              <div className="modal-body">
                <input type="hidden" id="modal_today" defaultValue="2024-06-07" />
                <div className="row">
                  <div id="todays_profit"></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" > Close </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Variation</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Variation Name</label>
                  <input
                    placeholder='Variation Name'
                    type="text"
                    className="form-control"
                    id="name"
                    value={variationName}
                    onChange={(e) => setVariationName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Add Variation Value</label>
                  <input
                    placeholder='Short Name'
                    type="text"
                    className="form-control"
                    id="shortname"
                    value={shortname}
                    onChange={(e) => setShortname(e.target.value)}
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
                <h4 className="modal-title">Edit Variation</h4>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Variation Name</label>
                  <input
                    placeholder='Variation Name'
                    type="text"
                    className="form-control"
                    id="name"
                    value={variationName}
                    onChange={(e) => setVariationName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortname">Add Variation Value</label>
                  <input
                    placeholder='Short Name'
                    type="text"
                    className="form-control"
                    id="shortname"
                    value={shortname}
                    onChange={(e) => setShortname(e.target.value)}
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
      <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
      <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
    </div>
  )
}
export default Variations