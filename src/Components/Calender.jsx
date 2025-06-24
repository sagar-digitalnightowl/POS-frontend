import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AddToDoModal from './AddToDoModal';  // Import the AddToDoModal component

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wrapper thetop">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Calendar</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-sm-3">
              <div className="box box-solid">
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="user_id">User:</label>
                        <select className="form-control select2" id="user_id" name="user_id">
                          <option value="">Please Select</option>
                          <option value={4} selected="selected">POS ADMIN</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="location_id">Location:</label>
                        <select className="form-control select2" id="location_id" name="location_id">
                          <option selected="selected" value="">Please Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="clearfix" />
                    {['Bookings', 'Follow ups', 'To Do', 'Holidays', 'Leaves', 'Reminders'].map((event, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="form-group">
                          <label>
                            <input className="input-icheck event_check" defaultChecked="checked"
                              name="events" type="checkbox" defaultValue={event.toLowerCase()} />
                            <span style={{ color: "#007FFF" }}>{event}</span>
                          </label>
                        </div>
                      </div>
                    ))}
                    <div className="col-md-12">
                      <button className="btn btn-block btn-success btn-modal" onClick={openModal}>
                        <i className="fa fa-plus" /> Add To Do
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="box box-solid">
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <AddToDoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Calendar;
