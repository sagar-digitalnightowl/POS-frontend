import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faUser, faPlusCircle, faInfoCircle, faCalendar, faSearchPlus, faTimes, faInfo, faGift, faChevronDown, faChevronUp, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';
import { useNavigate, useParams } from 'react-router-dom';
import ProductModal from './ProductModal';

const EditQuotation = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [modal, setModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [showAdditionalExpenses, setShowAdditionalExpenses] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    location: '',
    customer: '',
    payTerm: {
      value: '',
      unit: '',
    },
    saleDate: '',
    status: '',
    invoiceSchema: '',
    invoiceNo: '',
    attachDocument: null,
    products: [],
    discountType: '',
    discountAmount: '',
    orderTax: '',
    sellNote: '',
    shippingDetails: '',
    shippingAddress: '',
    shippingCharges: '',
    shippingStatus: '',
    deliveredTo: '',
    deliveryPerson: '',
    shippingDocuments: '',
    additionalExpenses: [],
  })


  const fetchQuotation = async () => {
    setLoading(true);
    try {

      const res = await apiCall({ method: "get", url: `/admin/sell/quotationList/getQuotation/${id}` })

      if (res.status === 200) {
        setFormData({ ...res?.data?.result, customer: res?.data?.result?.customer?._id, attachDocument: null, shippingDocuments: null });
        if (res?.data?.result?.additionalExpenses?.length > 0) {
          setShowAdditionalExpenses(true)
        }
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch single draft : ", error)
    } finally {
      setLoading(true);
    }
  }


  const handleAdditionalExpensesShow = () => {
    if (!showAdditionalExpenses) {
      setFormData(prev => ({
        ...prev, additionalExpenses: [{
          name: "",
          amount: "",
        }]
      }))
    } else {
      setFormData(prev => ({ ...prev, additionalExpenses: [] }))
    }
    setShowAdditionalExpenses(!showAdditionalExpenses)
  }

  const handleAdditionalExpensesChange = (key, e, index) => {
    setFormData(prev => {
      const updatedExpenses = [...prev.additionalExpenses];
      updatedExpenses[index] = {
        ...updatedExpenses[index],
        [key]: e.target.value
      }
      return {
        ...prev,
        additionalExpenses: updatedExpenses
      }
    })
  }

  const handleAddNewAdditionalExpenses = () => {
    const updatedExpenses = [...formData.additionalExpenses]
    updatedExpenses.push({
      name: "",
      amount: ""
    })
    setFormData(prev => ({ ...prev, additionalExpenses: updatedExpenses }))
  }

  const handleRemoveAdditionalExpenses = (index) => {
    const additionalExpenses = [...formData.additionalExpenses];
    setFormData(prev => ({ ...prev, additionalExpenses: additionalExpenses.filter((exp, i) => i !== index) }))
    if (additionalExpenses.length <= 1) {
      setShowAdditionalExpenses(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangePayTerm = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      payTerm: { ...prev.payTerm, [name]: value }
    }))
  }

  const fetchCustomers = async () => {
    setLoading(true);
    try {

      const res = await apiCall({ method: "get", url: `/admin/contacts/customerAndSuppliers/getCustomersAndSuppliers?contactType=customer` })

      if (res.status === 200) {
        setCustomers(res?.data?.result);
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch customers : ", error)
    } finally {
      setLoading(true);
    }
  }

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
    fetchCustomers();
    fetchQuotation();
    fetchProducts();
  }, []);


  const editQuotation = async (formData) => {
    setLoading(true);
    try {
      const res = await apiCall({ method: "patch", url: `/admin/sell/quotationList/updateQuotation/${id}`, data: formData });

      if (res.status === 200) {
        navigate('/list/quotations')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in update quotation : ", error)
    } finally {
      setLoading(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("location", formData.location);
    form.append("customer", formData.customer);
    form.append("payTerm", JSON.stringify(formData.payTerm));
    form.append("saleDate", formData.saleDate);
    form.append("status", formData.status);
    form.append("invoiceSchema", formData.invoiceSchema);
    form.append("invoiceNo", formData.invoiceNo)
    form.append("products", JSON.stringify(formData.products));
    form.append("attachDocument", formData.attachDocument);
    form.append("discountType", formData.discountType);
    form.append("discountAmount", formData.discountAmount);
    form.append("orderTax", formData.orderTax);
    form.append("sellNote", formData.sellNote);
    form.append("shippingDetails", formData.shippingDetails);
    form.append("shippingAddress", formData.shippingAddress);
    form.append("shippingCharges", formData.shippingCharges);
    form.append("shippingStatus", formData.shippingStatus);
    form.append("deliveredTo", formData.deliveredTo);
    form.append("deliveryPerson", formData.deliveryPerson);
    form.append("shippingDocuments", formData.shippingDocuments);
    form.append("additionalExpenses", JSON.stringify(formData.additionalExpenses));

    editQuotation(form);
  }


  const deleteProduct = (id) => {
    const allProducts = formData.products;
    setFormData(prev => ({
      ...prev,
      products: allProducts.filter(pro => pro.product !== id)
    }))
  }



  const textStyle = { color: 'black' };
  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header"><h1>Edit Quotation</h1></section>
          <section className="content no-print">
            <input type="hidden" id="amount_rounding_method" defaultValue="" />
            <input type="hidden" id="is_overselling_allowed" />
            <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <FontAwesomeIcon icon={faMapMarker} />
                    </span>

                    <select
                      className="form-control input-sm"
                      id="select_location_id"
                      required=""
                      autofocus=""
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option value='POS APPLICATION TRADING COMPANY W.L.L (BL0001)'>
                        POS APPLICATION TRADING COMPANY W.L.L (BL0001)
                      </option>
                    </select>


                    <span className="input-group-addon">
                      <i className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                        data-content="Business location from where you want to sell" data-html="true" data-trigger="hover"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" id="item_addition_method" defaultValue={1} />
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="box box-solid">
                    <div className="box-body">
                      <input id="location_id" data-receipt_printer_type="browser"
                        // data-default_payment_accounts='{"cash":{"is_enabled":1,"account":null},"card":{"is_enabled":1,"account":null},"cheque":{"is_enabled":1,"account":null},"bank_transfer":{"is_enabled":1,"account":null},"other":{"is_enabled":1,"account":null},"custom_pay_1":{"is_enabled":1,"account":null},"custom_pay_2":{"is_enabled":1,"account":null},"custom_pay_3":{"is_enabled":1,"account":null},"custom_pay_4":{"is_enabled":1,"account":null},"custom_pay_5":{"is_enabled":1,"account":null},"custom_pay_6":{"is_enabled":1,"account":null},"custom_pay_7":{"is_enabled":1,"account":null}}'
                        name="location_id" type="hidden" defaultValue={4}
                      />
                      <div className="clearfix" />
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="contact_id">Customer:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <FontAwesomeIcon icon={faUser} />
                            </span>
                            {/* <input className="form-control"placeholder="Invoice No."name="invoice_no" type="text"id="invoice_no"/> */}
                            <select
                              className="form-control mousetrap"
                              id="customer_id"
                              required
                              name="customer"
                              onChange={handleChange}
                              value={formData.customer}
                            >
                              <option value="">Select Customer</option>
                              {
                                customers?.map((customer) => (
                                  <option key={customer._id} value={customer._id}>{customer.firstName} {customer.middleName} { }</option>
                                ))
                              }
                            </select>

                            <span className="input-group-btn">
                              <button type="button" className="btn btn-default bg-white btn-flat add_new_customer" data-name="">
                                <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                              </button>
                            </span>

                          </div>

                          <small className="text-danger hide contact_due_text">
                            <strong>Customer Due:</strong>
                            <span />
                          </small>

                        </div>

                        <small>
                          <strong>Billing Address:</strong>
                          <div id="billing_address_div">
                            {/* <b>{selectedCustomer.billingAddress}</b> */}
                          </div>
                          <br />
                          <strong>Shipping Address:</strong>
                          <div id="shipping_address_div">
                            {/* {selectedCustomer.shippingAddress} */}
                          </div>
                        </small>

                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="multi-input">
                            <label htmlFor="pay_term_number">Pay term:</label>
                            <FontAwesomeIcon icon={faInfoCircle} className="fa fa-info-circle text-info hover-q no-print"
                              aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                              data-content="Payments to be paid for purchases/sales within the given time period.<br/><small class='text-muted'>All upcoming or due payments will be displayed in dashboard - Payment Due section</small>"
                              data-html="true" data-trigger="hover"
                            />
                            <br />

                            <input
                              className="form-control"
                              placeholder="Pay term"
                              name="value"
                              type="number"
                              id="pay_term_number"
                              style={{ width: '40%', display: 'inline-block', marginRight: '5px' }}
                              value={formData?.payTerm?.value}
                              onChange={handleChangePayTerm}
                            />

                            <select
                              className="form-control"
                              name="unit"
                              style={{ width: '55%', display: 'inline-block' }}
                              value={formData?.payTerm?.unit}
                              onChange={handleChangePayTerm}
                            >
                              <option value="">Please Select</option>
                              <option value="Months">Months</option>
                              <option value="Days">Days</option>
                            </select>

                          </div>
                        </div>
                      </div>

                      <div className=" col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="transaction_date">Sale Date:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <FontAwesomeIcon icon={faCalendar} className="fa fa-calendar" />
                            </span>
                            <input
                              className="form-control"
                              required
                              name="saleDate"
                              type="date"
                              defaultValue="13/06/2024 16:00"
                              id="transaction_date"
                              value={formData.saleDate?.substring(0, 10) || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <input type="hidden" id="disable_qty_alert" />

                      <div className=" col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="status">Status:*</label>
                          <select
                            className="form-control select2"
                            required=""
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option value="">Please Select</option>
                            <option value="Final">Final</option>
                            <option value="Draft">Draft</option>
                            <option value="Quotation">Quotation</option>
                            <option value="Proforma">Proforma</option>
                          </select>
                        </div>
                      </div>



                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="invoice_scheme_id">Invoice scheme:</label>
                          <select
                            className="form-control select2"
                            id="invoice_scheme_id"
                            name="invoiceSchema"
                            value={formData.invoiceSchema}
                            onChange={handleChange}
                          >
                            <option value="">Please Select</option>
                            <option value="Default">Default</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="invoice_no">Invoice No.:</label>
                          <input
                            className="form-control"
                            placeholder="Invoice No."
                            name="invoiceNo"
                            type="text"
                            id="invoice_no"
                            value={formData?.invoiceNo}
                            onChange={handleChange}
                          />
                          <p className="help-block">Keep blank to auto generate</p>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="upload_document">Attach Document:</label>
                          <input
                            id="upload_document"
                            accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png"
                            name="sell_document"
                            type="file"
                            onChange={(e) => setFormData(prev => ({ ...prev, attachDocument: e.target.files[0] }))}
                          />
                          <p className="help-block">
                            Max File size: 5MB <br />Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg,.jpg, .png
                          </p>
                        </div>
                      </div>

                      <div className="clearfix" />

                    </div>
                  </div>







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
                                  <th className="hide">Batch No</th>
                                  <th>Purchase Quantity</th>
                                  <th>Unit Cost (Before Discount)</th>
                                  <th>Discount Percent</th>
                                  <th>Unit Cost (Before Tax)</th>
                                  <th className="">Subtotal (Before Tax)</th>
                                  <th className="">Product Tax Percent</th>
                                  <th className="">Net Cost</th>
                                  <th>Line Total</th>
                                  <th className="">Profit Margin % </th>
                                  <th>Unit Selling Price <small>(Inc. tax)</small></th>
                                  <th>
                                    <FontAwesomeIcon icon={faTrash} aria-hidden="true" /></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  formData.products.map((product, index) => {

                                    const filteredProduct = products.find(prod => prod._id == product.product);
                                    const filteredProductPrice = filteredProduct?.defaultSellingPrice?.excTax;
                                    const unitCostBeforeTax = filteredProductPrice - filteredProductPrice * (product.discountPercent / 100)
                                    const subTotalBeforeTax = unitCostBeforeTax * product.quantity;
                                    const netCost = unitCostBeforeTax + unitCostBeforeTax * (product.taxPercent / 100)
                                    const margin = ((product.unitSellingPrice - netCost) / product.unitSellingPrice) * 100

                                    return (
                                      <tr style={{ background: 'white' }}>
                                        <th>{index + 1}</th>
                                        <th>{filteredProduct?.productName}</th>
                                        <th>{product.quantity}</th>
                                        <th>{filteredProductPrice}</th>
                                        <th>{product.discountPercent}</th>
                                        <th>{unitCostBeforeTax}</th>
                                        <th className="">{subTotalBeforeTax}</th>
                                        <th className="">{product.taxPercent}</th>
                                        <th className="">{netCost.toFixed(2)}</th>
                                        <th>{product.totalAmount.toFixed(2)}</th>
                                        <th className="">{margin.toFixed(2)}</th>
                                        <th>{product.unitSellingPrice}</th>
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






                  <div className="box box-solid">
                    <div className="box-body">
                      <div className="col-md-4  ">

                        <div className="form-group">
                          <label htmlFor="discount_type">Discount Type:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-info" />
                            </span>
                            <select
                              className="form-control"
                              required=""
                              data-default="percentage"
                              id="discount_type"
                              name="discountType"
                              value={formData.discountType}
                              onChange={handleChange}
                            >
                              <option value="">Please Select</option>
                              <option value="Fixed">Fixed</option>
                              <option value="Percentage">Percentage</option>
                            </select>
                          </div>
                        </div>

                      </div>

                      <div className="col-md-4 ">
                        <div className="form-group">
                          <label htmlFor="discount_amount">Discount Amount:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-info" />
                            </span>
                            <input
                              className="form-control input_number"
                              data-default={0.0}
                              data-max-discount=""
                              data-max-discount-error_msg="You can give max % discount per sale"
                              name="discountAmount"
                              type="text"
                              defaultValue={0.0}
                              id="discount_amount"
                              value={formData.discountAmount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 ">
                        <br />
                        <b>Discount Amount:</b>(-)
                        <span className="display_currency" id="total_discount">
                          {
                            formData?.discountType === "Fixed" ?
                              formData?.discountAmount
                              : formData?.discountType === "Percentage" ?
                                formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0) * formData.discountAmount / 100
                                : 0
                          }
                        </span>
                      </div>

                      <div className="clearfix" />
                      <div className="col-md-12 well well-sm bg-light-gray  hide ">
                        <input
                          type="hidden"
                          name="rp_redeemed"
                          id="rp_redeemed"
                          defaultValue={0}
                        />
                        <div className="col-md-12">
                          <h4 />
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="rp_redeemed_modal">Redeemed:</label>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="fa fa-gift" />
                              </span>
                              <input
                                className="form-control direct_sell_rp_input"
                                data-amount_per_unit_point={1.0}
                                min={0}
                                data-max_points={0}
                                data-min_order_total={1.0}
                                name="rp_redeemed_modal"
                                type="number"
                                defaultValue={0}
                                id="rp_redeemed_modal"
                              />
                              <input type="hidden" id="rp_name" defaultValue="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Available:</strong>
                            <span id="available_rp">0</span>
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Redeemed Amount:</strong> (-)
                            <span id="rp_redeemed_amount_text">0</span>
                          </p>
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-md-4  ">
                        <div className="form-group">
                          <label htmlFor="tax_rate_id">Order Tax:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-info" />
                            </span>
                            <select
                              className="form-control"
                              id="tax_rate_id"
                              name="orderTax"
                              value={formData.orderTax}
                              onChange={handleChange}
                            >
                              <option value="">Please Select</option>
                              <option value="None">None</option>
                            </select>
                            <input
                              type="hidden"
                              name="tax_calculation_amount"
                              id="tax_calculation_amount"
                              defaultValue={0.0}
                              data-default=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-md-offset-4  ">
                        <b>Order Tax:</b>(+)
                        <span className="display_currency" id="order_tax">
                          0
                        </span>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="sell_note">Sell note</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            name="sellNote"
                            cols={50}
                            defaultValue={""}
                            value={formData.sellNote}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <input type="hidden" name="is_direct_sale" defaultValue={1} />
                    </div>
                    {/* /.box-body */}
                  </div>

                  <div className="box box-solid">
                    <div className="box-body">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="shipping_details">Shipping Details</label>
                          <textarea
                            className="form-control"
                            placeholder="Shipping Details"
                            rows={3}
                            cols={30}
                            name="shippingDetails"
                            id="shipping_details"
                            defaultValue={""}
                            value={formData.shippingDetails}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="shipping_address">Shipping Address</label>
                          <textarea
                            className="form-control"
                            placeholder="Shipping Address"
                            rows={3}
                            cols={30}
                            name="shippingAddress"
                            id="shipping_address"
                            defaultValue={""}
                            value={formData.shippingAddress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="shipping_charges">Shipping Charges</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-info" />
                            </span>
                            <input className="form-control input_number"
                              placeholder="Shipping Charges"
                              name="shippingCharges"
                              type="text"
                              defaultValue={0.0}
                              id="shipping_charges"
                              value={formData.shippingCharges}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="shipping_status">Shipping Status</label>
                          <select
                            className="form-control"
                            id="shipping_status"
                            name="shippingStatus"
                            value={formData.shippingStatus}
                            onChange={handleChange}
                          >
                            <option value="">
                              Please Select
                            </option>
                            <option value="Ordered">Ordered</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="delivered_to">Delivered To:</label>
                          <input
                            className="form-control"
                            placeholder="Delivered To"
                            name="deliveredTo"
                            type="text"
                            id="delivered_to"
                            value={formData.deliveredTo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="delivery_person">Delivery Person:</label>
                          <select
                            className="form-control select2"
                            id="delivery_person"
                            name="deliveryPerson"
                            value={formData.deliveryPerson}
                            onChange={handleChange}
                          >
                            <option value="">Please Select</option>
                            <option value={4}> MIDDLE PEARL ADMIN </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="shipping_documents">
                            Shipping Documents:
                          </label>
                          <input
                            id="shipping_documents"
                            accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png"
                            name="shipping_documents[]"
                            type="file"
                            onChange={(e) => setFormData(prev => ({ ...prev, shippingDocuments: e.target.files[0] }))}
                          />
                          <p className="help-block">
                            Max File size: 5MB <br />
                            Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg,
                            .jpg, .png
                          </p>
                        </div>
                      </div>
                      <div className="clearfix" />

                      <div className="col-md-12 text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={handleAdditionalExpensesShow}
                        >
                          <FontAwesomeIcon icon={faPlus} /> Add additional expenses
                          <FontAwesomeIcon icon={showAdditionalExpenses ? faChevronUp : faChevronDown} />
                        </button>
                      </div>

                      {showAdditionalExpenses && (
                        <div className="col-md-8 col-md-offset-4" id="additional_expenses_div">
                          <table className="table table-condensed">
                            <thead>
                              <tr>
                                <th>Additional expense name</th>
                                <th>Amount</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {[1, 2, 3, 4].map(index => (
                                <tr key={index}>
                                  <td>
                                    <input
                                      className="form-control"
                                      id={`additional_expense_key_${index}`}
                                      name={`additional_expense_key_${index}`}
                                      type="text"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control input_number"
                                      id={`additional_expense_value_${index}`}
                                      name={`additional_expense_value_${index}`}
                                      type="text"
                                      defaultValue={0}
                                    />
                                  </td>
                                </tr>
                              ))} */}
                              {
                                formData.additionalExpenses.map((expense, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        className="form-control"
                                        id={`additional_expense_key_${index}`}
                                        name={`additional_expense_key_${index}`}
                                        type="text"
                                        value={formData.additionalExpenses[index]?.name}
                                        onChange={(e) => handleAdditionalExpensesChange('name', e, index)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="form-control input_number"
                                        id={`additional_expense_value_${index}`}
                                        name={`additional_expense_value_${index}`}
                                        type="text"
                                        defaultValue={0}
                                        value={formData.additionalExpenses[index]?.amount}
                                        onChange={(e) => handleAdditionalExpensesChange('amount', e, index)}
                                      />
                                    </td>
                                    <td onClick={() => handleRemoveAdditionalExpenses(index)} style={{ margin: "5px", display: 'flex', cursor: "pointer" }}>x</td>
                                  </tr>
                                ))
                              }
                              <tr>
                                <td colSpan={3}>
                                  <div style={{ display: "flex", justifyContent: "center" }}>
                                    <button
                                      onClick={handleAddNewAdditionalExpenses}
                                      type='button'
                                      className='btn btn-primary btn-sm'>Add new</button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}


                      <div
                        className="col-md-8 col-md-offset-4"
                        id="additional_expenses_div"
                        style={{ display: "none" }}
                      >
                        <table className="table table-condensed">
                          <thead>
                            <tr>
                              <th>Additional expense name</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  id="additional_expense_key_1"
                                  name="additional_expense_key_1"
                                  type="text"
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control input_number"
                                  id="additional_expense_value_1"
                                  name="additional_expense_value_1"
                                  type="text"
                                  defaultValue={0}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  id="additional_expense_key_2"
                                  name="additional_expense_key_2"
                                  type="text"
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control input_number"
                                  id="additional_expense_value_2"
                                  name="additional_expense_value_2"
                                  type="text"
                                  defaultValue={0}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  id="additional_expense_key_3"
                                  name="additional_expense_key_3"
                                  type="text"
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control input_number"
                                  id="additional_expense_value_3"
                                  name="additional_expense_value_3"
                                  type="text"
                                  defaultValue={0}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  id="additional_expense_key_4"
                                  name="additional_expense_key_4"
                                  type="text"
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control input_number"
                                  id="additional_expense_value_4"
                                  name="additional_expense_value_4"
                                  type="text"
                                  defaultValue={0}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-4 col-md-offset-8">
                        <div>
                          <b>Total Payable: </b>
                          <input
                            type="hidden"
                            name="final_total"
                            id="final_total_input"
                          />
                          <span id="total_payable">{
                            formData?.discountType === "Fixed" ?
                              (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0)
                                + (Number(formData.shippingCharges) || 0)
                                + formData?.additionalExpenses.reduce((acc, expense) => acc + (Number(expense?.amount) || 0), 0)
                                - formData?.discountAmount).toFixed(2)
                              : formData?.discountType === "Percentage" ?
                                (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0)
                                  + (Number(formData.shippingCharges) || 0)
                                  + formData?.additionalExpenses.reduce((acc, expense) => acc + (Number(expense?.amount) || 0), 0)
                                  - (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0) * formData.discountAmount / 100)).toFixed(2)
                                : 0
                          }</span>
                        </div>
                      </div>
                    </div>
                    {/* /.box-body */}
                  </div>
                </div>
              </div>
              <div className="row">
                <input
                  id="is_save_and_print"
                  name="is_save_and_print"
                  type="hidden"
                  defaultValue={0}
                />
                <div className="col-sm-12 text-center">
                  <button
                    type="submit"
                    id="submit-sell"
                    className="btn btn-primary btn-big"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="save-and-print"
                    className="btn btn-success btn-big"
                  >
                    Save and print
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>

      <ProductModal
        show={modal}
        setModal={setModal}
        editProductData={editProductData}
        setEditProductData={setEditProductData}
        formData={formData}
        setFormData={setFormData}
      />


    </div>
  )
}

export default EditQuotation;