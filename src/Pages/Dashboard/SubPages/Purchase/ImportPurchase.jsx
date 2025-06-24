import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { Link } from 'react-router-dom'

const ImportPurchase = () => {
    const textStyle = { color: 'black' };
  return (
    <div style={textStyle}>
        <div className="wrapper thetop">
            <Header/>
            <Sidebar/>
            <div className=" content-wrapper ">
                <section className="content-header"><h1>Import Purchase</h1></section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-solid">
                                <div className="box-body">
                                    <form method="POST" action="https://medipro.affinity-me.com/import-purchase/preview"
                                    acceptCharset="UTF-8"encType="multipart/form-data">
                                        <input name="_token"type="hidden"defaultValue="KfdyBpPmaZmB2SBdAlbcFSEaxSyGdqUgvwaCtqtB"/>
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
                                            <Link to="https://medipro.affinity-me.com/files/import_purchase_template.xlsx" className="btn btn-success"download="">
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
                                            <td>Upload purchase data in excel format</td>
                                        </tr>
                                        <tr>
                                            <td>2.</td>
                                            <td>Choose business location and column by which purchaselines will be grouped</td>
                                        </tr>
                                        <tr>
                                            <td>3.</td>
                                            <td>Choose respective purchase fields for each column</td>
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
                                                            <td>Reference No</td>
                                                            <td><small /></td>
                                                        </tr>
                                                        <tr><td>Supplier Name</td>
                                                        <td><small>Required | If Already in System use the Samename.</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Supplier Phone</td>
                                                        <td><small>Either Supplier phone or Email</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Supplier Email</td>
                                                        <td><small>Either Supplier phone or Email</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Purchase Date</td>
                                                        <td><small>Date time format should be "Y-m-d H:i:s"(2020-07-15 17:45:32)</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Name</td>
                                                        <td><small>Either product name (for single and comboonly) or product sku required</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product SKU</td>
                                                        <td><small>Either product name (for single and comboonly) or product sku required</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Quantity</td>
                                                        <td><small>Required</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Product Unit</td>
                                                        <td><small>Please Enter the Unit Name created in ProductUnits</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Unit Price</td>
                                                        <td><small /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Tax</td>
                                                        <td><small>Please Enter the Tax Name created in Tax Ratesettings</small></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Discount</td>
                                                        <td><small /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Item Description</td>
                                                        <td><small /></td>
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

export default ImportPurchase