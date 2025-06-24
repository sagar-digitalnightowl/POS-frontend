import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall'
import { useNavigate } from 'react-router-dom'

const AddAdverseEvent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [products, setProducts] = useState([]);
  const [manufacturers, setManufactures] = useState([]);
  const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);
  const [healthCareFacilities, setHealthCareFacilities] = useState([]);

  const [formData, setFormData] = useState({
    applicationType: '',
    riskClassification: '',
    typeOfReporter: '',
    reporterName: '',
    reporterCPRnumber: '',
    reporterMobileNumber: '',
    reporterPositionJobTitle: '',
    reporterEmail: '',
    reportDate: '',
    device: '',
    numberofDevicesInvolved: '',
    dateOfInstallation: '',
    lastPPM: '',
    deviceLocationDept: [],
    otherLocations: '',
    adverseEventClassification: '',
    otherAdverseEvent: '',
    description: '',
    immediateActionTaken: '',
    supportiveDocuments: null,
    healthCareFacility: '',
    authorizedRepresentative: '',
    dateofReportAwareness: '',
    correctiveActionTaken: '',
    manufacturer: '',
    contactPersonNumber: '',
    manufacturerDateofAwareness: '',
    actionRecomended: '',
    staffName: '',
    staffNumber: '',
    staffPosition: '',
    staffEmail: '',
    staffCPRNumber: '',
    nhraRefNo: '',
    positionJobTitle: '',
    responsiblePerson: '',
    dateOfReceiving: '',
    signature: null,
    reportStatus: '',
    otherReportStatus: ''
  });


  const fetchAllAuthorizedRepresentative = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/authorizedRepresentativeList/getAuthorizedRepresentatives`,
      })

      if (res.status === 200) {
        setAuthorizedRepresentatives(res?.data?.result)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch all Authorized Representatives : ", error)
    } finally {
      setLoading(false);
    }
  }

  const fetchAllManufactures = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/contacts/manufacturer/getManufacturers`,
      })

      if (res.status === 200) {
        setManufactures(res?.data?.result)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch all manufactures : ", error)
    } finally {
      setLoading(false);
    }
  }

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
    fetchAllAuthorizedRepresentative();
    fetchAllManufactures();
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

  
  const handleDeviceLocationDept = (value) => {
    setFormData(prev => {
      const updatedDeviceLocationDept = prev.deviceLocationDept.includes(value)
        ? prev.deviceLocationDept.filter(deviceLocation => deviceLocation !== value)
        : [...prev.deviceLocationDept, value];

      return {
        ...prev,
        deviceLocationDept: updatedDeviceLocationDept, // corrected key name
      };
    });
  }

  const addAdverseEvent = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "post",
        url: `/admin/nhra/adverseEventList/addAdverseEvent`,
        data: data
      })
      if (res.status === 201) {
        navigate('/AdverseEvents')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error add Adverse Event : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();


    form.append('applicationType', formData.applicationType)
    form.append('riskClassification', formData.riskClassification)
    form.append('typeOfReporter', formData.typeOfReporter)
    form.append('reporterName', formData.reporterName)
    form.append('reporterCPRnumber', formData.reporterCPRnumber)
    form.append('reporterMobileNumber', formData.reporterMobileNumber)
    form.append('reporterPositionJobTitle', formData.reporterPositionJobTitle)
    form.append('reporterEmail', formData.reporterEmail)
    form.append('reportDate', formData.reportDate)
    form.append('device', formData.device)
    form.append('numberofDevicesInvolved', formData.numberofDevicesInvolved)
    form.append('dateOfInstallation', formData.dateOfInstallation)
    form.append('lastPPM', formData.lastPPM)
    form.append('deviceLocationDept', JSON.stringify(formData.deviceLocationDept))
    form.append('otherLocations', formData.otherLocations)
    form.append('adverseEventClassification', formData.adverseEventClassification)
    form.append('otherAdverseEvent', formData.otherAdverseEvent)
    form.append('description', formData.description)
    form.append('immediateActionTaken', formData.immediateActionTaken)


    if (formData.supportiveDocuments) {
      form.append('supportiveDocuments', formData.supportiveDocuments)
    }

    form.append('healthCareFacility', formData.healthCareFacility)
    form.append('authorizedRepresentative', formData.authorizedRepresentative)
    form.append('dateofReportAwareness', formData.dateofReportAwareness)
    form.append('correctiveActionTaken', formData.correctiveActionTaken)
    form.append('manufacturer', formData.manufacturer)
    form.append('contactPersonNumber', formData.contactPersonNumber)
    form.append('manufacturerDateofAwareness', formData.manufacturerDateofAwareness)
    form.append('actionRecomended', formData.actionRecomended)
    form.append('staffName', formData.staffName)
    form.append('staffNumber', formData.staffNumber)
    form.append('staffPosition', formData.staffPosition)
    form.append('staffEmail', formData.staffEmail)
    form.append('staffCPRNumber', formData.staffCPRNumber)
    form.append('nhraRefNo', formData.nhraRefNo)
    form.append('positionJobTitle', formData.positionJobTitle)
    form.append('responsiblePerson', formData.responsiblePerson)
    form.append('dateOfReceiving', formData.dateOfReceiving)


    if (formData.signature) {
      form.append('signature', formData.signature)
    }

    form.append('reportStatus', formData.reportStatus)
    form.append('otherReportStatus', formData.otherReportStatus)

    addAdverseEvent(form);
  }



  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content">
            <div className="box box-primary addborder">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card card-secondary">
                        <div className="card-header">
                          <h3 className="card-title">Add Adverse Event</h3>
                        </div>
                        <div className="card-body">
                          <div className="panel">
                            <div className="panel-body wizard-content">
                              <form id="adverseForm"
                                className="tab-wizard wizard-circle wizard clearfix"
                                onSubmit={handleSubmit}
                              >
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Details</h3>
                                </div>
                                <br />
                                <section>
                                  <br />
                                  <h5>Medical Device Report</h5>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-12 ">

                                      <div className="form-group clearfix">
                                        <label htmlFor="Application Type">Application Type</label>
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reptype1"
                                                name="applicationType"
                                                value={'Initial'}
                                                checked={formData.applicationType === "Initial"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reptype1">Initial</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reptype2"
                                                name="applicationType"
                                                value={'Follow Up'}
                                                checked={formData.applicationType === "Follow Up"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reptype2">Follow Up</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reptype3"
                                                name="applicationType"
                                                value={'Final'}
                                                checked={formData.applicationType === "Final"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reptype3">Final</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <br />

                                      <div className="form-group clearfix">
                                        <label htmlFor="Risk Classification">Risk Classification</label>
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="icheck-primary ">
                                              <select
                                                className="form-control"
                                                name="riskClassification"
                                                value={formData.riskClassification}
                                                onChange={handleChange}
                                              >
                                                <option value="">Select Risk Classification</option>
                                                <option value="Class A (Low Individual Risk and Low Public Health Risk)">
                                                  Class A (Low Individual Risk andLow Public Health Risk)
                                                </option>
                                                <option value="Class B (Moderate Individual Risk and/or Low Public Health Risk)">
                                                  Class B (Moderate Individual Risk and/or Low Public Health Risk)
                                                </option>
                                                <option value="Class C (High Individual Risk and/or Moderate Public Health Risk)">
                                                  Class C (High Individual Risk and/or Moderate Public HealthRisk)
                                                </option>
                                                <option value="Class D (High Individual Risk and High Public Health Risk)">
                                                  Class D (High Individual Risk and High Public Health Risk)
                                                </option>
                                                <option value="Class I (Low Risk Medical Device)">
                                                  Class I (Low Risk Medical Device)
                                                </option>
                                                <option value="Class IIa (Low to Medium Risk Device)">
                                                  Class IIa (Low to Medium Risk Device)
                                                </option>
                                                <option value="Class IIb (Medium to High Risk Device)">
                                                  Class IIb (Medium to High Risk Device)
                                                </option>
                                                <option value="Class III (High Risk Device)">
                                                  Class III (High Risk Device)
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                      <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                        <h3 className="text-white"> Reporter Details </h3>
                                      </div>
                                      <br />
                                      <div className="form-group clearfix">
                                        <label htmlFor="Application Type">Type Of Reporter</label>
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reportertype1"
                                                name="typeOfReporter"
                                                value={'Individual'}
                                                checked={formData.typeOfReporter === "Individual"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reportertype1">Individual</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reportertype2"
                                                name="typeOfReporter"
                                                value={'AR/Supplier'}
                                                checked={formData.typeOfReporter === "AR/Supplier"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reportertype2">AR / Supplier</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                id="reportertype3"
                                                name="typeOfReporter"
                                                value={'Healthcare Facility'}
                                                checked={formData.typeOfReporter === "Healthcare Facility"}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="reportertype3">Healthcare Facility</label>
                                            </div>
                                          </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="name"
                                                name="reporterName"
                                                type="text"
                                                className="form-control validd"
                                                placeholder="Name"
                                                value={formData.reporterName}
                                                onChange={handleChange}
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="mobile">Mobile Number</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="phone"
                                                name="reporterMobileNumber"
                                                type="text"
                                                className="form-control validd"
                                                placeholder="Mobile Number"
                                                value={formData.reporterMobileNumber}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="cprnum">CPR Number</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="cprnum"
                                                name="reporterCPRnumber"
                                                type="number"
                                                className="form-control validd cprvalid"
                                                placeholder="CPR Number"
                                                value={formData.reporterCPRnumber}
                                                onChange={handleChange}
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="position">Position/Job Title</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="postion"
                                                name="reporterPositionJobTitle"
                                                type="text"
                                                className="form-control validd"
                                                placeholder="Position/Job Title"
                                                value={formData.reporterPositionJobTitle}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="email">Email</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="email"
                                                name="reporterEmail"
                                                type="email"
                                                className="form-control validd"
                                                placeholder="Email"
                                                value={formData.reporterEmail}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="reportdate">Report Date</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="reportdate"
                                                name="reportDate"
                                                type="date"
                                                className="form-control validd"
                                                placeholder="Report Date"
                                                value={formData.reportDate}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <br />
                                        <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                          <h3 className="text-white">Medical Device Details</h3>
                                        </div>
                                        <br />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="devicename">Device Name</label>
                                              <select
                                                className="form-control productselect select2 validd"
                                                name="device"
                                                id="device"
                                                value={formData.device}
                                                onChange={handleChange}
                                              >
                                                <option value="" selected="">--Select Device--</option>
                                                {
                                                  products?.map(product => (
                                                    <option key={product?._id} value={product?._id}>{product?.productName}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="numofdevices">Number of Devices Involved</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="numofdevices"
                                                name="numberofDevicesInvolved"
                                                type="text"
                                                className="form-control validd"
                                                placeholder="Number of Devices Involved"
                                                value={formData.numberofDevicesInvolved}
                                                onChange={handleChange}
                                              />
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
                                                value={products.find(pro => pro?._id === formData.device)?.productModel}
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="serial_no">Serial Number</label>
                                              <input
                                                id="serial"
                                                name="serial_no"
                                                type="text"
                                                className="form-control"
                                                placeholder="Serial Number"
                                                readOnly
                                                value={products.find(pro => pro?._id === formData.device)?.productSerialNo}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="gmdn_code">GMDN CODE</label>
                                              <input
                                                id="gmdn_code"
                                                name="gmdn_code"
                                                type="text"
                                                className="form-control"
                                                placeholder="GMDN CODE"
                                                readOnly
                                                value={products.find(pro => pro?._id === formData.device)?.productGMDNCode}
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="installationdate">Date Of Installation</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="installationdate"
                                                name="dateOfInstallation"
                                                type="date"
                                                className="form-control validd"
                                                placeholder="Date Of Installation"
                                                value={formData.dateOfInstallation}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-sm-6">
                                            <div className="form-group">
                                              <label htmlFor="hs_code">Hs Code</label>
                                              <input
                                                id="hs_code"
                                                name="batch_no"
                                                type="text"
                                                className="form-control"
                                                placeholder="Hs Code"
                                                readOnly
                                                value={products.find(pro => pro?._id === formData.device)?.productHSCode}
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="lastppm">Last PPM</label>
                                              <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                              <input
                                                id="lastppm"
                                                name="lastPPM"
                                                type="date"
                                                className="form-control validd"
                                                placeholder="Last PPM"
                                                value={formData.lastPPM}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>
                                        </div>


                                        <div className="form-group">
                                          <label htmlFor="Speciality Area">Device Location/Dept</label>
                                          <div className="col-12">
                                            <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                                              <div className="col-md-3">

                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox1"
                                                    name="checkboxs[]"
                                                    defaultValue="Surgery"
                                                    checked={formData?.deviceLocationDept?.includes('Surgery')}
                                                    onChange={() => handleDeviceLocationDept('Surgery')}
                                                  />
                                                  <label htmlFor="customCheckbox1" className="custom-control-label">Surgery</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox2"
                                                    name="checkboxs[]"
                                                    defaultValue="Pharmacy"
                                                    checked={formData?.deviceLocationDept?.includes('Pharmacy')}
                                                    onChange={() => handleDeviceLocationDept('Pharmacy')}
                                                  />
                                                  <label htmlFor="customCheckbox2" className="custom-control-label">Pharmacy</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox3"
                                                    name="checkboxs[]"
                                                    defaultValue="O&G"
                                                    checked={formData?.deviceLocationDept?.includes('O&G')}
                                                    onChange={() => handleDeviceLocationDept('O&G')}
                                                  />
                                                  <label htmlFor="customCheckbox3" className="custom-control-label">
                                                    O&amp;G
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox4"
                                                    name="checkboxs[]"
                                                    defaultValue="Dialysis"
                                                    checked={formData?.deviceLocationDept?.includes('Dialysis')}
                                                    onChange={() => handleDeviceLocationDept('Dialysis')}
                                                  />
                                                  <label htmlFor="customCheckbox4" className="custom-control-label">
                                                    Dialysis
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox5"
                                                    name="checkboxs[]"
                                                    defaultValue="Endoscopy"
                                                    checked={formData?.deviceLocationDept?.includes('Endoscopy')}
                                                    onChange={() => handleDeviceLocationDept('Endoscopy')}
                                                  />
                                                  <label htmlFor="customCheckbox5" className="custom-control-label">
                                                    Endoscopy
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox6"
                                                    name="checkboxs[]"
                                                    defaultValue="Cardiology"
                                                    checked={formData?.deviceLocationDept?.includes('Cardiology')}
                                                    onChange={() => handleDeviceLocationDept('Cardiology')}
                                                  />
                                                  <label htmlFor="customCheckbox6" className="custom-control-label">
                                                    Cardiology
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col-md-3">
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox7"
                                                    name="checkboxs[]"
                                                    defaultValue="Anesthesia"
                                                    checked={formData?.deviceLocationDept?.includes('Anesthesia')}
                                                    onChange={() => handleDeviceLocationDept('Anesthesia')}
                                                  />
                                                  <label htmlFor="customCheckbox7" className="custom-control-label">
                                                    Anesthesia
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox8"
                                                    name="checkboxs[]"
                                                    defaultValue="Orthopedic"
                                                    checked={formData?.deviceLocationDept?.includes('Orthopedic')}
                                                    onChange={() => handleDeviceLocationDept('Orthopedic')}
                                                  />
                                                  <label htmlFor="customCheckbox8" className="custom-control-label">
                                                    Orthopedic
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox9"
                                                    name="checkboxs[]"
                                                    defaultValue="OPD"
                                                    checked={formData?.deviceLocationDept?.includes('OPD')}
                                                    onChange={() => handleDeviceLocationDept('OPD')}
                                                  />
                                                  <label htmlFor="customCheckbox9" className="custom-control-label">
                                                    OPD
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox10"
                                                    name="checkboxs[]"
                                                    defaultValue="ICU"
                                                    checked={formData?.deviceLocationDept?.includes('ICU')}
                                                    onChange={() => handleDeviceLocationDept('ICU')}
                                                  />
                                                  <label htmlFor="customCheckbox10" className="custom-control-label">
                                                    ICU
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox11"
                                                    name="checkboxs[]"
                                                    defaultValue="Ophthalmology"
                                                    checked={formData?.deviceLocationDept?.includes('Ophthalmology')}
                                                    onChange={() => handleDeviceLocationDept('Ophthalmology')}
                                                  />
                                                  <label htmlFor="customCheckbox11" className="custom-control-label">
                                                    Ophthalmology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox12"
                                                    name="checkboxs[]"
                                                    defaultValue="Respiratory"
                                                    checked={formData?.deviceLocationDept?.includes('Oncology')}
                                                    onChange={() => handleDeviceLocationDept('Oncology')}
                                                  />
                                                  <label htmlFor="customCheckbox12" className="custom-control-label">
                                                    Oncology
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col-md-3">
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox13"
                                                    name="checkboxs[]"
                                                    defaultValue="Oncology"
                                                    checked={formData?.deviceLocationDept?.includes('Oncology')}
                                                    onChange={() => handleDeviceLocationDept('Oncology')}
                                                  />
                                                  <label htmlFor="customCheckbox13" className="custom-control-label">
                                                    Oncology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox14"
                                                    name="checkboxs[]"
                                                    defaultValue="Dermatology"
                                                    checked={formData?.deviceLocationDept?.includes('Dermatology')}
                                                    onChange={() => handleDeviceLocationDept('Dermatology')}
                                                  />
                                                  <label htmlFor="customCheckbox14" className="custom-control-label">
                                                    Dermatology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox15"
                                                    name="checkboxs[]"
                                                    defaultValue="Pediatric"
                                                    checked={formData?.deviceLocationDept?.includes('Pediatric')}
                                                    onChange={() => handleDeviceLocationDept('Pediatric')}
                                                  />
                                                  <label htmlFor="customCheckbox15" className="custom-control-label">
                                                    Pediatric
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox16"
                                                    name="checkboxs[]"
                                                    defaultValue="Rehabilitation"
                                                    checked={formData?.deviceLocationDept?.includes('Rehabilitation')}
                                                    onChange={() => handleDeviceLocationDept('Rehabilitation')}
                                                  />
                                                  <label htmlFor="customCheckbox16" className="custom-control-label">
                                                    Rehabilitation
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox17"
                                                    name="checkboxs[]"
                                                    defaultValue="CCU"
                                                    checked={formData?.deviceLocationDept?.includes('CCU')}
                                                    onChange={() => handleDeviceLocationDept('CCU')}
                                                  />
                                                  <label htmlFor="customCheckbox17" className="custom-control-label">
                                                    CCU
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox18"
                                                    name="checkboxs[]"
                                                    defaultValue="Dental"
                                                    checked={formData?.deviceLocationDept?.includes('Dental')}
                                                    onChange={() => handleDeviceLocationDept('Dental')}
                                                  />
                                                  <label htmlFor="customCheckbox18" className="custom-control-label">
                                                    Dental
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col-md-3">
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox19"
                                                    name="checkboxs[]"
                                                    defaultValue="Audiology"
                                                    checked={formData?.deviceLocationDept?.includes('Audiology')}
                                                    onChange={() => handleDeviceLocationDept('Audiology')}
                                                  />
                                                  <label htmlFor="customCheckbox19" className="custom-control-label">
                                                    Audiology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox20"
                                                    name="checkboxs[]"
                                                    defaultValue="Laboratory"
                                                    checked={formData?.deviceLocationDept?.includes('Laboratory')}
                                                    onChange={() => handleDeviceLocationDept('Laboratory')}
                                                  />
                                                  <label htmlFor="customCheckbox20" className="custom-control-label">
                                                    Laboratory
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox21"
                                                    name="checkboxs[]"
                                                    defaultValue="Radiology"
                                                    checked={formData?.deviceLocationDept?.includes('Radiology')}
                                                    onChange={() => handleDeviceLocationDept('Radiology')}
                                                  />
                                                  <label htmlFor="customCheckbox21" className="custom-control-label">
                                                    Radiology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox22"
                                                    name="checkboxs[]"
                                                    defaultValue="Emergency"
                                                    checked={formData?.deviceLocationDept?.includes('Emergency')}
                                                    onChange={() => handleDeviceLocationDept('Emergency')}
                                                  />
                                                  <label htmlFor="customCheckbox22" className="custom-control-label">
                                                    Emergency
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox23"
                                                    name="checkboxs[]"
                                                    defaultValue="Andrology"
                                                    checked={formData?.deviceLocationDept?.includes('Andrology')}
                                                    onChange={() => handleDeviceLocationDept('Andrology')}
                                                  />
                                                  <label htmlFor="customCheckbox23" className="custom-control-label">
                                                    Andrology
                                                  </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                  <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox24"
                                                    checked={formData?.deviceLocationDept?.includes('Other')}
                                                    onChange={() => handleDeviceLocationDept('Other')}
                                                  />
                                                  <label htmlFor="customCheckbox24" className="custom-control-label">
                                                    Other
                                                  </label>
                                                </div>
                                                {formData.deviceLocationDept.includes('Other') && (
                                                  <div className="form-group">
                                                    <input
                                                      id="other"
                                                      name="otherLocations"
                                                      type="text"
                                                      className="form-control"
                                                      placeholder="Other Locations"
                                                      value={formData.otherLocations}
                                                      onChange={handleChange}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <h5>Adverse Event Details</h5>
                                <section>
                                  <div className="form-group">
                                    <label htmlFor="Activity to be Repeated">
                                      Adverse Event Classification
                                    </label>
                                    <div className="col-12">
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="death"
                                              className="classification"
                                              name="adverseEventClassification"
                                              value={'Death'}
                                              checked={formData.adverseEventClassification === "Death"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="death">Death</label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="injury"
                                              className="classification"
                                              name="adverseEventClassification"
                                              value={'Serious Injury'}
                                              checked={formData.adverseEventClassification === "Serious Injury"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="injury">
                                              Serious Injury
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="uncertainty"
                                              className="classification"
                                              name="adverseEventClassification"
                                              value={'Uncertainty of Results'}
                                              checked={formData.adverseEventClassification === "Uncertainty of Results"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="uncertainty">
                                              Uncertainty of Results
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="hospitalization"
                                              className="classification"
                                              name="adverseEventClassification"
                                              value={'Need for hospitalization, surgical ormedical intervention'}
                                              checked={formData.adverseEventClassification === "Need for hospitalization, surgical ormedical intervention"}
                                              onChange={handleChange}
                                            />

                                            <label htmlFor="hospitalization">
                                              Need for hospitalization, surgical ormedical intervention
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary">
                                            <input
                                              type="radio"
                                              id="event"
                                              className="classification"
                                              name="adverseEventClassification"
                                              value={'Other Reportable Event'}
                                              checked={formData.adverseEventClassification === "Other Reportable Event"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="event">Other Reportable Event</label>
                                          </div>
                                          {formData.adverseEventClassification === "Other Reportable Event" && (
                                            <div className="form-group">
                                              <label htmlFor="other">Please specify</label>
                                              <input
                                                id="other"
                                                name="otherAdverseEvent"
                                                type="text"
                                                className="form-control"
                                                placeholder="Specify other"
                                                value={formData.otherAdverseEvent}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="duration">Description</label>
                                        <textarea
                                          id="description"
                                          name="description"
                                          type="text"
                                          className="form-control"
                                          placeholder="Descrption"
                                          rows={6}
                                          defaultValue={""}
                                          value={formData.description}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="actiontaken">Immediate Action Taken</label>
                                        <textarea
                                          id="actiontaken"
                                          name="immediateActionTaken"
                                          type="text"
                                          className="form-control"
                                          placeholder="Immediate Action Taken"
                                          rows={6}
                                          value={formData.immediateActionTaken}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <div className="form-group">
                                        <label htmlFor="supportivedocs">Supportive Documents</label>
                                        <div id="objectiveDiv">
                                          <div id="objDiv0" style={{ display: "flex" }}>
                                            <input
                                              id="supportivedocs0"
                                              name="supportivedocs[]"
                                              type="file"
                                              className="form-control"
                                              accept="application/pdf"
                                              placeholder="Supportive Documents"
                                              onChange={(e) => setFormData(prev => ({ ...prev, supportiveDocuments: e.target.files[0] }))}
                                            />
                                            <button className="btn btn-success" id="addobjective" style={{ marginLeft: 10 }}>
                                              <i className="fas fa-plus" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                    <h3 className="text-white">HealthCare Facility Information</h3>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="hcfid">HealthCare Facility Name</label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <span className="form-text text-danger" />
                                        <select
                                          className="form-control validd"
                                          name="healthCareFacility"
                                          id="hcfid"
                                          value={formData.healthCareFacility}
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
                                        <label htmlFor="hcfaddress">HealthCare Facility Address</label>
                                        <input
                                          id="hcfaddress"
                                          name="hcfaddress"
                                          type="text"
                                          className="form-control"
                                          placeholder="HealthCare Facility Address"
                                          readOnly
                                          value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.facilityAddress}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="hcfperson">
                                          HFC Contact Person Name
                                        </label>
                                        <input
                                          id="hcfperson"
                                          name="hcfperson"
                                          type="text"
                                          className="form-control"
                                          placeholder="Contact Person Name"
                                          readOnly
                                          value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personName}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="hcfposition">
                                          HFC Contact Person Position
                                        </label>
                                        <input
                                          id="hcfposition"
                                          name="hcfposition"
                                          type="text"
                                          className="form-control"
                                          placeholder="Contact Person Position"
                                          readOnly
                                          value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personPosition}
                                        />

                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="hcfcontact">
                                          HFC Contact Person Number
                                        </label>
                                        <input
                                          id="hcfcontact"
                                          name="hcfcontact"
                                          type="text"
                                          className="form-control"
                                          placeholder="Contact Person Number"
                                          readOnly
                                          value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personMobile}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="hcfemail">Email</label>
                                        <input
                                          id="hcfemail"
                                          name="hcfemail"
                                          type="email"
                                          className="form-control"
                                          placeholder="Email"
                                          readOnly
                                          value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personEmail}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <h3 className="text-white">
                                  Authorized Representative Details
                                </h3>
                                <section>
                                  <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                    <h3 className="text-white">
                                      Authorized Representative Details
                                    </h3>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="arname">Authorized Representative Name</label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <span className="form-text text-danger" />
                                        <select
                                          className="form-control validd"
                                          name="authorizedRepresentative" id="arid"
                                          value={formData.authorizedRepresentative}
                                          onChange={handleChange}
                                        >
                                          <option value="">--Select--</option>
                                          {
                                            authorizedRepresentatives.map(representative => (
                                              <option key={representative?._id} value={representative?._id}>{representative?.name}</option>
                                            ))
                                          }
                                        </select>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="ar_email">
                                          Authorized Representative Email
                                        </label>
                                        <input
                                          id="ar_email"
                                          name="ar_email"
                                          type="email"
                                          className="form-control"
                                          placeholder="Authorized Representative Email"
                                          readOnly
                                          value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.emailAddress}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="armobile">
                                          Mobile Number
                                        </label>
                                        <input
                                          id="armobile"
                                          name="armobile"
                                          type="text"
                                          className="form-control"
                                          placeholder="Mobile Number"
                                          readOnly
                                          value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.phoneNumber}
                                        />
                                      </div>

                                      <div className="form-group">
                                        <label htmlFor="ardate">Date of Report Awareness</label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <span className="form-text text-danger" />
                                        <input
                                          id="ardate"
                                          name="dateofReportAwareness"
                                          type="date"
                                          className="form-control validd"
                                          placeholder="Date of Report Awareness"
                                          value={formData.dateofReportAwareness}
                                          onChange={handleChange}
                                        />
                                      </div>

                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="aractiontaken">
                                      Corrective Action Taken
                                    </label>
                                    <textarea
                                      id="aractiontaken"
                                      name="correctiveActionTaken"
                                      type="text"
                                      className="form-control"
                                      placeholder="Corrective Action Taken"
                                      rows={6}
                                      defaultValue={""}
                                      value={formData.correctiveActionTaken}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <br />
                                  <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                    <h3 className="text-white">
                                      Manufacturer Information
                                    </h3>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="manufaturername">
                                          Manufacturer Name
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <span className="form-text text-danger" />
                                        <select
                                          className="form-control validd"
                                          name="manufacturer"
                                          id="manid"
                                          value={formData.manufacturer}
                                          onChange={handleChange}
                                        >
                                          <option value="" selected="">--Select--</option>
                                          {
                                            manufacturers.map(manufacturer => (
                                              <option key={manufacturer?._id} value={manufacturer?._id}>{manufacturer?.name}</option>
                                            ))
                                          }
                                        </select>
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="manufatureremail">
                                          Manufacturer Email
                                        </label>
                                        <input
                                          id="manufatureremail"
                                          name="manufatureremail"
                                          type="email"
                                          className="form-control"
                                          placeholder="Manufacturer Email"
                                          readOnly
                                          value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.email}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="manufaturermobile">
                                          Contact Person Number
                                        </label>
                                        <input
                                          id="manufaturermobile"
                                          name="manufaturermobile"
                                          type="text"
                                          className="form-control"
                                          placeholder="Contact Person Number"
                                          readOnly
                                          value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.phoneNumber}
                                        />

                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="manufaturerdate">
                                          Manufacturer Date of Awareness
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <span className="form-text text-danger" />
                                        <input
                                          id="manufaturerdate"
                                          name="manufacturerDateofAwareness"
                                          type="date"
                                          className="form-control validd"
                                          placeholder="Manufacturer Date of Awareness"
                                          value={formData.manufacturerDateofAwareness}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="countryoforigin">
                                      Country Of Origin
                                    </label>
                                    <input
                                      id="countryoforigin"
                                      name="countryoforigin"
                                      type="text"
                                      className="form-control"
                                      placeholder="Country Of Origin"
                                      readOnly
                                      value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.country}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="manufactureraction">
                                      Action Recomended
                                    </label>
                                    <textarea
                                      id="manufactureraction"
                                      name="actionRecomended"
                                      type="text"
                                      className="form-control"
                                      placeholder="Action Recomended"
                                      rows={6}
                                      defaultValue={""}
                                      value={formData.actionRecomended}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <br />
                                </section>
                                <h5>NHRA</h5>
                                <section>
                                  <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                    <h3 className="text-white">
                                      Staff Involved Details
                                    </h3>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="staffname">
                                          Staff Name
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="staffname"
                                          name="staffName"
                                          type="text"
                                          className="form-control validd"
                                          placeholder="Staff Name"
                                          value={formData.staffName}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="staffposition">
                                          Staff Position
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="staffposition"
                                          name="staffPosition"
                                          type="text"
                                          className="form-control validd"
                                          placeholder="Staff Position"
                                          value={formData.staffPosition}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="staffcontact">
                                          Staff Number
                                        </label>
                                        <input
                                          id="staffcontact"
                                          name="staffNumber"
                                          type="text"
                                          className="form-control"
                                          placeholder="Staff Number"
                                          value={formData.staffNumber}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="staffemail">Email</label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="staffemail"
                                          name="staffEmail"
                                          type="email"
                                          className="form-control validd"
                                          placeholder="Email"
                                          value={formData.staffEmail}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="staffcpr">
                                          Staff CPR Number
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="staffcpr"
                                          name="staffCPRNumber"
                                          type="number"
                                          className="form-control cprvalid validd"
                                          placeholder="Staff CPR Number"
                                          value={formData.staffCPRNumber}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                    <h3 className="text-white">NHRA</h3>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="nhraref_no">
                                          NHRA Ref No.
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="nhraref_no"
                                          name="nhraRefNo"
                                          type="text"
                                          className="form-control validd"
                                          placeholder="NHRA Ref No."
                                          value={formData.nhraRefNo}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="nhraperson">
                                          Responsible Person
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="nhraperson"
                                          name="responsiblePerson"
                                          type="text"
                                          className="form-control validd"
                                          placeholder="Responsible Person"
                                          value={formData.responsiblePerson}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div className="form-group">
                                        <label htmlFor="nhraposition">
                                          Position/Job Title
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="nhraposition"
                                          name="positionJobTitle"
                                          type="text"
                                          className="form-control validd"
                                          placeholder="Position/Job Title"
                                          value={formData.positionJobTitle}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="nhrareceivingdate">
                                          Date Of Receiving
                                        </label>
                                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                        <input
                                          id="nhrareceivingdate"
                                          name="dateOfReceiving"
                                          type="date"
                                          className="form-control validd"
                                          placeholder="Date Of Receiving"
                                          value={formData.dateOfReceiving}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="nhrasignature">Signature</label>
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="nhrasignature"
                                        name="nhrasignature"
                                        placeholder="Signature"
                                        onChange={(e) => setFormData(prev => ({ ...prev, signature: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label htmlFor="Activity to be Repeated">
                                      Report Status
                                    </label>
                                    <div className="col-12">
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="open"
                                              defaultValue="Open"
                                              defaultChecked=""
                                              name="reportStatus"
                                              value={'Open'}
                                              checked={formData.reportStatus === "Open"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="open">Open</label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              id="closed"
                                              defaultValue="Closed"
                                              name="reportStatus"
                                              value={'Closed'}
                                              checked={formData.reportStatus === "Closed"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="closed">Closed</label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input type="radio" id="other"
                                              name="reportStatus"
                                              value={'Other'}
                                              checked={formData.reportStatus === "Other"}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="other">Other</label>
                                            {formData?.reportStatus === "Other" && (
                                              <div className="form-group">
                                                <label htmlFor="other">Please specify</label>
                                                <input
                                                  id="other"
                                                  name="otherReportStatus"
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Specify other"
                                                  value={formData.otherReportStatus}
                                                  onChange={handleChange}
                                                />
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                </section>
                                <section>
                                  <button className="btn btn-info submitt" type="submit">
                                    Submit
                                  </button>
                                </section>
                              </form>
                            </div>
                          </div>
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
    </div>
  )
}

export default AddAdverseEvent