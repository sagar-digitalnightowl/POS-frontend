import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faCaretDown, faEdit, faTrash, faSync, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer';

const StockAdjustmentReports = () => {
    const[data, setData] = useState([
        {date:'21/06/2024',referenceNo:'001',location:'POS APPLICATION',totalAmount:'1024',totalAmountRecovered:'990',addedBy:'Anish'}
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showDropdown, setShowDropdown] =useState(false);
    const toggleDropdown = () => {setShowDropdown(!showDropdown);};
    const handleOptionClick = (option) => {console.log(`Selected option: ${option}`);setShowDropdown(false);};
  
    const dropdownStyles = {
        display: showDropdown ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        marginTop: '5px',
        zIndex: 1,
        width: '100%',
    };
  
    const buttonStyles = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      cursor: 'pointer',
    };
  
    const optionStyles = {padding: '10px',cursor: 'pointer',};
  
    const options = [
      'Today',
      'Yesterday',
      'Last 3 Days',
      'This Month',
      'Last Month',
      'This Year',
      'Last Year',
    ];
    const textStyle={color:'black'};
  return(
    <div>
    <div className="wrapper thetop" style={textStyle}>
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Stock Adjustment Report </h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-3 col-md-offset-7 col-xs-6">
              <div className="input-group">
                <span className="input-group-addon bg-light-blue">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <select className="form-control select2" id="stock_adjustment_location_filter">
                  <option value="">All locations</option>
                  <option value={4}>POS APPLICATION</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-xs-6" style={{ position: 'relative' }}>
      <div className="input-group">
        <button type="button" className="btn btn-primary" id="stock_adjustment_date_filter"onClick={toggleDropdown}style={buttonStyles}>
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} /> Filter by date
          </span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        <div style={dropdownStyles}>
          {options.map((option, index) => (
            <div key={index}style={optionStyles}onClick={() => handleOptionClick(option)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <div className="box box-solid">
                <div className="box-body">
                  <table className="table no-border">
                    <tbody>
                      <tr>
                        <th>Total Normal:</th>
                        <td>
                          <span className="total_normal">
                            <FontAwesomeIcon icon={faSync} spin fixedWidth />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Total Abnormal:</th>
                        <td>
                          <span className="total_abnormal">
                            <FontAwesomeIcon icon={faSync} spin fixedWidth />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Total Stock Adjustment:</th>
                        <td>
                          <span className="total_amount">
                            <FontAwesomeIcon icon={faSync} spin fixedWidth />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="box box-solid">
                <div className="box-body">
                  <table className="table no-border">
                    <tbody>
                      <tr>
                        <th>Total Amount Recovered:</th>
                        <td>
                          <span className="total_recovered">
                          <FontAwesomeIcon icon={faSync} spin fixedWidth />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Stock Adjustments</h3>
                </div>
                <div className="box-body" style={{ overflowX: 'auto' }}>
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
                    <table className="table table-bordered table-striped"id="stock_adjustment_table">
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Date</th>
                          <th>Reference No</th>
                          <th>Location</th>
                          <th>Adjustment type</th>
                          <th>Total Amount</th>
                          <th>Total amount recovered</th>
                          <th>Reason</th>
                          <th>Added By</th>
                        </tr>
                      </thead>
                      <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={index}>
                        <td>
                            <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${user.username}`)}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${user.username}`)}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        </td>
                        <td>{user.date}</td>
                        <td>{user.referenceNo}</td> 
                        <td>{user.location}</td>
                        <td>{user.adjustmentType}</td>
                        <td>{user.totalAmount}</td>
                        <td>{user.totalAmountRecovered}</td>
                        <td>{user.reason}</td>
                        <td>{user.addedBy}</td>
                    </tr>
                  ))}
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
        </section>
      </div>
     <Footer/>
    </div>
  </div>
  )
}

export default StockAdjustmentReports