import React, { useEffect, useState, useTransition } from "react";
import Header from "../../../../Components/Header";
import Sidebar from "../../../../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFileCsv,
  faPrint,
  faFileExcel,
  faFilePdf,
  faColumns,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../../Components/Footer";
import { apiCall } from "../../../../utils/apiCall";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Discount = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    product: "",
    brand: "",
    category: "",
    location: "",
    priority: "",
    discountType: "",
    discountAmount: "",
    startDate: "",
    endDate: "",
    sellingPriceGroup: "",
    applyInCustomerGroups: false,
    isActive: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddButtonClick = () => setShowModal(true);

  const handelEditButtonClick = (id) => {
    setEditId(id);
    fetchDisountById(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData({
      name: "",
      product: "",
      brand: "",
      category: "",
      location: "",
      priority: "",
      discountType: "",
      discountAmount: "",
      startDate: "",
      endDate: "",
      sellingPriceGroup: "",
      applyInCustomerGroups: false,
      isActive: false,
    });
    setEditId("");
    setShowModal(false);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await apiCall({
        method: "get",
        url: "/admin/product/productList/getProducts",
      });

      if (res.status == 200) {
        setProducts(res?.data?.result);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await apiCall({
        method: "get",
        url: "/admin/product/category/getCategories",
      });

      if (res.status == 200) {
        setCategories(res?.data?.result);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);

      const res = await apiCall({
        method: "get",
        url: "/admin/product/brand/getBrands",
      });

      if (res.status == 200) {
        setBrands(res?.data?.result);
      } else {
        throw new Error("Failed to fetch brands");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDisounts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", currentPage);
      const res = await apiCall({
        method: "get",
        url: `/admin/sell/discount/getAllDiscount?${params.toString()}`,
      });

      if (res.status == 200) {
        setData(res?.data?.result);
      } else {
        throw new Error("Failed to fetch discounts");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDisountById = async (id) => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "get",
        url: `/admin/sell/discount/getDiscount/${id}`,
      });

      if (res.status == 200) {
        setFormData(res?.data?.result);
      } else {
        throw new Error("Failed to fetch discount by id");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addDiscount = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "post",
        url: "/admin/sell/discount/addDiscount",
        data: formData,
      });

      if (res.status == 201) {
        fetchDisounts();
        handleModalClose();
      } else {
        throw new Error("Failed to add discount");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editDiscount = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "patch",
        url: `/admin/sell/discount/updateDiscount/${editId}`,
        data: formData,
      });

      if (res.status == 200) {
        fetchDisounts();
        handleModalClose();
      } else {
        throw new Error("Failed to update discount");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscount = async (id) => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "delete",
        url: `/admin/sell/discount/deleteDiscount/${id}`,
      });

      if (res.status == 200) {
        fetchDisounts();
      } else {
        throw new Error("Failed to delete discount");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!editId) return addDiscount();
    editDiscount();
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchDisounts();
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (formData.product) {
      const product = products.find(
        (product) => product?._id === formData.product
      );
      setFormData((prev) => ({
        ...prev,
        category: product.category,
        brand: product.brand,
      }));
    }
  }, [formData.product]);

  const textStyle = { color: "black" };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Discount </h1>
          </section>
          <section className="content">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">All your discounts</h3>
                <div className="box-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-modal"
                    onClick={handleAddButtonClick}
                  >
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
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search..."
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-striped"
                    id="discounts_table"
                  >
                    <thead>
                      <tr>
                        <th>
                          {/* <input
                            type="checkbox"
                            id="select-all-row"
                            data-table-id="discounts_table"
                          /> */}
                          Sr. no.
                        </th>
                        <th>Name</th>
                        <th>Starts At</th>
                        <th>Ends At</th>
                        <th>Discount Amount</th>
                        <th>Priority</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Products</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((group, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{group?.name}</td>
                            <td>{group?.startDate}</td>
                            <td>{group?.endDate}</td>
                            <td>{group?.discountAmount}</td>
                            <td>{group?.priority}</td>
                            <td>{group?.brand?.name}</td>
                            <td>{group?.category?.name}</td>
                            <td>{group?.product?.productName}</td>
                            <td>{group?.location}</td>
                            <td>
                              <DropdownButton
                                id="dropdown-basic-button"
                                title="Actions"
                              >
                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                <Dropdown.Item
                                  onClick={() =>
                                    handelEditButtonClick(group?._id)
                                  }
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faEdit} /> Edit{" "}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteDiscount(group?._id)}
                                >
                                  {" "}
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center">
                            <b>No Data Available</b>
                          </td>
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

      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {" "}
                  {editId ? "Edit" : "Add"} Discount
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder="Discount Name"
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product">Product</label>
                  <select
                    id="product"
                    name="product"
                    className="form-control"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product?._id} value={product?._id}>
                        {product?.productName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <select
                    className="form-control"
                    id="brand"
                    value={formData.brand}
                    readonly
                    disabled
                  >
                    <option value="">Select Brand</option>
                    {brands?.map((brand) => (
                      <option key={brand?._id} value={brand?._id}>
                        {brand?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    value={formData?.category}
                    readonly
                    disabled
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <select
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData?.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  {/* < input
                    placeholder="Priority"
                    type="text"
                    className="form-control"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  /> */}
                  <select
                    className="form-control"
                    id="location"
                    name="priority"
                    value={formData?.priority}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="discountType">Discount Type</label>
                  <select
                    className="form-control"
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                  >
                    <option value="">Select Discount Type</option>
                    <option value="discount1">Discount 1</option>
                    <option value="discount2">Discount 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="discountAmount">Discount Amount</label>
                  <input
                    placeholder="Discount Amount"
                    type="text"
                    className="form-control"
                    id="discountAmount"
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate?.substring(0, 10) || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate?.substring(0, 10) || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discountType">Selling Price Group</label>
                  <select
                    className="form-control"
                    id="sellingPriceGroup"
                    name="sellingPriceGroup"
                    value={formData.sellingPriceGroup}
                    onChange={handleChange}
                  >
                    <option value="">All</option>
                    <option value="default">Default Selling Price</option>
                  </select>
                </div>

                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="applyInCustomerGroups"
                    name="applyInCustomerGroups"
                    checked={formData.applyInCustomerGroups}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="applyInCustomerGroups"
                  >
                    Apply in Customer Groups
                  </label>
                </div>

                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Is Active
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discount;
