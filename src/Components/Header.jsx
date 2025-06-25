import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faWrench, faCashRegister, faCalculator, faClock, faBell, faPlusCircle, faCircle, faInfoCircle, faQuestionCircle, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import ClockInModal from './ClockInModal';
import Calculator from './Calculator';
import ApplicationTourModal from './ApplicationTourModal';
import AddToDoModal from './AddToDoModal';
import TodayProfitModal from './TodayProfitModal';
import Cookies from "js-cookie"


const Header = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false);
  const [isProfitModalOpen, setIsProfitModalOpen] = useState(false);

  const [message, setMessage] = useState('');

  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClockInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePlusClick = () => {
    setPlusDropdownOpen(!plusDropdownOpen);
  };

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  const handleTourClick = () => {
    setIsTourModalOpen(true);
  };

  const handleCloseTourModal = () => {
    setIsTourModalOpen(false);
  };

  const handleAddToDoClick = () => {
    setIsAddToDoModalOpen(true);
  };

  const handleCloseAddToDoModal = () => {
    setIsAddToDoModalOpen(false);
  };

  const handleProfitClick = () => {
    setIsProfitModalOpen(true);
  };

  const handleCloseProfitModal = () => {
    setIsProfitModalOpen(false);
  };


  const handleLogout = async () => {
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/admin/adminSign/logout`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include'
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     if (data) {
    //       console.log(data, "data")
    //       navigate("/login");
    //     }
    //   } else {
    //     setMessage('Error during logout. Please try again.');
    //   }
    // } catch (error) {
    //   setMessage('Network error. Please check your connection.');
    // }

    localStorage.clear("token");
    navigate("/login");
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPlusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const textStyle = { color: 'black' };

  return (
    <div style={textStyle}>
      <header className="main-header no-print" style={{ backgroundColor: 'green' }}>
        <Link to="" className="logo">
          <span className="logo-lg">
            POS APPLICATION TRADING COMPANY W.L.L
            <FontAwesomeIcon icon={faCircle} className="text-success" />
          </span>
        </Link>
        <nav className="navbar navbar-static-top" role="navigation">
          <Link to="#" className="sidebar-toggle" role="button" onClick={toggleSidebar}>
            ☰
            <span className="sr-only">Toggle navigation</span>
          </Link>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="fas fa-info-circle pull-left mt-10 cursor-pointer"
            style={{ marginTop: 24, color: 'white' }}
            aria-hidden="true"
            data-toggle="popover"
            data-html="true"
            title="Active Package Details"
            data-placement="right"
            data-trigger="hover"
            data-content=""
          />
          <div className="navbar-custom-menu" style={{ margin: '3px' }}>
            <button type="button" className="btn bg-blue btn-flat pull-left m-8 btn-sm mt-10 clock_in_btn"
              data-type="clock_in" data-toggle="tooltip" data-placement="bottom" title="Clock In"
              onClick={handleClockInClick}
            >
              <FontAwesomeIcon icon={faClock} />
            </button>
            <ClockInModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div className="btn-group" style={{ margin: '3px' }} ref={dropdownRef}>
              <button id="header_shortcut_dropdown" type="button"
                className="btn btn-success dropdown-toggle btn-flat pull-left m-8 btn-sm mt-10"
                onClick={handlePlusClick}
                aria-haspopup="true" aria-expanded={plusDropdownOpen}>
                <FontAwesomeIcon icon={faPlusCircle} className="fa-lg" />
              </button>
              <ul className={`dropdown-menu ${plusDropdownOpen ? 'show' : ''}`}>
                <li>
                  <Link to="/calendar">
                    <FontAwesomeIcon icon={faCalculator} />
                    <span onClick={() => navigate("/calender")}>Calendar </span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="btn-modal" data-href="/essentials/todo/create" data-container="#task_modal" onClick={handleAddToDoClick}>
                    <FontAwesomeIcon icon={faClipboardCheck} aria-hidden="true" />
                    Add To Do
                  </Link>
                </li>
                <li>
                  <Link id="start_tour" to="#" onClick={handleTourClick}>
                    <FontAwesomeIcon icon={faQuestionCircle} aria-hidden="true" /> Application Tour
                  </Link>
                </li>
              </ul>
            </div>
            <button id="btnCalculator" title="Calculator" type="button"
              className="btn btn-success btn-flat pull-left m-8 btn-sm mt-10 popover-default hidden-xs"
              data-toggle="popover" data-trigger="click" data-content='' data-html="true" data-placement="bottom"
              onClick={handleCalculatorClick}
            >
              <strong>
                <FontAwesomeIcon icon={faCalculator} />
              </strong>
            </button>
            <Link to="/pos/create" title="POS" data-toggle="tooltip" data-placement="bottom"
              className="btn btn-flat pull-left m-8 btn-sm mt-10 btn-success">
              <strong>
                <FontAwesomeIcon icon={faCashRegister} /> &nbsp; POS
              </strong>
            </Link>
            <Link to="/pos/create-sub-type=repair" title="Add Repair"
              data-toggle="tooltip" data-placement="bottom" className="btn btn-success btn-flat m-8 btn-sm mt-10 pull-left">
              <FontAwesomeIcon icon={faWrench} />
              <strong>Repair</strong>
            </Link>
            <button type="button" id="view_todays_profit" title="Today's profit" data-toggle="tooltip"
              data-placement="bottom" className="btn btn-success btn-flat pull-left m-8 btn-sm mt-10"
              onClick={handleProfitClick}
            >
              <strong>
                <FontAwesomeIcon icon={faDollarSign} />
              </strong>
            </button>
            <TodayProfitModal isOpen={isProfitModalOpen} onClose={handleCloseProfitModal} />
            <span>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <ul className="nav navbar-nav">
              <li className="dropdown notifications-menu">
                <Link to="#" className="dropdown-toggle load_notifications" data-toggle="dropdown" id="show_unread_notifications" data-loaded="false">
                  <FontAwesomeIcon icon={faBell} />
                  <span className="label label-warning notifications_count" />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <ul className="menu" id="notifications_list"></ul>
                  </li>
                </ul>
              </li>
              <li className={`dropdown user user-menu ${dropdownOpen ? 'open' : ''}`}>
                <Link to="#" className="nav-link icon" onClick={toggleDropdown}>
                  <img src="/uploads/media/1698649031_1249173008_middle%20pearl%20logo.jpeg"
                    className="user-image" alt="User Image" />
                  <span>POS APPLICATION ADMIN</span>
                </Link>
                <ul className="dropdown-menu" style={{ display: dropdownOpen ? 'block' : 'none' }}>
                  <li className="user-header">
                    <img src="assets/img/login-bg.jpg" alt="Logo" />
                    <p>POS APPLICATION ADMIN</p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <Link to="/user/profile" className="btn btn-default btn-flat"> Profile</Link>
                    </div>
                    <div className="pull-right">
                      <div onClick={handleLogout} className="btn btn-default btn-flat">
                        <span>Sign Out</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className={`main-sidebar ${sidebarOpen ? 'open' : ''}`}>
      </aside>
      <Calculator isOpen={isCalculatorOpen} onClose={handleCalculatorClick} />
      <ApplicationTourModal isOpen={isTourModalOpen} onClose={handleCloseTourModal} />
      <AddToDoModal isOpen={isAddToDoModalOpen} onClose={handleCloseAddToDoModal} />
    </div>
  );
};

export default Header;
