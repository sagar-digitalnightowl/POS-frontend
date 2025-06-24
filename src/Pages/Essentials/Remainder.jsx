import React, { useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import EssentialHeader from './EssentialHeader'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Remainder = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    alert(`Clicked on: ${info.dateStr}`);
  };

  return (
    <div className="wrapper thetop">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <EssentialHeader />
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-solid">
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="box-tools pull-right">
                        <button
                          data-href="#"
                          className="btn btn-sm btn-primary add_reminder"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          Add reminder
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="calendar">
                    <FullCalendar
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={events}dateClick={handleDateClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade reminder"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <form method="POST"
                action="https://medipro.affinity-me.com/essentials/reminder"
                acceptCharset="UTF-8"id="reminder_form">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="exampleModalCenterTitle">Add reminder</h4>
                    <button type="button"className="close"
                      data-dismiss="modal"aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="name">Event Name:*</label>
                        <input
                          className="form-control"
                          required=""
                          name="name"
                          type="text"
                          id="name"
                        />
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-6">
                        <label htmlFor="repeat">Repeat:*</label>
                        <select
                          className="form-control"
                          required=""
                          id="repeat"
                          name="repeat"
                        >
                          <option value="one_time">One time</option>
                          <option value="every_day">Every day</option>
                          <option value="every_week">Every week</option>
                          <option value="every_month">Every month</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="date">Date:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-calendar" />
                            </span>
                            <input
                              className="form-control datepicker"
                              required=""
                              readOnly=""
                              name="date"
                              type="text"
                              defaultValue="22/07/2024"
                              id="date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="time">Start time:*</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <span className="glyphicon glyphicon-time" />
                            </span>
                            <input
                              className="form-control"
                              required=""
                              id="time"
                              readOnly=""
                              name="time"
                              type="text"
                              defaultValue="14:41"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="time">End time:</label>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <span className="glyphicon glyphicon-time" />
                            </span>
                            <input className="form-control"id="end_time"readOnly=""name="end_time"type="text"defaultValue="14:41"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button"className="btn btn-secondary"data-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary save_reminder">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Remainder;
