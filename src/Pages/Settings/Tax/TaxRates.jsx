import React, { useState } from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import { FaEdit, FaInfoCircle, FaPlus, FaTrash } from 'react-icons/fa';
import Footer from "../../../Components/Footer";
import { faColumns, faEdit, faFileCsv, faFileExcel, faFilePdf, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaxRate = () => {
    const [data, setData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [name, setName] = useState("");
    const [taxRate, setTaxRate] = useState("");
    const [isTaxGroup, setIsTaxGroup] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupTax, setGroupTax] = useState("");

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const currentGroupItems = groupData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAdd = () => {
        const newTaxRate = { name, taxRate, isTaxGroup };
        setData([...data, newTaxRate]);
        setShowModal(false);
        setName("");
        setTaxRate("");
        setIsTaxGroup(false);
    };

    const handleAddGroup = () => {
        const newGroup = { groupName, groupTax };
        setGroupData([...groupData, newGroup]);
        setShowGroupModal(false);
        setGroupName("");
        setGroupTax("");
    };

    const textStyle = { color: 'black' };

    return (
        <div>
            <div className="wrapper thetop" style={textStyle}>
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Tax Rates <small>Manage your tax rates</small></h1>
                    </section>
                    <section className="content">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">All your tax rates</h3>
                                <div className="box-tools">
                                    <button type="button"className="btn btn-block btn-primary btn-modal"
                                      onClick={() => setShowModal(true)}>
                                        <FaPlus /> Add
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
                                    <table className="table table-bordered table-striped" id="tax_rates_table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Tax Rate %</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                            <tr key={index}>
                                                <td>{group.name}</td>
                                                <td>{group.taxRate}</td>
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
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">
                                    Tax groups ( Combination of multiple taxes )
                                    <FaInfoCircle
                                        aria-hidden="true"
                                        data-container="body"
                                        data-toggle="popover"
                                        data-placement="auto bottom"
                                        data-content="Group Tax Rates - defined above, to be used in combination in Purchase/Sell sections."
                                        data-html="true"
                                        data-trigger="hover"
                                    />
                                </h3>
                                <div className="box-tools">
                                    <button
                                        type="button"
                                        className="btn btn-block btn-primary btn-modal"
                                        onClick={() => setShowGroupModal(true)}
                                    >
                                        <FaPlus /> Add
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
                                    <table className="table table-bordered table-striped" id="tax_groups_table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Tax Rate %</th>
                                                <th>Sub taxes</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                            <tr key={index}>
                                                <td>{group.name}</td>
                                                <td>{group.taxRate}</td>
                                                <td>{group.subTaxes}</td>
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
            </div>
            <Footer />

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    zIndex: 1000,
                    width: '400px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h3>Add Tax Rate</h3>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label>Tax Rate %</label>
                        <input
                            type="text"
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isTaxGroup}
                                onChange={(e) => setIsTaxGroup(e.target.checked)}
                            />
                            For Tax Group Only
                        </label>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={handleAdd} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Save</button>
                        <button onClick={() => setShowModal(false)} style={{ color: 'black' }}>Cancel</button>
                    </div>
                </div>
            )}
            {showModal && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }} onClick={() => setShowModal(false)} />}

            {showGroupModal && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    zIndex: 1000,
                    width: '400px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h3>Add Tax Group</h3>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <label>Tax Group</label>
                        <input
                            type="text"
                            value={groupTax}
                            onChange={(e) => setGroupTax(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={handleAddGroup} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>Save</button>
                        <button onClick={() => setShowGroupModal(false)} style={{ color: 'black' }}>Cancel</button>
                    </div>
                </div>
            )}
            {showGroupModal && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }} onClick={() => setShowGroupModal(false)} />}
        </div>
    );
};

export default TaxRate;
