import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';
import { faUser, faPlusCircle, faInfoCircle, faPlus, faTrash, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaChevronUp } from 'react-icons/fa';
import ProductModal from './ProductModal';



const EditPurchaseReturn = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showAdditionalExpenses, setShowAdditionalExpenses] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editProductData, setEditProductData] = useState(null);

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    referenceNo: '',
    purchaseReturnDate: '',
    purchaseReturnStatus: '',
    attachDocument: null,
    products: [],
    discountType: '',
    discountAmount: '',
    purchaseTax: '',
    additionalNotes: '',
    shippingDetails: '',
    additionalShippingcharges: '',
    additionalExpenses: [],
  });


  const fetchPurchaseReturn = async () => {
    setLoading(true);
    try {
      const res = await apiCall({ method: "get", url: `/admin/purchase/purchaseReturn/getPurchaseReturn/${id}` })

      if (res.status === 200) {

        setFormData({ ...res?.data?.result, supplier: res?.data?.result?.supplier?._id, attachDocument: null });
        if (res?.data?.result?.additionalExpenses?.length > 0) {
          setShowAdditionalExpenses(true);
        }

      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch purchase by id : ", error)
    } finally {
      setLoading(false);
    }
  }

  const fetchSupplier = async () => {
    setLoading(true);
    try {
      const res = await apiCall({ method: "get", url: `/admin/contacts/customerAndSuppliers/getCustomersAndSuppliers?contactType=supplier` })

      if (res.status === 200) {
        setSuppliers(res?.data?.result);
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch suppilers : ", error)
    } finally {
      setLoading(false);
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
    fetchSupplier();
    fetchProducts();
    fetchPurchaseReturn();
  }, [])



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
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const deleteProduct = (id) => {
    const allProducts = formData.products;
    setFormData(prev => ({
      ...prev,
      products: allProducts.filter(pro => pro.product !== id)
    }))
  }



  const editPurchaseReturn = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/purchase/purchaseReturn/updatePurchaseReturn/${id}`,
        data: data
      })

      if (res.status === 200) {
        navigate('/purchase-return')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in edit purchase return : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('supplier', formData.supplier)
    form.append('referenceNo', formData.referenceNo)
    form.append('purchaseReturnDate', formData.purchaseReturnDate)
    form.append('purchaseReturnStatus', formData.purchaseReturnStatus)
    form.append('attachDocument', formData.attachDocument)
    form.append('products', JSON.stringify(formData.products))
    form.append('discountType', formData.discountType)
    form.append('discountAmount', formData.discountAmount)
    form.append('purchaseTax', formData.purchaseTax)
    form.append('additionalNotes', formData.additionalNotes)
    form.append('shippingDetails', formData.shippingDetails)
    form.append('additionalShippingcharges', formData.additionalShippingcharges)
    form.append('additionalExpenses', JSON.stringify(formData.additionalExpenses))

    editPurchaseReturn(form);
  }


  const textStyle = { color: 'black' };
  return (
    <div style={textStyle}>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header"><h1> Edit Purchase Return</h1></section>
          <section className="content">
            <form onSubmit={handleSubmit}>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className=" col-sm-3 ">
                      <div className="form-group">
                        <label htmlFor="supplier_id">Supplier:*</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <select
                            className="form-control"
                            required=""
                            id="supplier_id"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                          >
                            <option selected="selected" value=""> Please Select</option>
                            {
                              suppliers.map(supplier => (
                                <option key={supplier?._id} value={supplier?._id}>{supplier?.firstName} {supplier?.middleName} {supplier?.lastName}</option>
                              ))
                            }
                          </select>
                          <span className="input-group-btn">
                            <button type="button" className="btn btn-default bg-white btn-flat add_new_supplier" data-name="">
                              <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                            </button>
                          </span>
                        </div>
                      </div>
                      {/* <strong>Address:</strong>
                      <div id="supplier_address_div" /> */}
                    </div>

                    <div className=" col-sm-3 ">
                      <div className="form-group">
                        <label htmlFor="ref_no">Reference No:</label>
                        <FontAwesomeIcon icon={faInfoCircle} className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                          data-placement="auto bottom" data-content="Leave empty to autogenerate" data-html="true" data-trigger="hover"
                        />
                        <input
                          className="form-control"
                          name="referenceNo"
                          type="text"
                          id="ref_no"
                          value={formData.referenceNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className=" col-sm-3 ">
                      <div className="form-group">
                        <label htmlFor="transaction_date">Purchase Return Date:*</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-calendar" />
                          </span>
                          <input
                            className="form-control"
                            required
                            name="purchaseReturnDate"
                            type="date"
                            id="transaction_date"
                            value={formData?.purchaseReturnDate?.substring(0, 10) || 0}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-3 ">
                      <div className="form-group">
                        <label htmlFor="status">Purchase Return Status:*</label>
                        <FontAwesomeIcon icon={faInfoCircle} className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"
                          data-toggle="popover" data-placement="auto bottom"
                          data-content="Products in this purchase will be available for sale only if the <b>Order Status</b> is <b>Items Received</b>."
                          data-html="true" data-trigger="hover"
                        />
                        <select
                          className="form-control select2"
                          required=""
                          id="status"
                          name="purchaseReturnStatus"
                          value={formData.purchaseReturnStatus}
                          onChange={handleChange}
                        >
                          <option value="">Please Select</option>
                          <option value="Received">Received</option>
                          <option value="Pending">Pending</option>
                          <option value="Ordered">Ordered</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="document">Attach Document:</label>
                        <input
                          id="upload_document"
                          accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png"
                          name="document" type="file"
                          onChange={(e) => setFormData(prev => ({ ...prev, attachDocument: e.target.files[0] }))}
                        />
                        <p className="help-block">
                          Max File size: 5MB <br />
                          Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg,
                          .png
                        </p>
                      </div>
                    </div>

                  </div>
                  <div className="row"></div>
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
                                  <tr key={index} style={{ background: 'white' }}>
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


              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="discount_type">Discount Type:</label>
                                <select
                                  className="form-control select2"
                                  id="discount_type"
                                  name="discountType"
                                  value={formData.discountType}
                                  onChange={handleChange}
                                >
                                  <option value="">None</option>
                                  <option value="Fixed">Fixed</option>
                                  <option value="Percentage">Percentage</option>
                                </select>
                              </div>
                            </td>

                            <td className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="discount_amount">Discount Amount:</label>
                                <input
                                  className="form-control input_number"
                                  required=""
                                  name="discountAmount"
                                  type="text"
                                  defaultValue={0}
                                  id="discount_amount"
                                  value={formData.discountAmount}
                                  onChange={handleChange}
                                />
                              </div>
                            </td>

                            <td className="col-md-3">&nbsp;</td>
                            <td className="col-md-3">
                              <b>Discount:</b>(-)
                              <span id="discount_calculated_amount" className="display_currency"> {
                                formData?.discountType === "Fixed" ?
                                  formData?.discountAmount
                                  : formData?.discountType === "Percentage" ?
                                    formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0) * formData.discountAmount / 100
                                    : 0
                              }</span>
                            </td>

                          </tr>
                          <tr>
                            <td>
                              <div className="form-group">
                                <label htmlFor="tax_id">Purchase Tax:</label>
                                <select
                                  name="purchaseTax"
                                  id="tax_id"
                                  className="form-control select2"
                                  placeholder="Please Select"
                                  value={formData.purchaseTax}
                                  onChange={handleChange}
                                >
                                  <option value="">Select</option>
                                  <option value="None">None</option>
                                </select>
                                <input id="tax_amount" name="tax_amount" type="hidden" defaultValue={0} />
                              </div>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>

                            <td>
                              <b>Purchase Tax:</b>(+)
                              <span id="tax_calculated_amount" className="display_currency">0</span>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan={4}>
                              <div className="form-group">
                                <label htmlFor="additional_notes">
                                  Additional Notes
                                </label>
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  name="additionalNotes"
                                  cols={50}
                                  id="additional_notes"
                                  defaultValue={""}
                                  value={formData.additionalNotes}
                                  onChange={handleChange}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="shipping_details">Shipping Details:</label>
                        <input
                          className="form-control"
                          name="shippingDetails"
                          type="text"
                          id="shipping_details"
                          value={formData.shippingDetails}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                      <div className="form-group">
                        <label htmlFor="shipping_charges">(+) Additional Shipping charges:</label>
                        <input
                          className="form-control input_number"
                          required=""
                          name="additionalShippingcharges"
                          type="text"
                          defaultValue={0}
                          id="shipping_charges"
                          value={formData.additionalShippingcharges}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handleAdditionalExpensesShow}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add additional expenses
                        <FontAwesomeIcon icon={showAdditionalExpenses ? FaChevronUp : faChevronDown} />
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
                            {
                              formData.additionalExpenses.map((_, index) => (
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

                    <div className="col-md-8 col-md-offset-4" id="additional_expenses_div" style={{ display: "none" }}>
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
                              <input className="form-control" id="additional_expense_key_1" name="additional_expense_key_1" type="text" />
                            </td>
                            <td>
                              <input className="form-control input_number" id="additional_expense_value_1" name="additional_expense_value_1" type="text" defaultValue={0} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input className="form-control" id="additional_expense_key_2" name="additional_expense_key_2" type="text" />
                            </td>
                            <td>
                              <input className="form-control input_number" id="additional_expense_value_2" name="additional_expense_value_2" type="text" defaultValue={0} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input className="form-control" id="additional_expense_key_3" name="additional_expense_key_3" type="text" />
                            </td>
                            <td>
                              <input className="form-control input_number" id="additional_expense_value_3" name="additional_expense_value_3" type="text" defaultValue={0} />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input className="form-control" id="additional_expense_key_4" name="additional_expense_key_4" type="text" />
                            </td>
                            <td>
                              <input className="form-control input_number" id="additional_expense_value_4" name="additional_expense_value_4" type="text" defaultValue={0} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-right">
                      <input id="grand_total_hidden" name="final_total" type="hidden" defaultValue={0} />
                      <b>Purchase Total: </b>
                      <span id="grand_total" className="display_currency" data-currency_symbol="true">{
                        formData?.discountType === "Fixed" ?
                          (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0)
                            + (Number(formData.additionalShippingcharges) || 0)
                            + formData?.additionalExpenses.reduce((acc, expense) => acc + (Number(expense?.amount) || 0), 0)
                            - formData?.discountAmount).toFixed(2)
                          : formData?.discountType === "Percentage" ?
                            (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0)
                              + (Number(formData.additionalShippingcharges) || 0)
                              + formData?.additionalExpenses.reduce((acc, expense) => acc + (Number(expense?.amount) || 0), 0)
                              - (formData?.products.reduce((acc, pro) => acc + (Number(pro?.totalAmount) || 0), 0) * formData.discountAmount / 100)).toFixed(2)
                            : 0
                      }</span>
                    </div>
                  </div>

                </div>

                <div className="row" style={{ padding: "30px 0px" }}>
                  <div className="col-sm-12 text-center">
                    <button type="submit" id="submit_purchase_form" className="btn btn-big btn-primary btn-flat">Save</button>
                  </div>
                </div>


              </div>
            </form>
          </section>
          {/* <div className="scrolltop no-print">
        <div className="scroll icon">
        <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div> */}
          {/* <section className="invoice print_section" id="receipt_section"></section> */}
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

export default EditPurchaseReturn