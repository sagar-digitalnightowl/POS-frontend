import React, { useState } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Navbar from './Navbar'
import Footer from '../../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faPlus,faInfoCircle,faCheckCircle, faDesktop, faBolt, faCogs,    faTools
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

const Setting = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [priceCalculationType, setPriceCalculationType] = useState('');
  const [calculationPercentage, setCalculationPercentage] = useState('');
  const handleAddButtonClick = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleSave = () => {
      const newData = [...data, { name, priceCalculationType, calculationPercentage }];
      setData(newData);
      setName('');
      setPriceCalculationType('');
      setCalculationPercentage('');
      setShowModal(false);
  };

    const textStyle = { color: 'black' };

  return (
<div style={textStyle}>
  <div className="wrapper thetop">
   <Header/>
   <Sidebar/>
    <div className=" content-wrapper ">
      <Navbar/>
      <section className="content-header">
        <h1> <FontAwesomeIcon icon={faTools}/>Settings</h1>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className="active">
                  <Link to="#repair_status_tab" data-toggle="tab" aria-expanded="true">
                  <FontAwesomeIcon icon={faCheckCircle} />Status
                    <FontAwesomeIcon icon={faInfoCircle}
                      className="fa fa-info-circle text-info hover-q no-print "
                      aria-hidden="true"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="auto bottom"
                      data-content="All job sheets status"
                      data-html="true"
                      data-trigger="hover"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#repair_device_tab" data-toggle="tab" aria-expanded="true">
                    <FontAwesomeIcon icon={faDesktop} />Devices
                    <FontAwesomeIcon icon={faInfoCircle}
                      className="fa fa-info-circle text-info hover-q no-print "
                      aria-hidden="true"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="auto bottom"
                      data-content="Electronic Devices like-<br> Laptop, Desktop, Mobile"
                      data-html="true"
                      data-trigger="hover"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#repair_device_models_tab" data-toggle="tab" aria-expanded="true">
                    <FontAwesomeIcon icon={faBolt} />Device Models
                    <FontAwesomeIcon icon={faInfoCircle}
                      className="fa fa-info-circle text-info hover-q no-print "
                      aria-hidden="true"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="auto bottom"
                      data-content="Here device models can be added along with its repair checklist"
                      data-html="true"
                      data-trigger="hover"
                    />
                  </Link>
                </li>
                <li>
                  <a href="#repair_settings_tab" data-toggle="tab" aria-expanded="true">
                  <FontAwesomeIcon icon={faCogs} />
                    Repair Settings
                  </a>
                </li>
              </ul>
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
              <div className="tab-content">
                <div className="tab-pane active" id="repair_status_tab">
                  <button type="button" className="btn btn-sm btn-primary btn-modal pull-right" onClick={handleAddButtonClick}>
                    <FontAwesomeIcon icon={faPlus} />Add
                  </button>
                  <br />
                  <br />
                  <table className="table table-bordered table-striped"id="status_table"style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Status Name</th>
                        <th>Color</th>
                        <th>Sort Order</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((group, index) => (
                        <tr key={index}>
                          <td style={textStyle}>{group.statusName}</td>
                          <td style={textStyle}>{group.color}</td>
                          <td style={textStyle}>{group.sortOrder}</td>
                          <td style={textStyle}>Actions</td>
                        </tr>
                      ))
                      ) : (
                      <tr>
                        <td colSpan="5" className="text-center" style={textStyle}>No Data Available</td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <ul className="pagination-custom justify-content-end">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link1" style={{ color: 'black' }}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link1" style={{ color: 'black' }}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link1" style={{ color: 'black' }}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
  </div>
  {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Customer Group</h4>
                                <button type="button" className="close" onClick={handleModalClose}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Customer Group Name</label>
                                    <input
                                        placeholder='Customer Group Name'
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priceCalculationType">Price Calculation Type</label>
                                    <select
                                        className="form-control"
                                        id="priceCalculationType"
                                        value={priceCalculationType}
                                        onChange={(e) => setPriceCalculationType(e.target.value)}>
                                        <option value="">Please select</option>
                                        <option value="Percentage">Percentage</option>
                                        <option value="Selling Price Group">Selling Price Group</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="calculationPercentage">Calculation Percentage (%)</label>
                                    <input
                                        placeholder='Calculation Percentage (%)'
                                        type="number"
                                        className="form-control"
                                        id="calculationPercentage"
                                        value={calculationPercentage}
                                        onChange={(e) => setCalculationPercentage(e.target.value)}
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
</div>
  )
}

export default Setting