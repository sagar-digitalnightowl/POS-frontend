import React from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import { Link } from 'react-router-dom'

const Barcode = () => {
  return (
    <div><>
    <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Barcodes <small>Manage your barcode settings</small></h1>
        </section>
        <section className="content">
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">All your barcode settings</h3>
              <div className="box-tools">
                <Link className="btn btn-block btn-primary"to="/barcodes/create">
                  <i className="fa fa-plus" /> Add new setting
                </Link>
              </div>
            </div>
            <div className="box-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped"
                  id="barcode_table"
                >
                  <thead>
                    <tr>
                      <th>Sticker Sheet setting Name</th>
                      <th>Sticker Sheet setting Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            {/* /.box-body */}
          </div>
        </section>
        {/* /.content */}
        <div className="scrolltop no-print">
          <div className="scroll icon">
            <i className="fas fa-angle-up" />
          </div>
        </div>
        {/* This will be printed */}
        <section className="invoice print_section" id="receipt_section"></section>
      </div>
      <div
        className="modal fade"
        id="todays_profit_modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Today's profit
              </h4>
            </div>
            <div className="modal-body">
              <input type="hidden" id="modal_today" defaultValue="2024-07-03" />
              <div className="row">
                <div id="todays_profit"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* /.content-wrapper */}
      {/* Main Footer */}
      <footer className="main-footer no-print">
        {/* To the right */}
        {/* <div class="pull-right hidden-xs">
  Anything you want
      </div> */}
        {/* Default to the left */}
        <small>Medipro - V5.30 | Copyright © 2024 All rights reserved.</small>
        <div className="btn-group pull-right">
          <button
            type="button"
            className="btn btn-success btn-xs toggle-font-size"
            data-size="s"
          >
            <i className="fa fa-font" /> <i className="fa fa-minus" />
          </button>
          <button
            type="button"
            className="btn btn-success btn-xs toggle-font-size"
            data-size="m"
          >
            {" "}
            <i className="fa fa-font" />{" "}
          </button>
          <button
            type="button"
            className="btn btn-success btn-xs toggle-font-size"
            data-size="l"
          >
            <i className="fa fa-font" /> <i className="fa fa-plus" />
          </button>
          <button
            type="button"
            className="btn btn-success btn-xs toggle-font-size"
            data-size="xl"
          >
            <i className="fa fa-font" /> <i className="fa fa-plus" />
            <i className="fa fa-plus" />
          </button>
        </div>
      </footer>
      <audio id="success-audio">
        <source
          src="https://medipro.affinity-me.com/audio/success.ogg?v=530"
          type="audio/ogg"
        />
        <source
          src="https://medipro.affinity-me.com/audio/success.mp3?v=530"
          type="audio/mpeg"
        />
      </audio>
      <audio id="error-audio">
        <source
          src="https://medipro.affinity-me.com/audio/error.ogg?v=530"
          type="audio/ogg"
        />
        <source
          src="https://medipro.affinity-me.com/audio/error.mp3?v=530"
          type="audio/mpeg"
        />
      </audio>
      <audio id="warning-audio">
        <source
          src="https://medipro.affinity-me.com/audio/warning.ogg?v=530"
          type="audio/ogg"
        />
        <source
          src="https://medipro.affinity-me.com/audio/warning.mp3?v=530"
          type="audio/mpeg"
        />
      </audio>
    </div>
    <div
      className="modal fade"
      id="task_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="gridSystemModalLabel"
    ></div>
    {/*[if lt IE 9]>
  
  
  <![endif]*/}
    {/* TODO */}
    <div
      className="modal fade"
      id="clock_in_clock_out_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="gridSystemModalLabel"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form
            method="POST"
            action="https://medipro.affinity-me.com/hrm/clock-in-clock-out"
            acceptCharset="UTF-8"
            id="clock_in_clock_out_form"
          >
            <input
              name="_token"
              type="hidden"
              defaultValue="YlCj2lnq868p6S0iZRZaZiKiJC3I2CR60cXLD8g0"
            />
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">
                <span id="clock_in_text">Clock In</span>
                <span id="clock_out_text">Clock Out</span>
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <input type="hidden" name="type" id="type" />
                <div className="form-group col-md-12">
                  <strong>IP Address: 152.58.91.150</strong>
                </div>
                <div className="form-group col-md-12 clock_in_note ">
                  <label htmlFor="clock_in_note">Clock in note:</label>
                  <textarea
                    className="form-control"
                    placeholder="Clock in note"
                    rows={3}
                    name="clock_in_note"
                    cols={50}
                    id="clock_in_note"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group col-md-12 clock_out_note  hide ">
                  <label htmlFor="clock_out_note">Clock out note:</label>
                  <textarea
                    className="form-control"
                    placeholder="Clock out note"
                    rows={3}
                    name="clock_out_note"
                    cols={50}
                    id="clock_out_note"
                    defaultValue={""}
                  />
                </div>
                <input
                  type="hidden"
                  name="clock_in_out_location"
                  id="clock_in_out_location"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    <div
      className="modal fade view_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="gridSystemModalLabel"
    />
  </>
  </div>
  )
}

export default Barcode