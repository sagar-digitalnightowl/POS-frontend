import React, { useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faFilter, faLayerGroup, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaGgCircle } from 'react-icons/fa'

const Payrol = () => {
    const [activeTab, setActiveTab] = useState('payroll_tab');
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
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="no-print">
                        <HeaderHrm />
                    </section>
                    <section className="content-header">
                        <h1>Payroll</h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="nav-tabs-custom">
                                    <ul className="nav nav-tabs">
                                        <li className={activeTab === 'payroll_tab' ? 'active' : ''}>
                                            <a onClick={() => setActiveTab('payroll_tab')}>
                                            <FontAwesomeIcon icon={faCoins} />
                                                All Payrolls
                                            </a>
                                        </li>
                                        <li className={activeTab === 'payroll_group_tab' ? 'active' : ''}>
                                            <a onClick={() => setActiveTab('payroll_group_tab')}>
                                            <FontAwesomeIcon icon={faLayerGroup} />
                                                All Payroll Groups
                                            </a>
                                        </li>
                                        <li className={activeTab === 'pay_component_tab' ? 'active' : ''}>
                                            <a onClick={() => setActiveTab('pay_component_tab')}>
                                            <FontAwesomeIcon icon={FaGgCircle} />
                                                Pay Components
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        {activeTab === 'payroll_tab' && (
                                            <div className="tab-pane active" id="payroll_tab">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="box box-solid" id="accordion">
                                                            <div className="box-header with-border" style={{ cursor: "pointer" }}>
                                                                <h3 className="box-title">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                                                                        <FontAwesomeIcon icon={faFilter}/>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div id="collapseFilter" className="panel-collapse active collapse" aria-expanded="true">
                                                                <div className="box-body">
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="user_id_filter">
                                                                                Employee:
                                                                            </label>
                                                                            <select className="form-control select2" style={{ width: "100%" }} id="user_id_filter" name="user_id_filter">
                                                                                <option selected="selected" value="">All</option>
                                                                                <option value={4}>POS ADMIN</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="location_id_filter">
                                                                                Business Location:
                                                                            </label>
                                                                            <select className="form-control select2" style={{ width: "100%" }} id="location_id_filter" name="location_id_filter">
                                                                                <option selected="selected" value="">All</option>
                                                                                <option value="" selected="selected">All locations</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="department_id">Department:</label>
                                                                            <select className="form-control select2" style={{ width: "100%" }} id="department_id" name="department_id">
                                                                                <option selected="selected" value="">All</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="designation_id">Designation:</label>
                                                                            <select className="form-control select2" style={{ width: "100%" }} id="designation_id" name="designation_id">
                                                                                <option selected="selected" value="">All</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="month_year_filter">Month/Year:</label>
                                                                            <div className="input-group">
                                                                                <input className="form-control" placeholder="Month/Year" name="month_year_filter" type="text" id="month_year_filter" />
                                                                                <span className="input-group-addon">
                                                                                    <i className="fa fa-calendar" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#payroll_modal">
                                                            <FontAwesomeIcon icon={faPlus} /> 
                                                            Add
                                                        </button>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered table-striped" id="all-payroll" style={{ width: "100%" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Employee</th>
                                                                        <th>Department</th>
                                                                        <th>Designation</th>
                                                                        <th>Month/Year</th>
                                                                        <th>Reference No</th>
                                                                        <th>Total amount</th>
                                                                        <th>Payment Status</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                            <tr key={index}>
                                                <td>{group.employee}</td>
                                                <td>{group.department}</td>
                                                <td>{group.designation}</td>
                                                <td>{group.monthYear}</td>
                                                <td>{group.referenceNo}</td>
                                                <td>{group.totalAmount}</td>
                                                <td>{group.paymentStatus}</td>
                                                <td>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </td>
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
                                            </div>
                                        )}
                                        {activeTab === 'payroll_group_tab' && (
                                            <div className="tab-pane active" id="payroll_group_tab">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered table-striped" id="all-payroll-tab" style={{ width: "100%" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Status</th>
                                                                        <th>Payment Status</th>
                                                                        <th>Total gross amount</th>
                                                                        <th>Added By</th>
                                                                        <th>Location</th>
                                                                        <th>Created At</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                            <tr key={index}>
                                                <td>{group.name}</td>
                                                <td>{group.status}</td>
                                                <td>{group.paymentStatus}</td>
                                                <td>{group.totalGrossAmount}</td>
                                                <td>{group.addedBy}</td>
                                                <td>{group.location}</td>
                                                <td>{group.createdAt}</td>
                                                <td>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </td>
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
                                            </div>
                                        )}
                                        {activeTab === 'pay_component_tab' && (
                                            <div className="tab-pane active" id="pay_component_tab">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <button type="button" className="btn btn-primary btn-modal pull-right" data-href="/essentials/allowance-deduction/create" data-container="#add_allowance_deduction_modal">
                                                            <FontAwesomeIcon icon={faPlus}/> Add
                                                        </button>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered table-striped" id="payment-tab" style={{ width: "100%" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Description</th>
                                                                        <th>Type</th>
                                                                        <th>Amount</th>
                                                                        <th>Applicable Date</th>
                                                                        <th>Employee</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                            <tr key={index}>
                                                <td>{group.description}</td>
                                                <td>{group.type}</td>
                                                <td>{group.amount}</td>
                                                <td>{group.applicableDate}</td>
                                                <td>{group.employee}</td>
                                                <td>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button>
                                                </td>
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
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Payrol;
