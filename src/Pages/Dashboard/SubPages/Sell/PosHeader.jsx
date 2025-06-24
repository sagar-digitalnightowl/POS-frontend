import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faWindowClose, faBriefcase, faCalculator, faUndo, faWindowMaximize, faPauseCircle, faWrench, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import AddExpenseModal1 from './AddExpenseModal1';

const PosHeader = () => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isSellReturnModalOpen, setSellReturnModalOpen] = useState(false);
  const [isSuspendedSalesModalOpen, setSuspendedSalesModalOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const openExpenseModal = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);

  const toggleSellReturnModal = () => setSellReturnModalOpen(!isSellReturnModalOpen);
  const toggleSuspendedSalesModal = () => setSuspendedSalesModalOpen(!isSuspendedSalesModalOpen);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullScreen(false);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  const textStyle = { color: 'black' };

  const modalStyle = {
    display: isSellReturnModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    background: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const overlayStyle = {
    display: isSellReturnModalOpen || isSuspendedSalesModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const suspendedSalesModalStyle = {
    display: isSuspendedSalesModalOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    background: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const buttonStyle = {
    marginRight: '10px' // Adjust this value to set the gap between icons
  };

  return (
    <div style={textStyle}>
      <div className="col-md-12 no-print pos-header">
        <div className="row">
          <div className="col-md-6">
            <div className="m-6 mt-5" style={{ display: "flex" }}>
              <p>
                <strong>Location: &nbsp;</strong>
                POS APPLICATION &nbsp;{" "}
                <span className="curr_datetime">13/06/2024 13:25</span>
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <button type="button" title="Go Back" className="btn btn-info btn-flat m-6 btn-xs m-5 pull-right" onClick={handleGoBack} style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faBackward} size="lg" title="Backward" />
              </strong>
            </button>
            <button type="button" id="close_register" title="Close Register" className="btn btn-danger btn-flat m-6 btn-xs m-5 btn-modal pull-right"
              data-container=".close_register_modal" data-href="/cash-register/close-register" style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faWindowClose} size="lg" title="Close" />
              </strong>
            </button>
            <button type="button" id="register_details" title="Register Details"
              className="btn btn-success btn-flat m-6 btn-xs m-5 btn-modal pull-right" data-container=".register_details_modal"
              data-href="/cash-register/register-details" style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faBriefcase} size="lg" title="Briefcase" />
              </strong>
            </button>
            <button type="button" className="btn btn-primary btn-flat m-6 btn-xs m-5 pull-right" id="btnCalculator" title="Calculator" style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faCalculator} size="lg" />
              </strong>
            </button>
            <button type="button" className="btn btn-danger btn-flat m-6 btn-xs m-5 pull-right popover-default"
              id="return_sale" title="Sell Return" onClick={toggleSellReturnModal} style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faUndo} size="lg" />
              </strong>
            </button>
            <button type="button" title="Press F11 to go Full Screen"
              className="btn btn-primary btn-flat m-6 hidden-xs btn-xs m-5 pull-right" id="full_screen" onClick={toggleFullScreen} style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faWindowMaximize} size="lg" />
              </strong>
            </button>
            <button type="button" id="view_suspended_sales" title="View Suspended Sales"
              className="btn bg-yellow btn-flat m-6 btn-xs m-5 btn-modal pull-right" onClick={toggleSuspendedSalesModal} style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faPauseCircle} size="lg" />
              </strong>
            </button>
            <Link to="/pos/create-sub-type=repair" title="Add Repair" data-toggle="tooltip" data-placement="bottom" className="btn bg-purple btn-flat m-6 btn-xs m-5 pull-right" style={buttonStyle}>
              <FontAwesomeIcon icon={faWrench} size="lg" />
              <strong> Repair</strong>
            </Link>
            <button type="button" title="Add Expense" data-placement="bottom"
              className="btn bg-purple btn-flat m-6 btn-xs m-5 btn-modal pull-right" id="add_expense" onClick={openExpenseModal} style={buttonStyle}>
              <strong>
                <FontAwesomeIcon icon={faMinusCircle} /> Add Expense
              </strong>
            </button>
          </div>
        </div>
      </div>
      <AddExpenseModal1 isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
      <div style={overlayStyle} onClick={toggleSellReturnModal}></div>
      <div style={modalStyle}>
        <h4>Sell Return</h4>
        <input type="text" placeholder="Invoice No" />
        <button type="button" onClick={toggleSellReturnModal}>Send</button>
      </div>
      <div style={overlayStyle} onClick={toggleSuspendedSalesModal}></div>
      <div style={suspendedSalesModalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h4>Suspended Sales</h4>
          <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={toggleSuspendedSalesModal}>
            <FontAwesomeIcon icon={faWindowClose} size="lg" />
          </button>
        </div>
        <p>No record found</p>
        <button type="button" onClick={toggleSuspendedSalesModal} style={{ float: 'right' }}>Cancel</button>
      </div>
    </div>
  );
};

export default PosHeader;
