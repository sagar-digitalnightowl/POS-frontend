import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AttendanceByDateTab = ({activeTab}) => {
    return (
        <div className={`tab-pane ${activeTab === 'attendance_by_date_tab' ? 'active' : ''}`} id="attendance_by_date_tab">
            <div className="row">
                <div className="col-md-4">
                    <div className="input-group date">
                        <input
                            className="form-control"
                            id="attendance_by_date_filter"
                            readOnly=""
                            name="attendance_by_date_filter"
                            type="text"
                            defaultValue="17/07/2024"
                        />
                        <span className="input-group-addon">
                            <FontAwesomeIcon icon={faCalendar} />
                        </span>
                    </div>
                </div>
                <div className="col-md-12">
                    <br />
                    <table className="table" id="attendance_by_date_table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Present</th>
                                <th>Absent</th>
                            </tr>
                        </thead>
                        <tbody />
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AttendanceByDateTab