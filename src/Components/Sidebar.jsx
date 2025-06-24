import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faHome, faUsers, faAddressBook, faBox, faTools, faShoppingCart, faMoneyBillWave, faExchangeAlt, faChartBar, faBell, faCog,
  faFileAlt, faHandshake, faBriefcase, faPuzzlePiece, faUserLock, faUserTie, faTruck, faUsersCog, faUserFriends, faUsersSlash, faUserPlus,
  faUserCheck, faWarehouse, faList, faPlusSquare, faEdit, faPrint, faUpload, faDownload, faMoneyCheck, faRulerCombined, faBoxes, faLayerGroup, faSitemap,
  faTags, faIndustry, faProjectDiagram, faAngleRight, faPlusCircle, faUndo, faPenSquare, faPercent, faFileImport, faFileInvoiceDollar, faArrowCircleDown,
  faArrowCircleUp, faUser,
  faUserSecret,
  faSearchMinus,
  faSearchDollar,
  faChartLine,
  faSlidersH,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBarcode, FaBolt, FaCogs, FaFile, FaMapMarkerAlt, FaShareAlt, FaSync } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate()
  const [openList, setOpenList] = useState(false);
  const [openList1, setOpenList1] = useState(false);
  const [openList2, setOpenList2] = useState(false);
  const [openList3, setOpenList3] = useState(false);
  const [openList4, setOpenList4] = useState(false);
  const [openList5, setOpenList5] = useState(false);
  const [openList6, setOpenList6] = useState(false);
  const [openList7, setOpenList7] = useState(false);
  const [openList8, setOpenList8] = useState(false);
  const [openList9, setOpenList9] = useState(false);
  const [openList10, setOpenList10] = useState(false);




  return (
    <div>
      <aside className="main-sidebar">
        <section className="sidebar">
          <Link to="/home" className="logo">
            <span className="logo-lg">
              POS APPLICATION TRADING COMPANY W.L.L
            </span>
          </Link>
          <ul className="sidebar-menu tree" data-widget="tree">
            <li className="active" id="tour_step1">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faHome} /> <span onClick={() => navigate("/dashboard")}>Home</span>
              </Link>
            </li>
            <li className={`treeview ${openList ? 'menu-open' : ''}`} id="tour_step2">
              <Link to="#" onClick={() => setOpenList(!openList)}>
                <FontAwesomeIcon icon={faUsers} />
                <span onClick={() => setOpenList(!openList)}>
                  User Management
                </span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList ? 'rotate' : ''}`} />
                </span>
              </Link>
              {openList && (
                <ul className="">
                  <li>
                    <Link to="/users">
                      <FontAwesomeIcon icon={faUsers} />
                      <span onClick={() => navigate("/users")}>Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/roles">
                      <FontAwesomeIcon icon={faUserLock} />
                      <span onClick={() => navigate("/roles")}>Roles</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sales-commission-agents ">
                      <FontAwesomeIcon icon={faUserTie} />
                      <span onClick={() => navigate("/sales-commission-agents")}>Sales Commission Agents</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList1 ? 'menu-open' : ''}`} id="tour_step3">
              <Link to="#" onClick={() => setOpenList1(!openList1)}>
                <FontAwesomeIcon icon={faAddressBook} /> <span onClick={() => setOpenList1(!openList1)}>Contacts</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList1 ? 'rotate' : ''}`} />
                </span>
              </Link>
              {openList1 && (
                <ul className="">
                  <li>
                    <Link to="/suppliers">
                      <FontAwesomeIcon icon={faTruck} />
                      <span onClick={() => navigate("/suppliers")}>Suppliers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/customers">
                      <FontAwesomeIcon icon={faUsersCog} />
                      <span onClick={() => navigate("/customers")}>Customers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/customersgroup">
                      <FontAwesomeIcon icon={faUserFriends} />
                      <span onClick={() => navigate("/customersgroup")}>Customer Groups</span>
                    </Link>
                  </li>
                  {/* <li>
                  <Link to="/importcontacts">
                  <FontAwesomeIcon icon={faUsersSlash} />
                    <span onClick={()=>navigate("/importcontacts")}>Import Contacts</span>
                  </Link>
                </li> */}
                  {/* <li>
                  <Link to="/addmanufacturers ">
                  <FontAwesomeIcon icon={faUserPlus} />
                    <span onClick={()=>navigate("/addmanufacturers")}>Add Manufacturer</span>
                  </Link>
                </li> */}
                  <li>
                    <a href="manufacturers">
                      <i className="fa fas fa-plus-circle" />
                      <span onClick={() => navigate("/manufacturers")}>Manufacturers</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList2 ? 'menu-open' : ''}`} id="tour_step3">
              <Link to="#" onClick={() => setOpenList2(!openList2)}>
                <FontAwesomeIcon icon={faBox} /> <span onClick={() => setOpenList2(!openList2)}>Products</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList2 ? 'rotate' : ''}`} />
                </span>
              </Link>
              {openList2 && (
                <ul className="">
                  <li>
                    <Link to="/listproduct">
                      <FontAwesomeIcon icon={faList} /> <span onClick={() => navigate("/listproduct")}>List Products</span>
                    </Link>
                  </li>
                  {/* <li>
                  <Link to="addproduct ">
                  <FontAwesomeIcon icon={faPlusSquare} /> <span  onClick={()=>navigate("/addproduct")}>Add Product</span>
                  </Link>
                </li> */}
                  <li>
                    <Link to="/updateprice">
                      <FontAwesomeIcon icon={faEdit} /> <span onClick={() => navigate("/updateprice")}>Update Price</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/printlebel ">
                      <FontAwesomeIcon icon={faPrint} /> <span onClick={() => navigate("/printlebel")}>Print Labels</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/variations">
                      <FontAwesomeIcon icon={faProjectDiagram} /> <span onClick={() => navigate("/variations")}>Variations</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/importproducts">
                      <FontAwesomeIcon icon={faUpload} />
                      <span onClick={() => navigate("/importproducts")}>Import Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/importopeningstocks">
                      <FontAwesomeIcon icon={faDownload} />
                      <span>Import Opening Stock</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/selling-price-group">
                      <FontAwesomeIcon icon={faMoneyCheck} />
                      <span onClick={() => navigate("/selling-price-group")}>Selling Price Group</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/units">
                      <FontAwesomeIcon icon={faRulerCombined} /> <span onClick={() => navigate("/units")}>Units</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories">
                      <FontAwesomeIcon icon={faBoxes} /><span onClick={() => navigate("/categories")}>Categories</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/brand">
                      <FontAwesomeIcon icon={faLayerGroup} /> <span onClick={() => navigate("/brand")}>Brands</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/product-mapping">
                      <FontAwesomeIcon icon={faSitemap} />
                      <span onClick={() => navigate("/product-mapping")}>Products Mapping</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/warranties">
                      <i className="fa fas fa-shield-alt" />
                      <span>Warranties</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="active" id="tour_step5">
              <Link to="/repairs" style={{ backgroundColor: "" }}>
                <FontAwesomeIcon icon={faTools} /> <span onClick={() => navigate("/repairs")}>Repair</span>
              </Link>
            </li>
            <li className={`treeview ${openList3 ? 'menu-open' : ''}`} id="tour_step6">
              <Link to="#" onClick={() => setOpenList3(!openList3)}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span onClick={() => setOpenList3(!openList3)}> Purchase</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList3 ? 'rotate' : ''}`} />
                </span>
              </Link>
              {openList3 && (
                <ul className="">
                  <li>
                    <Link to="/purchases">
                      <FontAwesomeIcon icon={faList} />
                      <span onClick={() => navigate("/purchases")}>List Purchases</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-purchase">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span onClick={() => navigate("/add-purchases")}>Add Purchase</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/purchase-return">
                      <FontAwesomeIcon icon={faUndo} />
                      <span onClick={() => navigate("/purchase-return")}>List Purchase Return</span>
                    </Link>
                  </li>
                  <li>
                    <a href="/import-purchase">
                      <FontAwesomeIcon icon={faUndo} />
                      <span onClick={() => navigate("/import-purchase")}>Import Purchase</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList4 ? 'menu-open' : ''}`} id="tour_step7">
              <Link to="#" onClick={() => setOpenList4(!openList4)}>
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <span onClick={() => setOpenList4(!openList4)}>Sell</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList4 ? 'rotate' : ''}`} />
                </span>
              </Link>
              {openList4 && (
                <ul className="">
                  <li>
                    <Link to="/sell">
                      <FontAwesomeIcon icon={faList} /> <span>All sales</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sell/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Sale</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pos">
                      <FontAwesomeIcon icon={faList} /> <span>List POS</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pos/create">
                      <FontAwesomeIcon icon={faPlusCircle} /> <span>POS</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add/drafts">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Draft</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sells/drafts">
                      <FontAwesomeIcon icon={faPenSquare} />
                      <span>List Drafts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/create/quotation">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Quotation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/list/quotations">
                      <FontAwesomeIcon icon={faPenSquare} />
                      <span>List quotations</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/list/sell/return">
                      <FontAwesomeIcon icon={faPenSquare} />
                      <span>List Sell Return</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/delivery-note">
                      <FontAwesomeIcon icon={faList} /> <span>Delivery Note</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipments">
                      <FontAwesomeIcon icon={faTruck} /> <span>Shipments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/discount">
                      <FontAwesomeIcon icon={faPercent} /> <span>Discounts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/import-sales">
                      <FontAwesomeIcon icon={faFileImport} /><span>Import Sales</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList5 ? 'menu-open' : ''}`} id="tour_step8">
              <Link to="#">
                <FontAwesomeIcon icon={faExchangeAlt} />
                <span onClick={() => setOpenList5(!openList5)}>Stock Transfers</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList5 ? 'rotate' : ''}`} onClick={() => setOpenList5(!openList5)} />
                </span>
              </Link>
              {openList5 && (
                <ul className="">
                  <li>
                    <Link to="/stock-transfers">
                      <FontAwesomeIcon icon={faList} />
                      <span>List Stock Transfers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/stock-transfers/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Stock Transfer</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList6 ? 'menu-open' : ''}`} id="tour_step9">
              <Link to="#">
                <FontAwesomeIcon icon={faChartBar} />
                <span onClick={() => setOpenList6(!openList6)}>Stock Adjustment</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList6 ? 'rotate' : ''}`} onClick={() => setOpenList6(!openList6)} />
                </span>
              </Link>
              {openList6 && (
                <ul className=" ">
                  <li>
                    <Link to="/stock-adjustments">
                      <FontAwesomeIcon icon={faList} />
                      <span>List Stock Adjustments</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/stock-adjustments/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Stock Adjustment</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList7 ? 'menu-open' : ''}`} id="tour_step10">
              <Link to="#">
                <FontAwesomeIcon icon={faBell} />
                <span onClick={() => setOpenList7(!openList7)}>NHRA</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList7 ? 'rotate' : ''}`} onClick={() => setOpenList7(!openList7)} />
                </span>
              </Link>
              {openList7 && (
                <ul className=" ">
                  <li>
                    <Link to="/Importation/show">
                      <FontAwesomeIcon icon={faList} />
                      <span>Importation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ar">
                      <FontAwesomeIcon icon={faList} />
                      <span>All AR</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-adverse-event">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Adverse Event</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/AdverseEvents/">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Adverse Event</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/FieldSafteyNotice/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Field Saftey Notice</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/FieldSafteyNotice">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Field Saftey Notice</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/complain-handling/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Complaint</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/complain-handling">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Complaints</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/facility">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Health Facilities</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dispose/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Dispose</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dispose/index">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Disposes</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/alert-modification/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Alerts &amp; Modifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/alert-modification">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Alerts &amp; Modifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/recalls/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Recall</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/recalls/all">
                      <FontAwesomeIcon icon={faList} />
                      <span>All Recalls</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ServiceMaintenance">
                      <FontAwesomeIcon icon={faList} />
                      <span>Service &amp; Maintenance</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList8 ? 'menu-open' : ''}`} id="tour_step11">
              <Link to="#">
                <FontAwesomeIcon icon={faFileAlt} /> <span onClick={() => setOpenList8(!openList8)}>Expenses</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList8 ? 'rotate' : ''}`} onClick={() => setOpenList8(!openList8)} />
                </span>
              </Link>
              {openList8 && (
                <ul className="">
                  <li>
                    <Link to="/expenses">
                      <FontAwesomeIcon icon={faList} /> <span>List Expenses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/expenses/create">
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <span>Add Expense</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/expense-categories">
                      <FontAwesomeIcon icon={faList} />
                      <span>Expense Categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={`treeview ${openList9 ? 'menu-open' : ''}`} id="tour_step12">
              <Link to="#">
                <FontAwesomeIcon icon={faChartBar} /> <span onClick={() => setOpenList9(!openList9)}>Reports</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList9 ? 'rotate' : ''}`} onClick={() => setOpenList9(!openList9)} />
                </span>
              </Link>
              {openList9 && (
                <ul className=" ">
                  <li>
                    <Link to="/reports/profit-loss">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} />
                      <span>Profit / Loss Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/purchase-report">
                      <FontAwesomeIcon icon={faArrowCircleDown} />
                      <span>Report (Purchase)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sale-report">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Report (Sale)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/items-sales-stock">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Report (Item Sales Stock)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/regular-sale-sheet_report">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Regular Sales Sheet Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/individuals-sales-sheet">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Individual Sales Sheet</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/item-sale-report">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Report (Item Sale Report)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/purchase-sell">
                      <FontAwesomeIcon icon={faExchangeAlt} />
                      <span>Purchase &amp; Sale</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/tax-report">
                      <FontAwesomeIcon icon={faPercent} /> <span>Tax Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/customer-supplier">
                      <FontAwesomeIcon icon={faAddressBook} />
                      <span>Supplier &amp; Customer Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/customer-group">
                      <FontAwesomeIcon icon={faUser} />
                      <span>Customer Groups Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/stock-report">
                      <FontAwesomeIcon icon={faHourglassHalf} />
                      <span>Stock Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/stock-adjustment-report">
                      <FontAwesomeIcon icon={faSlidersH} />
                      <span>Stock Adjustment Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/trending-products">
                      <FontAwesomeIcon icon={faChartLine} />
                      <span>Trending Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/items-report">
                      <i className="fa fas fa-tasks" /> <span>Items Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/product-purchase-report">
                      <FontAwesomeIcon icon={faArrowCircleDown} />
                      <span>Product Purchase Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/product-sell-report">
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                      <span>Product Sell Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/purchase-payment-report">
                      <FontAwesomeIcon icon={faSearchDollar} />
                      <span>Purchase Payment Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sell-payment-report">
                      <FontAwesomeIcon icon={faSearchDollar} />
                      <span>Sell Payment Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/expense-report">
                      <FontAwesomeIcon icon={faSearchMinus} />
                      <span>Expense Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/register-report">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <span>Register Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/sales-representative-report">
                      <FontAwesomeIcon icon={faUser} />
                      <span>Sales Representative Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports/activity-log">
                      <FontAwesomeIcon icon={faUserSecret} />
                      <span>Activity Log</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="active" id="tour_step13">
              <Link to="/notification-templates">
                <FontAwesomeIcon icon={faCog} />
                <span>Notification Templates</span>
              </Link>
            </li>
            <li className="treeview" id="tour_step14">
              <Link to="#">
                <FontAwesomeIcon icon={faCog} /> <span onClick={() => setOpenList10(!openList10)}>Settings</span>
                <span className="pull-right-container">
                  <FontAwesomeIcon icon={faAngleRight} className={`pull-right ${openList10 ? 'rotate' : ''}`} onClick={() => setOpenList10(!openList10)} />
                </span>
              </Link>
              {openList10 && (
                <ul className="">
                  <li>
                    <Link to="/business/settings" id="tour_step2">
                      <FaCogs />
                      <span>Business Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/business-location">
                      <FaMapMarkerAlt />
                      <span>Business Locations</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoice-schemes">
                      <FaFile />
                      <span>Invoice Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/barcodes">
                      <FaBarcode />
                      <span>Barcode Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/printers">
                      <FaShareAlt />
                      <span>Receipt Printers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/tax-rates">
                      <FaBolt /> <span>Tax Rates</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/subscription">
                      <FaSync />
                      <span>Package Subscription</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="active" id="tour_step15">
              <Link to="/crm/dashboard">
                <FontAwesomeIcon icon={faHandshake} />
                <span>CRM</span>
              </Link>
            </li>
            <li className="active" id="tour_step16">
              <Link to="/hrm/dashboard" >
                <FontAwesomeIcon icon={faBriefcase} />
                <span>HRM</span>
              </Link>
            </li>
            <li className="active" id="tour_step17">
              <Link to="/essentials/todo">
                <FontAwesomeIcon icon={faPuzzlePiece} />
                <span>Essentials</span>
              </Link>
            </li >
          </ul>
        </section>
      </aside>
    </div>
  );
};
export default Sidebar;
