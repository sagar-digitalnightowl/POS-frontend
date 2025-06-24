import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import HeaderHrm from './HeaderHrm';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faCalendarAlt,
  faPlus,
  faInfoCircle,
  faUserClock,
  faCheckSquare,
  faUserCheck,
  faCalendar,
  faHourglassHalf,
  faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons';
import ShiftTab from './AttendenceComponents/ShiftTab';
import AttendanceTab from './AttendenceComponents/AttendanceTab';
import AttendanceByShiftTab from './AttendenceComponents/AttendanceByShiftTab';
import AttendanceByDateTab from './AttendenceComponents/AttendanceByDateTab';
import ImportAttendanceTab from './AttendenceComponents/ImportAttendanceTab';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('shifts_tab');
  const [showModal, setShowModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [shiftDetails, setShiftDetails] = useState({
    name: '',
    shiftType: '',
    startTime: '',
    endTime: '',
    holiday: '',
    autoClockOut: false
  });

  const [attendanceDetails, setAttendanceDetails] = useState({
    employee: '',
    clockIn: '',
    clockOut: '',
    shift: '',
    ipAddress: ''
  });

  const textStyle = { color: 'black' };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShiftDetails({
      ...shiftDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAttendanceInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceDetails({
      ...attendanceDetails,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log(shiftDetails);
    setShowModal(false);
  };

  const handleSaveAttendance = () => {
    console.log(attendanceDetails);
    setShowAttendanceModal(false);
  };
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <HeaderHrm />
          </section>
          <section className="content-header">
            <h1>Attendance</h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  className="btn btn-app bg-blue clock_in_btn"
                  data-type="clock_in"
                >
                  <FontAwesomeIcon icon={faArrowCircleDown} /> Clock In
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-app bg-yellow clock_out_btn hide"
                  data-type="clock_out"
                >
                  <FontAwesomeIcon icon={faHourglassHalf} /> Clock Out
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className={activeTab === 'shifts_tab' ? 'active' : ''}>
                      <a onClick={() => handleTabClick('shifts_tab')}>
                        <FontAwesomeIcon icon={faUserClock} aria-hidden="true" />
                        Shifts
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="text-info hover-q no-print"
                          aria-hidden="true"
                          data-container="body"
                          data-toggle="popover"
                          data-placement="auto bottom"
                          data-content="Manage shifts and assign shift to users"
                          data-html="true"
                          data-trigger="hover"
                        />
                      </a>
                    </li>
                    <li className={activeTab === 'attendance_tab' ? 'active' : ''}>
                      <a onClick={() => handleTabClick('attendance_tab')}>
                        <FontAwesomeIcon icon={faCheckSquare} aria-hidden="true" /> All Attendance
                      </a>
                    </li>
                    <li className={activeTab === 'attendance_by_shift_tab' ? 'active' : ''}>
                      <a onClick={() => handleTabClick('attendance_by_shift_tab')}>
                        <FontAwesomeIcon icon={faUserCheck} aria-hidden="true" /> Attendance by shift
                      </a>
                    </li>
                    <li className={activeTab === 'attendance_by_date_tab' ? 'active' : ''}>
                      <a onClick={() => handleTabClick('attendance_by_date_tab')}>
                        <FontAwesomeIcon icon={faCalendar} aria-hidden="true" /> Attendance by date
                      </a>
                    </li>
                    <li className={activeTab === 'import_attendance_tab' ? 'active' : ''}>
                      <a onClick={() => handleTabClick('import_attendance_tab')}>
                        <FontAwesomeIcon icon={faDownload} aria-hidden="true" /> Import Attendance
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">

                    <ShiftTab activeTab={activeTab} />

                    <AttendanceTab activeTab={activeTab} />

                    <AttendanceByShiftTab activeTab={activeTab} />


                    <AttendanceByDateTab activeTab={activeTab} />

                    <ImportAttendanceTab activeTab={activeTab} />

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
