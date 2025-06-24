import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileCsv, faFilePdf, faFileExcel, faColumns, faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';

const ServiceandMaintainance = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const getAllServiceAndMaintainance = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: `/admin/nhra/serviceMaintenance/getAllServiceMaintenance`,
            })
            if (res.status === 200) {
                setData(res?.data?.result)
                setTotalPage(res?.data?.totalPage)
            } else {
                setError(res?.data?.message)
            }
        } catch (error) {
            setError(error.message);
            console.log("Error in get all Service and Maintainance  : ", error)
        } finally {
            setLoading(false);
        }
    }


     const deleteServiceAndMaintainance = async (id) => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "delete",
                url: `/admin/nhra/serviceMaintenance/deleteServiceMaintenance/${id}`,
            })
            if (res.status === 200) {
                getAllServiceAndMaintainance();
            } else {
                setError(res?.data?.message)
            }
        } catch (error) {
            setError(error.message);
            console.log("Error in delete Service and Maintainance  : ", error)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllServiceAndMaintainance();
    }, [currentPage])


    const textStyle = { color: 'black' }
    return (
        <div>  <div className="wrapper thetop" style={textStyle}>
            <Header />
            <Sidebar />
            <div className=" content-wrapper ">
                <section className="content-header">
                    <h1>Service & Maintenance </h1>
                </section>
                <section className="content">
                    <div className="box box-primary">
                        <div className="box-header">
                            <h3 className="box-title"> All Service & Maintenance </h3>
                            <div className="box-tools">
                                <Link to="/add-ServiceMaintenance" className="btn btn-block btn-primary">
                                    <FontAwesomeIcon icon={faPlus} /> Add
                                </Link>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="custom-controls">
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
                                <table className="table table-bordered table-striped ar_table" id="all_ar">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th> Product Name</th>
                                            <th>Model</th>
                                            <th>Serial No</th>
                                            <th>End User</th>
                                            <th>Address</th>
                                            <th>Service Type</th>
                                            <th>Replacement</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length > 0 ? (data.map((group, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{group?.device?.productName}</td>
                                                <td>{group?.device?.productModel}</td>
                                                <td>{group?.device?.productSerialNo}</td>
                                                <td>{group?.healthcarefacility?.facilityName}</td>
                                                <td>{group?.healthcarefacility?.facilityAddress}</td>
                                                <td>{group?.repairMaintenanceServiceRequested.join(", ")}</td>
                                                <td>{group?.replacementOrRemovalOfEquipmentNeeded}</td>
                                                <td>
                                                    <Link to="/ar/1" className="btn bg-green btn-sm btn-flat" title="View" style={{ marginBottom: 3 }}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                    &nbsp;
                                                    <Link to={`/edit-ServiceMaintenance/${group?._id}`} className="btn bg-purple btn-sm btn-flat" title="Edit" style={{ marginBottom: 3 }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                    &nbsp;
                                                    <button onClick={() => deleteServiceAndMaintainance(group?._id)} className="btn btn-warning btn-sm btn-flat deletebtn" id="delete_product0" data-id={1} attr_delete="https://medipro.affinity-me.com/ar/1" type="submit" title="Delete">
                                                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center"><b>No Data Available</b></td>
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
        </div></div>
    )
}

export default ServiceandMaintainance