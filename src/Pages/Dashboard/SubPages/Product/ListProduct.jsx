import React, { useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Prev } from 'react-bootstrap/esm/PageItem';

const ListProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productList/getAllProduct?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setData(result?.result)
        setTotalPage(result?.totalPage)
        // result.result.map((user)=>{
        //   fetchBrand(user.brand);
        //   fetchCategory(user.category)
        //   setData(result.result)
        // })

      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productList/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete product. Please try again later");
        throw new Error('Failed to delete product');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Product deleted Succesfully")
        fetchProducts();
      } else {
        toast.error("Failed to delete product. Please try again later");
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategory = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/getCategory/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setCategory(result.result.name)
        console.log(brand);
      } else {
        throw new Error('Failed to fetch category');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBrand = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getBrand/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setBrand(result.result.name)
        console.log(brand, category);
      } else {
        throw new Error('Failed to fetch brand');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!loading) { // Prevents auto-fetch while deletion is happening
      fetchProducts();
    }
  }, [currentPage]);




  const textStyle = { color: 'black' }
  return (
    <div>
      <>
        <div className="wrapper thetop">
          <Header />
          <Sidebar />
          <div className=" content-wrapper ">
            <section className="content-header">
              <h1> Products <small>Manage your products</small> </h1>
            </section>
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box  box-solid " id="accordion">
                    <div className="box-header with-border" style={{ cursor: "pointer" }}>
                      <h3 className="box-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                          <i className="fa fa-filter" aria-hidden="true" /> Filters
                        </a>
                      </h3>
                    </div>
                    <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true" >
                      <div className="box-body">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="type">Product Type:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="product_list_filter_type"
                              name="type"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value="single">Single</option>
                              <option value="variable">Variable</option>
                              <option value="combo">Combo</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="category_id">Category:</label>
                            <select className="form-control select2" style={{ width: "100%" }} id="product_list_filter_category_id" name="category_id" >
                              <option selected="selected" value="">
                                All
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="unit_id">Unit:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="product_list_filter_unit_id"
                              name="unit_id"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value={4}>Pieces (Pc(s))</option>
                              <option value={21}>Box (box)</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="tax_id">Tax:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="product_list_filter_tax_id"
                              name="tax_id"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="brand_id">Brand:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="product_list_filter_brand_id"
                              name="brand_id"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value={61}>Sanibel</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3" id="location_filter">
                          <div className="form-group">
                            <label htmlFor="location_id">Business Location:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="location_id"
                              name="location_id"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value="none">None</option>
                              <option value={4}>
                                POS APPLICATION TRADING COMPANY W.L.L (BL0001)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="active_state">Status:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="active_state"
                              name="active_state"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="form-group">
                              <label htmlFor="manufacturer_id">Manufacturer:</label>
                              <select
                                className="form-control select2"
                                style={{ width: "100%" }}
                                id="manufacturer_id"
                                name="manufacturer_id"
                              >
                                <option selected="selected" value="">
                                  All
                                </option>
                                <option value={1}>Nero Salinas</option>
                                <option value={49}>sefam</option>
                                <option value={52}>MAICO-Sanibel</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="form-group">
                              <label htmlFor="supplier_id">Supplier:</label>
                              <select
                                className="form-control select2"
                                id="supplier_id"
                                name="supplier_id"
                                style={{ width: "100% !important" }}
                              >
                                <option value="">All</option>
                                <option value={23}>Seeam</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="repair_model_id">Device Model:</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              id="repair_model_id"
                              name="repair_model_id"
                            >
                              <option selected="selected" value="">
                                All
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <br />
                            <label>
                              <input
                                className="input-icheck"
                                id="not_for_selling"
                                name="not_for_selling"
                                type="checkbox"
                                defaultValue={1}
                              />{" "}
                              <strong>Not for selling</strong>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="nav-tabs-custom">
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#product_list_tab" data-toggle="tab" aria-expanded="true">
                          <i className="fa fa-cubes" aria-hidden="true" /> All Products
                        </a>
                      </li>
                      <li>
                        <a href="#product_stock_report" data-toggle="tab" aria-expanded="true" >
                          <i className="fa fa-hourglass-half" aria-hidden="true" />
                          Stock Report
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active" id="product_list_tab">
                        <Link className="btn btn-primary pull-right" to="/listproduct/addproduct " >
                          <span onClick={() => navigate("/listproduct/addproduct")}><i className="fa fa-plus" /> Add</span>
                        </Link>
                        <br />
                        <br />
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
                        <div style={{ overflowX: 'auto' }}>
                          <table className="table table-bordered table-striped ajax_view hide-footer mx-2" id="product_table" >
                            <thead>
                              <tr>
                                {/* <th> <input type="checkbox" id="select-all-row" data-table-id="product_table" /> </th> */}
                                <th style={textStyle}>Action</th>
                                <th style={textStyle}>Product</th>
                                <th style={textStyle}>Manufacturer</th>
                                <th style={textStyle}> Business Location
                                  {/* <i className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                            data-content="Product will be available only in this business locations"data-html="true" data-trigger="hover"
                          /> */}
                                </th>
                                <th style={textStyle}>Unit Purchase Price</th>
                                <th style={textStyle}>Selling Price</th>
                                <th style={textStyle}>Unit</th>
                                <th style={textStyle}>Product Type</th>
                                <th style={textStyle}>Category</th>
                                <th style={textStyle} >Brand</th>
                                <th style={textStyle}>Tax</th>
                                <th style={textStyle}>SKU</th>
                                <th style={textStyle}>Batch No</th>
                                <th style={textStyle}>Product Serial No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((product, index) => (
                                <tr key={index}>

                                  <td style={textStyle}>
                                    {/* {setId(user._id)} */}
                                    <DropdownButton id="dropdown-basic-button" title="Actions">
                                      {/* <Dropdown.Item href="#/pay"><FontAwesomeIcon icon={faDollarSign} /> Pay</Dropdown.Item>
                            <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                      <Dropdown.Item href="#/edit" onClick={() => navigate(`/editproduct/${product._id}`)}> <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                      <Dropdown.Item href="#/delete" onClick={() => deleteProduct(product._id)}> <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                      {/* <Dropdown.Item href="#/deactivate"> <FontAwesomeIcon icon={faBan} /> Deactivate</Dropdown.Item>
                            <br/>
                            <Dropdown.Item href="#/ledger"><FontAwesomeIcon icon={faBook} /> Ledger</Dropdown.Item>
                            <Dropdown.Item href="#/purchase"> <FontAwesomeIcon icon={faShoppingCart} /> Purchase</Dropdown.Item>
                            <Dropdown.Item href="#/stock-reports"><FontAwesomeIcon icon={faBox} /> Stock Reports</Dropdown.Item>
                            <Dropdown.Item href="#/documents"> <FontAwesomeIcon icon={faFileAlt} /> Document & Notes</Dropdown.Item> */}
                                    </DropdownButton>
                                  </td>
                                  <td style={textStyle}>{product?.productName}</td>
                                  <td style={textStyle}>{product?.manufacturer?.name}</td>
                                  <td style={textStyle}>{product.businessLocations}</td>
                                  <td style={textStyle}>{product?.defaultPurchasePrice?.excTax}</td>
                                  <td style={textStyle}>{product?.defaultSellingPrice?.excTax}</td>
                                  <td style={textStyle}>{product?.unit?.name}({product?.unit?.shortName})</td>
                                  <td style={textStyle}>{product.productType}</td>
                                  <td style={textStyle}>{product?.category?.name}</td>
                                  <td style={textStyle}>{product?.brand?.name}</td>
                                  <td style={textStyle}>{product.applicableTax}</td>
                                  <td style={textStyle}>{product.SKU}</td>
                                  <td style={textStyle}>{product.batchNo}</td>
                                  <td style={textStyle}>{product.productSerialNo}</td>
                                </tr>
                              ))}
                            </tbody>
                            {/* <tfoot>
                      <tr>
                        <td colSpan={17}>
                          <div style={{ display: "flex", width: "100%" }}>
                            <form
                              method="POST"
                              action="https://medipro.affinity-me.com/products/mass-delete"
                              acceptCharset="UTF-8"
                              id="mass_delete_form"
                            >
                              <input name="_token" type="hidden" defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX" />
                              <input id="selected_rows" name="selected_rows" type="hidden" />
                              <input className="btn btn-xs btn-danger" id="delete-selected"type="submit"defaultValue="Delete Selected"/>
                            </form>
                            &nbsp;
                            <form
                              method="POST"
                              action="https://medipro.affinity-me.com/products/bulk-edit"
                              acceptCharset="UTF-8"
                              id="bulk_edit_form"
                            >
                              <input name="_token" type="hidden" defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"/>
                              <input id="selected_products_for_edit" name="selected_products" type="hidden"/>
                              <button type="submit" className="btn btn-xs btn-primary" id="edit-selected">
                                <i className="fa fa-edit" />
                                Bulk Edit
                              </button>
                            </form>
                            &nbsp;
                            <button type="button" className="btn btn-xs btn-success update_product_location" data-type="add">
                              Add to location
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-xs bg-navy update_product_location" data-type="remove" >
                              Remove from location
                            </button>
                            &nbsp;
                            {/* <form
                              method="POST"
                              action="https://medipro.affinity-me.com/products/mass-deactivate"
                              acceptCharset="UTF-8"
                              id="mass_deactivate_form"
                            >
                              <input
                                name="_token"
                                type="hidden"
                                defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                              />
                              <input
                                id="selected_products"
                                name="selected_products"
                                type="hidden"
                              />
                              <input
                                className="btn btn-xs btn-warning"
                                id="deactivate-selected"
                                type="submit"
                                defaultValue="Deactivate Selected"
                              />
                            </form>{" "} */}
                            {/* <i
                              className="fa fa-info-circle text-info hover-q no-print "
                              aria-hidden="true"
                              data-container="body"
                              data-toggle="popover"
                              data-placement="auto bottom"
                              data-content="Deactivated products will not be available for purchase or sell"
                              data-html="true"
                              data-trigger="hover"
                            /> */}
                            {/* &nbsp;
                          </div>
                        </td>
                      </tr>
                    </tfoot> */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pagination-custom justify-content-end" style={{gap: 5}}>
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

              <input type="hidden" id="is_rack_enabled" defaultValue="" />
              <div className="modal fade product_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
              <div className="modal fade" id="view_product_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
              <div
                className="modal fade"
                id="opening_stock_modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="gridSystemModalLabel"
              ></div>
              <div
                className="modal fade"
                id="edit_product_location_modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="gridSystemModalLabel"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <form
                      method="POST"
                      action="https://medipro.affinity-me.com/products/bulk-update-location"
                      acceptCharset="UTF-8"
                      id="edit_product_location_form"
                    >
                      <input
                        name="_token"
                        type="hidden"
                        defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                      />
                      <div className="modal-header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                        <h4 className="modal-title">
                          <span className="add_to_location_title hide">
                            Add location to the selected products
                          </span>
                          <span className="remove_from_location_title hide">
                            Remove location from the selected products
                          </span>
                        </h4>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="product_location">Business Location:</label>
                          <select
                            className="form-control"
                            style={{ width: "100%" }}
                            required=""
                            multiple=""
                            id="product_location"
                            name="product_location[]"
                          >
                            <option value="none">None</option>
                            <option value={4}>
                              POS APPLICATION TRADING COMPANY W.L.L (BL0001)
                            </option>
                          </select>
                          <input
                            id="products_to_update_location"
                            name="products"
                            type="hidden"
                          />
                          <input id="update_type" name="update_type" type="hidden" />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="update_product_location"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
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
          <div
            className="modal fade"
            id="todays_profit_modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">
                    Today's profit
                  </h4>
                </div>
                <div className="modal-body">
                  <input type="hidden" id="modal_today" defaultValue="2024-06-06" />
                  <div className="row">
                    <div id="todays_profit"></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
        <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            </div>
          </div>
        </div>
        <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
      </>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default ListProduct