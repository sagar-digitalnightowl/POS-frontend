import React, { useState } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import './roles.css'
import Footer from '../../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { Dropdown, DropdownButton } from 'react-bootstrap';



const Roles = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const paginate = pageNumber => setCurrentPage(pageNumber);



    const fetchRole = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('page', currentPage);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/getAllRole?${params.toString()}`, {
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
                console.log(result.result.roles)
                setData(result.result)
                setTotalPage(result.totalPage)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteRole = async (userID) => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/deleteRole/${userID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Failed to delete user');

            const result = await response.json();

            if (result.message === 'User Deleted Successfully') {
                setData(prevData => {
                    const updatedData = prevData.filter(user => user._id !== userID);
                    return updatedData;
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRole();
    }, [currentPage])

    
    const textStyle = { color: 'black' };

    return (
        <div>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1> Roles <small>Manage roles</small></h1>
                    </section>
                    <section className="content" style={textStyle}>
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All roles</h3>
                                <div className="box-tools">
                                    <div className="btn btn-block btn-primary">
                                        <span onClick={() => navigate("/roles/create")}><FontAwesomeIcon icon={faPlus} /> Add</span>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="custom-controls">
                                    <div className="custom-control show-entries">
                                        <h5>Show</h5>
                                        <select className="form-control3">
                                            <option value="all">25</option>
                                            <option value="admin">50</option>
                                            <option value="user">100</option>
                                            <option value="user">500</option>
                                            <option value="user">1000</option>
                                            <option value="user">All</option>
                                        </select>
                                        <h5>entries</h5>
                                    </div>
                                    <div className="custom-control search-bar">
                                        <input type="text" className="form-control2 form-control2-sm" placeholder="Search..." onChange={(e) => console.log(e.target.value)} />
                                    </div>
                                </div>
                                <table className="table table-bordered table-striped" id="roles_table">
                                    <thead>
                                        <tr>
                                            <th>Roles</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.roleName}</td>
                                                <td>
                                                    {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => { navigate(`/roles/update/${user._id}`, { state: { roleID: user._id } }) }}>
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </button>
                                                    <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => deleteRole(user._id)}>
                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </button> */}

                                                    <DropdownButton id="dropdown-basic-button" title="Actions">
                                                        {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                        <Dropdown.Item
                                                            onClick={() => navigate(`/roles/update/${user._id}`)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => deleteRole(user._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                        </Dropdown.Item>
                                                        {/* <Dropdown.Item href="#/editShipping"> <FontAwesomeIcon icon={faTruck} /> Edit Shopping</Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/printInvoice"> <FontAwesomeIcon icon={faPrint} /> Print Invoice </Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/packingSlip">  <FontAwesomeIcon icon={faFileAlt} /> Packing Slip</Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/deliveryNote">  <FontAwesomeIcon icon={faFileAlt} /> Deliver Note</Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/receipt">  <FontAwesomeIcon icon={faFileAlt} /> Receipt </Dropdown.Item> */}
                                                        {/* <br /> */}
                                                        {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faMoneyBillAlt} /> View Payments </Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faUndo} /> Sell Return </Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> Invoice URL </Dropdown.Item> */}
                                                        {/* <Dropdown.Item href="#/view">  <FontAwesomeIcon icon={faEnvelope} /> New Sale Notification </Dropdown.Item> */}
                                                    </DropdownButton>
                                                </td>
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
                    <div className="scrolltop no-print">
                        <div className="scroll icon">
                            <i className="fas fa-angle-up" />
                        </div>
                    </div>
                    <section className="invoice print_section" id="receipt_section"></section>
                </div>
                <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">
                                    Today's profit
                                </h4>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" id="modal_today" defaultValue="2024-06-04" />
                                <div className="row">
                                    <div id="todays_profit"></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Roles
