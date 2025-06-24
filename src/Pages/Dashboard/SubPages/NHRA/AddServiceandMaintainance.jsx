import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { apiCall } from '../../../../utils/apiCall'

const AddServiceandMaintainance = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');


  const [products, setProducts] = useState([]);
  const [healthCareFacilities, setHealthCareFacilities] = useState([]);

  const [formData, setFormData] = useState({
    device: '',
    healthcarefacility: '',
    repairMaintenanceServiceRequested: [],
    dateOfRequestforMaintenance: '',
    dateOfMaintenance: '',
    descriptionOfMaintenanceActivities: '',
    detailsOfMaterialsUsed: '',
    jobCompleted: '',
    replacementOrRemovalOfEquipmentNeeded: '',
    isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance: '',
    maintenanceActivityPerformedBy: '',
    maintenanceActivitySupervisedBy: '',
    invoiceNumber: '',
    invoiceDate: '',
    parts: [
      {
        partNumber: '',
        materialsUsed: '',
        quantity: '',
        cost: '',
        warranty: '',
      },
      {
        partNumber: '',
        materialsUsed: '',
        quantity: '',
        cost: '',
        warranty: '',
      },
    ],
  });


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "get",
        url: '/admin/product/productList/getProducts?isMedical=Yes',
      });

      if (res.status == 200) {
        setProducts(res?.data?.result);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllHealthFacility = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "get",
        url: '/admin/nhra/healthFacilityList/getHealthFacilities',
      });

      if (res.status == 200) {
        setHealthCareFacilities(res?.data?.result);
      } else {
        throw new Error("Failed to fetch health case facilites");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAllHealthFacility();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRepairMaintenanceServiceRequestedChange = (e) => {
    const { value } = e.target;

    const updatedRepairMaintenanceServiceRequested = formData?.repairMaintenanceServiceRequested?.includes(value) ?
      formData?.repairMaintenanceServiceRequested?.filter(req => req !== value)
      : [...formData?.repairMaintenanceServiceRequested, value]

    setFormData(prev => ({
      ...prev,
      repairMaintenanceServiceRequested: [...updatedRepairMaintenanceServiceRequested]
    }))
  }

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, {
        partNumber: '',
        materialsUsed: '',
        quantity: '',
        cost: '',
        warranty: '',
      }]
    }))
  }

  const removePart = (index) => {
    if (formData.parts.length <= 1) return;

    const updatedParts = [...formData.parts]
    updatedParts.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      parts: updatedParts
    }))
  }

  const handlePartChange = (e, index) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updatedPart = [...formData.parts]
      updatedPart[index] = {
        ...updatedPart[index],
        [name]: value
      }

      return {
        ...prev,
        parts: updatedPart
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiCall({
        method: "post",
        url: `/admin/nhra/serviceMaintenance/addServiceMaintenance`,
        data: formData
      })
      if (res.status === 201) {
        navigate('/ServiceMaintenance')
      } else {
        setError(res?.data?.message)
      }
    } catch (error) {
      setError(error.message);
      console.log("Error in add new Service and Maintenance : ", error)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Add Service &amp; Maintenance</h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-body">
                <form
                  onSubmit={handleSubmit}
                  className="tab-wizard wizard-circle wizard clearfix">
                  <br />
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                        <h3 className="text-white">Medical Device Details</h3>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor="devicename">Device Name</label>
                            <select
                              className="form-control select2 productselect"
                              name="device"
                              id="device"
                              required
                              value={formData.device}
                              onChange={handleChange}
                            >
                              <option value="">--Select Device--</option>
                              {
                                products.map(product => (
                                  <option key={product?._id} value={product?._id}>{product?.productName}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="model_no">Model Number</label>
                            <input
                              id="model"
                              name="model_no"
                              type="text"
                              className="form-control"
                              placeholder="Model Number"
                              readOnly
                              value={products.find(product => product?._id === formData.device)?.productModel || ""}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="serial_no">Serial Number</label>
                            <input id="serial" name="serial_no" type="text"
                              className="form-control" placeholder="Serial Number" readOnly
                              value={products.find(product => product?._id === formData.device)?.productSerialNo || ""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="gmdn_code">GMDN Code</label>
                            <input id="gmdn_code" name="gmdn_code" type="text"
                              className="form-control" placeholder="GMDN Code" readOnly
                              value={products.find(product => product?._id === formData.device)?.productGMDNCode || ""}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="batch_no">Batch Number</label>
                            <input id="batch_no" name="batch_no" type="text"
                              className="form-control" placeholder="Batch Number" readOnly
                              value={products.find(product => product?._id === formData.device)?.batchNo || ""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="hs_code">HS CODE</label>
                            <input id="hs_code" name="hs_code" type="text"
                              className="form-control" placeholder="HS CODE" readOnly
                              value={products.find(product => product?._id === formData.device)?.productHSCode || ""}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                        <h3 className="text-white">End-user Details</h3>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="healthcarename">Healthcare facility Name</label>
                            <select
                              className="form-control"
                              name="healthcarefacility" id="hcfid"
                              required
                              value={formData.healthcarefacility}
                              onChange={handleChange}
                            >
                              <option value="">--Select--</option>
                              {
                                healthCareFacilities?.map(facility => (
                                  <option key={facility?._id} value={facility?._id}>{facility?.facilityName}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="contactperson">Contact Person</label>
                            <input id="contactperson" name="contactperson" type="text"
                              className="form-control" placeholder="Contact Person" readOnly
                              value={healthCareFacilities.find(facility => facility?._id === formData?.healthcarefacility)?.personName || ""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="contactpersonmobile">Contact Person Mobile</label>
                            <input id="contactpersonmobile" name="contactpersonmobile" type="text"
                              className="form-control" placeholder="Contact Person Mobile" readOnly
                              value={healthCareFacilities.find(facility => facility?._id === formData?.healthcarefacility)?.personMobile || ""}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="contactpersonemail">Email</label>
                            <input id="contactpersonemail" name="contactpersonemail" type="email"
                              className="form-control" placeholder="Email" readOnly
                              value={healthCareFacilities.find(facility => facility?._id === formData?.healthcarefacility)?.personEmail || ""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="contactpersoncpr">Contact Person CPR</label>
                            <input id="contactpersoncpr" name="contactpersoncpr" type="text"
                              className="form-control" placeholder="Contact Person CPR" readOnly
                              value={healthCareFacilities.find(facility => facility?._id === formData?.healthcarefacility)?.personCPR || ""}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                        <h3 className="text-white">Maintenance</h3>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor="Speciality Area">Repair / Maintenance / Service Requested</label>
                            <div className="col-12">
                              <div className="row" style={{ display: "flex" }}>
                                <div className="col-md-4">
                                  <div className="custom-control custom-checkbox" >
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox1"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Emergency'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Emergency')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox1" className="custom-control-label" >Emergency</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox"
                                      id="customCheckbox2" name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Equipment Repair'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Equipment Repair')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox2" className="custom-control-label">Equipment Repair</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox3" name="service[]"
                                      style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Corrective'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Corrective')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox3" className="custom-control-label">Corrective</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox4"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Preventive'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Preventive')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox4" className="custom-control-label">Preventive</label>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox5"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Regular Maintenance'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Regular Maintenance')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox5" className="custom-control-label">Regular Maintenance</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox6"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'48 Hours'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('48 Hours')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox6" className="custom-control-label">48 Hours</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox7"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Installation'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Installation')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox7" className="custom-control-label">Installation</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox8"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Pre-Installation'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Pre-Installation')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox8" className="custom-control-label">Pre-Installation</label>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox" id="customCheckbox9"
                                      name="service[]" style={{ marginRight: '5px', marginTop: 1 }}
                                      value={'Vandalism'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Vandalism')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox9" className="custom-control-label">Vandalism</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      className="custom-control-input"
                                      type="checkbox"
                                      id="customCheckbox10"
                                      name="service[]"
                                      style={{ marginRight: '5px' }}
                                      value={'Field Modification'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Field Modification')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox10" className="custom-control-label">Field Modification</label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" type="checkbox"
                                      id="customCheckbox11" style={{ marginRight: '5px' }}
                                      value={'Other'}
                                      checked={formData?.repairMaintenanceServiceRequested?.includes('Other')}
                                      onChange={handleRepairMaintenanceServiceRequestedChange}
                                    />
                                    <label htmlFor="customCheckbox11" className="custom-control-label">Other</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="dateofrequest"> Date of Request for Maintenance</label>
                            <input id="dateofrequest" name="dateOfRequestforMaintenance" type="date"
                              className="form-control" placeholder="Date of Request for Maintenance"
                              value={formData.dateOfRequestforMaintenance?.substring(0, 10) || ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="dateofmaintenance">Date of Maintenance</label>
                            <input id="dateofmaintenance" name="dateOfMaintenance" type="date"
                              className="form-control" placeholder="Date of Maintenance"
                              value={formData.dateOfMaintenance.substring(0, 10) || ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="description"> Description of Maintenance Activities</label>
                            <textarea id="description" name="descriptionOfMaintenanceActivities" type="text" className="form-control"
                              placeholder="Description of Maintenance Activities" rows={6}
                              value={formData.descriptionOfMaintenanceActivities}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="materials">
                              Details of Materials Used
                            </label>
                            <textarea id="materials" name="detailsOfMaterialsUsed" type="text" className="form-control"
                              placeholder="Details of Materials Used" rows={6}
                              value={formData?.detailsOfMaterialsUsed}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group clearfix">
                        <label htmlFor="Corrective action">Job Completed</label>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input type="radio" defaultChecked="" id="job1"
                                style={{ marginRight: '2px' }}
                                name="jobCompleted"
                                value={'Yes'}
                                checked={formData.jobCompleted === "Yes"}
                                onChange={handleChange}
                              />
                              <label htmlFor="job1">Yes</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input type="radio" id="job2" style={{ marginRight: '2px' }}
                                name="jobCompleted"
                                value={'No'}
                                checked={formData.jobCompleted === "No"}
                                onChange={handleChange}
                              />
                              <label htmlFor="job2">No</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input type="radio" id="job3" style={{ marginRight: '2px' }}
                                name="jobCompleted"
                                value={'N/A'}
                                checked={formData.jobCompleted === "N/A"}
                                onChange={handleChange}
                              />
                              <label htmlFor="job3">N/A</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group clearfix">
                        <label htmlFor="Corrective action">
                          Replacement or Removal of Equipment Needed?
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input
                                type="radio"
                                defaultChecked=""
                                id="replacement1"
                                name="replacementOrRemovalOfEquipmentNeeded"
                                value={'Yes'}
                                checked={formData.replacementOrRemovalOfEquipmentNeeded === "Yes"}
                                onChange={handleChange}
                              />
                              <label htmlFor="replacement1">Yes</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input
                                type="radio"
                                id="replacement2"
                                name="replacementOrRemovalOfEquipmentNeeded"
                                value={'No'}
                                checked={formData.replacementOrRemovalOfEquipmentNeeded === "No"}
                                onChange={handleChange}
                              />
                              <label htmlFor="replacement2">No</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input
                                type="radio"
                                id="replacement3"
                                name="replacementOrRemovalOfEquipmentNeeded"
                                value={'N/A'}
                                checked={formData.replacementOrRemovalOfEquipmentNeeded === "N/A"}
                                onChange={handleChange}
                              />
                              <label htmlFor="replacement3">N/A</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group clearfix">
                        <label htmlFor="Corrective action">
                          Is the equipment labelled with the last and next date ofCalibration / Maintenance?
                        </label>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input
                                type="radio"
                                id="labelled1"
                                name="isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance"
                                value={'Yes'}
                                checked={formData.isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance === "Yes"}
                                onChange={handleChange}
                              />
                              <label htmlFor="labelled1">Yes</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input type="radio" id="labelled2"
                                name="isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance"
                                value={'No'}
                                checked={formData.isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance === "No"}
                                onChange={handleChange}
                              />
                              <label htmlFor="labelled2">No</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="icheck-primary ">
                              <input type="radio" id="labelled3"
                                name="isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance"
                                value={'N/A'}
                                checked={formData.isTheEquipmentLabelledWithTheLastAndNextDateOfCalibrationMaintenance === "N/A"}
                                onChange={handleChange}
                              />
                              <label htmlFor="labelled3">N/A</label>
                            </div>
                          </div>
                          <br />
                          <br />
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="armobile">
                                Maintenance Activity Performed By
                              </label>
                              <input
                                id="armobile"
                                name="maintenanceActivityPerformedBy"
                                type="text"
                                className="form-control"
                                placeholder="Maintenance Activity Performed By"
                                value={formData.maintenanceActivityPerformedBy}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="arlicense">
                                Maintenance Activity Supervised By
                              </label>
                              <input
                                id="arlicense"
                                name="maintenanceActivitySupervisedBy"
                                type="text"
                                className="form-control"
                                placeholder="Maintenance Activity Supervised By"
                                value={formData.maintenanceActivitySupervisedBy}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="arinvoice">Invoice Number</label>
                              <input
                                id="arinvoice"
                                name="invoiceNumber"
                                type="text"
                                className="form-control"
                                placeholder="Invoice Number"
                                value={formData.invoiceNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="arinvoicedate">Invoice Date</label>
                              <input
                                id="arinvoicedate"
                                name="invoiceDate"
                                type="date"
                                className="form-control"
                                placeholder="Invoice Date"
                                value={formData.invoiceDate.substring(0, 10) || 0}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table nowrap text-nowrap border mt-5" style={{ color: 'black' }}>
                            <thead>
                              <tr>
                                <th className="w-30">Part Number</th>
                                <th className="w-10">Materials Used</th>
                                <th className="w-10">Quantity</th>
                                <th className="w-10">Cost</th>
                                <th className="w-10">Warranty</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody id="objectiveDiv">
                              {
                                formData?.parts?.map((part, index) => (
                                  <tr key={index} id="objDiv0">
                                    <td>
                                      <input
                                        type="text"
                                        name="partNumber"
                                        id="part0"
                                        style={{ color: "black" }}
                                        className="form-control"
                                        placeholder="Part Number"
                                        value={formData?.parts[index]?.partNumber}
                                        onChange={(e) => handlePartChange(e, index)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="materialsUsed"
                                        id="material0"
                                        style={{ color: "black" }}
                                        className="form-control"
                                        placeholder="Materials Used"
                                        value={formData?.parts[index]?.materialsUsed}
                                        onChange={(e) => handlePartChange(e, index)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="quantity"
                                        id="quantity0"
                                        style={{ color: "black" }}
                                        className="form-control"
                                        placeholder="Quantity"
                                        value={formData?.parts[index]?.quantity}
                                        onChange={(e) => handlePartChange(e, index)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="cost"
                                        id="cost0"
                                        style={{ color: "black" }}
                                        className="form-control"
                                        placeholder="Cost"
                                        value={formData?.parts[index]?.cost}
                                        onChange={(e) => handlePartChange(e, index)}
                                      />
                                    </td>
                                    <td>
                                      <select
                                        className="form-control"
                                        id="warranty0"
                                        name="warranty"
                                        value={formData?.parts[index]?.warranty}
                                        onChange={(e) => handlePartChange(e, index)}
                                      >
                                        <option value="">--select--</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No </option>
                                      </select>
                                    </td>
                                    <td>

                                      <button
                                        className="btn btn-danger"
                                        id="removeObjective"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => removePart(index)}
                                        type='button'
                                      >
                                        <i className="fas fa-minus" />
                                      </button>

                                    </td>
                                  </tr>
                                ))
                              }
                              <tr>
                                <td colSpan={20} style={{ textAlign: "center" }}>
                                  <button
                                    className="btn btn-success"
                                    id="addobjective"
                                    style={{ marginLeft: 10 }}
                                    type='button'
                                    onClick={addPart}
                                  >
                                    <i className="fas fa-plus" /> Add More
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot></tfoot>
                          </table>
                          <br />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="form-group col-md-12 d-flex justify-content-center">
                      <input type="submit" defaultValue="Submit" className="btn btn-info btn-flat" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddServiceandMaintainance