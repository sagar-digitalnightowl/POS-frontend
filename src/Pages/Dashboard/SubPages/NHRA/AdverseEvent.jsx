import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const AdverseEvent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const getAllAdverseEvent = async () => {
        setLoading(true);
        try {
            const param = new URLSearchParams();
            param.append('page', currentPage)
            const res = await apiCall({
                method: "get",
                url: `/admin/nhra/adverseEventList/getAllAdverseEvent?${param.toString()}`,
            })

            if (res.status === 200) {
                setData(res?.data?.result)
            } else {
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in fetch all Adverse Event : ", error)
        } finally {
            setLoading(false);
        }
    }


    const deleteAdverseEvenet = async (id) => {
        try {
            const res = await apiCall({
                method: "delete",
                url: `/admin/nhra/adverseEventList/deleteAdverseEvent/${id}`,
            })

            if (res.status === 200) {
                getAllAdverseEvent();
            } else {
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in delete Adverse Event : ", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllAdverseEvent();
    }, []);


    const textStyle = { color: 'black' }
    return (
        <div>
            <div className="wrapper thetop" style={textStyle}>
                <Header />
                <Sidebar />
                <div className=" content-wrapper ">
                    <section className="content-header">
                        <h1> Adverse Event <small /></h1>
                    </section>
                    <section className="content">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All Adverse Event</h3>
                                <div className="box-tools">
                                    <Link className="btn btn-block btn-primary" to="/add-adverse-event">
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
                                                <th>Sr. no.</th>
                                                <th>Device name</th>
                                                <th>Application Type</th>
                                                <th>Reporter Type</th>
                                                <th>Reporter Name</th>
                                                <th>Reporter Email</th>
                                                <th>Report date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.length > 0 ? (data.map((group, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{group?.device?.productName}</td>
                                                    <td>{group?.applicationType}</td>
                                                    <td>{group?.typeOfReporter}</td>
                                                    <td>{group?.reporterName}</td>
                                                    <td>{group?.reporterEmail}</td>
                                                    <td>{group?.reportDate}</td>
                                                    <td>
                                                        {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                        </button>
                                                        <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                        </button> */}

                                                        <DropdownButton id="dropdown-basic-button" title="Actions">
                                                            {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                            <Dropdown.Item
                                                                onClick={() => navigate(`/adverseEvents/edit/${group?._id}`)}
                                                            > <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => deleteAdverseEvenet(group?._id)}
                                                            > <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                            {/* <Dropdown.Item href="#/delete"> <FontAwesomeIcon icon={faPrint} /> Print</Dropdown.Item> */}
                                                            {/* <Dropdown.Item href="#/labels">  <FontAwesomeIcon icon={faTags} />Labels</Dropdown.Item> */}
                                                            {/* <br /> */}
                                                            {/* <Dropdown.Item href="#/viewPayment">  <FontAwesomeIcon icon={faEye} /> View Payment</Dropdown.Item> */}
                                                            {/* <Dropdown.Item href="#/PurchaseReturn"><FontAwesomeIcon icon={faUndoAlt} /> Purchase Return</Dropdown.Item> */}
                                                            {/* <Dropdown.Item href="#/updateStatus"> <FontAwesomeIcon icon={faSyncAlt} /> Update Status</Dropdown.Item> */}
                                                            {/* <Dropdown.Item href="#/itemReceivedNotification"> <FontAwesomeIcon icon={faBell} /> Item Received Notification</Dropdown.Item> */}
                                                        </DropdownButton>
                                                    </td>
                                                </tr>
                                            ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center"><b>No Data Available</b></td>
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
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdverseEvent