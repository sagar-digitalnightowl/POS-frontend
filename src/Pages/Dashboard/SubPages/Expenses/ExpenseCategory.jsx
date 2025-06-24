import React, { useEffect, useState } from 'react';
import Header from '../../../../Components/Header';
import Sidebar from '../../../../Components/Sidebar';
import Footer from '../../../../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ExpenseCategory = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState('');

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryCode: ""
  });


  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setFormData({
      categoryName: "",
      categoryCode: ""
    });
    setEditCategoryId('');
    setIsModalOpen(false);
  };

  const fetchAllExpenseCategory = async () => {
    setLoading(true);
    try {
      const param = new URLSearchParams();
      param.append('page', currentPage)

      const res = await apiCall({
        method: "get",
        url: `/admin/expense/expenseCategory/getAllExpenseCategory?${param.toString()}`,
      });

      if (res.status === 200) {
        setData(res?.data?.result);
        setTotalPage(res?.data?.totalPage);
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in fetch all expense category : ", error);
    } finally {
      setLoading(true);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editCategoryId) {
        const res = await apiCall({
          method: "patch",
          url: `/admin/expense/expenseCategory/updateExpenseCategory/${editCategoryId}`,
          data: formData,
        });

        if (res.status === 200) {
          handleModalClose();
          fetchAllExpenseCategory();
        } else {
          setError(res?.data?.message);
        }
        return;
      }

      const res = await apiCall({
        method: "post",
        url: `/admin/expense/expenseCategory/addExpenseCategory`,
        data: formData,
      });

      if (res.status === 201) {
        handleModalClose();
        fetchAllExpenseCategory();
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in add new expence category : ", error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchAllExpenseCategory();
  }, [currentPage])


  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "delete",
        url: `/admin/expense/expenseCategory/deleteExpenseCategory/${id}`,
      });

      if (res.status === 200) {
        fetchAllExpenseCategory();
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in delete expence category : ", error);
    } finally {
      setLoading(true);
    }
  }

  const handleEditClick = (data) => {
    setEditCategoryId(data?._id);
    setFormData({
      categoryName: data?.categoryName,
      categoryCode: data?.categoryCode
    });
    setIsModalOpen(true);
  }

  const textStyle = { color: 'black' };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1> Stock Adjustments <small /></h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All stock adjustments</h3>
                <div className="box-tools">
                  <button className="btn btn-block btn-primary" onClick={handleAddButtonClick}>
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
                  <table className="table table-bordered table-striped ajax_view" id="stock_adjustment_table">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Category Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (data.map((group, index) => (
                        <tr key={index}>
                          <td>{group.categoryName}</td>
                          <td>{group.categoryCode}</td>
                          <td>
                            {/* <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button> */}

                            <DropdownButton id="dropdown-basic-button" title="Actions">
                              {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                              <Dropdown.Item onClick={() => handleEditClick(group)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                              <Dropdown.Item onClick={() => deleteCategory(group?._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
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
                      ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                        </tr>
                      )}
                    </tbody>
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
          </section>
        </div>
        <Footer />
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          color: "black"
        }}>
          <form style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px'
          }}
            onSubmit={handleSave}
          >
            <h2>Add Expense Category</h2>
            <div>
              <label>Category Name</label>
              <input
                type="text"
                value={formData?.categoryName}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryName: e.target.value }))}
                style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                required
              />
            </div>
            <div>
              <label>Category Code</label>
              <input
                type="text"
                value={formData.categoryCode}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryCode: e.target.value }))}
                style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                required
              />
            </div>
            {/* <div>
              <input type="checkbox" checked={isSubcategory} onChange={(e) => setIsSubcategory(e.target.checked)} />
              <label style={{ marginLeft: '8px' }}>Add as Subcategory</label>
            </div> */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button type='submit' style={{ padding: '8px 16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
              <button onClick={handleModalClose} style={{ padding: '8px 16px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExpenseCategory;
