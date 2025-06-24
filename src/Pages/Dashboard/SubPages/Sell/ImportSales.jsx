import React, { useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'

const ImportSales = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const textStyle={color:'black'}
  return (
    <div style={textStyle}>
        <div className="wrapper thetop">
            <Header/>
            <Sidebar/>
            <div className=" content-wrapper ">
                <section className="content-header"><h1>Import Sales</h1></section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-solid">
                                <div className="box-body">
                                    <form method="POST" action="https://medipro.affinity-me.com/import-sales/preview"acceptCharset="UTF-8"encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-8">
                                                <div className="form-group">
                                                    <label htmlFor="name">File To Import:</label>
                                                    <input required="required" name="sales" type="file" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <br />
                                                <button type="submit" className="btn btn-primary">
                                                    Upload and review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <br />
                                        <Link to="https://medipro.affinity-me.com/files/import_sales_template.xlsx" className="btn btn-success"download="">
                                           <i className="fa fa-download" /> Download template file
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-solid">
                        <div className="box-header">
                            <h3 className="box-title">Instructions</h3>
                        </div>
                        <div className="box-body">
                            <table className="table table-condensed">
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>Upload sales data in excel format</td>
                                    </tr>
                                    <tr>
                                        <td>2.</td>
                                        <td>Choose business location and column by which sell lines will be grouped</td>
                                    </tr>
                                    <tr>
                                        <td>3.</td>
                                        <td>Choose respective sales fields for each column</td>
                                    </tr>
                                    <tr>
                                        <td>4.</td>
                                        <td>
                                            <table className="table table-striped table-slim">
                                                <tbody>
                                                    <tr>
                                                        <th>Importable fields</th>
                                                        <th>Instructions</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Invoice No.</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Customer name</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Customer Phone number</td>
                                                        <td>
                                                            <small>Either customer email id or phone numberrequired</small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Customer Email</td>
                                                        <td>
                                                            <small>Either customer email id or phone number required</small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sale Date</td>
                                                        <td>
                                                            <small>Sale date time format should be "Y-m-d H:i:s"(2020-07-15 17:45:32)</small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Name</td>
                                                        <td>
                                                            <small> Either product name (for single and combo only) or product sku required</small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product SKU</td>
                                                        <td>
                                                           <small> Either product name (for single and combo only) or product sku required </small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Quantity</td>
                                                        <td>
                                                            <small>Required</small>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Unit</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Unit Price</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Tax</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Discount</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Description</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Order Total</td>
                                                        <td>
                                                            <small />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-solid">
                        <div className="box-header">
                            <h3 className="box-title">Imports</h3>
                        </div>
                        <div className="box-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Import batch</th>
                                        <th>Import time</th>
                                        <th>Created By</th>
                                        <th>Invoices</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                            <tbody>
                            <tbody>
                                    {currentItems.length > 0 ? (currentItems.map((group, index) => (
                                        <tr key={index}>
                                            <td>{group.importBatch}</td>
                                            <td>{group.importTime}</td>
                                            <td>{group.createdBy}</td>
                                            <td>{group.invoice}</td>
                                            <td>
                                                <button style={{ ...textStyle, backgroundColor: 'lightblue', color: 'white', marginRight: '7px' }} onClick={() => alert(`Edit ${group.username}`)}>
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </button>
                                                <button style={{ ...textStyle, backgroundColor: 'lightcoral', color: 'white' }} onClick={() => alert(`Delete ${group.username}`)}>
                                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center"><b>No Data Available</b></td>
                                    </tr>
                                    )}
                                </tbody>
                            </tbody>
                        </table>
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

export default ImportSales