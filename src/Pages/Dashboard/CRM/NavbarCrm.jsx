import React, { useState } from 'react';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NavbarCrm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-default bg-white m-4">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <h4>
              <Link to="/crm/dashboard" style={{ color: 'black' }}>
                <FontAwesomeIcon icon={faBroadcastTower} /> CRM
              </Link>
            </h4>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/crm/leads" style={{ color: 'black' }}>
                  Leads
                </Link>
              </li>
              <li>
                <Link to="/crm/follow-up" style={{ color: 'black' }}>
                  Follow ups
                </Link>
              </li>
              <li>
                <Link to="/crm/campaigns" style={{ color: 'black' }}>
                  Campaigns
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link dropdown-toggle" to="#" id="contacts_login_dropdown"
                  role="button" aria-haspopup="true" aria-expanded={dropdownOpen}
                  onClick={toggleDropdown} style={{ color: 'black' }}>
                  Contacts Login
                </Link>
                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="contacts_login_dropdown"
                  style={{ display: dropdownOpen ? 'block' : 'none', position: 'absolute', backgroundColor: 'white', zIndex: 1000 }}>
                  <Link to="/crm/all-contacts-login" style={{ color: 'black', padding: '10px', display: 'block' }}>
                    Contacts Login
                  </Link>
                  <Link className="dropdown-item" to="/crm/commissions" style={{ color: 'black', padding: '10px', display: 'block' }}>
                    Commissions
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/crm/reports" style={{ color: 'black' }}>Reports</Link>
              </li>
              <li>
                <Link to="/crm/proposal-template" style={{ color: 'black' }}>
                  Proposal template
                </Link>
              </li>
              <li>
                <Link to="/crm/proposals" style={{ color: 'black' }}>
                  Proposals
                </Link>
              </li>
              <li>
                <Link to="/crm/sources" style={{ color: 'black' }}>
                  Sources
                </Link>
              </li>
              <li>
                <Link to="/life-stage" style={{ color: 'black' }}>
                  Life Stage
                </Link>
              </li>
              <li>
                <Link to="/crm/followup-category" style={{ color: 'black' }}>
                  Followup Category
                </Link>
              </li>
              <li>
                <Link to="/crm/settings" style={{ color: 'black' }}>
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarCrm;
