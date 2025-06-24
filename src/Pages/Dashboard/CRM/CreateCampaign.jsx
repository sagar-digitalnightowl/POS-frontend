import React, { useState } from 'react';
import Header from '../../../Components/Header';
import Sidebar from '../../../Components/Sidebar';
import NavbarCrm from './NavbarCrm';
import Footer from '../../../Components/Footer';
import { faEnvelopeSquare, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateCampaign = () => {
    const [campaignType, setCampaignType] = useState('');
    const [selectedToOption, setSelectedToOption] = useState('');
    
    const handleCampaignTypeChange = (event) => {
        setCampaignType(event.target.value);
    };

    const handleToChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedToOption(selectedValue);
        
        // Show/hide corresponding sections based on selectedToOption
        document.getElementById('customer').style.display = 'none';
        document.getElementById('leads').style.display = 'none';
        document.getElementById('contacts').style.display = 'none';
        document.getElementById('transaction-activity').style.display = 'none';
        
        if (selectedValue === 'customer') {
            document.getElementById('customer').style.display = 'block';
        } else if (selectedValue === 'lead') {
            document.getElementById('leads').style.display = 'block';
        } else if (selectedValue === 'contact') {
            document.getElementById('contacts').style.display = 'block';
        } else if (selectedValue === 'transaction_activity') {
            document.getElementById('transaction-activity').style.display = 'block';
        }
    };

    return (
        <div>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="no-print">
                        <NavbarCrm />
                    </section>
                    <section className="content-header no-print">
                        <h1>Campaigns <small>Create</small></h1>
                    </section>
                    <section className="content no-print">
                        <div className="box box-solid">
                            <div className="box-body">
                                <form
                                    method="POST"
                                    action="https://medipro.affinity-me.com/crm/campaigns"
                                    acceptCharset="UTF-8"
                                    id="campaign_form"
                                >
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="name">Campaign Name:*</label>
                                                <input
                                                    className="form-control"
                                                    required=""
                                                    name="name"
                                                    type="text"
                                                    id="name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="campaign_type">Campaign Type:*</label>
                                                <select
                                                    className="form-control select2"
                                                    required=""
                                                    style={{ width: '100%' }}
                                                    id="campaign_type"
                                                    name="campaign_type"
                                                    value={campaignType}
                                                    onChange={handleCampaignTypeChange}
                                                >
                                                    <option value="">Please Select</option>
                                                    <option value="sms">Sms</option>
                                                    <option value="email">Email</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="to">To:*</label>
                                                <select
                                                    className="form-control select2"
                                                    required=""
                                                    style={{ width: '100%' }}
                                                    id="to"
                                                    name="to"
                                                    value={selectedToOption}
                                                    onChange={handleToChange}
                                                >
                                                    <option selected="selected" value="">Please Select</option>
                                                    <option value="customer">Customers</option>
                                                    <option value="lead">Leads</option>
                                                    <option value="transaction_activity">Transaction activity</option>
                                                    <option value="contact">Contact</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-8" id='customer' style={{ display: 'none' }}>
                                            <div className="form-group">
                                                <label htmlFor="contact_id">Customers:*</label>
                                                <button type="button" className="btn btn-primary btn-xs select-all">
                                                    Select all
                                                </button>
                                                <button type="button" className="btn btn-primary btn-xs deselect-all">
                                                    Deselect all
                                                </button>
                                                <select className="form-control select2" multiple="" id="contact_id" style={{ width: '100%' }} name="contact_id[]">
                                                    <option value={3}> - Walk-In Customer (CO0001)</option>
                                                    <option value={4}> - test (CO0002)</option>
                                                    <option value={24}> - zamini (CO0004)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-8" id='leads' style={{ display: 'none' }}>
                                            <div className="form-group">
                                                <label htmlFor="lead_id">Leads:*</label>
                                                <button type="button" className="btn btn-primary btn-xs select-all">
                                                    Select all
                                                </button>
                                                <button type="button" className="btn btn-primary btn-xs deselect-all">
                                                    Deselect all
                                                </button>
                                                <select className="form-control select2" multiple="" id="lead_id" style={{ width: '100%' }} name="lead_id[]"/>
                                            </div>
                                        </div>
                                        <div className="col-md-8" id='contacts' style={{ display: 'none' }}>
                                            <div className="form-group">
                                                <label htmlFor="contact">Contact:*</label>
                                                <button type="button" className="btn btn-primary btn-xs select-all">
                                                    Select all
                                                </button>
                                                <button type="button" className="btn btn-primary btn-xs deselect-all">
                                                    Deselect all
                                                </button>
                                                <select className="form-control select2" multiple="" id="contact" style={{ width: '100%' }} name="contact[]">
                                                    <option value={3}> - Walk-In Customer (CO0001)</option>
                                                    <option value={4}> - test (CO0002)</option>
                                                    <option value={24}> - zamini (CO0004)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 transaction_activity_div" id='transaction-activity' style={{ display: 'none' }}>
                                            <div className="form-group">
                                                <label htmlFor="trans_activity">Transaction activity:*</label>
                                                <select className="form-control select2" required="" style={{ width: '100%' }} id="trans_activity" name="trans_activity">
                                                    <option value="has_transactions">Has transactions</option>
                                                    <option value="has_no_transactions">
                                                        Has no transactions
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="in_days">In days:*</label>
                                                <div className="input-group">
                                                    <div className="input-group-addon">In</div>
                                                    <input type="text" className="form-control input_number" id="in_days" placeholder={0} name="in_days" required="" />
                                                    <div className="input-group-addon">Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {campaignType === 'email' && (
                                        <div className="row email_div">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="email_body">Email Body:*</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="email_body"
                                                        required=""
                                                        name="email_body"
                                                        cols={50}
                                                        rows={10}
                                                        defaultValue={''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {campaignType === 'sms' && (
                                        <div className="row sms_div">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="sms_body">Sms Body:</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="sms_body"
                                                        rows={6}
                                                        required=""
                                                        name="sms_body"
                                                        cols={50}
                                                        defaultValue={''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <strong>Available Tags:</strong>
                                    <p className="help-block">
                                        {"{"}contact_name{"}"}, {"{"}campaign_name{"}"}, {"{"}
                                        business_name{"}"}
                                    </p>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm pull-right submit-button draft m-5"
                                        name="send_notification"
                                        value={0}
                                        data-style="expand-right"
                                    >
                                        <span className="ladda-label">
                                            <FontAwesomeIcon icon={faSave} /> Draft
                                        </span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-warning btn-sm pull-right submit-button notif m-5"
                                        name="send_notification"
                                        value={1}
                                        data-style="expand-right"
                                    >
                                        <span className="ladda-label">
                                            <FontAwesomeIcon icon={faEnvelopeSquare} /> Send Notification
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default CreateCampaign;
