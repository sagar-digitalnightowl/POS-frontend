import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

const InvoiceSettings = () => {
  const [data, setData] = useState([
    {
      name: 'Default',
      prefix: '',
      numberingType: 'Sequential',
      startFrom: '1',
      invoiceCount: '1',
      numberOfDigits: '4',
      isDefault: false
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    dateFormat: 'date format1',
    name: '',
    numberingType: 'Sequential',
    prefix: '',
    startFrom: '',
    invoiceCount: '',
    numberOfDigits: '',
    setDefault: false
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [activeTab, setActiveTab] = useState('tab_1');
  const textStyle = { color: 'black' };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setModalForm({ ...modalForm, [name]: newValue });
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newInvoiceScheme = {
      name: modalForm.name,
      prefix: modalForm.prefix,
      numberingType: modalForm.numberingType,
      startFrom: modalForm.startFrom,
      invoiceCount: modalForm.invoiceCount,
      numberOfDigits: modalForm.numberOfDigits,
      isDefault: modalForm.setDefault
    };
    setData([...data, newInvoiceScheme]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Invoice Settings <small>Manage your invoice settings</small>
            </h1>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className={activeTab === 'tab_1' ? 'active' : ''}>
                      <Link to="#" onClick={() => handleTabClick('tab_1')}>
                        Invoice Schemes
                      </Link>
                    </li>
                    <li className={activeTab === 'tab_2' ? '' : ''}>
                      <Link to="#" onClick={() => handleTabClick('tab_2')}>
                        Invoice Layouts
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className={`tab-pane ${
                        activeTab === 'tab_1' ? 'active' : ''
                      }`}
                      id="tab_1"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <h4>
                            All your invoice schemes
                            <button
                              type="button"
                              className="btn btn-primary btn-modal pull-right"
                              onClick={handleAddButtonClick}
                            >
                              <FaPlus /> Add
                            </button>
                          </h4>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table
                              className="table table-bordered table-striped"
                              id="invoice_table"
                            >
                              <thead>
                                <tr>
                                  <th>
                                    Name
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Give a short meaningful name to the Invoice Scheme."
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>
                                    Prefix
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Prefix for an Invoice Scheme.<br>A Prefix can be a custom text or current year. Ex: #XXXX0001, #2018-0002"
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>
                                    Numbering Type
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Sequential will generate number serially like 1,2,3,4 <br/> Aleatory will generate number randomly"
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>
                                    Start from
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Start number for invoice numbering. <br><small class='text-muted'>You can make it 1 or any other number from which numbering will start.</small>"
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>
                                    Invoice Count
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Total number of invoices generated for the Invoice Scheme"
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>
                                    Number of digits
                                    <FaInfoCircle
                                      aria-hidden="true"
                                      data-container="body"
                                      data-toggle="popover"
                                      data-placement="auto bottom"
                                      data-content="Length of the Invoice Number excluding Invoice Prefix"
                                      data-html="true"
                                      data-trigger="hover"
                                    />
                                  </th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.map((user, index) => (
                                  <tr key={index}>
                                    <td style={textStyle}>{user.name}</td>
                                    <td style={textStyle}>{user.prefix}</td>
                                    <td style={textStyle}>{user.numberingType}</td>
                                    <td style={textStyle}>{user.startFrom}</td>
                                    <td style={textStyle}>{user.invoiceCount}</td>
                                    <td style={textStyle}>{user.numberOfDigits}</td>
                                    <td>
                                      <button
                                        style={{
                                          ...textStyle,
                                          backgroundColor: 'lightblue',
                                          color: 'white',
                                          marginRight: '7px'
                                        }}
                                        onClick={() => alert(`Edit ${user.name}`)}
                                      >
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                        />{' '}
                                        Edit
                                      </button>
                                      <button
                                        style={{
                                          ...textStyle,
                                          backgroundColor: 'lightcoral',
                                          color: 'white'
                                        }}
                                        onClick={() =>
                                          alert(`Delete ${user.name}`)
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                        />{' '}
                                        Delete
                                      </button>
                                      {user.isDefault && (
                                        <FontAwesomeIcon icon={faStar}style={{ marginLeft: '5px' }}/>  
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'tab_2' ? 'active' : ''}`}id="tab_2">
                      <div className="row">
                        <div className="col-md-12">
                          <h4>
                            All your invoice layout
                            <Link className="btn btn-primary pull-right"to="/invoice-layouts/create">
                              <FaPlus /> Add
                            </Link>
                          </h4>
                        </div>
                        <div className="col-md-12">
                          <div className="col-md-3">
                            <div className="icon-link">
                              <Link to="/invoice-layouts/4/edit">
                                <i className="fa fa-file-alt fa-4x" />
                                Default
                              </Link>
                              <span className="badge bg-green">Default</span>
                              <span className="link-des">
                                <b>Used in locations: </b>
                                <br />
                                POS APPLICATION &nbsp;
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          <h4>
                            Delivery Note Layouts
                            <Link className="btn btn-primary pull-right"to="/delivery-note-layout">
                              <FaPlus /> Add
                            </Link>
                          </h4>
                        </div>
                        <div className="col-md-12" />
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          <h4>
                            Purchase Layouts
                            <Link className="btn btn-primary pull-right"to="/purchase-note=layout">
                              <FaPlus /> Add
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={handleModalClose}
                >
                  &times;
                </button>
                <h4 className="modal-title">Add New Invoice Scheme</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="dateFormat1">Date Format 1</label>
                        <select
                          className="form-control"
                          id="dateFormat1"
                          name="dateFormat"
                          value={modalForm.dateFormat}
                          onChange={handleInputChange}
                        >
                          <option value="date format1">date format1</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="preview">Preview</label>
                        <select
                          className="form-control"
                          id="preview"
                          name="dateFormat"
                          value={modalForm.dateFormat}
                          onChange={handleInputChange}
                        >
                          <option value="the preview">the preview</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={modalForm.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="prefix">Prefix</label>
                      <input
                        type="text"
                        className="form-control"
                        id="prefix"
                        name="prefix"
                        value={modalForm.prefix}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="startFrom">Start From</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startFrom"
                        name="startFrom"
                        value={modalForm.startFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="invoiceCount">Invoice Count</label>
                      <input
                        type="text"
                        className="form-control"
                        id="invoiceCount"
                        name="invoiceCount"
                        value={modalForm.invoiceCount}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="numberOfDigits">Number of Digits</label>
                      <input
                        type="text"
                        className="form-control"
                        id="numberOfDigits"
                        name="numberOfDigits"
                        value={modalForm.numberOfDigits}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="setDefault"
                        name="setDefault"
                        checked={modalForm.setDefault}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="setDefault"
                      >
                        Set as Default
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSettings;
