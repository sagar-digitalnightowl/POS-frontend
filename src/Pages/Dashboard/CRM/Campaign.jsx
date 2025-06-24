import React, { useState } from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faFilter, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'

const Campaign = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const textstyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textstyle}>
        <Header/>
        <Sidebar/>
      <div className=" content-wrapper ">
        <section className="no-print">
            <NavbarCrm/>
        </section>
        <section className="content-header no-print">
          <h1>Campaigns</h1>
        </section>
        <section className="content no-print">
          <div className="box  box-solid " id="accordion">
            <div className="box-header with-border" style={{ cursor: "pointer" }}>
              <h3 className="box-title">
                <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                <FontAwesomeIcon icon={faFilter} /> Filters
                </Link>
              </h3>
            </div>
            <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
              <div className="box-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="campaign_type">Campaign Type:</label>
                      <select className="form-control select2"id="campaign_type_filter"name="campaign_type">
                        <option selected="selected" value="">All</option>
                        <option value="sms">Sms</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">All Campaigns</h3>
              <div className="box-tools">
                <Link className="btn btn-sm btn-primary pull-right m-5"to="/crm/campaigns/create">
                <FontAwesomeIcon icon={faPlus} /> Add
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
                <table className="table table-bordered table-striped"id="campaigns_table">
                  <thead>
                    <tr>
                      <th> Action</th>
                      <th>Campaign Name</th>
                      <th>Campaign Type</th>
                      <th>Created By</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (currentItems.map((group, index) => (
                        <tr key={index}>
                            <td>
                                <button style={{ backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button style={{backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                            <td>{group.camapignName}</td>
                            <td>{group.campaignType}</td>
                            <td>{group.createdBy}</td>
                            <td>{group.createrAt}</td>
                        </tr>
                        ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="text-center"><b>No Data Available</b></td>
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

export default Campaign