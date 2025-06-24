import React, { useState } from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEye, faFileCsv, faFileExcel, faFilePdf, faPaperPlane, faPrint } from '@fortawesome/free-solid-svg-icons'

const Proposals = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <input type="hidden" id="view_export_buttons" />
        <section className="no-print">
          <NavbarCrm/>
        </section>
        <section className="content-header no-print">
          <h1>Proposals</h1>
        </section>
        <section className="content">
          <div className="box box-solid">
            <div className="box-header">
              <h3 className="box-title" />
              <div className="box-tools">
                <Link className="btn btn-primary pull-right m-5" to="/crm/add-proposal-template">
                <FontAwesomeIcon icon={faPaperPlane} /> Send		              
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
                <table className="table table-bordered table-striped" id="proposals" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Contact</th>
                      <th>Subject</th>
                      <th>Sent by</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((group, index) => (
                      <tr key={index}>
                          <td>{group.contact}</td>
                          <td>{group.subject}</td>
                          <td>{group.sentBy}</td>
                          <td>{group.date}</td>
                          <td>
                          <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                            <FontAwesomeIcon icon={faEye} /> View
                          </button>
                        </td>
                      </tr>
                      ))
                      ) : (
                      <tr>
                        <td colSpan="7" className="text-center"><b>No Data Available</b></td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default Proposals