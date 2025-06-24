import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';


const ListExpenses = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchAllExpenses = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: `/admin/expense/addExpense/getAllExpense`
            });

            if (res.status === 200) {
                setData(res?.data?.result);
                setTotalPage(res?.data?.totalPage);
            } else {
                setError(res?.data?.message);
            }
        } catch (error) {
            setError(error.message);
            console.log("Error add new expense : ", error);
        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchAllExpenses();
    }, [currentPage]);


    const deleteExpenses = async (id) => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "delete",
                url: `/admin/expense/addExpense/deleteExpense/${id}`
            });

            if (res.status === 200) {
                fetchAllExpenses();
            } else {
                setError(res?.data?.message);
            }
        } catch (error) {
            setError(error.message);
            console.log("Error in delete expense : ", error);
        } finally {
            setLoading(true);
        }
    }

    const textStyle = { color: 'black' }
    return (
        <div>
            <div className="wrapper thetop" style={textStyle}>
                <Header />
                <Sidebar />
                <div className=" content-wrapper ">
                    <section className="content-header">
                        <h1>Expenses</h1>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box  box-solid " id="accordion">
                                    <div className="box-header with-border" style={{ cursor: "pointer" }}>
                                        <h3 className="box-title">
                                            <Link data-toggle="collapse" data-parent="#accordion" to="#collapseFilter">
                                                <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                                            </Link>
                                        </h3>
                                    </div>
                                    <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                                        <div className="box-body">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="location_id">Business Location:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="location_id" name="location_id">
                                                        <option value="" selected="selected">All locations</option>
                                                        <option value={4}>POS APPLICATION</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_for">Expense for:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="expense_for" name="expense_for">
                                                        <option value="" selected="selected">All</option>
                                                        <option value={4}> POS APPLICATION ADMIN</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_contact_filter">Contact:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="expense_contact_filter" name="expense_contact_filter">
                                                        <option selected="selected" value="">All</option>
                                                        <option value={3}>Walk-In Customer - (CO0001)</option><option value={4}>test - (CO0002)</option>
                                                        <option value={23}> - Seeam(CO0003)</option>
                                                        <option value={24}>zamini - (CO0004)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_category_id">Expense Category:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="expense_category_id" name="expense_category_id">
                                                        <option selected="selected" value="">All</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_sub_category_id_filter">Sub category:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="expense_sub_category_id_filter" name="expense_sub_category_id_filter">
                                                        <option selected="selected" value="">All</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_date_range">Date Range:</label>
                                                    <input placeholder="Select a date range" className="form-control" id="expense_date_range" readOnly="" name="date_range" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="expense_payment_status">Payment Status:</label>
                                                    <select className="form-control select2" style={{ width: "100%" }} id="expense_payment_status" name="expense_payment_status">
                                                        <option selected="selected" value="">All</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="due">Due</option>
                                                        <option value="partial">Partial</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-primary">
                                    <div className="box-header">
                                        <h3 className="box-title">All expenses</h3>
                                        <div className="box-tools">
                                            <Link className="btn btn-block btn-primary" to="/expenses/create">
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
                                            <table className="table table-bordered table-striped" id="expense_table">
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Date</th>
                                                        <th>Reference No</th>
                                                        <th>Recurring details</th>
                                                        <th>Expense Category</th>
                                                        <th>Sub category</th>
                                                        <th>Location</th>
                                                        <th>Payment Method</th>
                                                        <th>Tax</th>
                                                        <th>Total amount</th>
                                                        <th>Payment due </th>
                                                        <th>Expense for</th>
                                                        <th>Contact</th>
                                                        <th>Expense note</th>
                                                        {/* <th>Added By</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.length > 0 ? (data.map((group, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                                </button>
                                                                <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                                                </button> */}

                                                                <DropdownButton id="dropdown-basic-button" title="Actions">
                                                                    {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                                    <Dropdown.Item onClick={() => navigate(`/expenses/edit/${group?._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => deleteExpenses(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                                                            <td>{group?.date}</td>
                                                            <td>{group?.referenceNo}</td>
                                                            <td>{group?.isRecurring ? "True" : "False"}</td>
                                                            <td>{group?.expenseCategory?.categoryName}</td>
                                                            <td>{group?.subCategory}</td>
                                                            <td>{group?.businessLocation}</td>
                                                            <td>{group?.payment?.paymentMethod}</td>
                                                            <td>{group?.tax || 0}</td>
                                                            <td>{group?.totalAmount}</td>
                                                            <td>{group?.totalAmount - group?.payment?.amount}</td>
                                                            <td>{group?.expenseFor}</td>
                                                            <td>{group?.expenseForContact}</td>
                                                            <td>{group?.expenseNote}</td>
                                                            {/* <td>{group?.addedBy}</td> */}
                                                        </tr>
                                                    ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="bg-gray font-17 text-center footer-total">
                                                        <td colSpan={7}>
                                                            <strong>Total:</strong>
                                                        </td>
                                                        <td className="footer_payment_status_count" />
                                                        <td />
                                                        <td className="footer_expense_total" />
                                                        <td className="footer_total_due" />
                                                        <td colSpan={4} />
                                                    </tr>
                                                </tfoot>
                                            </table>
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


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ListExpenses