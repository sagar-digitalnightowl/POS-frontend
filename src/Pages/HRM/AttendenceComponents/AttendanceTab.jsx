import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AttendanceTab = ({activeTab}) => {
    return (
        <div className={`tab-pane ${activeTab === 'attendance_tab' ? 'active' : ''}`} id="attendance_tab">
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee:</label>
                        <select
                            className="form-control select2"
                            style={{ width: "100%" }}
                            id="employee_id"
                            name="employee_id"
                        >
                            <option selected="selected" value="">All</option>
                            <option value={4}> POS ADMIN </option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="date_range">Date Range:</label>
                        <input
                            placeholder="Select a date range"
                            className="form-control"
                            readOnly=""
                            name="date_range"
                            type="text"
                            id="date_range"
                        />
                    </div>
                </div>
                <div className="col-md-6 spacer">
                    <button
                        type="button"
                        className="btn btn-primary btn-modal pull-right"
                        data-href="/hrm/attendance/create"
                        data-container="#attendance_modal"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add latest attendance
                    </button>
                </div>
            </div>
            <div id="user_attendance_summary" className="hide">
                <h3>
                    <strong>Total work hours:</strong>
                    <span id="total_work_hours" />
                </h3>
            </div>
            <br /><br />
            <div className="table-responsive">
                <table className="table table-bordered table-striped" id="attendance_table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Invoice Date</th>
                            <th>Employee</th>
                            <th>Clock In</th>
                            <th>Clock Out</th>
                            <th>Work Duration</th>
                            <th>IP Address</th>
                            <th>Shift</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AttendanceTab