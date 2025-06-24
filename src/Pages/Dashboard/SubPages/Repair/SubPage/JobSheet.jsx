import React, { useState, useEffect } from 'react';
import Header from '../../../../../Components/Header';
import Sidebar from '../../../../../Components/Sidebar';
import Footer from '../../../../../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEye, faEdit, faTrash, faFileInvoice, faCogs, faInfoCircle, faUpload, faSync, faFilter, faCheckCircle, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from './Navbar';

const JobSheet = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentTab, setCurrentTab] = useState("Pending");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchJobSheets = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('page', currentPage);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/repair/jobSheet/getAllJobSheet?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch job sheets');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                // const filtered = filterData(result.result, currentTab);
                setData(result?.result);
                setTotalPage(result?.totalPage)
            } else {
                throw new Error('Failed to fetch job sheets');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJobSheet = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/repair/jobSheet/deleteJobSheet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                toast.error("Failed to delete job sheet. Please try again later");
                throw new Error('Failed to delete job sheet');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                toast.success("Job Sheets deleted Succesfully")
                fetchJobSheets();
            } else {
                toast.error("Failed to delete product. Please try again later");
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchJobSheets()
        };
    }, [currentPage]);

    useEffect(() => {
        fetchJobSheets()
    }, [currentTab]);

    const filterData = (data, tab) => {
        if (tab === 'All') return data;

        return data.filter(item => {
            const itemStatus = (item.status || 'Pending').toString().toLowerCase();
            const tabStatus = tab.toString().toLowerCase();
            return itemStatus === tabStatus;
        });
    };
    // sdata = currentTab === 'pending' ? pendingData : completedData;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const textStyle = { color: 'black' };

    return (
        <div style={textStyle}>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <Navbar />
                    <section className="content-header no-print">
                        <h1>Job Sheets </h1>
                    </section>
                    <section className="content no-print">
                        <div className="box box-solid" id="accordion">
                            <div className="box-header with-border" style={{ cursor: "pointer" }}>
                                <h3 className="box-title">
                                    <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                                        <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                                    </Link>
                                </h3>
                            </div>
                            <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                                <div className="box-body">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="location_id">Business Location:</label>
                                            <select className="form-control select2" style={{ width: "100%" }} id="location_id" name="location_id">
                                                <option selected="selected" value="">
                                                    All
                                                </option>
                                                <option value={4}>
                                                    POS APPLICATION TRADING COMPANY W.L.L (BL0001)
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="contact_id">Customer:</label>
                                            <select className="form-control select2" style={{ width: "100%" }} id="contact_id" name="contact_id">
                                                <option selected="selected" value="">
                                                    All
                                                </option>
                                                <option value={3}> - Walk-In Customer (CO0001)</option>
                                                <option value={4}> - test (CO0002)</option>
                                                <option value={24}> - zamini (CO0004)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="status_id">Status:</label>
                                            <select className="form-control select2" style={{ width: "100%" }} id="status_id" name="status_id">
                                                <option selected="selected" value=""> All </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="nav-tabs-custom">
                                    <ul className="nav nav-tabs">
                                        <li className={currentTab === 'pending' ? 'active' : ''}>
                                            <a onClick={() => setCurrentTab("Pending")} style={{ cursor: 'pointer' }}>
                                                <FontAwesomeIcon icon={faExclamationCircle} className="text-orange" /> Pending
                                                <FontAwesomeIcon
                                                    icon={faInfoCircle}
                                                    className="text-info hover-q no-print"
                                                    aria-hidden="true"
                                                    data-container="body"
                                                    data-toggle="popover"
                                                    data-placement="auto bottom"
                                                    data-content="Status which are not marked as completed will be displayed here."
                                                    data-html="true"
                                                    data-trigger="hover"
                                                />
                                            </a>
                                        </li>
                                        <li className={currentTab === 'completed' ? 'active' : ''}>
                                            <a onClick={() => setCurrentTab("Completed")} style={{ cursor: 'pointer' }}>
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-success" /> Completed
                                                <FontAwesomeIcon
                                                    icon={faInfoCircle}
                                                    className="text-info hover-q no-print"
                                                    aria-hidden="true"
                                                    data-container="body"
                                                    data-toggle="popover"
                                                    data-placement="auto bottom"
                                                    data-content="Status which are marked as completed will be displayed here."
                                                    data-html="true"
                                                    data-trigger="hover"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="pending_job_sheet_tab">
                                            <div className="row">
                                                <div className="col-md-12 mb-12">
                                                    <Link type="button" className="btn btn-sm btn-primary pull-right m-5" to="/repairs/job-sheet/create" id="add_job_sheet">
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
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped" id="pending_job_sheets_table">
                                                    <thead>
                                                        <tr>
                                                            <th>Action</th>
                                                            <th>Service type</th>
                                                            <th>Expected Delivery Date</th>
                                                            <th>Job sheet number</th>
                                                            <th>Invoice No.</th>
                                                            <th>Status</th>
                                                            <th>Customer</th>
                                                            <th>Location</th>
                                                            <th>Brand</th>
                                                            <th>Device</th>
                                                            <th>Device Model</th>
                                                            <th>Serial Number</th>
                                                            <th>Estimated Cost</th>
                                                            <th>Added By</th>
                                                            <th>Created At</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {data.length > 0 ? data.map((user, index) => (
                                                            <tr key={index}>
                                                                <td style={textStyle}>
                                                                    <DropdownButton id="dropdown-basic-button" title="Actions">
                                                                        {/* <Dropdown.Item href="#/view"><FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                                        <Dropdown.Item onClick={() => navigate(`/repairs/job-sheet/edit/${user?._id}`)}><FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                                        <Dropdown.Item href="#/delete"
                                                                            onClick={() => handleDeleteJobSheet(user?._id)}
                                                                        ><FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                                        {/* <Dropdown.Item href="#/add-invoice"><FontAwesomeIcon icon={faFileInvoice} /> Add Invoice</Dropdown.Item>
                                                                        <Dropdown.Item href="#/add-parts"><FontAwesomeIcon icon={faCogs} /> Add Parts</Dropdown.Item>
                                                                        <Dropdown.Item href="#/upload-document"><FontAwesomeIcon icon={faUpload} /> Upload Document</Dropdown.Item>
                                                                        <Dropdown.Item href="#/print"><FontAwesomeIcon icon={faPrint} /> Print</Dropdown.Item>
                                                                        <Dropdown.Item href="#/change-status"><FontAwesomeIcon icon={faSync} /> Change Status</Dropdown.Item> */}
                                                                    </DropdownButton>
                                                                </td>
                                                                <td style={textStyle}>{user?.serviceType}</td>
                                                                <td style={textStyle}>{user?.expectedDeliveryDate}</td>
                                                                <td style={textStyle}>{user?.jobSheetNumber}</td>
                                                                <td style={textStyle}>{user?.invoiceNumber}</td>
                                                                <td style={textStyle}>{user?.status}</td>
                                                                <td style={textStyle}>
                                                                    <span>{user?.customer?.firstName && user?.customer?.firstName + " "}</span>
                                                                    <span>{user?.customer?.middleName && user?.customer?.middleName + " "}</span>
                                                                    <span>{user?.customer?.lastName && user?.customer?.lastName}</span>
                                                                </td>
                                                                <td style={textStyle}>{user?.businessLocation}</td>
                                                                <td style={textStyle}>{user?.brand?.name}</td>
                                                                <td style={textStyle}>{user?.device?.deviceName}</td>
                                                                <td style={textStyle}>{user?.deviceModel?.deviceModel}</td>
                                                                <td style={textStyle}>{user?.serialNo}</td>
                                                                <td style={textStyle}>{user?.estimatedCost}</td>
                                                                <td style={textStyle}>{user?.addedBy}</td>
                                                                <td style={textStyle}>{user?.createdAt}</td>
                                                            </tr>
                                                        )) : (
                                                            <tr>
                                                                <td colSpan="15" style={{ textAlign: 'center', color: 'red' }}>No available data</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                            </div>

                                            <div className="pagination-custom justify-content-end" style={{ margin: "30px 0px", gap: 2 }}>
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
                        </div>
                        <div className="modal fade" id="status_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
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
            <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
            <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
            <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
        </div>
    )
}

export default JobSheet;
