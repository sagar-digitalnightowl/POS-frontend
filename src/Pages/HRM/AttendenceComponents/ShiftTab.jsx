import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { apiCall } from '../../../utils/apiCall';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { arrangeDaysName } from '../../../utils/helperFunctions';

const ShiftTab = ({ activeTab }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showModal, setShowModal] = useState(false);
    const [editShiftId, setEditShiftId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        shiftType: '',
        startTime: '',
        endTime: '',
        workingDays: [],
        autoClockOut: false
    });

    const handleCloseModal = async () => {
        setFormData({
            name: '',
            shiftType: '',
            startTime: '',
            endTime: '',
            workingDays: [],
            autoClockOut: false
        });
        setEditShiftId('');
        setShowModal(false);
    }

    const fetchAllShifts = async () => {
        setLoading(true);
        try {
            const param = new URLSearchParams();
            param.append('page', currentPage)
            const res = await apiCall({
                method: "get",
                url: `/admin/hrm/shift/getAllShift?${param.toString()}`,
            })

            if (res.status === 200) {
                setData(res?.data?.result);
                setTotalPage(res?.data?.totalPage);
            } else {
                setError(res?.data?.message);
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in get all shift : ", error)
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            if (editShiftId) {
                const res = await apiCall({
                    method: "patch",
                    url: `/admin/hrm/shift/updateShift/${editShiftId}`,
                    data: { ...formData, workingDays: arrangeDaysName(formData?.workingDays) }
                })

                if (res.status === 200) {
                    handleCloseModal();
                    fetchAllShifts();
                } else {
                    setError(res?.data?.message);
                }
                return;
            }

            const res = await apiCall({
                method: "post",
                url: `/admin/hrm/shift/addShift`,
                data: { ...formData, workingDays: arrangeDaysName(formData?.workingDays) }
            })

            if (res.status === 201) {
                handleCloseModal();
                fetchAllShifts();
            } else {
                setError(res?.data?.message);
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in add/edit shift : ", error)
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (data) => {
        setFormData({
            name: data?.name,
            shiftType: data?.shiftType,
            startTime: data?.startTime,
            endTime: data?.endTime,
            workingDays: data?.workingDays,
            autoClockOut: data?.autoClockOut
        });
        setEditShiftId(data?._id);
        setShowModal(true);
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    const handleChangeWorkingDay = (e) => {
        const { value } = e.target;

        setFormData(prev => {
            const existWorkingDay = prev?.workingDays?.includes(value) ? prev?.workingDays?.filter(day => day !== value) : [...prev?.workingDays, value];
            return {
                ...prev,
                workingDays: existWorkingDay
            }
        })
    }

    const deleteShift = async (id) => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "delete",
                url: `/admin/hrm/shift/deleteShift/${id}`,
            })

            if (res.status === 200) {
                fetchAllShifts();
            } else {
                setError(res?.data?.message);
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in delete shift : ", error)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchAllShifts();
    }, [currentPage])


    return (
        <div className={`tab-pane ${activeTab === 'shifts_tab' ? 'active' : ''}`} id="shifts_tab">
            <button
                type="button"
                className="btn btn-primary pull-right"
                data-toggle="modal"
                data-target="#shift_modal"
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon icon={faPlus} /> Add
            </button>
            <br /><br /><br />
            <div className="table-responsive">
                <table className="table table-bordered table-striped" id="shift">
                    <thead>
                        <tr>
                            <th>Shift Name</th>
                            <th>Shift Type</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Working Days</th>
                            <th>Auto Clock out</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.length > 0 ?
                                data?.map(data => (
                                    <tr key={data?._id}>
                                        <td>{data?.name}</td>
                                        <td>{data?.shiftType}</td>
                                        <td>{data?.startTime}</td>
                                        <td>{data?.endTime}</td>
                                        <td>{data?.workingDays?.join(", ")}</td>
                                        <td>{data?.autoClockOut ? "True" : "False"}</td>
                                        <td>
                                            <DropdownButton id="dropdown-basic-button" title="Actions">
                                                {/* <Dropdown.Item href="#/view"> <FontAwesomeIcon icon={faEye} /> View</Dropdown.Item> */}
                                                <Dropdown.Item
                                                    onClick={() => handleEdit(data)}
                                                > <FontAwesomeIcon icon={faEdit} /> Edit </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => deleteShift(data?._id)}
                                                > <FontAwesomeIcon icon={faTrash} /> Delete</Dropdown.Item>
                                                {/* <Dropdown.Item href="#/delete"> <FontAwesomeIcon icon={faPrint} /> Print</Dropdown.Item> */}
                                                {/* <Dropdown.Item href="#/labels">  <FontAwesomeIcon icon={faTags} />Labels</Dropdown.Item> */}
                                                {/* <br /> */}
                                                {/* <Dropdown.Item href="#/viewPayment">  <FontAwesomeIcon icon={faEye} /> View Payment</Dropdown.Item> */}
                                                {/* <Dropdown.Item href="#/PurchaseReturn"><FontAwesomeIcon icon={faUndoAlt} /> Purchase Return</Dropdown.Item> */}
                                                {/* <Dropdown.Item href="#/updateStatus"> <FontAwesomeIcon icon={faSyncAlt} /> Update Status</Dropdown.Item> */}
                                                {/* <Dropdown.Item href="#/itemReceivedNotification"> <FontAwesomeIcon icon={faBell} /> Item Received Notification</Dropdown.Item> */}
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                ))
                                : <tr>
                                    <td colSpan={10} style={{ textAlign: 'center' }}>No data found</td>
                                </tr>
                        }
                    </tbody>
                </table>

                <div className="pagination-custom justify-content-end" style={{ margin: "30px 0px", gap: 2 }}>
                    <div className={`page-item`}>
                        <button disabled={currentPage <= 1} onClick={() => paginate(currentPage - 1)} className="page-link1" style={{ color: 'black' }}>
                            Previous
                        </button>
                    </div>
                    {
                        Array(totalPage).fill(0).map((num, index) => (
                            <button onClick={() => paginate(index + 1)} className="page-link1" style={{ color: 'black' }}>
                                {index + 1}
                            </button>
                        ))
                    }
                    <div className={`page-item `}>
                        <button disabled={currentPage >= totalPage} onClick={() => paginate(currentPage + 1)} className="page-link1" style={{ color: 'black' }}>
                            Next
                        </button>
                    </div>
                </div>

            </div>

            {showModal && (
                <div
                    className="modal"
                    style={{
                        display: 'block',
                        position: 'fixed',
                        zIndex: '1050',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        width: '700px'
                    }}
                    aria-hidden="true"
                >
                    <div className="modal-dialog" style={{ maxWidth: '650px', margin: 'auto' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{editShiftId ? "Edit" : "Add"} Shift</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="shiftName">Shift Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ marginRight: '10%' }}
                                            id="shiftName"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shiftType">Shift Type</label>
                                        <select
                                            name="shiftType" id="shiftType"
                                            className="form-control"
                                            value={formData.shiftType}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="Morning">Morning</option>
                                            <option value="Evening">Evening</option>
                                            <option value="Night">Night</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="startTime">Start Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            style={{ marginRight: '10%' }}
                                            id="startTime"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="endTime">End Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="endTime"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label>Working Days</label>

                                        <div className='' style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="monday"
                                                    style={{ marginRight: 5 }}
                                                    name="Monday"
                                                    value="Monday"
                                                    checked={formData?.workingDays?.includes("Monday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="monday">Monday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Tuesday"
                                                    style={{ marginRight: 5 }}
                                                    name="Tuesday"
                                                    value="Tuesday"
                                                    checked={formData?.workingDays?.includes("Tuesday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Tuesday">Tuesday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Wednesday"
                                                    style={{ marginRight: 5 }}
                                                    name="Wednesday"
                                                    value="Wednesday"
                                                    checked={formData?.workingDays?.includes("Wednesday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Wednesday">Wednesday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Thursday"
                                                    style={{ marginRight: 5 }}
                                                    name="Thursday"
                                                    value="Thursday"
                                                    checked={formData?.workingDays?.includes("Thursday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Thursday">Thursday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Friday"
                                                    style={{ marginRight: 5 }}
                                                    name="Friday"
                                                    value="Friday"
                                                    checked={formData?.workingDays?.includes("Friday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Friday">Friday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Saturday"
                                                    style={{ marginRight: 5 }}
                                                    name="Saturday"
                                                    value="Saturday"
                                                    checked={formData?.workingDays?.includes("Saturday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Saturday">Saturday</label>
                                            </div>


                                            <div className="form-group" style={{ margin: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    // className="form-control"
                                                    id="Sunday"
                                                    style={{ marginRight: 5 }}
                                                    name="Sunday"
                                                    value="Sunday"
                                                    checked={formData?.workingDays?.includes("Sunday")}
                                                    onChange={handleChangeWorkingDay}
                                                />
                                                <label htmlFor="Sunday">Sunday</label>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="autoClockOut"
                                                value="autoClockOut"
                                                checked={formData.autoClockOut}
                                                onChange={handleChange}
                                            />
                                            Auto Clock Out
                                        </label>
                                    </div>

                                    <div className="modal-footer" style={{ gap: 5 }}>
                                        <button
                                            type="button"
                                            className="btn btn-default pull-left"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Save
                                        </button>
                                    </div>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShiftTab