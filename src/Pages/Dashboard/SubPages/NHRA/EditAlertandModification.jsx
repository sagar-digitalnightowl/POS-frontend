import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { apiCall } from '../../../../utils/apiCall'

const EditAlertandModification = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const [products, setProducts] = useState([]);
  const [manufacturers, setManufactures] = useState([]);
  const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantMobNo: '',
    applicantCPRnumber: '',
    eventDate: '',
    device: '',
    authorizedRepresentative: '',
    manufacturer: '',
    alertRiskClassification: '',
    reason: [],
    change: '',
    wasAnyoneInjured: '',
    ifYesWasTheInjury: '',
    nhraReportingStatus: '',
    severity: '',
    patternOfEvents: '',
    categoryOfEvent: '',
    whereIsTheDeviceNow: '',
    descriptionOfEvent: '',
    descriptionOfChange: '',
    modification: '',
    otherModification: '',
    modificationDescription: '',
    modificationDocument: null,
  });


  const fetchAlertAndModificationById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/alertModification/getAlertModification/${id}`,
      })
      if (res.status === 200) {
        setFormData({...res?.data?.result, modificationDocument: null});
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error fetch alert and modification by id : ", error)
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    fetchAllAuthorizedRepresentative();
    fetchAllManufactures();
    fetchProducts();
    fetchAlertAndModificationById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReasonChange = (e) => {
    const { value } = e.target;

    const existReason = formData.reason.includes(value)
      ? formData.reason.filter(rea => rea !== value)
      : [...formData.reason, value];

    setFormData(prev => ({
      ...prev,
      reason: existReason,
    }))
  }


  const editAlertAndModification = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/alertModification/updateAlertModification/${id}`,
        data: data
      })
      if (res.status === 200) {
        navigate('/alert-modification')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error EDIT alert and modification : ", error)
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();


    form.append("applicantName", formData.applicantName)
    form.append("applicantEmail", formData.applicantEmail)
    form.append("applicantMobNo", formData.applicantMobNo)
    form.append("applicantCPRnumber", formData.applicantCPRnumber)
    form.append("eventDate", formData.eventDate)
    form.append("device", formData.device)
    form.append("authorizedRepresentative", formData.authorizedRepresentative)
    form.append("manufacturer", formData.manufacturer)
    form.append("alertRiskClassification", formData.alertRiskClassification)
    form.append("reason", JSON.stringify(formData.reason))
    form.append("change", formData.change)
    form.append("wasAnyoneInjured", formData.wasAnyoneInjured)
    form.append("ifYesWasTheInjury", formData.ifYesWasTheInjury)
    form.append("nhraReportingStatus", formData.nhraReportingStatus)
    form.append("severity", formData.severity)
    form.append("patternOfEvents", formData.patternOfEvents)
    form.append("categoryOfEvent", formData.categoryOfEvent)
    form.append("whereIsTheDeviceNow", formData.whereIsTheDeviceNow)
    form.append("descriptionOfEvent", formData.descriptionOfEvent)
    form.append("descriptionOfChange", formData.descriptionOfChange)
    form.append("modification", formData.modification)
    form.append("otherModification", formData.otherModification)
    form.append("modificationDescription", formData.modificationDescription)
    if (formData.modificationDocument) {
      form.append("modificationDocument", formData.modificationDocument)
    }

    editAlertAndModification(form);
  }


  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit Alerts &amp; Modifications</h1>
          </section>
          <form id="alert_form"
            onSubmit={handleSubmit}
          >
            <section className="content">
              <div className="box box-primary">
                <div className="box-body">
                  <h3>Applicant Details</h3>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="name"> Applicant Name </label>
                        <input type="text" name="applicantName" id="name"
                          className="form-control validd" placeholder="Applicant Name"
                          value={formData.applicantName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mobile"> Applicant Mob no </label>
                        <input type="text" name="applicantMobNo" id="phone"
                          className="form-control validd" placeholder="Applicant Mob no"
                          value={formData.applicantMobNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="email">Applicant Email </label>
                        <input type="email" name="applicantEmail" id="email"
                          className="form-control validd" placeholder="Applicant Email"
                          value={formData.applicantEmail}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cpr">Applicant CPR Number</label>
                        <input type="text" name="applicantCPRnumber" id="cpr"
                          className="form-control validd cprvalid" placeholder="Applicant CPR Number"
                          value={formData.applicantCPRnumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="date"> Event Date </label>
                        <input type="date" name="eventDate" id="date" className="form-control validd"
                          value={formData.eventDate.substring(0,10) || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <h3>Medical Device Details</h3>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="devicename">Device Name</label>
                        <select
                          className="form-control validd productselect select2"
                          name="device"
                          id="device"
                          value={formData.device}
                          onChange={handleChange}
                        >
                          <option value="" selected="">--Select Device--</option>
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
                        <input id="model" name="model_no" type="text"
                          className="form-control" placeholder="Model Number" readOnly
                          value={products.find(product => product?._id === formData?.device)?.productModel || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="serial_no">Serial Number</label>
                        <input id="serial" name="serial_no" type="text"
                          className="form-control" placeholder="Serial Number" readOnly
                          value={products.find(product => product?._id === formData?.device)?.productSerialNo || ''}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="gmdn_code">GDMN Code</label>
                        <input id="gmdn_code" name="gmdn_code" type="text"
                          className="form-control" placeholder="GDMN Code" readOnly
                          value={products.find(product => product?._id === formData?.device)?.productGMDNCode || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="hs_code">HS Code</label>
                        <input id="hs_code" name="hs_code" type="text"
                          className="form-control" placeholder="HS Code" readOnly
                          value={products.find(product => product?._id === formData?.device)?.productHSCode || ''}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="batch_no">Batch Number</label>
                        <input id="batch_no" name="batch_no" type="text"
                          className="form-control" placeholder="Batch Number" readOnly
                          value={products.find(product => product?._id === formData?.device)?.batchNo || ''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <h3>Authorized Representative Details</h3>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="arname">Authorized Representative Name</label>
                        <select
                          className="form-control validd"
                          name="authorizedRepresentative"
                          id="arid"
                          value={formData.authorizedRepresentative}
                          onChange={handleChange}
                        >

                          <option selected="" value="">--Select Authorized Representative--</option>
                          {
                            authorizedRepresentatives.map(rep => (
                              <option key={rep?._id} value={rep?._id}>{rep?.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="aremail">Authorized Representative Email</label>
                        <input id="aremail" name="ar_email" type="email"
                          className="form-control" placeholder="Authorized Representative Email" readOnly
                          value={authorizedRepresentatives.find(ar => ar?._id === formData.authorizedRepresentative)?.emailAddress || ""}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="armobile">Mobile Number</label>
                        <input id="armobile" name="ar_mobile" type="text"
                          className="form-control" placeholder="Mobile Number" readOnly
                          value={authorizedRepresentatives.find(ar => ar?._id === formData.authorizedRepresentative)?.phoneNumber || ""}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="arlicense">Authorized Representative License</label>
                        <input id="arlicense" name="ar_license" type="text"
                          className="form-control" placeholder="Authorized Representative License" readOnly
                          value={authorizedRepresentatives.find(ar => ar?._id === formData.authorizedRepresentative)?.licenseNumber || ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <h3>Manufacturer Information</h3>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="manufaturername">Manufacturer Name</label>
                        <select
                          className="form-control validd"
                          name="manufacturer"
                          id="manid"
                          value={formData.manufacturer}
                          onChange={handleChange}
                        >
                          <option selected="" value="">--Select Manufacturer--</option>
                          {
                            manufacturers.map(manu => (
                              <option key={manu?._id} value={manu?._id}>{manu?.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="manufatureremail">Manufacturer Email</label>
                        <input id="manufatureremail" name="manufatureremail" type="email"
                          className="form-control" placeholder="Manufacturer Email" readOnly
                          value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="manufaturermobile">Contact Person Number</label>
                        <input id="manufaturermobile" name="manufaturermobile" type="text"
                          className="form-control" placeholder="Contact Person Number" readOnly
                          value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.phoneNumber || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="countryoforigin">Country Of Origin</label>
                        <input id="countryoforigin" name="countryoforigin" type="text" className="form-control"
                          placeholder="Country Of Origin" readOnly
                          value={manufacturers?.find(manu => manu?._id === formData.manufacturer)?.country || ''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <h3>Alert</h3>
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">Alert Risk Classification</label>
                    <div className="row">
                      <select
                        className="form-control"
                        name="alertRiskClassification"
                        value={formData.alertRiskClassification}
                        onChange={handleChange}
                      >
                        <option
                          value={'Class A (Low Individual Risk and Low Public Health Risk)'}
                        >Class A (Low Individual Risk and Low Public Health Risk)</option>
                        <option
                          value={'Class B (Moderate Individual Risk and/or Low Public HealthRisk)'}
                        >Class B (Moderate Individual Risk and/or Low Public HealthRisk)</option>
                        <option
                          value={'Class C (High Individual Risk and/or Moderate PublicHealth Risk)'}
                        >Class C (High Individual Risk and/or Moderate PublicHealth Risk)</option>
                        <option
                          value={'Class D (High Individual Risk and High Public Health Risk)'}
                        >Class D (High Individual Risk and High Public Health Risk)</option>
                        <option
                          value={'Class I (Low Risk Medical Device)'}
                        >Class I (Low Risk Medical Device)</option>
                        <option
                          value={'Class IIa (Low to Medium Risk Device)'}
                        >Class IIa (Low to Medium Risk Device)</option>
                        <option
                          value={'Class IIb (Medium to High Risk Device)'}
                        >Class IIb (Medium to High Risk Device)</option>
                        <option
                          value={'Class III (High Risk Device)'}
                        >Class III (High Risk Device)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">Reason</label>
                    <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                      <div className="col-md-3">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox1"
                            name="checkboxs[]"
                            value={'Poor Design'}
                            checked={formData.reason.includes('Poor Design')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox1" className="custom-control-label">Poor Design</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox2"
                            name="checkboxs[]"
                            value={'Poor User Instruction and Training'}
                            checked={formData.reason.includes('Poor User Instruction and Training')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox2" className="custom-control-label">
                            Poor User Instruction and Training
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox3"
                            name="checkboxs[]"
                            value={'Medical Device Failure'}
                            checked={formData.reason.includes('Medical Device Failure')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox3" className="custom-control-label">Medical Device Failure</label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox4"
                            name="checkboxs[]"
                            value={'Medical Device Expired'}
                            checked={formData.reason.includes('Medical Device Expired')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox4" className="custom-control-label">Medical Device Expired</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox5"
                            name="checkboxs[]"
                            value={'Misuse of Medical Device'}
                            checked={formData.reason.includes('Misuse of Medical Device')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox5" className="custom-control-label">Misuse of Medical Device</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox6"
                            name="checkboxs[]"
                            value={'Use Error'}
                            checked={formData.reason.includes('Use Error')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox6" className="custom-control-label">Use Error</label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox7"
                            name="checkboxs[]"
                            value={'Inappropriate Modification'}
                            checked={formData.reason.includes('Inappropriate Modification')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox7" className="custom-control-label">Inappropriate Modification</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox8"
                            name="checkboxs[]"
                            value={'Inadequate Maintenance'}
                            checked={formData.reason.includes('Inadequate Maintenance')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox8" className="custom-control-label">Inadequate Maintenance</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="customCheckbox9"
                            name="checkboxs[]"
                            value={'Unsuitable Storage & Use Conditions'}
                            checked={formData.reason.includes('Unsuitable Storage & Use Conditions')}
                            onChange={handleReasonChange}
                          />
                          <label htmlFor="customCheckbox9" className="custom-control-label">
                            Unsuitable Storage &amp; Use Conditions
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">Change</label>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="icheck-primary ">
                          <input type="radio" id="minor"
                            name="change"
                            value={'Minor Variation'}
                            checked={formData.change === "Minor Variation"}
                            onChange={handleChange}

                          />
                          <label htmlFor="minor">Minor Variation</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icheck-primary ">
                          <input type="radio" id="major"
                            name="change"
                            value={'Major Variation'}
                            checked={formData.change === "Major Variation"}
                            onChange={handleChange}
                          />
                          <label htmlFor="major">Major Variation</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">Was anyone injured?</label>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="icheck-primary ">
                          <input type="radio" id="injured1"
                            name='wasAnyoneInjured'
                            value={'Yes'}
                            checked={formData.wasAnyoneInjured === "Yes"}
                            onChange={handleChange}
                          />
                          <label htmlFor="injured1">Yes</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icheck-primary ">
                          <input type="radio" id="injured2"
                            name='wasAnyoneInjured'
                            value={'No'}
                            checked={formData.wasAnyoneInjured === "No"}
                            onChange={handleChange}
                          />
                          <label htmlFor="injured2">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">If yes, was the injury</label>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="injury_type1"
                            name='ifYesWasTheInjury'
                            value={'Death'}
                            checked={formData.ifYesWasTheInjury === "Death"}
                            onChange={handleChange}
                          />
                          <label htmlFor="injury_type1">Death</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="injury_type2"
                            name='ifYesWasTheInjury'
                            value={'Serious'}
                            checked={formData.ifYesWasTheInjury === "Serious"}
                            onChange={handleChange}
                          />
                          <label htmlFor="injury_type2">Serious</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="injury_type3"
                            name='ifYesWasTheInjury'
                            value={'Minor'}
                            checked={formData.ifYesWasTheInjury === "Minor"}
                            onChange={handleChange}
                          />
                          <label htmlFor="injury_type3">Minor</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">NHRA reporting status</label>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="reported"
                            name='nhraReportingStatus'
                            value={'Reported'}
                            checked={formData.nhraReportingStatus === "Reported"}
                            onChange={handleChange}
                          />
                          <label htmlFor="reported">Reported</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="notreported"
                            name='nhraReportingStatus'
                            value={'Not Reported'}
                            checked={formData.nhraReportingStatus === "Not Reported"}
                            onChange={handleChange}
                          />
                          <label htmlFor="notreported">Not Reported</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary ">
                          <input type="radio" id="NAreported"
                            name='nhraReportingStatus'
                            value={'N/A'}
                            checked={formData.nhraReportingStatus === "N/A"}
                            onChange={handleChange}
                          />
                          <label htmlFor="NAreported">N/A</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="severity">Severity</label>
                      <select
                        className="form-control validd"
                        name="severity"
                        id="severity"
                        value={formData.severity}
                        onChange={handleChange}
                      >
                        <option value="">--Select Severity--</option>
                        <option value="Mild: discomfort noticed but no disruption of normalactivity">
                          Mild: discomfort noticed but no disruption of normalactivity
                        </option>
                        <option value="Moderate: discomfort sufficient to reduce or affect normal dailyactivity">
                          Moderate: discomfort sufficient to reduce or affect normal dailyactivity
                        </option>
                        <option value="Severe: interferes significantly with the subject’s normal activity or course of illness">
                          Severe: interferes significantly with the subject’s normal activity or course of illness
                        </option>
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="event_pattern"> Pattern of Events</label>
                      <select className="form-control validd" id="event_pattern"
                        name='patternOfEvents'
                        value={formData.patternOfEvents}
                        onChange={handleChange}
                      >
                        <option value="">--Select Event--</option>
                        <option value="Single event: The event occurred just once, and has ended by the time of reporting">
                          Single event: The event occurred just once, and has ended by the time of reporting
                        </option>
                        <option value="Continuous: The event began just once, and is still ongoing at the time of reporting">
                          Continuous: The event began just once, and is still ongoing at the time of reporting
                        </option>
                        <option value="Intermittent: The event has gone through at least one cycle of starting, stopping, and starting again">
                          Intermittent: The event has gone through at least one cycle of starting, stopping, and starting again
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="event_category">Category of event</label>
                      <select className="form-control validd" id="event_category"
                        name='categoryOfEvent'
                        value={formData.categoryOfEvent}
                        onChange={handleChange}
                      >
                        <option value="">--Choose an item--</option>
                        <option value="Care management event">Care management event</option>
                        <option value="Surgical event">Surgical event </option>
                        <option value="Product/device event">Product/device event
                        </option>
                        <option value="Criminal event">Criminal event </option>
                        <option value="Environment event">Environment event</option>
                        <option value="Patient protection event">Patient protection event</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="where_device">Where is the Device Now?</label>
                      <input id="where_device"
                        name="whereIsTheDeviceNow"
                        type="text"
                        className="form-control"
                        placeholder="Type Here..."
                        value={formData.whereIsTheDeviceNow}
                        onChange={handleChange}
                      />


                    </div>

                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="event_description">Description Of Event</label>
                        <textarea id="event_description" name="descriptionOfEvent" type="text"
                          className="form-control" placeholder="Description Of Event" rows={6}
                          value={formData.descriptionOfEvent}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="change_description">Description Of Change</label>
                        <textarea id="change_description" name="descriptionOfChange" type="text" className="form-control"
                          placeholder="Description Of Change" rows={6}
                          value={formData.descriptionOfChange}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="form-group clearfix">
                    <label htmlFor="Recall">Modification</label>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod1"
                            name="modification"
                            value={'Manufacturer Change'}
                            checked={formData.modification === 'Manufacturer Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod1">Manufacturer Change</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod2"
                            name="modification"
                            value={'Material Change'}
                            checked={formData.modification === 'Material Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod2">Material Change</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod3"
                            name="modification"
                            value={'Medical Device Design Change'}
                            checked={formData.modification === 'Medical Device Design Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod3">Medical Device Design Change</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod4"
                            name="modification"
                            value={'Software Upgrade'}
                            checked={formData.modification === 'Software Upgrade'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod4">Software Upgrade</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod5"
                            name="modification"
                            value={'Change in Sterlization Process'}
                            checked={formData.modification === 'Change in Sterlization Process'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod5">Change in Sterlization Process</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod6"
                            name="modification"
                            value={'New Model / Updated Version of Medical Device'}
                            checked={formData.modification === 'New Model / Updated Version of Medical Device'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod6">New Model / Updated Version of Medical Device</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod7"
                            name="modification"
                            value={'Storage Change'}
                            checked={formData.modification === 'Storage Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod7">Storage Change</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="mod8"
                            name="modification"
                            value={'Shelf Life Change'}
                            checked={formData.modification === 'Shelf Life Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="mod8">Shelf Life Change</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="icheck-primary">
                          <input type="radio" id="other"
                            name="modification"
                            value={'Other Change'}
                            checked={formData.modification === 'Other Change'}
                            onChange={handleChange}
                          />
                          <label htmlFor="other">Other Change</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {formData.modification === 'Other Change' && (
                    <div className="form-group mt-3">
                      <input type="text" className="form-control"
                        placeholder="Other Changes"
                        name='otherModification'
                        value={formData.otherModification}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <br />
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="modification_description">Modification Description</label>
                      <textarea id="modification_description" name="modificationDescription" type="text"
                        className="form-control" placeholder="Modification Description" rows={6}
                        value={formData.modificationDescription}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="modification_document">Modification Document</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="modification_document"
                          name="modification_document" placeholder="Modification Document"
                          onChange={(e) => setFormData(prev => ({ ...prev, modificationDocument: e.target.files[0] }))}
                        />
                        {/* <label className="custom-file-label" id="label1" htmlFor="modification_document">
                          Modification Document
                        </label> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-info submitt">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default EditAlertandModification