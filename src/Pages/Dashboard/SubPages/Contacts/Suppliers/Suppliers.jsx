import React, { useState, useEffect } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import AddContactModal from './AddContactModal';
import { toast, ToastContainer } from 'react-toastify';

const Suppliers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [modalVisible, setModalVisible] = useState(false)
    const [updateData, setUpdateData] = useState([])

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({ contactType: 'supplier' });
            params.append('page', currentPage);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/getAllCustomerAndSupplier?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                setData(result.result.filter(item => item.contactType === "supplier"));
                setTotalPage(result.totalPage);

                // setData(result.result.roles)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteSupplier = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/deleteCustomerAndSupplier/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                toast.error("Failed to delete user. Please try again later");
                throw new Error('Failed to delete user');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                toast.success("User deleted Succesfully")
                fetchSuppliers();
            } else {
                toast.error("Failed to delete user. Please try again later");
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, [currentPage]);


    const handleEdit = (user) => {
        setUpdateData(user);
        setModalVisible(true);
    }

    const textStyle = { color: 'black' };

    return (
        <div>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Suppliers <small>Manage your Suppliers</small></h1>
                    </section>
                    <section className="content">
                        <div className="box box-solid" id="accordion">
                            <div className="box-header with-border" style={{ cursor: "pointer" }}>
                                <h3 className="box-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                                        <i className="fa fa-filter" aria-hidden="true" /> Filters
                                    </a>
                                </h3>
                            </div>
                            <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                                <div className="box-body">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>
                                                <input className="input-icheck" id="has_purchase_due" name="has_purchase_due" type="checkbox" defaultValue={1} />
                                                <strong>Purchase Due</strong>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>
                                                <input className="input-icheck" id="has_purchase_return" name="has_purchase_return" type="checkbox" defaultValue={1} />{" "}
                                                <strong>Purchase Return</strong>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>
                                                <input className="input-icheck" id="has_advance_balance" name="has_advance_balance" type="checkbox" defaultValue={1} />{" "}
                                                <strong>Advance Balance</strong>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>
                                                <input className="input-icheck" id="has_opening_balance" name="has_opening_balance" type="checkbox" defaultValue={1} />
                                                <strong>Opening Balance</strong>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="assigned_to">Assigned to:</label>
                                            <select className="form-control select2" style={{ width: "100%" }} id="assigned_to" name="assigned_to">
                                                <option value="" selected="selected">
                                                    None
                                                </option>
                                                <option value={4}>POS APPLICATION ADMIN</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="status_filter">Status:</label>
                                            <select className="form-control" id="status_filter" name="status_filter">
                                                <option selected="selected" value="">None</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" defaultValue="supplier" id="contact_type" />
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All your Suppliers</h3>
                                <div className="box-tools">
                                    <button type="button" className="btn btn-block btn-primary" onClick={() => {
                                        setUpdateData({});
                                        setModalVisible(true);
                                    }}>
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
                                        <input type="text" className="form-control form-control-sm" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>
                            <div className="box-body" style={{ overflowX: 'auto' }}>
                                <table className="table table-bordered table-striped" id="contact_table" style={{ minWidth: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={textStyle}>Action</th>
                                            <th style={textStyle}>Business Name</th>
                                            <th style={textStyle}>Name</th>
                                            <th style={textStyle}>Email</th>
                                            <th style={textStyle}>Tax number</th>
                                            <th style={textStyle}>Pay term</th>
                                            <th style={textStyle}>Credit Limit</th>
                                            <th style={textStyle}>Opening Balance</th>
                                            <th style={textStyle}>Advance Balance</th>
                                            <th style={textStyle}>Added On</th>
                                            <th style={textStyle}>Address</th>
                                            <th style={textStyle}>Mobile</th>
                                            <th style={textStyle}>Total Purchase Due</th>
                                            <th style={textStyle}>Total Purchase Return Due</th>
                                            <th style={textStyle}>Custom Field 1</th>
                                            <th style={textStyle}>Custom Field 2</th>
                                            <th style={textStyle}>Custom Field 3</th>
                                            <th style={textStyle}>Custom Field 4</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, index) => (

                                            <tr key={index}>
                                                <td style={textStyle}>
                                                    <DropdownButton id="dropdown-basic-button" title="Actions">
                                                        {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                                                        <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                        <Dropdown.Item href="#/edit" onClick={() => handleEdit(user)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                        <Dropdown.Item href="#/delete" onClick={() => deleteSupplier(user._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                        {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                                                        <br />
                                                        <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                                                        <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                                                        <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                                                        <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item> */}
                                                    </DropdownButton>
                                                </td>
                                                <td style={textStyle}>{user.businessName}</td>
                                                <td style={textStyle}>{user.prefix}{" "}{user.firstName}{" "}{user.middleName}{" "}{user.lastName}</td>
                                                <td style={textStyle}>{user.email}</td>
                                                <td style={textStyle}>{user.taxNumber}</td>
                                                <td style={textStyle}>{user.payTerm}</td>
                                                <td style={textStyle}>{user.creditLimit}</td>
                                                <td style={textStyle}>{user.openingBalance}</td>
                                                <td style={textStyle}>{user.advanceBalance}</td>
                                                <td style={textStyle}>{user.addedOn}</td>
                                                <td style={textStyle}>{user.addressLine1}{' '}{user.addressLine2}{" "}{user.city}{" "}{user.state}{" "}{user.country}{" "}{user.zipCode}</td>
                                                <td style={textStyle}>{user.mobileNo}</td>
                                                <td style={textStyle}>{user.totalPurchaseDue}</td>
                                                <td style={textStyle}>{user.totalPurchaseReturnDue}</td>
                                                <td style={textStyle}>{user.customField1}</td>
                                                <td style={textStyle}>{user.customField2}</td>
                                                <td style={textStyle}>{user.customField3}</td>
                                                <td style={textStyle}>{user.customField4}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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

                    </section>
                </div>
                <Footer />
            </div>
            <AddContactModal
                show={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    fetchSuppliers();
                }}
                data={updateData}
            />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default Suppliers
