import React, { useState, useEffect } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { apiCall } from '../../../../../utils/apiCall'

const CustomerGroup = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [customerGroupName, setCustomerGroupName] = useState('');
    const [priceCalculationType, setPriceCalculationType] = useState('');
    const [calculationPercentage, setCalculationPercentage] = useState('');
    const [Id, setId] = useState('');

    const handleAddButtonClick = () => { setShowModal(true); }
    const handleModalClose = () => {
        setShowUpdateModal(false);
        setShowModal(false);
    }
    const handleSave = () => {
        const newData = { customerGroupName, priceCalculationType, calculationPercentage };
        addCustomerGroup(newData);
        setCustomerGroupName('');
        setPriceCalculationType('');
        setCalculationPercentage('');
        setShowModal(false);
    };

    const fetchCustomerGroup = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/cusotmerGroup/getAllCusotmerGroup`, {
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
                console.log(result.reuslt)
                setData(result.reuslt)

                // setData(result.result.roles)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const addCustomerGroup = async (data) => {
        try {
            setLoading(true);
            console.log("Payload", data);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/cusotmerGroup/addCusotmerGroup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                fetchCustomerGroup();

                // setData(result.result.roles)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const updateCustomerGroup = async (data, id) => {
        try {
            setLoading(true);
            console.log("Payload", data);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/cusotmerGroup/updateCusotmerGroup/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                fetchCustomerGroup();

                // setData(result.result.roles)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    

    const deleteCustomerGroup = async (id) => {
        try {
            const res = await apiCall({ method: 'delete', url: `/admin/contacts/cusotmerGroup/deleteCusotmerGroup/${id}` })

            console.log(res)
            if (res.status === 200) {
                toast.success(res?.data?.message);
                fetchCustomerGroup();
            }

        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        if (!loading) { // Prevents auto-fetch while deletion is happening
            fetchCustomerGroup();
            setLoading(true);
        }
    }, [loading]);

    const handleEdit = (id) => {
        const filteredItems = currentItems.filter(item => item._id === id);
        console.log((filteredItems));
        setId(id);
        setCalculationPercentage(filteredItems[0].calculationPercentage);
        setCustomerGroupName(filteredItems[0].customerGroupName);
        setPriceCalculationType(filteredItems[0].priceCalculationType);
        setShowUpdateModal(true);
    }
    const handleUpdate = () => {
        const newData = { customerGroupName, priceCalculationType, calculationPercentage };
        updateCustomerGroup(newData, Id);
        setCustomerGroupName('');
        setPriceCalculationType('');
        setCalculationPercentage('');
        setShowUpdateModal(false);
    };

    const textStyle = { color: 'black' };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // console.log(currentItems, "current item")
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={textStyle}>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header"> <h1>Customer Groups</h1> </section>
                    <section className="content">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All Customer Groups</h3>
                                <div className="box-tools">
                                    <button type="button" className="btn btn-block btn-primary btn-modal" onClick={() => setShowModal(true)}>
                                        <FontAwesomeIcon icon={faPlus} />Add
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
                                    <table className="table table-bordered table-striped" id="customer_groups_table">
                                        <thead>
                                            <tr>
                                                <th style={textStyle}>Customer Group Name</th>
                                                <th style={textStyle}>Calculation Percentage (%)</th>
                                                <th style={textStyle}>Price Calculation Type</th>
                                                <th style={textStyle}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length > 0 ? (
                                                currentItems.map((group, index) => (
                                                    <tr key={index}>
                                                        <td style={textStyle}>{group.customerGroupName}</td>
                                                        <td style={textStyle}>{group.calculationPercentage}</td>
                                                        <td style={textStyle}>{group.priceCalculationType}</td>
                                                        <td style={textStyle}>
                                                            <DropdownButton id="dropdown-basic-button" title="Actions">
                                                                {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                                                                        <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                                <Dropdown.Item href="#/edit" onClick={() => handleEdit(group._id)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                                <Dropdown.Item href="#/delete" onClick={() => deleteCustomerGroup(group._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                                {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                                                                        <br />
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
                                                    <td colSpan="5" className="text-center" style={textStyle}>No Data Available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
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
                                    <label htmlFor="customerGroupName">Customer Group Name</label>
                                    <input
                                        placeholder='Customer Group Name'
                                        type="text"
                                        className="form-control"
                                        id="customerGroupName"
                                        value={customerGroupName}
                                        onChange={(e) => setCustomerGroupName(e.target.value)}
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
                                        onChange={(e) => setCalculationPercentage(Number(e.target.value))}
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
            {showUpdateModal && (
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
                                    <label htmlFor="customerGroupName">Customer Group Name</label>
                                    <input
                                        placeholder='Customer Group Name'
                                        type="text"
                                        className="form-control"
                                        id="customerGroupName"
                                        value={customerGroupName}
                                        onChange={(e) => setCustomerGroupName(e.target.value)}
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
                                        onChange={(e) => setCalculationPercentage(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default CustomerGroup
