import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import EssentialHeader from './EssentialHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faFileCsv, faFileExcel, faFilePdf, faFilter, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Components/Footer';
import AddTaskModal from './AddTaskModal';

import './Essentials.css';

const Essentials = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskData, setTaskData] = useState({
    task: '',
    assignedTo: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
    estimatedHours: '',
    description: '',
    document: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFileChange = (e) => {
    setTaskData({ ...taskData, document: e.target.files[0] });
  };

  const handleSave = () => {
    console.log('Task Data:', taskData);
    setIsModalOpen(false);
  };
  const textStyle = { color: 'black' };

  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="no-print">
            <EssentialHeader />
          </section>
          <section className="content">
            <div className="box box-solid" id="accordion">
              <div className="box-header with-border" style={{ cursor: "pointer" }}>
                <h3 className="box-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter">
                    <FontAwesomeIcon icon={faFilter} /> Filters
                  </a>
                </h3>
              </div>
              <div id="collapseFilter" className="panel-collapse active collapse in" aria-expanded="true">
                <div className="box-body">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="user_id_filter">Assigned To:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user" />
                        </span>
                        <select className="form-control select2" id="user_id_filter" name="user_id_filter">
                          <option selected="selected" value="">All</option>
                          <option value={4}> POS ADMIN </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="priority_filter">Priority:</label>
                      <select className="form-control select2" id="priority_filter" name="priority_filter">
                        <option selected="selected" value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="status_filter">Status:</label>
                      <select className="form-control select2" id="status_filter" name="status_filter">
                        <option selected="selected" value="">All</option>
                        <option value="new">New</option>
                        <option value="in_progress">In-Progress</option>
                        <option value="on_hold">On Hold</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="date_range_filter">Date Range:</label>
                      <input placeholder="Select a date range" className="form-control" readOnly="" name="date_range_filter" type="text" id="date_range_filter" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">To Do List</h3>
                <div className="box-tools">
                <button className="btn btn-block btn-primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </div>
              </div>
              <div className="box-body">
                            <div className="custom-controls">
                                <div className="custom-control show-entries">
                                    <h5>Show</h5>
                                    <select className="form-control1">
                                        <option value="all">25</option>
                                        <option value="admin">50</option>
                                        <option value="user">100</option>
                                        <option value="user">500</option>
                                        <option value="user">1000</option>
                                        <option value="user">All</option>
                                    </select>
                                    <h5>entries</h5>
                                </div>
                                <div className="custom-control export-buttons">
                                    <button className="btn btn-success btn-sm export-btn">
                                        <FontAwesomeIcon icon={faFileCsv} /> Export to CSV
                                    </button>
                                    <button className="btn btn-primary btn-sm export-btn">
                                        <FontAwesomeIcon icon={faPrint} /> Print
                                    </button>
                                    <button className="btn btn-warning btn-sm export-btn">
                                        <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
                                    </button>
                                    <button className="btn btn-danger btn-sm export-btn">
                                        <FontAwesomeIcon icon={faFilePdf} /> Export to PDF
                                    </button>
                                    <button className="btn btn-info btn-sm export-btn">
                                        <FontAwesomeIcon icon={faColumns} /> Column Visibility
                                    </button>
                                </div>
                                <div className="custom-control search-bar">
                                    <input type="text" className="form-control form-control-sm" placeholder="Search..." onChange={(e) => console.log(e.target.value)} />
                                </div>
                            </div>
                        </div>
              <div className="box-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped" id="task_table">
                    <thead>
                      <tr>
                        <th>Added On</th>
                        <th>Task Id</th>
                        <th className="col-md-2">Task</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Estimated Hours</th>
                        <th>Assigned By</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={index}>
                          <td>{new Date().toLocaleDateString()}</td>
                          <td>{index + 1}</td>
                          <td>{task.task}</td>
                          <td>{task.status}</td>
                          <td>{task.startDate}</td>
                          <td>{task.endDate}</td>
                          <td>{task.estimatedHours}</td>
                          <td>Admin</td>
                          <td>{task.assignedTo}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => {
                              const newTasks = tasks.filter((_, i) => i !== index);
                              setTasks(newTasks);
                            }}>
                              Delete
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
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default Essentials;
