import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../../../../Components/Footer'

const Notification = () => {
  return (
    <div><>
    <div className="wrapper thetop">
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Notification Templates</h1>
        </section>
        {/* Main content */}
        <section className="content">
          <form
            method="POST"
            action="https://medipro.affinity-me.com/notification-templates"
            acceptCharset="UTF-8"
          >
            <div className="row">
              <div className="col-md-12">
                <div className="box box-primary">
                  <div className="box-header">
                    <h3 className="box-title">Notifications:</h3>
                  </div>
                  <div className="box-body">
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <Link to="#cn_send_ledger"data-toggle="tab"aria-expanded="true">Send Ledger</Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane  active " id="cn_send_ledger">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}balance_due{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="send_ledger_subject">Email Subject:</label>
                                <input className="form-control"placeholder="Email Subject"id="send_ledger_subject"name="template_data[send_ledger][subject]"type="text"defaultValue=""/>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="send_ledger_cc">CC:</label>
                                <input className="form-control" placeholder="CC"
                                  id="send_ledger_cc"
                                  name="template_data[send_ledger][cc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="send_ledger_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="send_ledger_bcc"
                                  name="template_data[send_ledger][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="send_ledger_email_body">Email Body:</label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="send_ledger_email_body"
                                  rows={6}
                                  name="template_data[send_ledger][email_body]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-md-12  hide ">
                              <div className="form-group">
                                <label htmlFor="send_ledger_sms_body">SMS Body:</label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="send_ledger_sms_body"
                                  rows={6}
                                  name="template_data[send_ledger][sms_body]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-md-12  hide ">
                              <div className="form-group">
                                <label htmlFor="send_ledger_whatsapp_text">Whatsapp Text:</label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="send_ledger_whatsapp_text"
                                  rows={6}
                                  name="template_data[send_ledger][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box box-primary">
                  <div className="box-header">
                    <h3 className="box-title">Customer Notifications:</h3>
                  </div>
                  <div className="box-body">
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <Link to="#cn_new_sale"data-toggle="tab"aria-expanded="true">New Sale</Link>
                        </li>
                        <li>
                          <Link to="#cn_payment_received" data-toggle="tab"aria-expanded="true">Payment Received</Link>
                        </li>
                        <li>
                          <Link to="#cn_payment_reminder"data-toggle="tab"aria-expanded="true">Payment Remider</Link>
                        </li>
                        <li>
                          <Link to="#cn_new_booking"data-toggle="tab"aria-expanded="true">New Booking</Link>
                        </li>
                        <li>
                          <Link to="#cn_new_quotation"data-toggle="tab"aria-expanded="true">New Quotation</Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane  active " id="cn_new_sale">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}invoice_number{"}"}, {"{"}invoice_url{"}"},{" "}
                                {"{"}total_amount{"}"}, {"{"}paid_amount{"}"},{" "}
                                {"{"}due_amount{"}"}, {"{"}cumulative_due_amount
                                {"}"}, {"{"}due_date{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}location_name{"}"}, {"{"}location_address
                                {"}"}, {"{"}location_email{"}"}, {"{"}
                                location_phone{"}"}, {"{"}location_custom_field_1
                                {"}"}, {"{"}location_custom_field_2{"}"}, {"{"}
                                location_custom_field_3{"}"}, {"{"}
                                location_custom_field_4{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}sell_custom_field_1{"}"}, {"{"}
                                sell_custom_field_2{"}"}, {"{"}sell_custom_field_3
                                {"}"}, {"{"}sell_custom_field_4{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}shipping_custom_field_1{"}"}, {"{"}
                                shipping_custom_field_2{"}"}, {"{"}
                                shipping_custom_field_3{"}"}, {"{"}
                                shipping_custom_field_4{"}"}, {"{"}
                                shipping_custom_field_5{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="new_sale_subject">Email Subject:</label>
                                <input className="form-control" placeholder="Email Subject" id="new_sale_subject"
                                  name="template_data[new_sale][subject]"type="text"defaultValue="Thank you from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_sale_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="new_sale_cc"
                                  name="template_data[new_sale][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_sale_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="new_sale_bcc"
                                  name="template_data[new_sale][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="new_sale_email_body">
                                  Email Body:
                                </label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="new_sale_email_body"
                                  rows={6}
                                  name="template_data[new_sale][email_body]"
                                  cols={50}
                                  defaultValue={
                                    "<p>Dear {contact_name},</p>\n\n                    <p>Your invoice number is {invoice_number}<br />\n                    Total amount: {total_amount}<br />\n                    Paid amount: {received_amount}</p>\n\n                    <p>Thank you for shopping with us.</p>\n\n                    <p>{business_logo}</p>\n\n                    <p> </p>"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_sale_sms_body">
                                  SMS Body:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="new_sale_sms_body"
                                  rows={6}
                                  name="template_data[new_sale][sms_body]"
                                  cols={50}
                                  defaultValue={
                                    "Dear {contact_name}, Thank you for shopping with us. {business_name}"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_sale_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="new_sale_whatsapp_text"
                                  rows={6}
                                  name="template_data[new_sale][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-15">
                              <div className="form-group">
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[new_sale][auto_send]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto Send Email{" "}
                                </label>
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[new_sale][auto_send_sms]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto Send SMS{" "}
                                </label>
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[new_sale][auto_send_wa_notif]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto send Whatsapp notification{" "}
                                </label>
                              </div>
                              <p className="help-block">
                                If enabled, sell notification will be
                                automatically sent to customer on creating new
                                sales for them
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_payment_received">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}invoice_number{"}"}, {"{"}payment_ref_number
                                {"}"}, {"{"}received_amount{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="payment_received_subject">
                                  Email Subject:
                                </label>
                                <input
                                  className="form-control"
                                  placeholder="Email Subject"
                                  id="payment_received_subject"
                                  name="template_data[payment_received][subject]"
                                  type="text"
                                  defaultValue="Payment Received, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_received_cc">CC:</label>
                                <input
                                  className="form-control"
                                  placeholder="CC"
                                  id="payment_received_cc"
                                  name="template_data[payment_received][cc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_received_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="payment_received_bcc"
                                  name="template_data[payment_received][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="payment_received_email_body">
                                  Email Body:
                                </label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="payment_received_email_body"
                                  rows={6}
                                  name="template_data[payment_received][email_body]"
                                  cols={50}
                                  defaultValue={
                                    "<p>Dear {contact_name},</p>\n\n                <p>We have received a payment of {received_amount}</p>\n\n                <p>{business_logo}</p>"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_received_sms_body">
                                  SMS Body:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="payment_received_sms_body"
                                  rows={6}
                                  name="template_data[payment_received][sms_body]"
                                  cols={50}
                                  defaultValue={
                                    "Dear {contact_name}, We have received a payment of {received_amount}. {business_name}"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_received_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="payment_received_whatsapp_text"
                                  rows={6}
                                  name="template_data[payment_received][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_payment_reminder">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}invoice_number{"}"}, {"{"}due_amount{"}"},{" "}
                                {"{"}cumulative_due_amount{"}"}, {"{"}due_date
                                {"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_subject">
                                  Email Subject:
                                </label>
                                <input
                                  className="form-control"
                                  placeholder="Email Subject"
                                  id="payment_reminder_subject"
                                  name="template_data[payment_reminder][subject]"
                                  type="text"
                                  defaultValue="Payment Reminder, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_cc">CC:</label>
                                <input
                                  className="form-control"
                                  placeholder="CC"
                                  id="payment_reminder_cc"
                                  name="template_data[payment_reminder][cc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="payment_reminder_bcc"
                                  name="template_data[payment_reminder][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_email_body">
                                  Email Body:
                                </label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="payment_reminder_email_body"
                                  rows={6}
                                  name="template_data[payment_reminder][email_body]"
                                  cols={50}
                                  defaultValue={
                                    "<p>Dear {contact_name},</p>\n\n                    <p>This is to remind you that you have pending payment of {due_amount}. Kindly pay it as soon as possible.</p>\n\n                    <p>{business_logo}</p>"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_sms_body">
                                  SMS Body:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="payment_reminder_sms_body"
                                  rows={6}
                                  name="template_data[payment_reminder][sms_body]"
                                  cols={50}
                                  defaultValue={
                                    "Dear {contact_name}, You have pending payment of {due_amount}. Kindly pay it as soon as possible. {business_name}"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_reminder_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="payment_reminder_whatsapp_text"
                                  rows={6}
                                  name="template_data[payment_reminder][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-15">
                              <div className="form-group">
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[payment_reminder][auto_send]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto Send Email{" "}
                                </label>
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[payment_reminder][auto_send_sms]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto Send SMS{" "}
                                </label>
                                <label className="checkbox-inline">
                                  <input
                                    className="input-icheck"
                                    name="template_data[payment_reminder][auto_send_wa_notif]"
                                    type="checkbox"
                                    defaultValue={1}
                                  />{" "}
                                  Auto send Whatsapp notification{" "}
                                </label>
                              </div>
                              <p className="help-block">
                                If enabled, payment reminder notification will be
                                automatically sent to customer on invoice overdue
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_new_booking">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}table{"}"}, {"{"}start_time{"}"}, {"{"}
                                end_time{"}"}, {"{"}service_staff{"}"}, {"{"}
                                correspondent{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}location{"}"}, {"{"}location_name{"}"}, {"{"}
                                location_address{"}"}, {"{"}location_email{"}"},{" "}
                                {"{"}location_phone{"}"}, {"{"}
                                location_custom_field_1{"}"}, {"{"}
                                location_custom_field_2{"}"}, {"{"}
                                location_custom_field_3{"}"}, {"{"}
                                location_custom_field_4{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="new_booking_subject">
                                  Email Subject:
                                </label>
                                <input
                                  className="form-control"
                                  placeholder="Email Subject"
                                  id="new_booking_subject"
                                  name="template_data[new_booking][subject]"
                                  type="text"
                                  defaultValue="Booking Confirmed - {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_booking_cc">CC:</label>
                                <input
                                  className="form-control"
                                  placeholder="CC"
                                  id="new_booking_cc"
                                  name="template_data[new_booking][cc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_booking_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="new_booking_bcc"
                                  name="template_data[new_booking][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="new_booking_email_body">
                                  Email Body:
                                </label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="new_booking_email_body"
                                  rows={6}
                                  name="template_data[new_booking][email_body]"
                                  cols={50}
                                  defaultValue={
                                    "<p>Dear {contact_name},</p>\n\n                    <p>Your booking is confirmed</p>\n\n                    <p>Date: {start_time} to {end_time}</p>\n\n                    <p>Table: {table}</p>\n\n                    <p>Location: {location}</p>\n\n                    <p>{business_logo}</p>"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_booking_sms_body">
                                  SMS Body:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="new_booking_sms_body"
                                  rows={6}
                                  name="template_data[new_booking][sms_body]"
                                  cols={50}
                                  defaultValue={
                                    "Dear {contact_name}, Your booking is confirmed. Date: {start_time} to {end_time}, Table: {table}, Location: {location}"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_booking_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="new_booking_whatsapp_text"
                                  rows={6}
                                  name="template_data[new_booking][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_new_quotation">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}invoice_number{"}"}, {"{"}total_amount{"}"},{" "}
                                {"{"}quote_url{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}location_name{"}"}, {"{"}location_address
                                {"}"}, {"{"}location_email{"}"}, {"{"}
                                location_phone{"}"}, {"{"}location_custom_field_1
                                {"}"}, {"{"}location_custom_field_2{"}"}, {"{"}
                                location_custom_field_3{"}"}, {"{"}
                                location_custom_field_4{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="new_quotation_subject">
                                  Email Subject:
                                </label>
                                <input
                                  className="form-control"
                                  placeholder="Email Subject"
                                  id="new_quotation_subject"
                                  name="template_data[new_quotation][subject]"
                                  type="text"
                                  defaultValue="Thank you from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_quotation_cc">CC:</label>
                                <input
                                  className="form-control"
                                  placeholder="CC"
                                  id="new_quotation_cc"
                                  name="template_data[new_quotation][cc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_quotation_bcc">BCC:</label>
                                <input
                                  className="form-control"
                                  placeholder="BCC"
                                  id="new_quotation_bcc"
                                  name="template_data[new_quotation][bcc]"
                                  type="email"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="new_quotation_email_body">
                                  Email Body:
                                </label>
                                <textarea
                                  className="form-control ckeditor"
                                  placeholder="Email Body"
                                  id="new_quotation_email_body"
                                  rows={6}
                                  name="template_data[new_quotation][email_body]"
                                  cols={50}
                                  defaultValue={
                                    "<p>Dear {contact_name},</p>\n\n                    <p>Your quotation number is {invoice_number}<br />\n                    Total amount: {total_amount}</p>\n\n                    <p>Thank you for shopping with us.</p>\n\n                    <p>{business_logo}</p>\n\n                    <p> </p>"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_quotation_sms_body">
                                  SMS Body:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="SMS Body"
                                  id="new_quotation_sms_body"
                                  rows={6}
                                  name="template_data[new_quotation][sms_body]"
                                  cols={50}
                                  defaultValue={
                                    "Dear {contact_name}, Thank you for shopping with us. {business_name}"
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_quotation_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Whatsapp Text"
                                  id="new_quotation_whatsapp_text"
                                  rows={6}
                                  name="template_data[new_quotation][whatsapp_text]"
                                  cols={50}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                </div>{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box box-primary">
                  <div className="box-header">
                    <h3 className="box-title">Supplier Notifications:</h3>
                  </div>
                  <div className="box-body">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a
                            href="#cn_new_order"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            New Order{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#cn_payment_paid"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Payment Paid{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#cn_items_received"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Items Received{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#cn_items_pending"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Items Pending{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#cn_purchase_order"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Purchase Order{" "}
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane  active " id="cn_new_order">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}order_ref_number{"}"}, {"{"}total_amount{"}"}
                                , {"{"}received_amount{"}"}, {"{"}due_amount{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}location_name{"}"}, {"{"}location_address
                                {"}"}, {"{"}location_email{"}"}, {"{"}
                                location_phone{"}"}, {"{"}location_custom_field_1
                                {"}"}, {"{"}location_custom_field_2{"}"}, {"{"}
                                location_custom_field_3{"}"}, {"{"}
                                location_custom_field_4{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}purchase_custom_field_1{"}"}, {"{"}
                                purchase_custom_field_2{"}"}, {"{"}
                                purchase_custom_field_3{"}"}, {"{"}
                                purchase_custom_field_4{"}"}, {"{"}
                                contact_business_name{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}
                                contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}shipping_custom_field_1{"}"}, {"{"}
                                shipping_custom_field_2{"}"}, {"{"}
                                shipping_custom_field_3{"}"}, {"{"}
                                shipping_custom_field_4{"}"}, {"{"}
                                shipping_custom_field_5{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="new_order_subject">
                                  Email Subject:
                                </label>
                                <input className="form-control"placeholder="Email Subject"id="new_order_subject"
                                    name="template_data[new_order][subject]"type="text"defaultValue="New Order, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_order_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="new_order_cc"
                                  name="template_data[new_order][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="new_order_bcc">BCC:</label>
                                <input className="form-control"placeholder="BCC"id="new_order_bcc"
                                  name="template_data[new_order][bcc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="new_order_email_body">Email Body:</label>
                                <textarea className="form-control ckeditor"placeholder="Email Body"id="new_order_email_body"
                                  rows={6}name="template_data[new_order][email_body]"cols={50}
                                  defaultValue={"<p>Dear {contact_name},</p>\n\n<p>We have a new order with reference number {order_ref_number}. Kindly process the products as soon as possible.</p>\n\n<p>{business_name}<br />\n{business_logo}</p>"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_order_sms_body">SMS Body:</label>
                                <textarea className="form-control"placeholder="SMS Body"id="new_order_sms_body"
                                  rows={6}name="template_data[new_order][sms_body]"cols={50}
                                  defaultValue={"Dear {contact_name}, We have a new order with reference number {order_ref_number}. Kindly process the products as soon as possible. {business_name}"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="new_order_whatsapp_text">Whatsapp Text:</label>
                                <textarea className="form-control"placeholder="Whatsapp Text"id="new_order_whatsapp_text"
                                  rows={6}name="template_data[new_order][whatsapp_text]"cols={50}defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_payment_paid">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}order_ref_number{"}"}, {"{"}
                                payment_ref_number{"}"}, {"{"}paid_amount{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_name{"}"}, {"{"}contact_business_name
                                {"}"}, {"{"}contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="payment_paid_subject">Email Subject:</label>
                                <input className="form-control" placeholder="Email Subject"id="payment_paid_subject"
                                  name="template_data[payment_paid][subject]"type="text"defaultValue="Payment Paid, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_paid_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="payment_paid_cc"
                                  name="template_data[payment_paid][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="payment_paid_bcc">BCC:</label>
                                <input className="form-control"placeholder="BCC"id="payment_paid_bcc"
                                  name="template_data[payment_paid][bcc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="payment_paid_email_body">Email Body:</label>
                                <textarea className="form-control ckeditor"placeholder="Email Body"id="payment_paid_email_body"
                                  rows={6}name="template_data[payment_paid][email_body]"cols={50}
                                  defaultValue={"<p>Dear {contact_name},</p>\n\n<p>We have paid amount {paid_amount} again invoice number {order_ref_number}.<br />\nKindly note it down.</p>\n\n<p>{business_name}<br />\n{business_logo}</p>"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_paid_sms_body">SMS Body:</label>
                                <textarea className="form-control"placeholder="SMS Body"id="payment_paid_sms_body"
                                  rows={6}name="template_data[payment_paid][sms_body]"cols={50}
                                  defaultValue={"We have paid amount {paid_amount} again invoice number {order_ref_number}.\nKindly note it down. {business_name}"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="payment_paid_whatsapp_text">Whatsapp Text:</label>
                                <textarea className="form-control"placeholder="Whatsapp Text"id="payment_paid_whatsapp_text"rows={6}
                                  name="template_data[payment_paid][whatsapp_text]"cols={50}defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_items_received">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}order_ref_number{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_business_name{"}"}, {"{"}contact_name
                                {"}"}, {"{"}contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="items_received_subject">Email Subject:</label>
                                <input className="form-control"placeholder="Email Subject"id="items_received_subject"
                                  name="template_data[items_received][subject]"type="text"defaultValue="Items received, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="items_received_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="items_received_cc"
                                  name="template_data[items_received][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="items_received_bcc">BCC:</label>
                                <input className="form-control"placeholder="BCC"id="items_received_bcc"
                                   name="template_data[items_received][bcc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="items_received_email_body">Email Body:</label>
                                <textarea className="form-control ckeditor"placeholder="Email Body"id="items_received_email_body"
                                  rows={6}name="template_data[items_received][email_body]"cols={50}
                                  defaultValue={"<p>Dear {contact_name},</p>\n\n<p>We have received all items from invoice reference number {order_ref_number}. Thank you for processing it.</p>\n\n<p>{business_name}<br />\n{business_logo}</p>"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="items_received_sms_body">SMS Body:</label>
                                <textarea className="form-control"placeholder="SMS Body"id="items_received_sms_body"
                                  rows={6}name="template_data[items_received][sms_body]"cols={50}
                                  defaultValue={"We have received all items from invoice reference number {order_ref_number}. Thank you for processing it. {business_name}"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="items_received_whatsapp_text">Whatsapp Text:</label>
                                <textarea className="form-control"placeholder="Whatsapp Text"id="items_received_whatsapp_text"
                                  rows={6}name="template_data[items_received][whatsapp_text]"cols={50}defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_items_pending">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}order_ref_number{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_business_name{"}"}, {"{"}contact_name
                                {"}"}, {"{"}contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="items_pending_subject">Email Subject:</label>
                                <input className="form-control"placeholder="Email Subject"id="items_pending_subject"
                                  name="template_data[items_pending][subject]"type="text"defaultValue="Items Pending, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="items_pending_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="items_pending_cc"
                                  name="template_data[items_pending][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="items_pending_bcc">BCC:</label>
                                <input className="form-control"placeholder="BCC"id="items_pending_bcc"
                                  name="template_data[items_pending][bcc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="items_pending_email_body">Email Body:</label>
                                <textarea className="form-control ckeditor"placeholder="Email Body"id="items_pending_email_body"
                                  rows={6}name="template_data[items_pending][email_body]"cols={50}
                                  defaultValue={"<p>Dear {contact_name},<br />\nThis is to remind you that we have not yet received some items from invoice reference number {order_ref_number}. Please process it as soon as possible.</p>\n\n <p>{business_name}<br />\n{business_logo}</p>"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="items_pending_sms_body">SMS Body:</label>
                                <textarea className="form-control"placeholder="SMS Body"id="items_pending_sms_body"
                                  rows={6}name="template_data[items_pending][sms_body]"cols={50}
                                  defaultValue={"This is to remind you that we have not yet received some items from invoice reference number {order_ref_number} . Please process it as soon as possible.{business_name}"}
                                  />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="items_pending_whatsapp_text">
                                  Whatsapp Text:
                                </label>
                                <textarea className="form-control"placeholder="Whatsapp Text"id="items_pending_whatsapp_text"
                                  rows={6}name="template_data[items_pending][whatsapp_text]"cols={50}defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="cn_purchase_order">
                          <div className="row">
                            <div className="col-md-12">
                              <strong>Available Tags:</strong>
                              <p className="help-block">
                                {"{"}business_name{"}"}, {"{"}business_logo{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}order_ref_number{"}"}
                              </p>
                              <p className="help-block">
                                {"{"}contact_business_name{"}"}, {"{"}contact_name
                                {"}"}, {"{"}contact_custom_field_1{"}"}, {"{"}
                                contact_custom_field_2{"}"}, {"{"}
                                contact_custom_field_3{"}"}, {"{"}
                                contact_custom_field_4{"}"}, {"{"}
                                contact_custom_field_5{"}"}, {"{"}
                                contact_custom_field_6{"}"}, {"{"}
                                contact_custom_field_7{"}"}, {"{"}
                                contact_custom_field_8{"}"}, {"{"}
                                contact_custom_field_9{"}"}, {"{"}
                                contact_custom_field_10{"}"}
                              </p>
                            </div>
                            <div className="col-md-12 mt-10">
                              <div className="form-group">
                                <label htmlFor="purchase_order_subject">
                                  Email Subject:
                                </label>
                                <input className="form-control"placeholder="Email Subject"id="purchase_order_subject"
                                  name="template_data[purchase_order][subject]"type="text"defaultValue="New Purchase Order, from {business_name}"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="purchase_order_cc">CC:</label>
                                <input className="form-control"placeholder="CC"id="purchase_order_cc"
                                  name="template_data[purchase_order][cc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="purchase_order_bcc">BCC:</label>
                                <input className="form-control"placeholder="BCC"id="purchase_order_bcc"
                                  name="template_data[purchase_order][bcc]"type="email"defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="purchase_order_email_body">Email Body:</label>
                                <textarea className="form-control ckeditor"placeholder="Email Body"id="purchase_order_email_body"
                                  rows={6}name="template_data[purchase_order][email_body]"cols={50}
                                  defaultValue={"<p>Dear {contact_name},</p>\n\n<p>We have a new purchase order with reference number {order_ref_number}. The respective invoice is attached here with.</p>\n\n<p>{business_logo}</p>"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="purchase_order_sms_body">SMS Body:</label>
                                <textarea className="form-control" placeholder="SMS Body"id="purchase_order_sms_body"rows={6}
                                  name="template_data[purchase_order][sms_body]"cols={50}
                                  defaultValue={"We have a new purchase order with reference number {order_ref_number}. {business_name}"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 ">
                              <div className="form-group">
                                <label htmlFor="purchase_order_whatsapp_text">Whatsapp Text:</label>
                                <textarea className="form-control" placeholder="Whatsapp Text"id="purchase_order_whatsapp_text"
                                  rows={6}name="template_data[purchase_order][whatsapp_text]"cols={50}defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="callout callout-warning">
                      <p>Business logo will not work in SMS:</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-danger btn-big"> Save </button>
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

export default Notification