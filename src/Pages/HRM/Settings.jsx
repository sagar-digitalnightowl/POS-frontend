import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import HeaderHrm from './HeaderHrm';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('leaveReference');

  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <HeaderHrm />
          </section>
          <section className="content-header">
            <h1>Essentials and HRM Settings</h1>
          </section>
          <section className="content">
            <form method="POST" action="https://medipro.affinity-me.com/hrm/settings" acceptCharset="UTF-8" id="essentials_settings_form">
              <div className="row">
                <div className="col-xs-12">
                  <div className="col-xs-12 pos-tab-container">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pos-tab-menu">
                      <div className="list-group">
                        <Link
                          to="#"
                          className={`list-group-item text-center ${activeTab === 'leaveReference' ? 'active' : ''}`}
                          onClick={() => setActiveTab('leaveReference')}
                        >
                          Leave
                        </Link>
                        <Link
                          to="#"
                          className={`list-group-item text-center ${activeTab === 'payroll' ? 'active' : ''}`}
                          onClick={() => setActiveTab('payroll')}
                        >
                          Payroll
                        </Link>
                        <Link
                          to="#"
                          className={`list-group-item text-center ${activeTab === 'attendence' ? 'active' : ''}`}
                          onClick={() => setActiveTab('attendence')}
                        >
                          Attendance
                        </Link>
                        <Link
                          to="#"
                          className={`list-group-item text-center ${activeTab === 'salesTarget' ? 'active' : ''}`}
                          onClick={() => setActiveTab('salesTarget')}
                        >
                          Sales Targets
                        </Link>
                        <Link
                          to="#"
                          className={`list-group-item text-center ${activeTab === 'todo' ? 'active' : ''}`}
                          onClick={() => setActiveTab('todo')}
                        >
                          Essentials
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="leaveReference" style={{ display: activeTab === 'leaveReference' ? 'block' : 'none' }}>
                      <div className="pos-tab-content active">
                        <div className="row">
                          <div className="col-xs-4">
                            <div className="form-group">
                              <label htmlFor="leave_ref_no_prefix">Leave Reference No. prefix:</label>
                              <input
                                className="form-control"
                                placeholder="Leave Reference No. prefix"
                                name="leave_ref_no_prefix"
                                type="text"
                                id="leave_ref_no_prefix"
                              />
                            </div>
                          </div>
                          <div className="col-xs-12">
                            <div className="form-group">
                              <label htmlFor="leave_instructions">Leave Instructions:</label>
                              <textarea
                                className="form-control"
                                placeholder="Leave Instructions"
                                name="leave_instructions"
                                cols={50}
                                rows={10}
                                id="leave_instructions"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="payroll" style={{ display: activeTab === 'payroll' ? 'block' : 'none' }}>
                      <div className="pos-tab-content">
                        <div className="row">
                          <div className="col-xs-4">
                            <div className="form-group">
                              <label htmlFor="payroll_ref_no_prefix">Payroll Reference No. prefix:</label>
                              <input
                                className="form-control"
                                placeholder="Payroll Reference No. prefix"
                                name="payroll_ref_no_prefix"
                                type="text"
                                id="payroll_ref_no_prefix"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="attendence" style={{ display: activeTab === 'attendence' ? 'block' : 'none' }}>
                      <div className="pos-tab-content">
                        <div className="row">
                          <div className="col-xs-6">
                            <div className="checkbox">
                              <label>
                                <input
                                  className="input-icheck"
                                  name="is_location_required"
                                  type="checkbox"
                                  defaultValue={1}
                                />
                                Is location required?
                              </label>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <div className="col-xs-12">
                            <strong>Grace Time:</strong>
                          </div>
                          <div className="col-xs-6">
                            <div className="form-group">
                              <label htmlFor="grace_before_checkin">Grace before checkin:</label>
                              <input
                                className="form-control"
                                placeholder="Grace before checkin"
                                step={1}
                                name="grace_before_checkin"
                                type="number"
                                id="grace_before_checkin"
                              />
                              <p className="help-block">(in minute) this time will not counted as overtime</p>
                            </div>
                          </div>
                          <div className="col-xs-6">
                            <div className="form-group">
                              <label htmlFor="grace_after_checkin">Grace after checkin:</label>
                              <input
                                className="form-control"
                                placeholder="Grace after checkin"
                                step={1}
                                name="grace_after_checkin"
                                type="number"
                                id="grace_after_checkin"
                              />
                              <p className="help-block">(in minute) this time will not counted as late</p>
                            </div>
                          </div>
                          <div className="col-xs-6">
                            <div className="form-group">
                              <label htmlFor="grace_before_checkout">Grace before checkout:</label>
                              <input
                                className="form-control"
                                placeholder="Grace before checkout"
                                step={1}
                                name="grace_before_checkout"
                                type="number"
                                id="grace_before_checkout"
                              />
                              <p className="help-block">(in minute) this time will not counted as early left</p>
                            </div>
                          </div>
                          <div className="col-xs-6">
                            <div className="form-group">
                              <label htmlFor="grace_after_checkout">Grace after checkout:</label>
                              <input
                                className="form-control"
                                placeholder="Grace after checkout"
                                step={1}
                                name="grace_after_checkout"
                                type="number"
                                id="grace_after_checkout"
                              />
                              <p className="help-block">(in minute) this time will not counted as overtime</p>
                            </div>
                          </div>
                        </div>
                        <p>
                          <i className="fas fa-info-circle" />
                          <span className="text-danger">"Allow users to enter their own attendance" setting has been moved to role.</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="salesTarget" style={{ display: activeTab === 'salesTarget' ? 'block' : 'none' }}>
                      <div className="pos-tab-content">
                        <div className="row">
                          <div className="col-xs-6">
                            <div className="checkbox">
                              <label>
                                <input
                                  className="input-icheck"
                                  name="calculate_sales_target_commission_without_tax"
                                  type="checkbox"
                                  defaultValue={1}
                                />
                                Calculate Sales Target Commission without Tax
                              </label>
                              <i
                                className="fa fa-info-circle text-info hover-q no-print"
                                aria-hidden="true"
                                data-container="body"
                                data-toggle="popover"
                                data-placement="auto bottom"
                                data-content="If checked sales target commission will be calculated on total sales by the employee without including taxes"
                                data-html="true"
                                data-trigger="hover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="todo" style={{ display: activeTab === 'todo' ? 'block' : 'none' }}>
                      <div className="pos-tab-content">
                        <div className="row">
                          <div className="col-xs-4">
                            <div className="form-group">
                              <label htmlFor="essentials_todos_prefix">Todos ID Prefix:</label>
                              <input
                                className="form-control"
                                placeholder="Todos ID Prefix"
                                name="essentials_todos_prefix"
                                type="text"
                                id="essentials_todos_prefix"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group pull-right">
                    <input
                      className="btn btn-danger"
                      type="submit"
                      defaultValue="Update"
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
