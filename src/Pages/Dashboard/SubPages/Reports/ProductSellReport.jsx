import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFilter, faList, faMapMarker, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'

const ProductSellReport = () => {
    const [activeTab, setActiveTab] = useState('#psr_detailed_tab');

    const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
    const [endDate, setEndDate] = useState(new Date());
    const handleDateChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    
    const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header no-print">
          <h1>Product Sell Report</h1>
        </section>
        <section className="content no-print">
          <div className="row">
            <div className="col-md-12">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border"style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                      <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                  <div className="box-body">
                    <form method="GET"action="/reports/stock-report"acceptCharset="UTF-8"id="product_sell_report_form">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="search_product">Search Product:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input className="form-control"id="search_product"placeholder="Enter Product name / SKU / Scan bar code"autofocus=""name="search_product"type="text"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="customer_id">Customer:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faUser} />
                            </span>
                            <select className="form-control select2"required=""id="customer_id"name="customer_id">
                              <option selected="selected" value="">Please Select</option>
                              <option value="" selected="selected">None</option>
                              <option value={3}>- Walk-In Customer (CO0001)</option>
                              <option value={4}> - test (CO0002)</option>
                              <option value={24}> - zamini (CO0004)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="psr_customer_group_id">Customer Group Name:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="psr_customer_group_id"name="psr_customer_group_id">
                            <option value="" selected="selected">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                            <FontAwesomeIcon icon={faMapMarker} />
                            </span>
                            <select className="form-control select2"required=""id="location_id"name="location_id">
                              <option selected="selected" value="">Please Select</option>
                              <option value={4}>POS APPLICATION</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="category_id">Category:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="psr_filter_category_id"name="category_id">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="brand_id">Brand:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="psr_filter_brand_id"name="brand_id">
                            <option selected="selected" value="">All</option>
                            <option value={61}>Sanibel</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_sr_date_filter">Date Range:</label>
                          <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                           selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className={activeTab === '#psr_detailed_tab' ? 'active' : ''}>
                    <Link to="#psr_detailed_tab" onClick={() => setActiveTab('#psr_detailed_tab')}>
                    <FontAwesomeIcon icon={faList} aria-hidden="true" /> <b>Detailed</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="#psr_detailed_with_purchase_tab"onClick={() => setActiveTab('#psr_detailed_with_purchase_tab')}>
                    <FontAwesomeIcon icon={faList} aria-hidden="true" /> <b>Detailed(With purchase)</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="#psr_grouped_tab"onClick={() => setActiveTab('#psr_grouped_tab')}>
                      <FontAwesomeIcon icon={faBars} aria-hidden="true" /> <b>Grouped (By Date)</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="#psr_by_cat_tab"onClick={() => setActiveTab('#psr_by_cat_tab')}>
                      <FontAwesomeIcon icon={faBars} aria-hidden="true" /> <b>By Category</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="#psr_by_brand_tab" onClick={() => setActiveTab('#psr_by_brand_tab')}>
                      <FontAwesomeIcon icon={faBars} aria-hidden="true" /> <b>By Brand</b>
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className={`tab-pane ${activeTab === '#psr_detailed_tab' ? 'active' : ''}`} id="psr_detailed_tab">
                      <table className="table table-bordered table-striped"id="product_sell_report_table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th id="psr_product_custom_field1" />
                            <th id="psr_product_custom_field2" />
                            <th>Customer name</th>
                            <th>Contact ID</th>
                            <th>Invoice No.</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Tax</th>
                            <th>Price inc. tax</th>
                            <th>Total</th>
                            <th>Payment Method</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td colSpan={8}>
                              <strong>Total:</strong>
                            </td>
                            <td id="footer_total_sold" />
                            <td />
                            <td />
                            <td id="footer_tax" />
                            <td />
                            <td>
                              <span className="display_currency"id="footer_subtotal"data-currency_symbol="true"/>
                            </td>
                            <td />
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                  <div className={`tab-pane ${activeTab === '#psr_detailed_with_purchase_tab' ? 'active' : ''}`} id="psr_detailed_with_purchase_tab">
                      <table className="table table-bordered table-striped" id="product_sell_report_with_purchase_table"style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Customer name</th>
                            <th>Invoice No.</th>
                            <th>Date</th>
                            <th>Purchase ref no.</th>
                            <th>Lot Number</th>
                            <th>Supplier Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                      </table>
                  </div>
                  <div className={`tab-pane ${activeTab === '#psr_grouped_tab' ? 'active' : ''}`} id="psr_grouped_tab">
                      <table className="table table-bordered table-striped" id="product_sell_grouped_report_table" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Date</th>
                            <th>Current stock</th>
                            <th>Total unit sold</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td colSpan={4}>
                              <strong>Total:</strong>
                            </td>
                            <td id="footer_total_grouped_sold" />
                            <td>
                              <span className="display_currency"id="footer_grouped_subtotal"data-currency_symbol="true"/>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                  <div className={`tab-pane ${activeTab === '#psr_by_cat_tab' ? 'active' : ''}`} id="psr_by_cat_tab">
                      <table className="table table-bordered table-striped" id="product_sell_report_by_category" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Current stock</th>
                            <th>Total unit sold</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td>
                              <strong>Total:</strong>
                            </td>
                            <td id="footer_psr_by_cat_total_stock" />
                            <td id="footer_psr_by_cat_total_sold" />
                            <td>
                              <span className="display_currency"id="footer_psr_by_cat_total_sell"data-currency_symbol="true"/>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                  <div className={`tab-pane ${activeTab === '#psr_by_brand_tab' ? 'active' : ''}`} id="psr_by_brand_tab">
                      <table className="table table-bordered table-striped" id="product_sell_report_by_brand"style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Brand</th>
                            <th>Current stock</th>
                            <th>Total unit sold</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr className="bg-gray font-17 footer-total text-center">
                            <td>
                              <strong>Total:</strong>
                            </td>
                            <td id="footer_psr_by_brand_total_stock" />
                            <td id="footer_psr_by_brand_total_sold" />
                            <td>
                              <span className="display_currency"id="footer_psr_by_brand_total_sell"data-currency_symbol="true"/>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
     <Footer/>
    </div>
  </div>
  )
}

export default ProductSellReport