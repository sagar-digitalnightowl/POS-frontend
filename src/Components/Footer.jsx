import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFont, faMinus } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer className="main-footer no-print">
      <small>Pos-Application</small>
      <div className="btn-group pull-right">
        <button type="button" className="btn btn-success btn-xs toggle-font-size"data-size="s">
           <FontAwesomeIcon icon={faFont} /> <FontAwesomeIcon icon={faMinus} />
        </button>
        <button type="button" className="btn btn-success btn-xs toggle-font-size"data-size="m">
           <FontAwesomeIcon icon={faFont} />
        </button>
        <button type="button"className="btn btn-success btn-xs toggle-font-size"data-size="l">
           <FontAwesomeIcon icon={faFont} /> <FontAwesomeIcon icon={faPlus} />
        </button>
        <button type="button" className="btn btn-success btn-xs toggle-font-size" data-size="xl">
           <FontAwesomeIcon icon={faFont} /> 
          <FontAwesomeIcon icon={faPlus} />
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </footer>
    </div>
  )
}

export default Footer