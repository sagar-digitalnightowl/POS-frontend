import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';



const ListStockAdjustments = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const fetchAllStockAdjustments = async () => {
        try {
            setLoading(true);
            const res = await apiCall({
                method: "get",
                url: "/admin/stockAdjustment/stockAdjustmentList/getAllStockAdjustment",
            });

            if (res.status == 200) {
                setData(res?.data?.result);
            } else {
                throw new Error("Failed to fetch all stock transfer");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchAllStockAdjustments();
    }, [])


    const deleteStockTransfer = async (id) => {
        try {
            setLoading(true);
            const res = await apiCall({
                method: "delete",
                url: `/admin/stockAdjustment/stockAdjustmentList/deleteStockAdjustment/${id}`,
            });

            if (res.status == 200) {
                fetchAllStockAdjustments();
            } else {
                throw new Error("Failed to delete stock transfer");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
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
                        <h1> Stock Adjustments <small /></h1>
                    </section>
                    <section className="content">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All stock adjustments</h3>
                                <div className="box-tools">
                                    <Link className="btn btn-block btn-primary" to="/stock-adjustments/create">
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
                                    <table className="table table-bordered table-striped ajax_view" id="stock_adjustment_table">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Reference No</th>
                                                <th>Location</th>
                                                <th>Adjustment type</th>
                                                <th>Total Amount</th>
                                                <th>Total amount recovered</th>
                                                <th>Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.length > 0 ? (data.map((group, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <DropdownButton id="dropdown-basic-button" title="Actions">
                                                            {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                            <Dropdown.Item
                                                                onClick={() => navigate(`/stock-adjustments/edit/${group?._id}`)}
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} /> Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => deleteStockTransfer(group?._id)}
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
                                                    <td>{group?.startDate}</td>
                                                    <td>{group?.endDate}</td>
                                                    <td>{group?.referenceNo}</td>
                                                    <td>{group?.businessLocation}</td>
                                                    <td>{group?.adjustmentType}</td>
                                                    <td>{group?.totalAmount}</td>
                                                    <td>{group?.totalAmountRecovered}</td>
                                                    <td>{group?.reason}</td>
                                                </tr>
                                            ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9  " className="text-center"><b>No Data Available</b></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    className="pagination-custom justify-content-end"
                                    style={{ gap: 2 }}
                                >
                                    <div className={`page-item`}>
                                        <button
                                            disabled={currentPage <= 1}
                                            onClick={() => paginate(currentPage - 1)}
                                            className="page-link1"
                                            style={{ color: "black" }}
                                        >
                                            Previous
                                        </button>
                                    </div>

                                    {Array(totalPage)
                                        .fill(0)
                                        .map((num, index) => (
                                            <button
                                                onClick={() => paginate(index + 1)}
                                                className="page-link1"
                                                style={{ color: "black" }}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                    <div className={`page-item `}>
                                        <button
                                            disabled={currentPage >= totalPage}
                                            onClick={() => paginate(currentPage + 1)}
                                            className="page-link1"
                                            style={{ color: "black" }}
                                        >
                                            Next
                                        </button>
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

export default ListStockAdjustments