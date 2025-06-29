import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Index from './Pages/Index';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/SubPages/User Managment/Users";
import Create from "./Pages/Dashboard/SubPages/User Managment/Add/Create";
import Roles from "./Pages/Dashboard/SubPages/User Managment/Roles/Roles";
import Create1 from "./Pages/Dashboard/SubPages/User Managment/Roles/Create/Create1";
import SalesCommissionAgents from "./Pages/Dashboard/SubPages/User Managment/SalesCommissionAgents/SalesCommissionAgents";
import Suppliers from "./Pages/Dashboard/SubPages/Contacts/Suppliers/Suppliers";
import Customer from "./Pages/Dashboard/SubPages/Contacts/Customer/Customer";
import CustomerGroup from "./Pages/Dashboard/SubPages/Contacts/CustomerGroup/CustomerGroup";
import ImportContacts from "./Pages/Dashboard/SubPages/Contacts/ImportContacts/ImportContacts";
import AddManufacturers from "./Pages/Dashboard/SubPages/Contacts/AddManufacturers/AddManufacturers";
import Manufacturers from "./Pages/Dashboard/SubPages/Contacts/Manufacturers/Manufacturers";
import ManufacturersEdit from "./Pages/Dashboard/SubPages/Contacts/Manufacturers/ManufacturersEdit";
import AddManufacturer from "./Pages/Dashboard/SubPages/Contacts/AddManufacturers/AddManufacturers";
import ListProduct from "./Pages/Dashboard/SubPages/Product/ListProduct";
import AddProduct from "./Pages/Dashboard/SubPages/Product/AddProduct";
import UpdatePrice from "./Pages/Dashboard/SubPages/Product/UpdatePrice";
import PrintLebel from "./Pages/Dashboard/SubPages/Product/PrintLebel";
import Variations from "./Pages/Dashboard/SubPages/Product/Variations";
import ImportProduct from "./Pages/Dashboard/SubPages/Product/ImportProduct";
import ImportOpeningStocks from "./Pages/Dashboard/SubPages/Product/ImportOpeningStock";
import SellinPriceGroup from "./Pages/Dashboard/SubPages/Product/SellinPriceGroup";
import Units from "./Pages/Dashboard/SubPages/Product/Units";
import Categories from "./Pages/Dashboard/SubPages/Product/Categories";
import Brand from "./Pages/Dashboard/SubPages/Product/Brand";
import ProductMapping from "./Pages/Dashboard/SubPages/Product/ProductMapping";
import Warranties from "./Pages/Dashboard/SubPages/Product/Warranties";
import Repair from "./Pages/Dashboard/SubPages/Repair/Repair";
import JobSheet from "./Pages/Dashboard/SubPages/Repair/SubPage/JobSheet";
import AddJobSheet from "./Pages/Dashboard/SubPages/Repair/SubPage/AddJobSheet";
import ListInvoice from "./Pages/Dashboard/SubPages/Repair/SubPage/ListInvoice";
import AddInvoice from "./Pages/Dashboard/SubPages/Repair/SubPage/AddInvoice";
import Brands from "./Pages/Dashboard/SubPages/Repair/SubPage/Brands";
import Setting from "./Pages/Dashboard/SubPages/Repair/SubPage/Setting";
import ListPurchase from "./Pages/Dashboard/SubPages/Purchase/ListPurchase";
import AddPurchase from "./Pages/Dashboard/SubPages/Purchase/AddPurchase";
import ListPurchaseReturn from "./Pages/Dashboard/SubPages/Purchase/ListPurchaseReturn";
import AddPurchaseReturn from "./Pages/Dashboard/SubPages/Purchase/AddPurchaseReturn";
import ImportPurchase from "./Pages/Dashboard/SubPages/Purchase/ImportPurchase";
import AddSale from "./Pages/Dashboard/SubPages/Sell/AddSale";
import ListPos from "./Pages/Dashboard/SubPages/Sell/ListPos";
import Pos from "./Pages/Dashboard/SubPages/Sell/Pos";
import AddDraft from "./Pages/Dashboard/SubPages/Sell/AddDraft";
import ListDraft from "./Pages/Dashboard/SubPages/Sell/ListDraft";
import AddQuotations from "./Pages/Dashboard/SubPages/Sell/AddQuotations";
import ListQuotations from "./Pages/Dashboard/SubPages/Sell/ListQuotations";
import DeliveryNote from "./Pages/Dashboard/SubPages/Sell/DeliveryNote";
import AddDeliveryNote from "./Pages/Dashboard/SubPages/Sell/AddDeliveryNote";
import ListSellReturn from "./Pages/Dashboard/SubPages/Sell/ListSellReturn";
import Shipment from "./Pages/Dashboard/SubPages/Sell/Shipment";
import Discount from "./Pages/Dashboard/SubPages/Sell/Discount";
import ImportSales from "./Pages/Dashboard/SubPages/Sell/ImportSales";
import StockTransfer from "./Pages/Dashboard/SubPages/Stock Transfer/StockTransfer";
import AddStockTransfer from "./Pages/Dashboard/SubPages/Stock Transfer/AddStockTransfer";
import ListStockAdjustments from "./Pages/Dashboard/SubPages/Stock Adjustments/ListStockAdjustments";
import AddStockAdjustments from "./Pages/Dashboard/SubPages/Stock Adjustments/AddStockAdjustments";
import Important from "./Pages/Dashboard/SubPages/NHRA/Important";
import ImportationCreate from "./Pages/Dashboard/SubPages/NHRA/ImportationCreate";
import AuthorizedRepresentative from "./Pages/Dashboard/SubPages/NHRA/AuthorizedRepresentative";
import AddAuthorizedRepresentative from "./Pages/Dashboard/SubPages/NHRA/AddAuthorizedRepresentative";
import AddAdverseEvent from "./Pages/Dashboard/SubPages/NHRA/AddAdverseEvent";
import AdverseEvent from "./Pages/Dashboard/SubPages/NHRA/AdverseEvent";
import AddFieldSafetyNotice from "./Pages/Dashboard/SubPages/NHRA/AddFieldSafetyNotice";
import FieldSafetyNotice from "./Pages/Dashboard/SubPages/NHRA/FieldSafetyNotice";
import AddNewComplaint from "./Pages/Dashboard/SubPages/NHRA/AddNewComplaint";
import AllComplaint from "./Pages/Dashboard/SubPages/NHRA/AllComplaint";
import AllHealthFacility from "./Pages/Dashboard/SubPages/NHRA/AllHealthFacility";
import HealthFacility from "./Pages/Dashboard/SubPages/NHRA/HealthFacility";
import AddDispose from "./Pages/Dashboard/SubPages/NHRA/AddDispose";
import AllDispose from "./Pages/Dashboard/SubPages/NHRA/AllDispose";
import AddAlertandModification from "./Pages/Dashboard/SubPages/NHRA/AddAlertandModification";
import AllAlertModification from "./Pages/Dashboard/SubPages/NHRA/AllAlert&Modification";
import AddRecalls from "./Pages/Dashboard/SubPages/NHRA/AddRecalls";
import AllRecall from "./Pages/Dashboard/SubPages/NHRA/AllRecall";
import ServiceandMaintainance from "./Pages/Dashboard/SubPages/NHRA/ServiceandMaintainance";
import AddServiceandMaintainance from "./Pages/Dashboard/SubPages/NHRA/AddServiceandMaintainance";
import ListExpenses from "./Pages/Dashboard/SubPages/Expenses/ListExpenses";
import AddExpenses from "./Pages/Dashboard/SubPages/Expenses/AddExpenses";
import ExpenseCategory from "./Pages/Dashboard/SubPages/Expenses/ExpenseCategory";
import ProfitLossReports from "./Pages/Dashboard/SubPages/Reports/ProfitLossReports";
import PurchaseReport from "./Pages/Dashboard/SubPages/Reports/PurchaseReport";
import SalesReport from "./Pages/Dashboard/SubPages/Reports/SalesReport";
import RegularSalesSheet from "./Pages/Dashboard/SubPages/Reports/RegularSalesSheet";
import ItemSalesStock from "./Pages/Dashboard/SubPages/Reports/ItemSalesStock";
import ItemSalesReport from "./Pages/Dashboard/SubPages/Reports/ItemSalesReport";
import IndividualReports from "./Pages/Dashboard/SubPages/Reports/IndividualReports";
import PurchaseSale from "./Pages/Dashboard/SubPages/Reports/PurchaseSale";
import TaxReport from "./Pages/Dashboard/SubPages/Reports/TaxReport";
import SupplierandCustomerReport from "./Pages/Dashboard/SubPages/Reports/SupplierandCustomerReport";
import CustomerGroupReports from "./Pages/Dashboard/SubPages/Reports/CustomerGroupReports";
import StockReport from "./Pages/Dashboard/SubPages/Reports/StockReport";
import ProductStockReport from "./Pages/Dashboard/SubPages/Reports/ProductStockReport";
import StockAdjustmentReports from "./Pages/Dashboard/SubPages/Reports/StockAdjustmentReports";
import TrendingProduct from "./Pages/Dashboard/SubPages/Reports/TrendingProduct";
import ItemReport from "./Pages/Dashboard/SubPages/Reports/ItemReport";
import ProductPurchaseReport from "./Pages/Dashboard/SubPages/Reports/ProductPurchaseReport";
import ProductSellReport from "./Pages/Dashboard/SubPages/Reports/ProductSellReport";
import PaymentPurchaseReport from "./Pages/Dashboard/SubPages/Reports/PaymentPurchaseReport";
import SellPaymentReport from "./Pages/Dashboard/SubPages/Reports/SellPaymentReport";
import ExpenseReport from "./Pages/Dashboard/SubPages/Reports/ExpenseReport";
import RegisterReport from "./Pages/Dashboard/SubPages/Reports/RegisterReport";
import SalesRepresentativeReport from "./Pages/Dashboard/SubPages/Reports/SalesRepresentativeReport";
import ActivityLog from "./Pages/Dashboard/SubPages/Reports/ActivityLog";
import Notification from "./Pages/Dashboard/SubPages/Notification/Notification";
import BusinessSetings from "./Pages/Settings/BusinessSetings";
import BusinessLocation from "./Pages/Settings/BusinessLocation";
import BusinessLocationSetting from "./Pages/Settings/BusinessLocationSetting";
import InvoiceSettings from "./Pages/Settings/InvoiceSettings";
import AddNewInvoice from "./Pages/Settings/AddNewInvoice";
import DeliveryNoteLayout from "./Pages/Settings/DeliveryNoteLayout";
import PurchaseLayout from "./Pages/Settings/PurchaseLayout";
import Barcode from "./Pages/Settings/BarCode/Barcode";
import AddBarcode from "./Pages/Settings/BarCode/AddBarcode";
import ReceiptPrinters from "./Pages/Settings/Printers/ReceiptPrinters";
import AddPrinters from "./Pages/Settings/Printers/AddPrinters";
import TaxRate from "./Pages/Settings/Tax/TaxRates";
import Subscription from "./Pages/Settings/Subscription";
import CRM from "./Pages/Dashboard/CRM/CRM";
import LeadCrm from "./Pages/Dashboard/CRM/LeadCrm";
import FollowUp from "./Pages/Dashboard/CRM/FollowUp";
import Campaign from "./Pages/Dashboard/CRM/Campaign";
import CreateCampaign from "./Pages/Dashboard/CRM/CreateCampaign";
import ContactLogin from "./Pages/Dashboard/CRM/ContactLogin";
import ContactCommissions from "./Pages/Dashboard/CRM/ContactCommissions";
import Reports from "./Pages/Dashboard/CRM/Reports";
import ProposalTemplates from "./Pages/Dashboard/CRM/ProposalTemplates";
import AddProposaltemplates from "./Pages/Dashboard/CRM/AddProposaltemplates";
import Proposals from "./Pages/Dashboard/CRM/Proposals";
import Sources from "./Pages/Dashboard/CRM/Sources";
import LifeStage from "./Pages/Dashboard/CRM/LifeStage";
import FollowupCategory from "./Pages/Dashboard/CRM/FollowupCategory";
import Settings1 from "./Pages/Dashboard/CRM/Settings1";
import Hrm from "./Pages/HRM/Hrm";
import LeavrType from "./Pages/HRM/LeavrType";
import Leave from "./Pages/HRM/Leave";
import Attendence from "./Pages/HRM/Attendence";
import Payrol from "./Pages/HRM/Payrol";
import Holiday from "./Pages/HRM/Holiday";
import Departments from "./Pages/HRM/Departments";
import Designation from "./Pages/HRM/Designation";
import SalesTarget from "./Pages/HRM/SalesTarget";
import Settings from "./Pages/HRM/Settings";
import essentials from "./Pages/Essentials/essentials";
import Document from "./Pages/Essentials/Document";
import Memos from "./Pages/Essentials/Memos";
import Settings2 from "./Pages/Essentials/Settings2";
import KnowledgeBase from "./Pages/Essentials/KnowledgeBase";
import AddKnowledge from "./Pages/Essentials/AddKnowledge";
import Messages from "./Pages/Essentials/Messages";
import Remainder from "./Pages/Essentials/Remainder";
import Profile from "./Pages/HeaderPages/Profile";
import ForgotPassword from "./Pages/HeaderPages/ForgotPassword";
import GeneralAggrements from "./Pages/HeaderPages/GeneralAggrements";
import Calender from "./Components/Calender";
import Repairs from "./Pages/HeaderPages/Repairs";
import Update from "./Pages/Dashboard/SubPages/User Managment/Roles/Create/update";
import EditProduct from "./Pages/Dashboard/SubPages/Product/EditProduct";
import Edit from "./Pages/Dashboard/SubPages/User Managment/Edit/Edit";
import EditJobSheet from "./Pages/Dashboard/SubPages/Repair/SubPage/EditJobSheet";
import AllSale from "./Pages/Dashboard/SubPages/Sell/AllSale";
import EditSale from "./Pages/Dashboard/SubPages/Sell/EditSale";
import EditDraft from "./Pages/Dashboard/SubPages/Sell/EditDraft";
import EditQuotation from "./Pages/Dashboard/SubPages/Sell/EditQuotation";
import EditDeliveryNote from "./Pages/Dashboard/SubPages/Sell/EditDeliveryNote";
import EditStockTransfer from "./Pages/Dashboard/SubPages/Stock Transfer/EditStockTransfer";
import EditPurchase from "./Pages/Dashboard/SubPages/Purchase/EditPurchase";
import EditPurchaseReturn from "./Pages/Dashboard/SubPages/Purchase/EditPurchaseReturn";
import EditStockAdjustment from "./Pages/Dashboard/SubPages/Stock Adjustments/EditStockAdjustments";
import EditAuthorizedRepresentative from "./Pages/Dashboard/SubPages/NHRA/EditAuthorizedRepresentative";
import EditImportation from "./Pages/Dashboard/SubPages/NHRA/EditImportation";
import EditHealthFacility from "./Pages/Dashboard/SubPages/NHRA/EditHealthFacility";
import EditAdverseEvent from "./Pages/Dashboard/SubPages/NHRA/EditAdverseEvent";
import EditFieldSafetyNotice from "./Pages/Dashboard/SubPages/NHRA/EditFieldSafetyNotice";
import EditComplaint from "./Pages/Dashboard/SubPages/NHRA/EditComplaint";
import EditDispose from "./Pages/Dashboard/SubPages/NHRA/EditDispose";
import EditAlertandModification from "./Pages/Dashboard/SubPages/NHRA/EditAlertandModification";
import EditRecalls from "./Pages/Dashboard/SubPages/NHRA/EditRecalls";
import EditServiceandMaintainance from "./Pages/Dashboard/SubPages/NHRA/EditServiceandMaintainance";
import EditExpenses from "./Pages/Dashboard/SubPages/Expenses/EditExpenses";


import Cookies from 'js-cookie'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/reset" element={<ForgotPassword />} />
        <Route
          path="/login/general_agreement"
          element={<GeneralAggrements />}
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ProtectedRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/users" Component={Users} />
      <Route path="/users/create" Component={Create} />
      <Route path="/users/edit/:id" Component={Edit} />
      <Route path="/roles" Component={Roles} />
      <Route path="/roles/create" Component={Create1} />
      <Route
        path="/sales-commission-agents"
        Component={SalesCommissionAgents}
      />
      <Route path="/suppliers" Component={Suppliers} />
      <Route path="/customers" Component={Customer} />
      <Route path="/customersgroup" Component={CustomerGroup} />
      <Route path="/importcontacts" Component={ImportContacts} />
      <Route path="/addmanufacturers" Component={AddManufacturers} />
      <Route path="/manufacturers" Component={Manufacturers} />
      <Route path="/manufacturers/:userId" element={<ManufacturersEdit />} />
      <Route
        path="/manufacturers/addmanufacturers"
        Component={AddManufacturer}
      />
      <Route path="/listproduct" Component={ListProduct} />
      <Route path="/listproduct/addproduct" Component={AddProduct} />
      <Route path="/editproduct/:id" Component={EditProduct} />
      <Route path="/updateprice" Component={UpdatePrice} />
      <Route path="/printlebel" Component={PrintLebel} />
      <Route path="/variations" Component={Variations} />
      <Route path="/importproducts" Component={ImportProduct} />
      <Route path="/importopeningstocks" Component={ImportOpeningStocks} />
      <Route path="/selling-price-group" Component={SellinPriceGroup} />
      <Route path="/units" Component={Units} />
      <Route path="/categories" Component={Categories} />
      <Route path="/brand" Component={Brand} />
      <Route path="/product-mapping" Component={ProductMapping} />
      <Route path="/warranties" Component={Warranties} />
      <Route path="/repairs" Component={Repair} />
      <Route path="/repairs/job-sheet" Component={JobSheet} />
      <Route path="/repairs/job-sheet/create" Component={AddJobSheet} />
      <Route path="/repairs/job-sheet/edit/:id" Component={EditJobSheet} />
      <Route path="/repairs/repair" Component={ListInvoice} />
      <Route path="/repairs-addinvoice" Component={AddInvoice} />
      <Route path="/repairs/brands" Component={Brands} />
      <Route path="/repairs/setting" Component={Setting} />
      <Route path="/purchases" Component={ListPurchase} />
      <Route path="/add-purchase" Component={AddPurchase} />
      <Route path="/edit-purchase/:id" Component={EditPurchase} />
      <Route path="/purchase-return" Component={ListPurchaseReturn} />
      <Route path="/purchase-return/create" Component={AddPurchaseReturn} />
      <Route path="/purchase-return/edit/:id" Component={EditPurchaseReturn} />
      <Route path="/import-purchase" Component={ImportPurchase} />
      <Route path="/sell" Component={AllSale} />
      <Route path="/sell/create" Component={AddSale} />
      <Route path="/sell/edit/:id" Component={EditSale} />
      <Route path="/pos" Component={ListPos} />
      <Route path="/pos/create" Component={Pos} />
      <Route path="/add/drafts" Component={AddDraft} />
      <Route path="/sells/drafts" Component={ListDraft} />
      <Route path="/edit/draft/:id" Component={EditDraft} />
      <Route path="/create/quotation" Component={AddQuotations} />
      <Route path="/list/quotations" Component={ListQuotations} />
      <Route path="/edit/quotation/:id" Component={EditQuotation} />
      <Route path="/delivery-note" Component={DeliveryNote} />
      <Route path="/list/sell/return" Component={ListSellReturn} />
      <Route path="/add-delivery-note" Component={AddDeliveryNote} />
      <Route path="/edit-delivery-note/:id" Component={EditDeliveryNote} />
      <Route path="/adddeliverynote" Component={Shipment} />
      <Route path="/shipments" Component={Shipment} />
      <Route path="/discount" Component={Discount} />
      <Route path="/import-sales" Component={ImportSales} />
      <Route path="/stock-transfers" Component={StockTransfer} />
      <Route path="/stock-transfers/create" Component={AddStockTransfer} />
      <Route path="/stock-transfers/edit/:id" Component={EditStockTransfer} />
      <Route path="/stock-adjustments" Component={ListStockAdjustments} />
      <Route path="/stock-adjustments/create" Component={AddStockAdjustments} />
      <Route
        path="/stock-adjustments/edit/:id"
        Component={EditStockAdjustment}
      />
      <Route path="/Importation/show" Component={Important} />
      <Route path="/Importation/create" Component={ImportationCreate} />
      <Route path="/importation/edit/:id" Component={EditImportation} />
      <Route path="/ar" Component={AuthorizedRepresentative} />
      <Route
        path="/add-authorized-representative"
        Component={AddAuthorizedRepresentative}
      />
      <Route
        path="/edit-authorized-representative/:id"
        Component={EditAuthorizedRepresentative}
      />
      <Route path="/add-adverse-event" Component={AddAdverseEvent} />
      <Route path="/AdverseEvents" Component={AdverseEvent} />
      <Route path="/adverseEvents/edit/:id" Component={EditAdverseEvent} />
      <Route path="/FieldSafteyNotice" Component={FieldSafetyNotice} />
      <Route
        path="/FieldSafteyNotice/create"
        Component={AddFieldSafetyNotice}
      />
      <Route
        path="/fieldSafteyNotice/edit/:id"
        Component={EditFieldSafetyNotice}
      />
      <Route path="/complain-handling/create" Component={AddNewComplaint} />
      <Route path="/complain-handling/edit/:id" Component={EditComplaint} />
      <Route path="/complain-handling" Component={AllComplaint} />
      <Route path="/facility" Component={AllHealthFacility} />
      <Route path="/Health-facility" Component={HealthFacility} />
      <Route path="/health-facility/edit/:id" Component={EditHealthFacility} />
      <Route path="/dispose/create" Component={AddDispose} />
      <Route path="/dispose/edit/:id" Component={EditDispose} />
      <Route path="/dispose/index" Component={AllDispose} />
      <Route
        path="/alert-modification/create"
        Component={AddAlertandModification}
      />
      <Route
        path="/alert-modification/edit/:id"
        Component={EditAlertandModification}
      />
      <Route path="/alert-modification" Component={AllAlertModification} />
      <Route path="/recalls/create" Component={AddRecalls} />
      <Route path="/recalls/edit/:id" Component={EditRecalls} />
      <Route path="/recalls/all" Component={AllRecall} />
      <Route path="/ServiceMaintenance" Component={ServiceandMaintainance} />
      <Route
        path="/add-ServiceMaintenance"
        Component={AddServiceandMaintainance}
      />
      <Route
        path="/edit-ServiceMaintenance/:id"
        Component={EditServiceandMaintainance}
      />
      <Route path="/expenses" Component={ListExpenses} />
      <Route path="/expenses/create" Component={AddExpenses} />
      <Route path="/expenses/edit/:id" Component={EditExpenses} />
      <Route path="/expense-categories" Component={ExpenseCategory} />
      <Route path="/reports/profit-loss" Component={ProfitLossReports} />
      <Route path="/reports/purchase-report" Component={PurchaseReport} />
      <Route path="/sale-report" Component={SalesReport} />
      <Route path="/reports/items-sales-stock" Component={ItemSalesStock} />
      <Route
        path="/reports/regular-sale-sheet_report"
        Component={RegularSalesSheet}
      />
      <Route path="/reports/item-sale-report" Component={ItemSalesReport} />
      <Route path="/individuals-sales-sheet" Component={IndividualReports} />
      <Route path="/reports/purchase-sell" Component={PurchaseSale} />
      <Route path="/reports/tax-report" Component={TaxReport} />
      <Route
        path="/reports/customer-supplier"
        Component={SupplierandCustomerReport}
      />
      <Route path="/customer-group" Component={CustomerGroupReports} />
      <Route path="/reports/stock-report" Component={StockReport} />
      <Route path="/product-stock-report" Component={ProductStockReport} />
      <Route
        path="/reports/stock-adjustment-report"
        Component={StockAdjustmentReports}
      />
      <Route path="/reports/trending-products" Component={TrendingProduct} />
      <Route path="/reports/items-report" Component={ItemReport} />
      <Route
        path="/reports/product-purchase-report"
        Component={ProductPurchaseReport}
      />
      <Route
        path="/reports/product-sell-report"
        Component={ProductSellReport}
      />
      <Route
        path="/purchase-payment-report"
        Component={PaymentPurchaseReport}
      />
      <Route path="/sell-payment-report" Component={SellPaymentReport} />
      <Route path="/reports/expense-report" Component={ExpenseReport} />
      <Route path="/reports/register-report" Component={RegisterReport} />
      <Route
        path="/reports/sales-representative-report"
        Component={SalesRepresentativeReport}
      />
      <Route path="/reports/activity-log" Component={ActivityLog} />
      <Route path="/notification-templates" Component={Notification} />
      <Route path="/business/settings" Component={BusinessSetings} />
      <Route path="/business-location" Component={BusinessLocation} />
      <Route
        path="/business-location/Setting"
        Component={BusinessLocationSetting}
      />
      <Route path="/invoice-schemes" Component={InvoiceSettings} />
      <Route path="/invoice-layouts/create" Component={AddNewInvoice} />
      <Route path="/delivery-note-layout" Component={DeliveryNoteLayout} />
      <Route path="/purchase-note=layout" Component={PurchaseLayout} />
      <Route path="/barcodes" Component={Barcode} />
      <Route path="/barcodes/create" Component={AddBarcode} />
      <Route path="/printers" Component={ReceiptPrinters} />
      <Route path="/printers/create" Component={AddPrinters} />
      <Route path="/tax-rates" Component={TaxRate} />
      <Route path="/subscription" Component={Subscription} />
      <Route path="/crm/dashboard" Component={CRM} />
      <Route path="/crm/leads" Component={LeadCrm} />
      <Route path="/crm/follow-up" Component={FollowUp} />
      <Route path="/crm/campaigns" Component={Campaign} />
      <Route path="/crm/campaigns/create" Component={CreateCampaign} />
      <Route path="/crm/all-contacts-login" Component={ContactLogin} />
      <Route path="/crm/commissions" Component={ContactCommissions} />
      <Route path="/crm/reports" Component={Reports} />
      <Route path="/crm/proposal-template" Component={ProposalTemplates} />
      <Route path="/crm/proposals" Component={Proposals} />
      <Route
        path="/crm/add-proposal-template"
        Component={AddProposaltemplates}
      />
      <Route path="/crm/sources" Component={Sources} />
      <Route path="/life-stage" Component={LifeStage} />
      <Route path="/crm/followup-category" Component={FollowupCategory} />
      <Route path="/crm/settings" Component={Settings1} />
      <Route path="/hrm/dashboard" Component={Hrm} />
      <Route path="/hrm/leave-type" Component={LeavrType} />
      <Route path="/hrm/leave" Component={Leave} />
      <Route path="/hrm/attendance" Component={Attendence} />
      <Route path="/hrm/payroll" Component={Payrol} />
      <Route path="/hrm/holiday" Component={Holiday} />
      <Route path="/hrm/department" Component={Departments} />
      <Route path="/hrm/designation" Component={Designation} />
      <Route path="/hrm/sales-target" Component={SalesTarget} />
      <Route path="/hrm/settings" Component={Settings} />
      <Route path="/essentials/todo" Component={essentials} />
      <Route path="/essentials/document" Component={Document} />
      <Route path="/essentials/memos" Component={Memos} />
      <Route path="/essentials/settings" Component={Settings2} />
      <Route path="/essentials/knowledge-base" Component={KnowledgeBase} />
      <Route path="/knowledge-base/create" Component={AddKnowledge} />
      <Route path="/essentials/messages" Component={Messages} />
      <Route path="/essentials/reminder" Component={Remainder} />
      <Route path="/user/profile" Component={Profile} />
      <Route path="/calender" Component={Calender} />
      <Route path="/pos/create-sub-type=repair" Component={Repairs} />
      <Route path="/roles/update/:id" Component={Update} />
    </Routes>
  );
};

export default App;
