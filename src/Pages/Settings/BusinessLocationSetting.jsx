import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { FaFileAlt, FaInfo, FaInfoCircle, FaPrint, FaShareAlt } from 'react-icons/fa'

const BusinessLocationSetting = () => {
  return (
    <div>
    <div className="wrapper thetop">
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Business Location Settings - POS APPLICATION</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <Link to="#tab_1" data-toggle="tab" aria-expanded="true">Receipt Settings</Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tab_1">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>Receipt Settings<small>All receipt related settings for this location</small></h4>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <form method="POST"
                          action="https://medipro.affinity-me.com/business-location/4/settings"
                          acceptCharset="UTF-8"id="bl_receipt_setting_form">
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label htmlFor="print_receipt_on_invoice">Auto print invoice after finalizing:</label>
                              <FaInfoCircle aria-hidden="true"data-container="body"
                                data-toggle="popover"data-placement="auto bottom"
                                data-content="Enable or Disable auto-printing of invoice on finalizing"data-html="true"data-trigger="hover"
                              />
                              <div className="input-group">
                                <span className="input-group-addon">
                                <FaFileAlt />
                                </span>
                                <select className="form-control select2"required=""id="print_receipt_on_invoice"name="print_receipt_on_invoice">
                                  <option value={1} selected="selected">Yes</option>
                                  <option value={0}>No</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label htmlFor="receipt_printer_type">Receipt Printer Type:*</label>
                              <FaInfoCircle aria-hidden="true"data-container="body"
                                data-toggle="popover"data-placement="auto bottom"
                                data-content="<i>Browser Based Printing</i>: Show Browser Print Dialog Box with Invoice Preview<br/><br/> <i>Use Configured Receipt Printer</i>: Select a Configured Receipt / Thermal printer for printing"
                                data-html="true"data-trigger="hover"
                              />
                              <div className="input-group">
                                <span className="input-group-addon">
                                <FaPrint />
                                </span>
                                <select className="form-control select2"required=""id="receipt_printer_type"name="receipt_printer_type">
                                  <option value="browser" selected="selected">Browser Based Printing</option>
                                  <option value="printer">Use Configured Receipt Printer</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4" id="location_printer_div">
                            <div className="form-group">
                              <label htmlFor="printer_id">Receipt Printers:*</label>
                              <div className="input-group">
                                <span className="input-group-addon">
                                <FaShareAlt />
                                </span>
                                <select className="form-control select2"required=""id="printer_id"name="printer_id">
                                  <option value="" selected="selected">Please Select</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <br />
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label htmlFor="invoice_layout_id">Invoice layout:*</label>
                              <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                                data-content="Invoice Layout to be used for this business location<br><small class='text-muted'>(<i>You can add new <b>Invoice Layout</b> in <b>Invoice Settings<b></i>)</small>"
                                data-html="true"data-trigger="hover"
                              />
                              <div className="input-group">
                                <span className="input-group-addon">
                                <FaInfo />
                                </span>
                                <select className="form-control select2"required=""id="invoice_layout_id"name="invoice_layout_id">
                                  <option value={4} selected="selected">Default</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label htmlFor="invoice_scheme_id">Invoice scheme:*</label>
                              <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                                data-content="Invoice Scheme means invoice numbering format. Select the scheme to be used for this business location<br><small class='text-muted'><i>You can add new Invoice Scheme</b> in Invoice Settings</i></small>"
                                data-html="true"data-trigger="hover"
                              />
                              <div className="input-group">
                                <span className="input-group-addon">
                                <FaInfo />
                                </span>
                                <select className="form-control select2"required=""id="invoice_scheme_id"name="invoice_scheme_id">
                                  <option value={4} selected="selected">Default</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <button className="btn btn-primary pull-right"type="submit">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
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
export default BusinessLocationSetting