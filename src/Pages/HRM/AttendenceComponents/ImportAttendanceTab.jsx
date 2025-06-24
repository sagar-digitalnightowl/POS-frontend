import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ImportAttendanceTab = ({activeTab}) => {
    return (
        <div className={`tab-pane ${activeTab === 'import_attendance_tab' ? 'active' : ''}`} id="import_attendance_tab">
            <div className="row">
                <div className="col-md-6">
                    <button
                        type="button"
                        className="btn btn-primary btn-modal"
                        data-href="http://posweb.test/hrm/attendance/import"
                        data-container=".view_modal"
                    >
                        <FontAwesomeIcon icon={faDownload} /> Import attendance
                    </button>
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered table-striped" id="imported_attendance_table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Work Duration</th>
                                <th>IP Address</th>
                                <th>Shift</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ImportAttendanceTab