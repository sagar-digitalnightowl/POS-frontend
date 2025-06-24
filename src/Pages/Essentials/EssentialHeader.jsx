import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const EssentialHeader = () => {
  return (
    <div><nav className="navbar navbar-default bg-white m-4">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand"to="/essentials/todo" style={{ color: 'black' }}>
          <FontAwesomeIcon icon={faCheckCircle}/> Essentials
        </Link>
      </div>
      <div className="collapse navbar-collapse"id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="active">
            <Link to="/essentials/todo" style={{ color: 'black' }}>To Do</Link>
          </li>
          <li>
            <Link to="/essentials/document" style={{ color: 'black' }}>Document</Link>
          </li>
          <li>
            <Link to="/essentials/memos" style={{ color: 'black' }}>Memos</Link>
          </li>
          <li>
            <Link to="/essentials/reminder" style={{ color: 'black' }}>Reminders</Link>
          </li>
          <li>
            <Link to="/essentials/messages" style={{ color: 'black' }}>Messages</Link>
          </li>
          <li>
            <Link to="/essentials/knowledge-base" style={{ color: 'black' }}>Knowledge Base</Link>
          </li>
          <li>
            <Link to="/essentials/settings" style={{ color: 'black' }}>Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default EssentialHeader