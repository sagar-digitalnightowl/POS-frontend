import React from 'react';
import Header from '../../../Components/Header';
import Sidebar from '../../../Components/Sidebar';
import NavbarCrm from './NavbarCrm';
import Footer from '../../../Components/Footer';

const LeadCrm = () => {
    const textStyle= {color:'black'}
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <NavbarCrm />
          </section>
          <section className="content-header no-print">
            <h1>Leads</h1>
          </section>
          <section className="content no-print">
            <div className="box box-solid" id="accordion">
              <div className="box-header with-border" style={{ cursor: 'pointer' }}>
                <h3 className="box-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                    <i className="fa fa-filter" aria-hidden="true" /> Filters
                  </a>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="source">Source:</label>
                        <select className="form-control select2" id="source" name="source">
                          <option selected="selected" value>All</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="life_stage">Life Stage:</label>
                        <select className="form-control select2" id="life_stage" name="life_stage">
                          <option selected="selected" value>All</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="user_id">Assigned to:</label>
                        <select className="form-control select2" id="user_id" name="user_id">
                          <option selected="selected" value>All</option>
                          <option value={4}> MIDDLE PEARL ADMIN </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All Leads</h3>
                <div className="box-tools">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary btn-add-lead pull-right m-5"
                    data-href="https://medipro.affinity-me.com/crm/leads/create"
                  >
                    <i className="fa fa-plus" /> Add
                  </button>
                  <div className="btn-group btn-group-toggle pull-right m-5" data-toggle="buttons">
                    <label className="btn btn-info btn-sm active list">
                      <input
                        type="radio"
                        name="lead_view"
                        defaultValue="list_view"
                        className="lead_view"
                        data-href="https://medipro.affinity-me.com/crm/leads?lead_view=list_view"
                      />
                      List View
                    </label>
                    <label className="btn btn-info btn-sm kanban">
                      <input
                        type="radio"
                        name="lead_view"
                        defaultValue="kanban"
                        className="lead_view"
                        data-href="https://medipro.affinity-me.com/crm/leads?lead_view=kanban"
                      />
                      Kanban Board
                    </label>
                  </div>
                </div>
              </div>
              <div className="box-body" style={{ overflowX: 'auto' }}>
                <table className="table table-bordered table-striped" id="leads_table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Contact ID</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Source</th>
                      <th style={{ width: '200px !important' }}>Last follow up </th>
                      <th style={{ width: '200px !important' }}>Upcoming follow up</th>
                      <th>Life Stage</th>
                      <th>Assigned to</th>
                      <th>Address</th>
                      <th>Tax number</th>
                      <th>Added On</th>
                      <th>Custom Field 1</th>
                      <th>Custom Field 2</th>
                      <th>Custom Field 3</th>
                      <th>Custom Field 4</th>
                      <th>Custom Field 5</th>
                      <th>Custom Field 6</th>
                      <th>Custom Field 7</th>
                      <th>Custom Field 8</th>
                      <th>Custom Field 9</th>
                      <th>Custom Field 10</th>
                    </tr>
                  </thead>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LeadCrm;
