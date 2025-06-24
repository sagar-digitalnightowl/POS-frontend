import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const HeaderHrm = () => {
  return (
<div>
    <section className="no-print">
    <nav className="navbar navbar-default bg-white m-4">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/hrm/dashboard" style={{ color: 'black' }}>
            <FontAwesomeIcon icon={faUsers}/>
            HRM
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li>
                <Link to="/hrm/leave-type" style={{ color: 'black' }}>Leave Type</Link>
            </li>
            <li>
                <Link to="/hrm/leave" style={{ color: 'black' }}>Leave</Link>
            </li>
            <li>
                <Link to="/hrm/attendance" style={{ color: 'black' }}>Attendance</Link>
            </li>
            <li>
                <Link to="/hrm/payroll" style={{ color: 'black' }}>Payroll</Link>
            </li>
            <li>
                <Link to="/hrm/holiday" style={{ color: 'black' }}>Holiday</Link>
            </li>
            <li>
                <Link to="/hrm/department" style={{ color: 'black' }}>Departments</Link>
            </li>
            <li>
                <Link to="/hrm/designation" style={{ color: 'black' }}>Designations</Link>
            </li>
            <li>
                <Link to="/hrm/sales-target" style={{ color: 'black' }}>Sales Targets</Link>
            </li>
            <li>
                <Link to="/hrm/settings" style={{ color: 'black' }}>Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
  </div>
  )
}
export default HeaderHrm