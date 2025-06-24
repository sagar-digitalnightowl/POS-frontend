import React, { useState } from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'

const FollowUp = () => {
    const [activeTab, setActiveTab] = useState('all_followup_tab');

    const handleTabClick = (tab) => {setActiveTab(tab);};
    const textStyle={color:'black'}
  return (
    <div>
  <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="no-print">
       <NavbarCrm/>
      </section>
      <section className="content-header no-print">
        <h1>Follow ups</h1>
      </section>
      <section className="content no-print">
        <div className="box  box-solid " id="accordion">
          <div className="box-header with-border" style={{ cursor: "pointer" }}>
            <h3 className="box-title">
              <Link data-toggle="collapse"data-parent="#accordion"to="#collapseFilter">
                <FontAwesomeIcon icon={faFilter} /> Filters
              </Link>
            </h3>
          </div>
          <div id="collapseFilter"className="panel-collapse active collapse  in "aria-expanded="true">
            <div className="box-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="contact_id_filter">Contact:</label>
                    <select className="form-control select2"id="contact_id_filter"name="contact_id_filter">
                      <option selected="selected" value="">All</option>
                      <option value={3}>- Walk-In Customer (CO0001) (Customer)</option>
                      <option value={4}> - test (CO0002) (Customer)</option>
                      <option value={24}> - zamini (CO0004) (Customer)</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="assgined_to_filter">Assgined to:</label>
                    <select className="form-control select2"id="assgined_to_filter"name="assgined_to_filter">
                      <option selected="selected" value="">All</option>
                      <option value={4}> POS APPLICATION </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="status_filter">Status:</label>
                    <select className="form-control select2"id="status_filter"name="status_filter">
                      <option selected="selected" value="">All</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="open">Open</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="schedule_type_filter">Follow Up Type:</label>
                    <select className="form-control select2"id="schedule_type_filter"name="schedule_type_filter">
                      <option selected="selected" value="">All</option>
                      <option value="call">Call</option>
                      <option value="sms">Sms</option>
                      <option value="meeting">Meeting</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="follow_up_date_range">Date Range:</label>
                    <input
                      placeholder="Select a date range"
                      className="form-control"
                      readOnly=""
                      name="follow_up_date_range"
                      type="text"
                      id="follow_up_date_range"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="follow_up_by_filter">Follow up by:</label>
                    <select className="form-control select2"id="follow_up_by_filter"name="follow_up_by_filter">
                      <option selected="selected" value="">All</option>
                      <option value="payment_status">Payment Status</option>
                      <option value="orders">Orders</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="followup_category_id_filter">
                      Followup Category:
                    </label>
                    <select className="form-control select2"id="followup_category_id_filter"name="followup_category_id_filter">
                      <option selected="selected" value="">All</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-md-12">
            <div className="box box box-solid">
              <div className="box-header">
                <h3 className="box-title">All Follow ups</h3>
                <div className="box-tools">
                  <button type="button"className="btn btn-primary btn-add-schedule">
                  <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                  <button type="button"className="btn btn-success"data-toggle="modal"data-target="#advance_followup_modal">
                  <FontAwesomeIcon icon={faPlus} /> Add advance follow up
                  </button>
                </div>
              </div>
              <div className="box-body">
                <div className="col-sm-12">
                  <div className="nav-tabs-custom">
                    <ul className="nav nav-tabs">
                    <li className={activeTab === 'all_followup_tab' ? 'active' : ''}>
                    <Link to="#all_followup_tab" data-toggle="tab" onClick={() => handleTabClick('all_followup_tab')}>
                      Follow ups
                    </Link>
                      </li>
                      <li className={activeTab === 'recur_followup_tab' ? '' : ''}>
                        <Link to="#recur_followup_tab" data-toggle="tab" onClick={() => handleTabClick('recur_followup_tab')}>
                          Recurring Follow up
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                    <div className={`tab-pane ${activeTab === 'all_followup_tab' ? 'active' : ''}`} id="all_followup_tab">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped"id="follow_up_table"style={{ width: "100%" }}>
                            <thead>
                              <tr>
                                <th>Action</th>
                                <th>Contact </th>
                                <th>Start Datetime</th>
                                <th>End Datetime</th>
                                <th>Status</th>
                                <th>Follow Up Type</th>
                                <th>Followup Category</th>
                                <th>Assigned to</th>
                                <th>Description </th>
                                <th>Additional info </th>
                                <th>Title</th>
                                <th>Added By </th>
                                <th>Added On </th>
                              </tr>
                            </thead>
                            <tbody />
                            <tfoot>
                              <tr className="bg-gray font-17 footer-total text-center">
                                <td colSpan={5}>
                                  <strong>Total:</strong>
                                </td>
                                <td className="footer_follow_up_status_count" />
                                <td className="footer_follow_up_type_count" />
                                <td colSpan={6} />
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      <div className={`tab-pane ${activeTab === 'recur_followup_tab' ? 'active' : ''}`} id="recur_followup_tab">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped"id="recursive_follow_up_table"style={{ width: "100%" }}>
                            <thead>
                              <tr>
                                <th>Action</th>
                                <th>Status</th>
                                <th>Follow Up Type</th>
                                <th>Followup Category</th>
                                <th>Follow up by</th>
                                <th>In days</th>
                                <th>Assigned to</th>
                                <th>Description </th>
                                <th>Additional info </th>
                                <th>Title</th>
                                <th>Added By </th>
                                <th>Added On </th>
                              </tr>
                            </thead>
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

export default FollowUp