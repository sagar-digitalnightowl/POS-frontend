import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Footer from '../../Components/Footer'

const AddNewInvoice = () => {
  return (
    <div><>
    <div className="wrapper thetop">
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Add new invoice layout</h1>
        </section>
        <section className="content">
          <form method="POST" action="/invoice-layouts"acceptCharset="UTF-8"id="add_invoice_layout_form" encType="multipart/form-data">
            <div className="box box-solid">
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name">Layout name:*</label>
                      <input className="form-control"required=""placeholder="Layout name"name="name"type="text"id="name"/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="design">Design:*</label>
                      <select className="form-control" id="design" name="design">
                        <option value="classic" selected="selected">Classic (For normal printer)</option>
                        <option value="elegant">Elegant (For normal printer)</option>
                        <option value="detailed">Detailed (For normal printer)</option>
                        <option value="columnize-taxes">Columnize Taxes (For normal printer)</option>
                        <option value="slim">Slim (Recommended for thermal line receipt printer, 80mmpaper size)</option>
                        <option value="slim2">Slim 2 (Recommended for thermal line receipt printer,80mm and 58mm paper size)</option>
                        <option value="slim3">Slim 3 (Recommended for thermal line receipt printer,58mm paper size)</option>
                        <option value="f_custom">Full Custom (For normal printer)</option>
                        <option value="basic">Basic (For normal printer)</option>
                        <option value="basic_new">Basic New (For normal printer)</option>
                      </select>
                      <span className="help-block">Used for browser based printing</span>
                    </div>
                    <div className="form-group hide" id="columnize-taxes">
                      <div className="col-md-3">
                        <input type="text"className="form-control"name="table_tax_headings[]"required="required"placeholder="tax 1 name"disabled=""/>
                        <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true"
                          data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Enter tax name for headings, heading should be present in tax name. For example headings can be: CGST, SGST, IGST & CESS. For tax names CGST@8% or CGST@10%; SGST@10% or SGST@8% etc"
                          data-html="true"data-trigger="hover"
                        />
                      </div>
                      <div className="col-md-3">
                        <input type="text" className="form-control"name="table_tax_headings[]"placeholder="tax 2 name"disabled=""/>
                      </div>
                      <div className="col-md-3">
                        <input type="text" className="form-control"name="table_tax_headings[]"placeholder="tax 3 name"disabled=""/>
                      </div>
                      <div className="col-md-3">
                        <input type="text"className="form-control"name="table_tax_headings[]"placeholder="tax 4 name"disabled=""/>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-6">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"id="show_letter_head"name="show_letter_head"type="checkbox"defaultValue={1}/>
                          Show letter head
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 letter_head_input hide">
                    <div className="form-group">
                      <label htmlFor="letter_head">Letter Head:</label>
                      <input accept="image/*" name="letter_head" type="file"id="letter_head"/>
                      <span className="help-block">
                        Upload a letterhead image containing all details of your
                        business. Letterhead will be added at the top of the
                        invoices. <br /> Max 1 MB, jpeg,gif,png formats only.
                      </span>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12 bg-light-blue-gradient show-for-full hide">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Header Left</label>
                        <select className="form-control" name="header_left">
                          <option value="empty">Empty</option>
                          <option value="cust_data">Customer &amp; Invoice Info</option>
                          <option value="only_cust">Customer Info</option>
                          <option value="only_inv">Invoice Info (Invoice no. etc)</option>
                          <option value="logo_data">Logo</option>
                          <option value="comp_data">Company Info</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Header Middle</label>
                        <select className="form-control" name="header_mid">
                          <option value="empty">Empty</option>
                          <option value="cust_data">Customer &amp; Invoice Info</option>
                          <option value="only_cust">Customer Info</option>
                          <option value="only_inv">Invoice Info (Invoice no. etc)</option>
                          <option value="logo_data">Logo</option>
                          <option value="comp_data">Company Info</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Header Right</label>
                        <select className="form-control" name="header_right">
                          <option value="empty">Empty</option>
                          <option value="cust_data">Customer &amp; Invoice Info</option>
                          <option value="only_inv">Invoice Info (Invoice no. etc)</option>
                          <option value="only_cust">Customer Info</option>
                          <option value="logo_data">Logo</option>
                          <option value="comp_data">Company Info</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Footer Left</label>
                        <select className="form-control" name="footer_left">
                          <option value="empty">Empty</option>
                          <option value="stamp">Stamp</option>
                          <option value="qr_barcode">Qr/Barcode</option>
                          <option value="footer_text">Note</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Footer Middle</label>
                        <select className="form-control" name="footer_mid">
                          <option value="empty">Empty</option>
                          <option value="stamp">Stamp</option>
                          <option value="qr_barcode">Qr/Barcode</option>
                          <option value="footer_text">Note</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Footer Right</label>
                        <select className="form-control" name="footer_right">
                          <option value="empty">Empty</option>
                          <option value="stamp">Stamp</option>
                          <option value="qr_barcode">Qr/Barcode</option>
                          <option value="footer_text">Note</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Logo */}
                  <div className="col-sm-6 hide-for-letterhead">
                    <div className="form-group">
                      <label htmlFor="logo">Invoice Logo:</label>
                      <input accept="image/*" name="logo" type="file" id="logo" />
                      <span className="help-block">Max 1 MB, jpeg,gif,png formats only.</span>
                    </div>
                  </div>
                  <div className="col-sm-6 hide-for-letterhead">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="show_logo"type="checkbox"defaultValue={1}/>
                          Show invoice Logo
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 hide-for-letterhead">
                    <div className="form-group">
                      <label htmlFor="header_text">Header text:</label>
                      <textarea className="form-control"placeholder="Header text"rows={3}name="header_text"
                        cols={50}id="header_text"defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="row hide-for-letterhead">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_heading_line1">
                        Sub Heading Line 1:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Sub Heading Line 1"
                        name="sub_heading_line1"
                        type="text"
                        id="sub_heading_line1"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_heading_line2">Sub Heading Line 2:</label>
                      <input className="form-control" placeholder="Sub Heading Line 2"name="sub_heading_line2"
                        type="text"id="sub_heading_line2"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_heading_line3">Sub Heading Line 3:</label>
                      <input className="form-control"placeholder="Sub Heading Line 3"name="sub_heading_line3"
                        type="text"id="sub_heading_line3"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_heading_line4">Sub Heading Line 4:</label>
                      <input className="form-control"placeholder="Sub Heading Line 4"
                        name="sub_heading_line4"type="text"id="sub_heading_line4"
                      />
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_heading_line5">Sub Heading Line 5:</label>
                      <input className="form-control"placeholder="Sub Heading Line 5"name="sub_heading_line5"
                        type="text"id="sub_heading_line5"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 show-for-full hide">
                    <div className="form-group">
                      <label htmlFor="invoice_font_size">Invoice Font Size:</label>
                      <input className="form-control"placeholder="Invoice Font Size"
                        name="invoice_font_size"type="number"defaultValue={14}id="invoice_font_size"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="invoice_heading">Invoice heading:</label>
                      <input className="form-control"placeholder="Invoice heading"
                        name="invoice_heading"type="text"defaultValue="Invoice"id="invoice_heading"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="invoice_heading_not_paid">Heading Suffix for not paid:</label>
                      <input className="form-control"placeholder="Heading Suffix for not paid"name="invoice_heading_not_paid"
                        type="text"id="invoice_heading_not_paid"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="invoice_heading_paid">Heading Suffix for paid:</label>
                      <input className="form-control"placeholder="Heading Suffix for paid"name="invoice_heading_paid"
                        type="text"id="invoice_heading_paid"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="proforma_heading">Proforma invoice heading:</label>
                      <i
                        className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="Proforma invoice heading is used while providing Proforma to customers."
                        data-html="true"
                        data-trigger="hover"
                      />{" "}
                      <input
                        className="form-control"
                        placeholder="Proforma invoice heading"
                        id="proforma_heading"
                        name="common_settings[proforma_heading]"
                        type="text"
                        defaultValue="Proforma invoice"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="quotation_heading">
                        Quotation Heading:
                      </label>
                      <i
                        className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="Quotation or Estimates heading is used while providing quotation to customers."
                        data-html="true"
                        data-trigger="hover"
                      />{" "}
                      <input
                        className="form-control"
                        placeholder="Quotation Heading"
                        name="quotation_heading"
                        type="text"
                        defaultValue="Quotation"
                        id="quotation_heading"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sales_order_heading">
                        Sales Order Heading:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Sales Order Heading"
                        id="sales_order_heading"
                        name="common_settings[sales_order_heading]"
                        type="text"
                        defaultValue="Sales Order"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="invoice_no_prefix">
                        Invoice no. label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Invoice no. label"
                        name="invoice_no_prefix"
                        type="text"
                        defaultValue="Invoice No."
                        id="invoice_no_prefix"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="quotation_no_prefix">
                        Quotation no. label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Quotation no. label"
                        name="quotation_no_prefix"
                        type="text"
                        defaultValue="Quotation number"
                        id="quotation_no_prefix"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="date_label">Date Label:</label>
                      <input
                        className="form-control"
                        placeholder="Date Label"
                        name="date_label"
                        type="text"
                        defaultValue="Invoice Date"
                        id="date_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="due_date_label">Due date label:</label>
                      <input
                        className="form-control"
                        placeholder="Due date label"
                        id="due_date_label"
                        name="common_settings[due_date_label]"
                        type="text"
                        defaultValue="Due Date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_due_date]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show due date
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="date_time_format">Date time format:</label>
                      <input
                        className="form-control"
                        placeholder="Date time format"
                        name="date_time_format"
                        type="text"
                        id="date_time_format"
                      />
                      <p className="help-block">
                        Enter date and time format in{" "}
                        <a
                          target="_blank"
                          href="http://php.net/manual/en/function.date.php"
                        >
                          PHP datetime format
                        </a>
                        . If blank business date time format will be applied
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sales_person_label">
                        Sales Person Label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Sales Person Label"
                        name="sales_person_label"
                        type="text"
                        id="sales_person_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="commission_agent_label">
                        Commission agent label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Commission agent label"
                        name="commission_agent_label"
                        type="text"
                        defaultValue="Commission Agent"
                        id="commission_agent_label"
                      />
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_business_name"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show business name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_location_name"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show location name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_sales_person"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show Sales Person
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_commission_agent"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show commission agent
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="sell_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field1"
                          />{" "}
                          Custom Field 1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="sell_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field2"
                          />{" "}
                          Custom Field 2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="sell_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field3"
                          />{" "}
                          Custom Field 3
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="sell_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field4"
                          />{" "}
                          Custom Field 4
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <h4>Fields for customer details:</h4>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_customer"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show Customer information
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="customer_label">Customer Label:</label>
                      <input
                        className="form-control"
                        placeholder="Customer Label"
                        name="customer_label"
                        type="text"
                        defaultValue="Customer"
                        id="customer_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_client_id"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show client ID
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="client_id_label">Client ID Label:</label>
                      <input
                        className="form-control"
                        placeholder="Client ID Label"
                        name="client_id_label"
                        type="text"
                        id="client_id_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="client_tax_label">
                        Client tax number label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Client tax number label"
                        name="client_tax_label"
                        type="text"
                        id="client_tax_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_reward_point"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show reward point
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="contact_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field1"
                          />{" "}
                          Custom Field 1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="contact_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field2"
                          />{" "}
                          Custom Field 2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="contact_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field3"
                          />{" "}
                          Custom Field 3
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="contact_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field4"
                          />{" "}
                          Custom Field 4
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row hide-for-letterhead">
                  <div className="col-sm-12">
                    <h4>Fields to be shown in location address:</h4>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_landmark"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Landmark
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_city"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          City
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_state"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          State
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_country"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Country
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_zip_code"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Zip Code
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_cr_number"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          CR Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="location_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field1"
                          />{" "}
                          Custom field 1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="location_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field2"
                          />{" "}
                          Custom field 2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="location_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field3"
                          />{" "}
                          Custom field 3
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="location_custom_fields[]"
                            type="checkbox"
                            defaultValue="custom_field4"
                          />{" "}
                          Custom field 4
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* Shop Communication details */}
                  <div className="col-sm-12">
                    <h4>Fields for Communication details:</h4>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_mobile_number"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Mobile number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_alternate_number"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Alternate number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_tel_number"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Tel
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_email"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <h4>Fields for Tax details:</h4>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_tax_1"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Tax 1 details
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_tax_2"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Tax 2 details
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="table_product_label">Product Label:</label>
                      <input
                        className="form-control"
                        placeholder="Product Label"
                        name="table_product_label"
                        type="text"
                        defaultValue="Product"
                        id="table_product_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="table_qty_label">Quantity Label:</label>
                      <input
                        className="form-control"
                        placeholder="Quantity Label"
                        name="table_qty_label"
                        type="text"
                        defaultValue="Quantity"
                        id="table_qty_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="table_unit_price_label">
                        Unit Price Label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Unit Price Label"
                        name="table_unit_price_label"
                        type="text"
                        defaultValue="Unit Price"
                        id="table_unit_price_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="table_subtotal_label">
                        Subtotal Label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Subtotal Label"
                        name="table_subtotal_label"
                        type="text"
                        defaultValue="Subtotal"
                        id="table_subtotal_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="cat_code_label">
                        Category or HSN code label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="HSN or Category Code"
                        name="cat_code_label"
                        type="text"
                        defaultValue="HSN"
                        id="cat_code_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="total_quantity_label">
                        Total quantity label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Total quantity label"
                        id="total_quantity_label"
                        name="common_settings[total_quantity_label]"
                        type="text"
                        defaultValue="Total Quantity"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="item_discount_label">
                        Item discount label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Item discount label"
                        id="item_discount_label"
                        name="common_settings[item_discount_label]"
                        type="text"
                        defaultValue="Discount"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="item_sku_label">Item SKU Label:</label>
                      <input
                        className="form-control"
                        placeholder="Item SKU Label"
                        id="item_sku_label"
                        name="common_settings[item_sku_label]"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="discounted_unit_price_label">
                        Discounted unit price label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Discounted unit price label"
                        id="discounted_unit_price_label"
                        name="common_settings[discounted_unit_price_label]"
                        type="text"
                        defaultValue="Price after discount"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <h4>Product details to be shown:</h4>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_brand"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show brand
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_sku"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show SKU
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_cat_code"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show category code or HSN code
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_sale_description"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show sale description
                        </label>
                      </div>
                      <p className="help-block">
                        (Product IMEI or Serial Number)
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_product_description]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show product description
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="product_custom_fields[]"
                            type="checkbox"
                            defaultValue="product_custom_field1"
                          />{" "}
                          Custom Field1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="product_custom_fields[]"
                            type="checkbox"
                            defaultValue="product_custom_field2"
                          />{" "}
                          Custom Field2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="product_custom_fields[]"
                            type="checkbox"
                            defaultValue="product_custom_field3"
                          />{" "}
                          Custom Field3
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="product_custom_fields[]"
                            type="checkbox"
                            defaultValue="product_custom_field4"
                          />{" "}
                          Custom Field4
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Custom Fields Show</label>
                      <select className="form-control" name="custom_f_direction">
                        <option value="up">Up From Product Name</option>
                        <option value="below">Below Product Name</option>
                        <option value="before">Before Product Column</option>
                        <option value="after">After Product Column</option>
                      </select>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_image"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show product image
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_warranty_name]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show warranty name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_warranty_exp_date]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show warranty expiry date
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_warranty_description]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show warranty description
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_base_unit_details]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show base unit details (If applicable)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="sub_total_label">Subtotal label:</label>
                      <input
                        className="form-control"
                        placeholder="Subtotal label"
                        name="sub_total_label"
                        type="text"
                        defaultValue="Subtotal"
                        id="sub_total_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="discount_label">Discount label:</label>
                      <input
                        className="form-control"
                        placeholder="Discount label"
                        name="discount_label"
                        type="text"
                        defaultValue="Discount"
                        id="discount_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="tax_label">Tax label:</label>
                      <input
                        className="form-control"
                        placeholder="Tax label"
                        name="tax_label"
                        type="text"
                        defaultValue="Tax"
                        id="tax_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="total_label">Total label:</label>
                      <input
                        className="form-control"
                        placeholder="Total label"
                        name="total_label"
                        type="text"
                        defaultValue="Total"
                        id="total_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="total_items_label">
                        Total items label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Total items label"
                        id="total_items_label"
                        name="common_settings[total_items_label]"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="round_off_label">Round off label:</label>
                      <input
                        className="form-control"
                        placeholder="Round off label"
                        name="round_off_label"
                        type="text"
                        defaultValue="Round Off"
                        id="round_off_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="total_due_label">
                        Total Due Label (Current sale):
                      </label>
                      <input
                        className="form-control"
                        placeholder="Total Due Label"
                        name="total_due_label"
                        type="text"
                        defaultValue="Due"
                        id="total_due_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="paid_label">Amount Paid Label:</label>
                      <input
                        className="form-control"
                        placeholder="Amount Paid Label"
                        name="paid_label"
                        type="text"
                        defaultValue="Total paid"
                        id="paid_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            defaultChecked="checked"
                            name="show_payments"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show Payment information
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Barcode */}
                  <div className="col-sm-3">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_barcode"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show Barcode
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="prev_bal_label">
                        Total Due Label (All sales):
                      </label>
                      <input
                        className="form-control"
                        placeholder="Total Due Label"
                        name="prev_bal_label"
                        type="text"
                        defaultValue=""
                        id="prev_bal_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_previous_bal"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show total balance due (All sales)
                        </label>
                        <i
                          className="fa fa-info-circle text-info hover-q no-print "
                          aria-hidden="true"
                          data-container="body"
                          data-toggle="popover"
                          data-placement="auto bottom"
                          data-content="Check this field to show sum of balance dues for all sales of the customer if exists"
                          data-html="true"
                          data-trigger="hover"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="change_return_label">
                        Change return label:
                      </label>{" "}
                      <i
                        className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="Change return is the amount to be returned to the customer if excess payment is done."
                        data-html="true"
                        data-trigger="hover"
                      />{" "}
                      <input
                        className="form-control"
                        placeholder="Change return label"
                        name="change_return_label"
                        type="text"
                        defaultValue="Change Return"
                        id="change_return_label"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 hide" id="hide_price_div">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[hide_price]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Hide all prices
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>
                        <input
                          className="input-icheck"
                          name="common_settings[show_total_in_words]"
                          type="checkbox"
                          defaultValue={1}
                        />{" "}
                        Show total in words
                      </label>{" "}
                      <i
                        className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="php-intl extention need to be enabled"
                        data-html="true"
                        data-trigger="hover"
                      />{" "}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="word_format">Word Format:</label>
                      <i
                        className="fa fa-info-circle text-info hover-q no-print "
                        aria-hidden="true"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="auto bottom"
                        data-content="In international format big numbers are represented in million, billion and trillion where as in indian format it is represented in lakhs and crores"
                        data-html="true"
                        data-trigger="hover"
                      />{" "}
                      <select
                        className="form-control"
                        id="word_format"
                        name="common_settings[num_to_word_format]"
                      >
                        <option value="international" selected="selected">
                          International
                        </option>
                        <option value="indian">Indian</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="tax_summary_label">
                        Tax summary label:
                      </label>
                      <input
                        className="form-control"
                        placeholder="Tax summary label"
                        id="tax_summary_label"
                        name="common_settings[tax_summary_label]"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-6 hide">
                    <div className="form-group">
                      <label htmlFor="highlight_color">Highlight color:</label>
                      <input
                        className="form-control"
                        placeholder="Highlight color"
                        name="highlight_color"
                        type="text"
                        defaultValue="#000000"
                        id="highlight_color"
                      />
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-md-12 hide">
                    <hr />
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="footer_text">Footer text:</label>
                      <textarea
                        className="form-control"
                        placeholder="Footer text"
                        rows={3}
                        name="footer_text"
                        cols={50}
                        id="footer_text"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <br />
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="is_default"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Set as default
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">QR Code</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="show_qr_code"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show QR Code
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[show_qr_code_label]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          Show Labels
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="common_settings[zatca_qr]"
                            type="checkbox"
                            defaultValue={1}
                          />{" "}
                          ZATCA (Fatoora) QR code
                        </label>
                        <i
                          className="fa fa-info-circle text-info hover-q no-print "
                          aria-hidden="true"
                          data-container="body"
                          data-toggle="popover"
                          data-placement="auto bottom"
                          data-content="For Saudi Arabia country"
                          data-html="true"
                          data-trigger="hover"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-md-12">
                    <h4>Fields to be shown:</h4>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="qr_code_fields[]"
                            type="checkbox"
                            defaultValue="business_name"
                          />{" "}
                          Business Name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="qr_code_fields[]"
                            type="checkbox"
                            defaultValue="address"
                          />{" "}
                          Business location address
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            className="input-icheck"
                            name="qr_code_fields[]"
                            type="checkbox"
                            defaultValue="tax_1"
                          />{" "}
                          Business tax 1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="tax_2"/>
                          Business tax 2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="invoice_no"/>
                          Invoice No.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="invoice_datetime"/>
                          Invoice Datetime
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="subtotal"/>
                          Subtotal
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="total_amount"/>
                          Total amount with tax
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="total_tax"/>
                          Total Tax
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="customer_name"/>
                          Customer name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input className="input-icheck"name="qr_code_fields[]"type="checkbox"defaultValue="invoice_url"/>
                          Invoice URL
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-body">
                <div className="box-header">
                  <h3 className="box-title">Restaurant module settings</h3>
                </div>
                <div className="row"></div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Repair Module Settings</h3>
              </div>
              <div className="box-body">
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_repair_status]"type="checkbox"defaultValue={1}/>
                        Show repair status
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][repair_status_label]">Repair status label:</label>
                    <input className="form-control"placeholder="Repair status label"name="module_info[repair][repair_status_label]"type="text"defaultValue="Repair Status"id="module_info[repair][repair_status_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_repair_warranty]"type="checkbox"defaultValue={1}/>
                        Show repair warranty
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][repair_warranty_label]">Repair warranty label:</label>
                    <input className="form-control"placeholder="Repair warranty label"name="module_info[repair][repair_warranty_label]"type="text"defaultValue="Repair Warranty"id="module_info[repair][repair_warranty_label]" />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_brand]"type="checkbox"defaultValue={1}/>
                        Show Brand
                        </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][brand_label]"> Brand Label:</label>
                    <input
                      className="form-control"placeholder="Brand Label"name="module_info[repair][brand_label]"type="text"defaultValue="Brand"id="module_info[repair][brand_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_device]"type="checkbox"defaultValue={1}/>
                        Show Device
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][device_label]">Device Label:</label>
                    <input className="form-control"placeholder="Device Label" name="module_info[repair][device_label]"type="text"defaultValue="Device"id="module_info[repair][device_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_model]"type="checkbox"defaultValue={1}/>
                        Show Model
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][model_no_label]">Model number label:</label>
                    <input className="form-control"placeholder="Model number label"name="module_info[repair][model_no_label]"type="text"defaultValue="Model No."id="module_info[repair][model_no_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_serial_no]"type="checkbox"defaultValue={1}/>
                        Show serial number
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][serial_no_label]">Serial number label:</label>
                    <input className="form-control"placeholder="Serial number label"name="module_info[repair][serial_no_label]"type="text"defaultValue="Serial No."id="module_info[repair][serial_no_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_defects]"type="checkbox"defaultValue={1}/>
                        Show defects
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][defects_label]"> Defect label:</label>
                    <input className="form-control"placeholder="Defect label"name="module_info[repair][defects_label]"type="text"defaultValue="Defects"id="module_info[repair][defects_label]"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input className="input-icheck"defaultChecked="checked"name="module_info[repair][show_repair_checklist]"type="checkbox"defaultValue={1}/>
                        Show repair checklist
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label htmlFor="module_info[repair][repair_checklist_label]"> Repair checklist label:</label>
                    <input className="form-control"placeholder="Repair checklist label"name="module_info[repair][repair_checklist_label]"type="text"defaultValue="Repair Checklist"id="module_info[repair][repair_checklist_label]"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-header with-border">
                <h3 className="box-title">Credit Note / Sell Return Details</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="cn_heading">Heading:</label>
                      <input className="form-control" placeholder="Heading"name="cn_heading"type="text"defaultValue="Credit Note"id="cn_heading"/>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="cn_no_label">Reference Number:</label>
                      <input className="form-control"placeholder="Reference Number"name="cn_no_label"type="text"defaultValue="Reference No"id="cn_no_label"/>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label htmlFor="cn_amount_label">Total Amount:</label>
                      <input className="form-control"placeholder="Total Amount"name="cn_amount_label"type="text"defaultValue="Credit Amount"id="cn_amount_label"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <button type="submit" className="btn btn-primary btn-big">
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <Footer/>
    </div>
  </>
  </div>
  )
}

export default AddNewInvoice