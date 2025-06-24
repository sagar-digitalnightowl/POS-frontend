import React, { useState } from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import NavbarCrm from "./NavbarCrm";
import { Link } from "react-router-dom";
import Footer from "../../../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faFilter, faPlus, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

const ContactLogin = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        first_name: '',
        last_name: '',
        contact: '',
        email: '',
        mobile_number: '',
        alternate_contact_no: '',
        family_contact_no: '',
        department: '',
        designation: '',
        sales_commission: '',
        is_active: false,
        allow_login: false
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = () => {
        setData([...data, formData]);
        setFormData({
            title: '',
            first_name: '',
            last_name: '',
            contact: '',
            email: '',
            mobile_number: '',
            alternate_contact_no: '',
            family_contact_no: '',
            department: '',
            designation: '',
            sales_commission: '',
            is_active: false,
            allow_login: false
        });
        closeModal();
    };

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%', // Adjust the width as needed
            maxWidth: '600px', // Maximum width of the modal
            backgroundColor: '#f0f0f0' // Background color of the modal
        }
    };

    const textStyle = { color: 'black' };

    return (
        <div>
            <div className="wrapper thetop" style={textStyle}>
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="no-print">
                        <NavbarCrm />
                    </section>
                    <section className="content-header no-print">
                        <h1>Contacts Login</h1>
                    </section>
                    <section className="content no-print">
                        <div className="box box-solid" id="accordion">
                            <div className="box-header with-border" style={{ cursor: "pointer" }}>
                                <h3 className="box-title">
                                    <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                                        <FontAwesomeIcon icon={faFilter} /> Filters
                                    </Link>
                                </h3>
                            </div>
                            <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="contact_id">Contact:</label>
                                                <select className="form-control select2" id="contact_id" name="contact_id">
                                                    <option selected="selected" value="">All</option>
                                                    <option value={3}> - Walk-In Customer (CO0001)</option>
                                                    <option value={4}> - test (CO0002)</option>
                                                    <option value={23}>Seeam - (CO0003)</option>
                                                    <option value={24}> - zamini (CO0004)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All Contacts Login</h3>
                                <div className="box-tools">
                                    <button onClick={openModal} className="btn btn-sm btn-primary pull-right contact-login-add">
                                        <FontAwesomeIcon icon={faPlus} /> Add
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
                                    <table className="table table-bordered table-striped" id="all_contact_login_table" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Contact</th>
                                                <th>Username</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Department</th>
                                                <th>Designation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length > 0 ? (
                                                currentItems.map((group, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                                <FontAwesomeIcon icon={faEdit} /> Edit
                                                            </button>
                                                            <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                                            </button>
                                                        </td>
                                                        <td>{group.contact}</td>
                                                        <td>{group.userName}</td>
                                                        <td>{group.first_name} {group.last_name}</td>
                                                        <td>{group.email}</td>
                                                        <td>{group.department}</td>
                                                        <td>{group.designation}</td>
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
                    </section>
                </div>
                <Footer />
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Add Login Modal" style={modalStyles}>
                <h2>Add Login</h2>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name:</label>
                                <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name:</label>
                                <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="contact">Contact:</label>
                                <select className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleInputChange}>
                                    <option value="">Select Contact</option>
                                    <option value={3}>Walk-In Customer (CO0001)</option>
                                    <option value={4}>Test (CO0002)</option>
                                    <option value={23}>Seeam - (CO0003)</option>
                                    <option value={24}>Zamini (CO0004)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="mobile_number">Mobile Number:</label>
                                <input type="text" className="form-control" id="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="alternate_contact_no">Alternate Contact No:</label>
                                <input type="text" className="form-control" id="alternate_contact_no" name="alternate_contact_no" value={formData.alternate_contact_no} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="family_contact_no">Family Contact No:</label>
                                <input type="text" className="form-control" id="family_contact_no" name="family_contact_no" value={formData.family_contact_no} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department:</label>
                                <input type="text" className="form-control" id="department" name="department" value={formData.department} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="designation">Designation:</label>
                                <input type="text" className="form-control" id="designation" name="designation" value={formData.designation} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sales_commission">Sales Commission:</label>
                                <input type="text" className="form-control" id="sales_commission" name="sales_commission" value={formData.sales_commission} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                                    Is Active
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input type="checkbox" id="allow_login" name="allow_login" checked={formData.allow_login} onChange={handleInputChange} />
                                    Allow Login
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ContactLogin;
