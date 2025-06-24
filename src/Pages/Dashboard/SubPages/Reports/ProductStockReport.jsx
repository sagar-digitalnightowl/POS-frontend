import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFilter, faUser, faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer';
import { type } from '@testing-library/user-event/dist/type';

const ProductStockReport = () => {
    const[data, setData] = useState([
        {type:'Opening Stock', quantityChanged:'+30', newQuantity:'10240', invoiceDate:'21/06/2024',referenceNo:'001',customerInformation:'Anish Kumar', supplierInformation:'text'},
        {type:'Sell', quantityChanged:'-20', newQuantity:'940', invoiceDate:'22/06/2024',referenceNo:'002',customerInformation:'Manish Kumar', supplierInformation:'Hcl'},
        {type:'Purchase', quantityChanged:'+130', newQuantity:'1240', invoiceDate:'23/06/2024',referenceNo:'003',customerInformation:'Mahesh Kumar', supplierInformation:'TCS'}
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const textStyle={color:'black'};
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Product stock history</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Sefam</h3>
                </div>
                <div className="box-body">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="product_id">Product:</label>
                      <select className="form-control" style={{ width: "100%" }}id="product_id"name="product_id">
                        <option value={161} selected="selected">Sefam - 0161</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="location_id">Business Location:</label>
                      <select className="form-control select2"style={{ width: "100%" }}id="location_id"name="location_id">
                        <option value={4} selected="selected">POS APPLICATION</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-solid">
                <div className="box-body">
                    <div id="product_stock_history" style={{}}>
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Sefam (0161)</h4>
                            </div>
                            <div className="col-md-4 col-xs-4">
                                <strong>Quantities In</strong>
                                <table className="table table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Total Purchase</th>
                                            <td>
                                                <span className="display_currency" data-is_quantity="true">1,000.00</span>box
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Opening Stock</th>
                                            <td>
                                                <span className="display_currency" data-is_quantity="true">30.00</span>box
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Total Sell Return</th>
                                            <td><span className="display_currency" data-is_quantity="true">0.00</span>box</td>
                                        </tr>
                                        <tr>
                                            <th>Stock Transfers (In)</th>
                                            <td><span className="display_currency" data-is_quantity="true">0.00</span>box</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                           <div className="col-md-4 col-xs-4">
                            <strong>Quantities Out</strong>
                            <table className="table table-condensed">
                                <tbody>
                                    <tr>
                                        <th>Total Sold</th>
                                        <td><span className="display_currency" data-is_quantity="true">6.00</span>box</td>
                                    </tr>
                                    <tr>
                                        <th>Total Stock Adjustment</th>
                                        <td><span className="display_currency" data-is_quantity="true">0.00</span>box</td>
                                    </tr>
                                    <tr>
                                        <th>Total Purchase Return</th>
                                        <td><span className="display_currency" data-is_quantity="true">0.00</span>box</td>
                                    </tr>
                                    <tr>
                                        <th>Stock Transfers (Out)</th>
                                        <td><span className="display_currency" data-is_quantity="true">0.00</span>box</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className="col-md-4 col-xs-4">
                                <strong>Totals</strong>
                                <table className="table table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Current stock</th>
                                            <td><span className="display_currency" data-is_quantity="true">1,024.00</span>box</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-solid">
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
                                        <div className="box-body" style={{ overflowX: 'auto' }}>
                                            <table className="table table-bordered table-striped" id="stock_report_table">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Quantity Changed</th>
                                                        <th>New Quantityt </th>
                                                        <th>Invoice Date</th>
                                                        <th>Reference No</th>
                                                        <th>Customer Information</th>
                                                        <th>Supplier Information</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems.map((user, index) => (
                                                            <tr key={index}>
                                                                <td>{user.type}</td>
                                                                <td>{user.quantityChanged}</td> 
                                                                <td>{user.newQuantity}</td>
                                                                <td>{user.invoiceDate}</td>
                                                                <td>{user.referenceNo}</td>
                                                                <td>{user.customerInformation}</td>
                                                                <td>{user.supplierInformation}</td>
                                                            </tr>
                                                        ))}
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
            </div>
        </section>
    </div>
     <Footer/>
</div>
</div>
  )
}

export default ProductStockReport