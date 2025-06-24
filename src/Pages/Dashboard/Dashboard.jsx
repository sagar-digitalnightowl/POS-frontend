import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer'

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleDateFilter = (filter) => {
    navigate(`/dashboard?filter=${filter}`);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textStyle = { color: 'black' };
  return (
    <div>
  <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header content-header-custom">
        <h1>Welcome POS APPLICATION,</h1>
      </section>
      <section className="content content-custom no-print">
        <br />
        <div className="row">
          <div className="col-md-4 col-xs-12"></div>
          <div className="col-md-8 col-xs-12">
            <div className="form-group pull-right">
              <div className="input-group">
                <button className="btn btn-primary dropdown-toggle"type="button"id="dashboard_date_filter"
                  aria-haspopup="true"aria-expanded={isDropdownOpen}onClick={toggleDropdown}>
                  <span>
                    <i className="fa fa-calendar" /> Filter by date
                  </span>
                  <i className="fa fa-caret-down" />
                  </button>
                    <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}aria-labelledby="dashboard_date_filter"ref={dropdownRef}>
                      <button className="dropdown-item" onClick={() => handleDateFilter('today')}>Today</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('yesterday')}>Yesterday</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('last_7_days')}>Last 7 Days</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('last_30_days')}>Last 30 Days</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('this_month')}>This Month</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('last_month')}>Last Month</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('this_year')}>This Year</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('last_year')}>Last Year</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('current_financial_year')}>Current Financial Year</button>
                      <button className="dropdown-item" onClick={() => handleDateFilter('last_financial_year')}>Last Financial Year</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-aqua">
                <i className="ion ion-ios-cart-outline" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total Sales</span>
                <span className="info-box-number total_sell">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-green">
                <i className="ion ion-ios-paper-outline" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">
                  Net
                  <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                    data-placement="auto bottom" data-content="NET = TOTAL SALES - INVOICE DUE - EXPENSE" data-html="true"data-trigger="hover"
                  />
                </span>
                <span className="info-box-number net">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-yellow">
                <i className="ion ion-ios-paper-outline" />
                <i className="fa fa-exclamation" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Invoice due</span>
                <span className="info-box-number invoice_due">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-red text-white">
                <i className="fas fa-exchange-alt" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total Sell Return</span>
                <span className="info-box-number total_sell_return">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
              <p className="mb-0 text-muted fs-10 mt-5">
                Total Sell Return: <span className="total_sr" />
                <br />
                Total Sell Return Paid
                <span className="total_srp" />
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-aqua">
                <i className="ion ion-cash" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total purchase</span>
                <span className="info-box-number total_purchase">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-yellow">
                <i className="fa fa-dollar" />
                <i className="fa fa-exclamation" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Purchase due</span>
                <span className="info-box-number purchase_due">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-red text-white">
                <i className="fas fa-undo-alt" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total Purchase Return</span>
                <span className="info-box-number total_purchase_return">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
              <p className="mb-0 text-muted fs-10 mt-5">
                Total Purchase Return: <span className="total_pr" />
                <br />
                Total Purchase Return Paid
                <span className="total_prp" />
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12 col-custom">
            <div className="info-box info-box-new-style">
              <span className="info-box-icon bg-red">
                <i className="fas fa-minus-circle" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Expense</span>
                <span className="info-box-number total_expense">
                  <i className="fas fa-sync fa-spin fa-fw margin-bottom" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Sales Last 30 Days</h3>
              </div>
              <div className="box-body">
                <div id="rymshxcabekojnlwfpgtuziqv" style={{ height: "400px !important" }}></div>
                <div id="rymshxcabekojnlwfpgtuziqv_loader" style={{ display: "flex", justifyContent: "center",opacity: 1,alignItems: "center",height: 400}}>
                  <svg width={50} height={50} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient  x1="8.042%" y1="0%" x2="65.682%"y2="23.865%" id="a">
                        <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                        <stop stopColor="#22292F" stopOpacity=".631" offset="63.146%"/>
                        <stop stopColor="#22292F" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2}>
                          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>
                        </path>
                        <circle fill="#22292F" cx={36} cy={18} r={1}>
                          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Sales Current Financial Year</h3>
              </div>
              <div className="box-body">
                <div id="pmvkhabydnszicouwlgrqxtfj" style={{ height: "400px !important" }}></div>
                <div id="pmvkhabydnszicouwlgrqxtfj_loader" style={{display: "flex",justifyContent: "center",opacity: 1,alignItems: "center",height: 400}}>
                  <svg width={50} height={50} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient x1="8.042%" y1="0%"
                        x2="65.682%" y2="23.865%"
                        id="a">
                        <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                        <stop stopColor="#22292F" stopOpacity=".631" offset="63.146%" />
                        <stop stopColor="#22292F" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2}>
                          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>
                        </path>
                        <circle fill="#22292F" cx={36} cy={18} r={1}>
                          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="box box-warning">
              <div className="box-header">
                <i className="fa fa-exclamation-triangle text-yellow"aria-hidden="true"/>
                <h3 className="box-title">
                  Sales Payment Due{" "}
                  <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                    data-placement="auto bottom"
                    data-content="Pending payment for Sales. <br/><small class='text-muted'>Based on invoice pay term. <br/> Showing payments to be received in 7 days or less.</small>"
                    data-html="true" data-trigger="hover"
                  />
                </h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-bordered table-striped" id="sales_payment_dues_table"style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Invoice No.</th>
                          <th>Due Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="box box-warning">
              <div className="box-header">
                <i className="fa fa-exclamation-triangle text-yellow" aria-hidden="true" />
                <h3 className="box-title">
                  Purchase Payment Due{" "}
                  <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"data-toggle="popover"
                    data-placement="auto bottom"
                    data-content="Pending payment for purchases. <br/><small class='text-muted'>Based on supplier's pay term. <br/> Showing payments to be paid in 7 days or less.</small>"
                    data-html="true" data-trigger="hover"
                  />
                </h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-bordered table-striped" id="purchase_payment_dues_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Reference No</th>
                          <th>Due Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-sm-12 ">
            <div className="box box-warning">
              <div className="box-header">
                <i className="fa fa-exclamation-triangle text-yellow" aria-hidden="true"/>
                <h3 className="box-title">
                  Product Stock Alert{" "}
                  <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                    data-placement="auto bottom" data-content="Products with low stock.<br/><small class='text-muted'>Based on product alert quantity set in add product screen.<br> Purchase this products before stock ends.</small>"
                    data-html="true"data-trigger="hover"
                  />
                </h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-bordered table-striped" id="stock_alert_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Location</th>
                          <th>Current stock</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-warning">
              <div className="box-header">
                <i className="fas fa-list-alt text-yellow fa-lg" aria-hidden="true"/>
                <h3 className="box-title">Sales Order</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped ajax_view" id="sales_order_table" >
                        <thead>
                          <tr>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Order No.</th>
                            <th>Customer name</th>
                            <th>Contact Number</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Shipping Status</th>
                            <th>Quantity Remaining</th>
                            <th>Added By</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box box-warning">
          <div className="box-header">
            <i className="fas fa-list-alt text-yellow fa-lg"aria-hidden="true"/>
            <h3 className="box-title">Pending Shipments</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped ajax_view" id="shipments_table">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Date</th>
                        <th>Invoice No.</th>
                        <th>Customer name</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        <th>Shipping Status</th>
                        <th>Payment Status</th>
                        <th>Service staff</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade payment_modal" tabIndex={-1} role="dialog"aria-labelledby="gridSystemModalLabel"></div>
      <div className="modal fade edit_pso_status_modal" tabIndex={-1} role="dialog"/>
      <div className="modal fade edit_payment_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
      <div className="scrolltop no-print">
        <div className="scroll icon">
          <i className="fas fa-angle-up" />
        </div>
      </div>
      <section className="invoice print_section" id="receipt_section"></section>
    </div>
    <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Today's profit
            </h4>
          </div>
          <div className="modal-body">
            <input type="hidden" id="modal_today" defaultValue="2024-05-31" />
            <div className="row">
              <div id="todays_profit"></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  <div className="modal fade view_modal"tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"/>
</div>
  )
}
export default Dashboard