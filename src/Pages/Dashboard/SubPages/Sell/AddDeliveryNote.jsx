/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../../../Components/Header";
import Sidebar from "../../../../Components/Sidebar";
import Footer from "../../../../Components/Footer";
import { apiCall } from "../../../../utils/apiCall";
import { useNavigate } from "react-router-dom";
import { faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeliveryNoteProductModal from "./DeliveryNoteProductModal";

const AddDeliveryNote = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  
  const [formData, setFormData] = useState({
    saleOrder: "",
    saleOrderDate: "",
    mode: "",
    invoiceScheme: "",
    deliveryNoteNumber: "",
    deliveryDate: "",
    termsOfPayment: "",
    lPONo: "",
    despatchDocumentNo: "",
    despatchedThrough: "",
    termsOfDelivery: "",
    commentNote: "",
    products: [],
  });

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/sell/saleList/getSales`,
      });

      if (res.status === 200) {
        setSales(res?.data?.result);
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in fetch customers : ", error);
    } finally {
      setLoading(true);
    }
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



  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeSale = (e) => {
    const { value } = e.target;
    const sale = sales.find((sale) => sale?._id === value);

    setFormData((prev) => ({
      ...prev,
      saleOrder: value,
      saleOrderDate: sale?.saleDate,
    }));
  };

  const addDeliveryNote = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "post",
        url: `/admin/sell/deliveryList/addDeliveryNote`,
        data: data,
      });

      if (res.status === 201) {
        navigate("/delivery-note");
      } else {
        setError(res?.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in fetch customers : ", error);
    } finally {
      setLoading(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData }
    addDeliveryNote(data);
  };

  const deleteProduct = (id) => {
    const allProducts = formData.products;
    setFormData(prev => ({
      ...prev,
      products: allProducts.filter(pro => pro.product !== id)
    }))
  }

  return (
    <div>
      <div className="wrapper thetop" style={{color: "black"}}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Add Delivery Note</h1>
          </section>
          <section className="content">
            <form onSubmit={handleSubmit}>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inv_no">Sale Order</label>
                      <span className="form-text text-danger" />
                      <select
                        className="form-control select2 select_inv validd"
                        id="inv_no"
                        name="saleOrder"
                        required
                        value={formData.saleOrder}
                        onChange={handleChangeSale}
                      >
                        <option value="">Select</option>
                        {sales.map((sale) => (
                          <option key={sale?._id} value={sale?._id}>
                            Invoice No. - {sale?.invoiceNo}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="invoice_date">Sale Order Date</label>
                      <span className="form-text text-danger" />
                      <input
                        type="date"
                        name="invoice_date"
                        id="invoice_date"
                        className="form-control validd inv_date"
                        readOnly
                        value={formData.saleOrderDate?.substring(0, 10) || ""}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="mode">Mode</label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        id="mode"
                        name="mode"
                        className="form-control "
                        value={formData.mode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="invoice_scheme_id">
                          Invoice scheme:
                        </label>
                        <select
                          className="form-control select2"
                          id="invoice_scheme_id"
                          name="invoiceScheme"
                          value={formData.invoiceScheme}
                          onChange={handleChange}
                        >
                          <option value="">Please Select</option>
                          <option value="Default">Default</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="Delivery Note Number">
                          Delivery Note Number
                        </label>
                        <input
                          className="form-control"
                          placeholder="Delivery Note Number"
                          name="deliveryNoteNumber"
                          type="text"
                          value={formData.deliveryNoteNumber}
                          onChange={handleChange}
                        />
                        <p className="help-block">
                          Keep blank to auto generate
                        </p>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="delivery_date">Delivery Date</label>
                      <span className="form-text text-danger" />
                      <input
                        type="date"
                        name="deliveryDate"
                        id="delivery_date"
                        className="form-control validd"
                        placeholder=""
                        defaultValue=""
                        required=""
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">&nbsp;</div>

                    <div className="form-group col-md-4">
                      <label htmlFor="terms_of_payments">
                        Terms of Payment
                      </label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        id="terms_of_payments"
                        name="termsOfPayment"
                        className="form-control"
                        placeholder="Terms of Payments"
                        value={formData.termsOfPayment}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="lpo_no">LPO No.</label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        name="lPONo"
                        id="lpo_no"
                        className="form-control"
                        placeholder="LPO No."
                        value={formData.lPONo}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="desp_no">Despatch Document No.</label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        name="despatchDocumentNo"
                        id="desp_no"
                        className="form-control"
                        placeholder="Despatch Document No."
                        value={formData.despatchDocumentNo}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="desp_through">Despatched through</label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        name="despatchedThrough"
                        id="desp_through"
                        className="form-control"
                        placeholder="Despatched through"
                        value={formData.despatchedThrough}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="terms_of_delivery">
                        Terms of Delivery
                      </label>
                      <span className="form-text text-danger" />
                      <input
                        type="text"
                        name="termsOfDelivery"
                        id="terms_of_delivery"
                        className="form-control"
                        placeholder="Terms of Delivery"
                        defaultValue=""
                        value={formData.termsOfDelivery}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="comment">Comment/Note</label>
                      <span className="form-text text-danger" />
                      <textarea
                        name="commentNote"
                        id="comment"
                        className="form-control"
                        defaultValue={""}
                        value={formData.commentNote}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">

                    <div className="box box-primary">
                      <div className="box-body">
                        <div className="row">
                          {/* <div className="col-sm-2 text-center">
                                                                             <button type="button" className="btn btn-primary btn-flat" data-toggle="modal" data-target="#import_purchase_products_modal">
                                                                               Import Products
                                                                             </button>
                                                                           </div> */}
                          <div className="col-sm-8">
                            <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon">
                                  <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input className="form-control mousetrap" id="search_product" placeholder="Enter Product name / SKU / Scan bar code" name="search_product" type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <div className="form-group">
                              <button onClick={() => setModal(true)} type="button" className="btn btn-link btn-modal" data-href="https://medipro.affinity-me.com/products/quick_add" data-container=".quick_add_product_modal">
                                <FontAwesomeIcon icon={faPlus} />Add new product
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="table-responsive">
                              <table className="table table-condensed table-bordered text-center" id="purchase_entry_table" style={{ backgroundColor: 'green' }}>
                                <thead>
                                  <tr className='table-th-green'>
                                    <th>Sr. no.</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>
                                      <FontAwesomeIcon icon={faTrash} aria-hidden="true" /></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    formData.products.map((product, index) => {

                                      const filteredProduct = products.find(prod => prod._id == product.product);

                                      return (
                                        <tr style={{ background: 'white' }}>
                                          <th>{index + 1}</th>
                                          <th>{filteredProduct?.productName}</th>
                                          <th>{filteredProduct?.productDescription}</th>
                                          <th>{product?.quantity}</th>
                                          <th onClick={() => deleteProduct(product.product)}>
                                            <FontAwesomeIcon icon={faTrash} aria-hidden="true" /></th>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                            <hr />
                            <div className="pull-right col-md-5">
                              <table className="pull-right col-md-12">
                                <tbody>
                                  <tr>
                                    <th className="col-md-7 text-left">Total Items: {formData.products.reduce((acc, pro) => acc + (Number(pro.quantity) || 0), 0)}</th>
                                    <td className="col-md-5 text-left">
                                      <span id="total_quantity" className="display_currency" data-currency_symbol="false" />
                                    </td>
                                  </tr>
                                  <tr className="hide">
                                    <th className="col-md-7 text-right">Total Before Tax:</th>
                                    <td className="col-md-5 text-left">
                                      <span id="total_st_before_tax" className="display_currency" />
                                      <input type="hidden" id="st_before_tax_input" defaultValue={0} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="col-md-1 text-left" style={{ textWrap: "nowrap" }}>Net Total Amount: {formData.products.reduce((acc, pro) => acc + (Number(pro.totalAmount) || 0), 0)}</th>
                                    <td className="col-md-5 text-left">
                                      <span id="total_subtotal" className="display_currency" />
                                      <input type="hidden" id="total_subtotal_input" defaultValue={0} name="total_before_tax" />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <input type="hidden" id="row_count" defaultValue={0} />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col-md-12">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>

      <DeliveryNoteProductModal
        show={modal}
        setModal={setModal}
        editProductData={editProductData}
        setEditProductData={setEditProductData}
        formData={formData}
        setFormData={setFormData}
      />

    </div>
  );
};
export default AddDeliveryNote;
