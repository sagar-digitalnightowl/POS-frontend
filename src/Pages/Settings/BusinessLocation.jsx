import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../Components/Footer';
import { FaPlus, FaEdit, FaCog, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BusinessLocation = () => {
  const [data, setData] = useState([
    {
      name: 'POS Application',
      location: 'BL0001',
      landMark: 'SALIMABAD, MANAMA, KINGDOM OF BAHRAIN SHOP NO 301,BLDG 1691,ROAD 432,BLOCK 704',
      city: 'SALIMABAD',
      zipCode: '704',
      state: 'MANAMA',
      country: 'BAHRAIN',
      invoiceScheme: 'Default',
      invoiceLayoutForPOS: 'Default',
      invoiceLayoutForSale: 'Default'
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const textStyle = { color: 'black' };

  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Business Locations <small>Manage your business locations</small></h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">All your business locations</h3>
                <div className="box-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-modal"
                    data-href="https://medipro.affinity-me.com/business-location/create"
                    data-container=".location_add_modal"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped" id="business_location_table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location ID</th>
                        <th>Landmark</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Price Group</th>
                        <th>Invoice scheme</th>
                        <th>Invoice layout for POS</th>
                        <th>Invoice layout for sale</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((user, index) => (
                        <tr key={index}>
                          <td style={textStyle}>{user.name}</td>
                          <td style={textStyle}>{user.location}</td>
                          <td style={textStyle}>{user.landMark}</td>
                          <td style={textStyle}>{user.city}</td>
                          <td style={textStyle}>{user.zipCode}</td>
                          <td style={textStyle}>{user.state}</td>
                          <td style={textStyle}>{user.country}</td>
                          <td style={textStyle}>{user.priceGroup}</td>
                          <td style={textStyle}>{user.invoiceScheme}</td>
                          <td style={textStyle}>{user.invoiceLayoutForPOS}</td>
                          <td style={textStyle}>{user.invoiceLayoutForSale}</td>
                          <td style={textStyle}>
                            <button className="btn btn-sm btn-warning">
                              <FaEdit /> Edit
                            </button>
                            <Link to="/business-location/Setting">
                            <button className="btn btn-sm btn-info">
                              <FaCog /> Setting
                            </button>
                            </Link>
                            <button className="btn btn-sm btn-danger">
                              <FaTrash /> Deactivate Location
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="pagination-custom justify-content-end">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link1" style={{ color: 'black' }}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link1" style={{ color: 'black' }}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link1" style={{ color: 'black' }}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default BusinessLocation;
