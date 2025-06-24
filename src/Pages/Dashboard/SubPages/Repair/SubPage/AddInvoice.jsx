import React, { useState,useEffect } from 'react'
import Footer from '../../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faCashRegister, faExpand,faCalculator ,faArrowLeft,faInfoCircle,faClock,faEdit,faPause,faCheck, faCreditCard, faMobile, faMoneyCheckAlt, faMoneyBillAlt, 
    faWindowClose,faPlusCircle, faSearchPlus, faCalendar, faTimesCircle, faLock,faTimes, faMinusCircle} from '@fortawesome/free-solid-svg-icons';

const AddInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerData,setCustomerData] = useState();
  const [productData,setProductData] = useState();
  const [brands,setBrands] = useState();
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/getAllCustomerAndSupplier`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
          setCustomerData(result.result.filter(item => item.contactType === "customer"))
          
          // setData(result.result.roles)
      } else {
        throw new Error('Failed to fetch data');
      }  
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productList/getAllProduct`, {
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
      if (result) {
          setProductData(result.result)
          
      } else {
        throw new Error('Failed to fetch product');
      }  
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBrand = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getAllBrand`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
          setBrands(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }  
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(()=>{
    fetchCustomers();  
    fetchProducts();
    fetchBrand(); 
  },[])

    const textStyle = { color: 'black' };
  return (
<div style={textStyle}>
  <div className="wrapper thetop">
    <div className="col-md-12 no-print pos-header">
      <input type="hidden" id="pos_redirect_url"defaultValue="https://medipro.affinity-me.com/pos/create?sub_type=repair"/>
      <div className="row">
        <div className="col-md-6">
          <div className="m-6 mt-5" style={{ display: "flex" }}>
            <p>
              <strong>Location: &nbsp;</strong>
              MIDDLE PEARL TRADING COMPANY W.L.L &nbsp;{" "}
              <span className="curr_datetime">11/06/2024 10:23</span>
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <a href="https://medipro.affinity-me.com/repair/repair" title="Go Back"className="btn btn-info btn-flat m-6 btn-xs m-5 pull-right">
            <strong>
            <FontAwesomeIcon icon={faArrowLeft} />
            </strong>
          </a>
          <button type="button" id="close_register"title="Close Register" className="btn btn-danger btn-flat m-6 btn-xs m-5 btn-modal pull-right"
            data-container=".close_register_modal" data-href="/cash-register/close-register">
            <strong>
            <FontAwesomeIcon icon={faTimesCircle} />
            </strong>
          </button>
          <button type="button" id="register_details"title="Register Details"className="btn btn-success btn-flat m-6 btn-xs m-5 btn-modal pull-right"
            data-container=".register_details_modal"data-href="/cash-register/register-details">
            <strong>
            <FontAwesomeIcon icon={faInfoCircle} />
            </strong>
          </button>
          <button title="Calculator" id="btnCalculator" type="button"
            className="btn btn-success btn-flat pull-right m-5 btn-xs mt-10 popover-default"data-toggle="popover"data-trigger="click"
            data-content='<div id="calculator"></div>'data-html="true"data-placement="bottom">
            <strong>
            <FontAwesomeIcon icon={faCalculator} />
            </strong>
          </button>
          <button type="button" className="btn btn-danger btn-flat m-6 btn-xs m-5 pull-right popover-default" id="return_sale"
            title="Sell Return" data-toggle="popover"data-trigger="click"data-content='<div class="m-8">
            <input type="text" class="form-control" placeholder="Invoice No." id="send_for_sell_return_invoice_no"></div>
            <div class="w-100 text-center"><button type="button" class="btn btn-danger" id="send_for_sell_return">Send</button></div>'
            data-html="true"data-placement="bottom">
            <strong>
              <i className="fas fa-undo fa-lg" />
            </strong>
          </button>
          <button type="button" title="Press F11 to go Full Screen" className="btn btn-primary btn-flat m-6 hidden-xs btn-xs m-5 pull-right" id="full_screen" >
            <strong>
            <FontAwesomeIcon icon={faExpand} />
            </strong>
          </button>
          <button type="button"id="view_suspended_sales"title="View Suspended Sales"
            className="btn bg-yellow btn-flat m-6 btn-xs m-5 btn-modal pull-right"data-container=".view_modal"
            data-href="/sells?suspended=1&transaction_sub_type=repair">
            <strong>
            <FontAwesomeIcon icon={faEye} />
            </strong>
          </button>
          <a href="/pos/create" title="POS"className="btn btn-success btn-flat m-6 btn-xs m-5 pull-right">
            <strong>
            <FontAwesomeIcon icon={faCashRegister} /> &nbsp; POS
            </strong>
          </a>
          <button type="button" title="Add Expense" data-placement="bottom"className="btn bg-purple btn-flat m-6 btn-xs m-5 btn-modal pull-right"id="add_expense">
            <strong>
            <FontAwesomeIcon icon={faMinusCircle} /> Add Expense
            </strong>
          </button>
        </div>
      </div>
    </div>
    <div className="">
      <section className="content no-print">
        <input type="hidden" id="amount_rounding_method" defaultValue="" />
        <input type="hidden" id="is_overselling_allowed" />
        <form method="POST"action="https://medipro.affinity-me.com/pos"acceptCharset="UTF-8"id="add_pos_sell_form">
          <input name="_token" type="hidden"defaultValue="UP5U2B6MOtnumDKeS9rqPXmLXxWVensgVXHOkudW"/>
          <div className="row mb-12">
            <div className="col-md-12">
              <div className="row">
                <div className=" col-md-7  no-padding pr-12">
                  <div className="box box-solid mb-12  mb-40 ">
                    <div className="box-body pb-0">
                      <input name="sub_type"type="hidden"defaultValue="repair"/>
                      <input type="hidden"id="item_addition_method"defaultValue={1}/>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="input-group">
                              <select className="form-control mousetrap" id="customer_id"required=""name="contact_id">
                                <option selected="selected" value="">Enter Customer name / phone</option>
                                        {customerData?.length?(customerData.map((customer)=>(
                                        <option value={customer._id} key={customer._id}>
                                            {customer.firstName + " "+ customer.middleName + " " + customer.lastName}
                                        </option>
                                        ))):(
                                        <option value="">Please Select</option>
                                        )}
                              </select>
                              <span className="input-group-btn">
                                <button type="button"className="btn btn-default bg-white btn-flat add_new_customer"data-name="">
                                <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                </button>
                              </span>
                            </div>
                            <small className="text-danger hide contact_due_text">
                              <strong>Customer Due:</strong> <span />
                            </small>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-btn">
                                <button type="button" className="btn btn-default bg-white btn-flat"data-toggle="modal"data-target="#configure_search_modal"title="Configure product search">
                                <FontAwesomeIcon icon={faSearchPlus} />
                                </button>
                              </div>
                              <input className="form-control" id="search_product"
                                placeholder="Enter Product name / SKU / Scan bar code" autofocus="" name="search_product"type="text"/>
                              <span className="input-group-btn">
                                <button type="button" className="btn btn-default bg-white btn-flat pos_add_quick_product"
                                  data-href="https://medipro.affinity-me.com/products/quick_add"data-container=".quick_add_product_modal">
                                  <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <input type="hidden" name="pay_term_number"id="pay_term_number"defaultValue=""/>
                        <input type="hidden" name="pay_term_type"id="pay_term_type"defaultValue=""/>
                        <input id="price_group"name="price_group"type="hidden"defaultValue={0}/>
                      </div>
                      <input name="has_module_data" type="hidden" defaultValue={1}/>
                      <input type="hidden"id="repair_transaction_id" defaultValue=""/>
                      <input type="hidden" id="repair_job_sheet_id"name="repair_job_sheet_id"defaultValue=""/>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_due_date"> Delivery Date:</label>
                            <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print"
                              data-container="body" data-toggle="popover"data-placement="auto bottom"
                              data-content="The date the technician should return the item after repairing to the customer."
                              data-html="true" data-trigger="hover"/>
                            <div className="input-group">
                              <span className="input-group-addon">
                              <FontAwesomeIcon icon={faCalendar} />
                              </span>
                              <input className="form-control" readOnly="" name="repair_due_date"type="text"id="repair_due_date"/>
                              <span className="input-group-addon">
                              <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer clear_repair_due_date" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_completed_on"> Repair Completed On: </label>
                            <div className="input-group">
                              <span className="input-group-addon">
                              <FontAwesomeIcon icon={faCalendar} />
                              </span>
                              <input className="form-control" readOnly="" name="repair_completed_on"type="text"id="repair_completed_on"/>
                              <span className="input-group-addon">
                              <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer clear_repair_due_date" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_status_id">Status:</label>
                            <select name="repair_status_id" className="form-control" id="repair_status_id" required="">
                            <option selected="selected" value="">
                                Please Select
                              </option>
                              <option value="Pending">
                                Pending
                              </option>
                              <option value="Completed">
                                Completed
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_brand_id">Brand:</label>
                            <select className="form-control select2" id="repair_brand_id"name="repair_brand_id">
                              <option selected="selected" value="">
                                Please Select
                              </option>
                                        {brands?.length?(brands.map((brand)=>(
                                        <option value={brand._id} key={brand._id}>
                                            {brand.name}
                                        </option>
                                        ))):(
                                        <option value="">Please Select</option>
                                        )}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_device_id">Device:</label>
                            <select className="form-control select2" id="repair_device_id"name="repair_device_id">
                              <option selected="selected" value="">Please Select</option>
                              {productData?.length?(productData.map((product)=>(
                                        <option value={product._id} key={product._id}>
                                            {product.device}
                                        </option>
                                        ))):(
                                        <option value="">Please Select</option>
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_model_id">Device Model:</label>
                            <select className="form-control select2"id="repair_model_id"name="repair_model_id">
                              <option selected="selected" value="">Please Select</option>
                              {productData?.length?(productData.map((product)=>(
                                        <option value={product._id} key={product._id}>
                                            {product.deviceModel}
                                        </option>
                                        ))):(
                                        <option value="">Please Select</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="repair_serial_no">Serial Number:</label>
                            <input className="form-control"placeholder="Serial Number"name="repair_serial_no"type="text"id="repair_serial_no"/>
                          </div>
                        </div>
                        <div className="col-sm-6 mt-15">
                          <div className="btn-group mt-5" role="group">
                            <button type="button" className="btn btn-primary btn-flat"data-toggle="modal"data-target="#checklist_modal">
                              <i className="fa fa-plus" /> Pre Repair Checklist
                            </button>
                            <button type="button" className="btn btn-primary btn-flat"data-toggle="modal"data-target="#security_modal">
                             <FontAwesomeIcon icon={faLock} /> Security
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="repair_defects"> Problem Reported By The Customer:</label>
                            <br />
                            <textarea className="tags-look"rows={3}name="repair_defects"cols={50}id="repair_defects"defaultValue={""}/>
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-12 pos_product_div">
                          <input type="hidden"name="sell_price_tax"id="sell_price_tax"defaultValue="includes"/>                          
                          <input type="hidden"id="product_row_count"defaultValue={0}/>
                          <table className="table table-condensed table-bordered table-striped table-responsive"id="pos_table">
                            <thead>
                              <tr>
                                <th className="tex-center  col-md-4 ">
                                  Product
                                  <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print"
                                    aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                                    data-content="Click <i>product name</i> to edit price, discount & tax. <br/>Click <i>Comment Icon</i> to enter serial number / IMEI or additional note.<br/><br/>Click <i>Modifier Icon</i>(if enabled) for modifiers"
                                    data-html="true"data-trigger="hover"
                                  />
                                </th>
                                <th className="text-center col-md-3"> Quantity</th>
                                <th className="text-center col-md-2 ">Price inc. tax</th>
                                <th className="text-center col-md-2">Subtotal</th>
                                <th className="text-center">
                                <FontAwesomeIcon icon={faTimes} />
                                </th>
                              </tr>
                            </thead>
                            <tbody />
                          </table>
                        </div>
                      </div>
                      </div>
                      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                      <div className="row pos_form_totals">
                        <div className="col-md-12">
                          <table className="table table-condensed">
                            <tbody>
                              <tr>
                                <td>
                                  <b>ITEM:</b>&nbsp;
                                  <span className="total_quantity">0</span>
                                </td>
                                <td>
                                  <b>Total:</b> &nbsp;
                                  <span className="price_total">0</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>
                                    Discount
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print"
                                      aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                                      data-content="Set 'Default Sale Discount' for all sales in Business Settings. Click on the edit icon below to add/update discount."
                                      data-html="true"data-trigger="hover"
                                    />
                                    (-):
                                    <FontAwesomeIcon icon={faEdit} />
                                    <span id="total_discount">0.00</span>
                                    <input type="hidden" name="discount_type" id="discount_type"defaultValue="percentage"data-default="percentage"/>
                                  </b>
                                </td>
                                <td className="">
                                  <span>
                                    <b>
                                      Order Tax
                                      <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print"
                                        aria-hidden="true" data-container="body" data-toggle="popover"data-placement="auto bottom"
                                        data-content="Set 'Default Sale Tax' for all sales in Business Settings. Click on the edit icon below to add/update Order Tax."
                                        data-html="true"data-trigger="hover"
                                      />
                                      (+):
                                    </b>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <span id="order_tax">0.00</span>
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    <b>
                                      Shipping
                                      <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print"data-container="body"
                                        data-toggle="popover"data-placement="auto bottom"
                                        data-content="Set shipping details and shipping charges. Click on the edit icon below to add/update shipping details and charges."
                                        data-html="true"data-trigger="hover"
                                      /> (+):
                                    </b>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <span id="shipping_charges_amount">0.00</span>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="pos-form-actions">
              <div className="col-md-12">
                <button type="button" className=" btn bg-info text-white btn-default btn-flat "id="pos-draft">
                   <FontAwesomeIcon icon={faEdit} /> Draft
                </button>
                <button type="button" className="btn btn-default bg-yellow btn-flat "id="pos-quotation">
                <FontAwesomeIcon icon={faEdit} /> Quotation
                </button>
                <button type="button" className=" btn bg-red btn-default btn-flat no-print pos-express-finalize"data-pay_method="suspend"title="Suspend Sales (pause)">
                <FontAwesomeIcon icon={faPause} />
                  Suspend
                </button>
                <input type="hidden" name="is_credit_sale" defaultValue={0}id="is_credit_sale"/>
                <button type="button" className="btn bg-purple btn-default btn-flat no-print pos-express-finalize "
                  data-pay_method="credit_sale"title="Checkout as credit sale">
                 <FontAwesomeIcon icon={faCheck} /> Credit Sale
                </button>
                <button type="button"className="btn bg-maroon btn-default btn-flat no-print  pos-express-finalize  "
                  data-pay_method="card"title="Express checkout using card">
                  <FontAwesomeIcon icon={faCreditCard} /> Card
                </button>
                <button type="button"className="btn bg-maroon btn-default btn-flat no-print  pos-express-finalize  "
                  data-pay_method="custom_pay_1"title="Benefit Pay">
                  <FontAwesomeIcon icon={faMobile} /> Benefit Pay
                </button>
                <button type="button" className="btn bg-navy btn-default   btn-flat no-print  " id="pos-finalize"title="Checkout using multiple payment methods">
                <FontAwesomeIcon icon={faMoneyCheckAlt} />
                  Multiple Pay
                </button>
                <button type="button" className="btn btn-success   btn-flat no-print  pos-express-finalize "
                  data-pay_method="cash"title="Mark complete paid & checkout">
                  <FontAwesomeIcon icon={faMoneyBillAlt} />
                  Cash
                </button>
                <button type="button" className="btn btn-danger btn-flat  btn-xs "id="pos-cancel">
                <FontAwesomeIcon icon={faWindowClose} /> Cancel
                </button>
                  
                <button type="button" className="pull-right btn btn-primary btn-flat "data-toggle="modal"data-target="#recent_transactions_modal"
                  id="recent-transactions">
                  <FontAwesomeIcon icon={faClock} /> Recent Transactions
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
 <Footer/>
  </div>
</div>
  )
}

export default AddInvoice