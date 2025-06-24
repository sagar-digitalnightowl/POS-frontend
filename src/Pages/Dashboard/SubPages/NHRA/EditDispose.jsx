import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall'
import { useNavigate, useParams } from 'react-router-dom'

const EditDispose = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');

  const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [products, setProducts] = useState([]);
  const [healthCareFacilities, setHealthCareFacilities] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    cprNumber: '',
    mobileNumber: '',
    email: '',
    date: '',
    device: '',
    numberOfDevicesInvolved: '',
    lotNo: '',
    nhraRegistrationCertificateNo: '',
    supremeCouncilOfEnvironmentApproval: null,
    manufacturer: '',
    reasonOfDisposal: [],
    otherReasonOfDisposal: '',
    action: '',
    airwayBill: null,
    destructionInvoice: null,
    healthCareFacility: '',
    healthCareFacilitycrNo: '',
    nhraLicenseNo: '',
    authorizedRepresentative: '',
    dateOfReportAwareness: '',
    companyName: '',
    telephoneNo: '',
    emailAddress: '',
    address: '',
    crNo: '',
    reportStatus: '',
    otherReportStatus: '',
  })


  const fetchDisposeById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/dispose/getDispose/${id}`,
      })

      if (res.status === 200) {
        setFormData({ ...res?.data?.result, supremeCouncilOfEnvironmentApproval: null, airwayBill: null, destructionInvoice: null })
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch dispose by id : ", error)
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
    fetchDisposeById();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChangeReasonofDisposal = (e) => {
    const { name, value } = e.target;
    const existReasonofDisposal = [...formData.reasonOfDisposal];

    if (existReasonofDisposal.includes(value)) {
      setFormData(prev => ({
        ...prev,
        reasonOfDisposal: existReasonofDisposal.filter(reason => reason !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        reasonOfDisposal: [...existReasonofDisposal, value]
      }))
    }
  }



  const editDispose = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/dispose/updateDispose/${id}`,
        data: data
      })
      if (res.status === 200) {
        navigate('/dispose/index')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error update dispose : ", error)
    } finally {
      setLoading(false);
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new URLSearchParams();

    form.append('name', formData.name)
    form.append('cprNumber', formData.cprNumber)
    form.append('mobileNumber', formData.mobileNumber)
    form.append('email', formData.email)
    form.append('date', formData.date)
    form.append('device', formData.device)
    form.append('numberOfDevicesInvolved', formData.numberOfDevicesInvolved)
    form.append('lotNo', formData.lotNo)
    form.append('nhraRegistrationCertificateNo', formData.nhraRegistrationCertificateNo)
    if (formData.supremeCouncilOfEnvironmentApproval) {
      form.append('supremeCouncilOfEnvironmentApproval', formData.supremeCouncilOfEnvironmentApproval)
    }
    form.append('manufacturer', formData.manufacturer)

    form.append('reasonOfDisposal', JSON.stringify(formData.reasonOfDisposal))
    form.append('otherReasonOfDisposal', formData.reasonOfDisposal)
    form.append('action', formData.action)
    if (formData.airwayBill) {
      form.append('airwayBill', formData.airwayBill)
    }
    if (formData?.destructionInvoice) {
      form.append('destructionInvoice', formData.destructionInvoice)
    }
    form.append('healthCareFacility', formData.healthCareFacility)
    form.append('healthCareFacilitycrNo', formData.healthCareFacilitycrNo)
    form.append('nhraLicenseNo', formData.nhraLicenseNo)

    form.append('authorizedRepresentative', formData.authorizedRepresentative)
    form.append('dateOfReportAwareness', formData.dateOfReportAwareness)

    form.append('companyName', formData.companyName)
    form.append('telephoneNo', formData.telephoneNo)
    form.append('emailAddress', formData.emailAddress)
    form.append('address', formData.address)
    form.append('crNo', formData.crNo)
    form.append('reportStatus', formData.reportStatus)
    form.append('otherReportStatus', formData.otherReportStatus)


    editDispose(form);
  }

  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Dispose | Send To Manufacture</h1>
          </section>
          <section className="content">
            <div className="box box-primary addborder">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card card-secondary">
                        <div className="card-header">
                          <h3 className="card-title">Edit Dispose Event</h3>
                        </div>
                        <div className="card-body">
                          <form
                            id="cmp_form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <div className="col-sm-12 ">
                                <div
                                  className="card-header"
                                  style={{
                                    textAlign: "center",
                                    backgroundColor: "#6c757d",
                                    color: "white",
                                    padding: 0
                                  }}
                                >
                                  <h3 className="text-white">
                                    Reporter/End-User Details
                                  </h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="name">Name</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-control validd"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="mobile">Mobile Number</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        name="mobileNumber"
                                        type="text"
                                        className="form-control validd"
                                        placeholder="Mobile Number"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="cpr">CPR Number</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        id="cpr"
                                        name="cprNumber"
                                        type="text"
                                        className="form-control validd cprvalid"
                                        placeholder="CPR Number"
                                        value={formData.cprNumber}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="email">Email</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control validd"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="eventdate"> Date</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        id="eventdate"
                                        name="date"
                                        type="date"
                                        className="form-control validd"
                                        placeholder=" Date"
                                        value={formData.date?.substring(0, 10) || ''}
                                        onChange={handleChange}
                                      />

                                    </div>
                                  </div>
                                </div>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Medical Device Details</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="devicename">Device Name</label>
                                      <span className="form-text text-danger" />
                                      <select
                                        className="form-control productselect select2 validd"
                                        name="device"
                                        id="device"
                                        value={formData.device}
                                        onChange={handleChange}
                                      >
                                        <option value="">--Select Device--</option>
                                        {
                                          products.map(product => (
                                            <option key={product?._id} value={product?._id} >{product?.productName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="numofdevices">Number of Devices Involved</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <input
                                        id="numofdevices"
                                        name="numberOfDevicesInvolved"
                                        type="text"
                                        className="form-control validd"
                                        placeholder="Number of Devices Involved"
                                        value={formData.numberOfDevicesInvolved}
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
                                        value={products.find(product => product?._id === formData.device)?.productModel}
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
                                        value={products.find(product => product?._id === formData.device)?.productSerialNo}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="lot_no">Lot No</label>
                                      <input
                                        id="lot_no"
                                        name="lotNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Lot Number"
                                        value={formData.lotNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="serial_no">
                                        NHRA Registration Certificate No. (if any)
                                      </label>
                                      <input
                                        id="nhra_reg_cert_no"
                                        name="nhraRegistrationCertificateNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="NHRA Registration Certificate No. (if any)"
                                        value={formData.nhraRegistrationCertificateNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label htmlFor="sup_coun_of_env_appr">
                                        Supreme Council of Environment Approval (if required)
                                      </label>
                                      <input
                                        className="form-control"
                                        id="sup_coun_of_env_appr"
                                        name="sup_coun_of_env_appr"
                                        type="file"
                                        onChange={(e) => setFormData(prev => ({ ...prev, supremeCouncilOfEnvironmentApproval: e.target.files[0] }))}
                                      />

                                    </div>
                                  </div>
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
                                      <label htmlFor="manufaturername">Manufacturer Name</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <select
                                        className="form-control validd"
                                        name="manufacturer"
                                        id="manid"
                                        value={formData?.manufacturer}
                                        onChange={handleChange}
                                      >
                                        <option value="">--Select--</option>
                                        {
                                          manufactures?.map(manufacturer => (
                                            <option key={manufacturer?._id} value={manufacturer?._id}>{manufacturer?.name}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="manf_email">Manufacturer Email</label>
                                      <input
                                        id="manf_email"
                                        name="manufatureremail"
                                        type="email"
                                        className="form-control"
                                        placeholder="Manufacturer Email"
                                        readOnly
                                        value={manufactures.find(manu => manu?._id === formData.manufacturer)?.email}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <h3>Reason of Disposal</h3>
                                  <div className="col-12">
                                    <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                                      <div className="col-md-4">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox1"
                                            name="reason[]"
                                            value={'Defected / (Recalled)'}
                                            checked={formData.reasonOfDisposal.includes('Defected / (Recalled)')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox1" className="custom-control-label">Defected / (Recalled)</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input className="custom-control-input" type="checkbox" id="customCheckbox2"
                                            name="reason[]"
                                            value={'Closure of manufacturer facility'}
                                            checked={formData.reasonOfDisposal.includes('Closure of manufacturer facility')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox2" className="custom-control-label">Closure of manufacturer facility</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox3"
                                            name="reason[]"
                                            value={'Clinically / technically obsolete'}
                                            checked={formData.reasonOfDisposal.includes('Clinically / technically obsolete')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox3" className="custom-control-label">
                                            Clinically / technically obsolete
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox4"
                                            name="reason[]"
                                            value={'Unavailable spare parts'}
                                            checked={formData.reasonOfDisposal.includes('Unavailable spare parts')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox4" className="custom-control-label">
                                            Unavailable spare parts
                                          </label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox5"
                                            name="reason[]"
                                            value={'Damaged/inaccurate / expired'}
                                            checked={formData.reasonOfDisposal.includes('Damaged/inaccurate / expired')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox5" className="custom-control-label">
                                            Damaged/inaccurate / expired
                                          </label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox6"
                                            name="reason[]"
                                            value={'Absence of manufacturer/supplier support'}
                                            checked={formData.reasonOfDisposal.includes('Absence of manufacturer/supplier support')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox6" className="custom-control-label">
                                            Absence of manufacturer/supplier support
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="custom-control custom-checkbox">
                                          <input className="custom-control-input"
                                            type="checkbox"
                                            id="customCheckbox24"
                                            value={'Other'}
                                            checked={formData.reasonOfDisposal.includes('Other')}
                                            onChange={handleChangeReasonofDisposal}
                                          />
                                          <label htmlFor="customCheckbox24" className="custom-control-label">Other</label>
                                          {formData.reasonOfDisposal.includes('Other') && (
                                            <div className="form-group">
                                              <input
                                                id="other"
                                                name="otherReasonOfDisposal"
                                                type="text"
                                                className="form-control"
                                                placeholder="Other Reasons"
                                                value={formData.otherReasonOfDisposal}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                </div>
                                <div className="form-group">
                                  <h3>Action</h3>
                                  <div className="row">
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input
                                          type="radio"
                                          id="recall0"
                                          name="action"
                                          value={'No Action'}
                                          checked={formData.action === "No Action"}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall0">No Action</label>
                                      </div>
                                    </div>
                                    <div className="clearfix" />
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input
                                          type="radio"
                                          id="recall1"
                                          name="action"
                                          value={'Return to Manufacturer'}
                                          checked={formData.action === "Return to Manufacturer"}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall1">
                                          Return to Manufacturer
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div id="airway">
                                        <div className="col-sm-12">
                                          <div className="form-group">
                                            <label htmlFor="airaway">
                                              Airway Bill
                                            </label>
                                            <div className="custom-file">
                                              <input
                                                type="file"
                                                className="custom-file-input"
                                                id="airaway"
                                                name="airaway"
                                                placeholder="Airway Bill"
                                                onChange={(e) => setFormData(prev => ({ ...prev, airwayBill: e.target.files[0] }))}
                                              />
                                              <label className="custom-file-label" id="label1" htmlFor="airaway">Airway Bill</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input
                                          type="radio"
                                          id="recall2"
                                          name="action"
                                          value={'Destruction'}
                                          checked={formData.action === "Destruction"}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall2">Destruction</label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div id="destroy">
                                        <div className="col-sm-12">
                                          <div className="form-group">
                                            <label htmlFor="destruction">Destruction Invoice</label>
                                            <div className="custom-file">
                                              <input
                                                type="file"
                                                className="custom-file-input"
                                                id="destruction"
                                                name="destruction"
                                                placeholder="Destruction Invoice"
                                                onChange={(e) => setFormData(prev => ({ ...prev, destructionInvoice: e.target.files[0] }))}
                                              />
                                              <label className="custom-file-label" id="label2" htmlFor="destruction">Destruction Invoice</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">HealthCare Facility Information</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group" >
                                      <label htmlFor="hcfid">HealthCare Facility Name</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <select
                                        className="form-control validd"
                                        name="healthCareFacility"
                                        id="hcfid"
                                        value={formData?.healthCareFacility}
                                        onChange={handleChange}
                                      >
                                        <option value="" selected="">--Select--</option>
                                        {
                                          healthCareFacilities.map(facility => (
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
                                      <label htmlFor="hcfperson">HFC Contact Person Name</label>
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
                                      <label htmlFor="hcfposition">HFC Contact Person Position</label>
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
                                      <label htmlFor="hcfcontact">HFC Contact Person Number</label>
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
                                      <label htmlFor="contactpersoncpr">
                                        HFC Contact Person CPR
                                      </label>
                                      <input
                                        id="contactpersoncpr"
                                        name="contactpersoncpr"
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact Person CPR"
                                        readOnly
                                        value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personCPR}
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
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="cr_no">Cr No</label>
                                      <input
                                        id="cr_no"
                                        name="healthCareFacilitycrNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Cr No"
                                        value={formData?.healthCareFacilitycrNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="nhra_license_no">
                                        Nhra License No(If Any)
                                      </label>
                                      <input
                                        id="nhra_license_no"
                                        name="nhraLicenseNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhra License No(If Any)"
                                        value={formData?.nhraLicenseNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Authorized Representative Details</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="arname">Authorized Representative Name</label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <select
                                        className="form-control validd"
                                        name="authorizedRepresentative"
                                        id="arid"
                                        value={formData?.authorizedRepresentative}
                                        onChange={handleChange}
                                      >
                                        <option value="" selected="">--Select--</option>
                                        {
                                          authorizedRepresentatives.map(rep => (
                                            <option key={rep?._id} value={rep?._id}>{rep?.name}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="ar_email">Authorized Representative Email</label>
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
                                      <label htmlFor="armobile">Mobile Number</label>
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
                                      <input
                                        id="ardate"
                                        name="dateOfReportAwareness"
                                        type="date"
                                        className="form-control validd"
                                        placeholder="Date of Report Awareness"
                                        value={formData?.dateOfReportAwareness?.substring(0, 10) || ''}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Destruction Company Details</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="des_company">Company Name</label>
                                      <input
                                        id="des_company"
                                        name="companyName"
                                        type="text"
                                        className="form-control"
                                        placeholder="Destruction Company Name"
                                        value={formData?.companyName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="des_email">Email Address</label>
                                      <input
                                        id="des_email"
                                        name="emailAddress"
                                        type="email"
                                        className="form-control"
                                        placeholder="Destruction Company Email"
                                        value={formData?.emailAddress}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="des_mobile">Telephone No</label>
                                      <input
                                        id="des_mobile"
                                        name="telephoneNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Destruction Company Mobile"
                                        value={formData?.telephoneNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="des_address">Address</label>
                                      <span className="form-text text-danger" />
                                      <input
                                        id="des_address"
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        placeholder="Destruction Company Address"
                                        value={formData?.address}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="des_cr">CR No</label>
                                      <input
                                        id="des_cr"
                                        name="crNo"
                                        type="text"
                                        className="form-control"
                                        placeholder="Destruction Company CR"
                                        value={formData?.crNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="Activity to be Repeated">Report Status</label>
                                  <div className="col-12">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="icheck-primary ">
                                          <input
                                            type="radio"
                                            id="open"
                                            name="reportStatus"
                                            value={'Open'}
                                            checked={formData.reportStatus === 'Open'}
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
                                            name="reportStatus"
                                            value={'Closed'}
                                            checked={formData.reportStatus === 'Closed'}
                                            onChange={handleChange}
                                          />
                                          <label htmlFor="closed">Closed</label>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="icheck-primary ">
                                          <input
                                            type="radio"
                                            id="other"
                                            name="reportStatus"
                                            value={'Other'}
                                            checked={formData.reportStatus === 'Other'}
                                            onChange={handleChange}
                                          />
                                          <label htmlFor="other">Other</label>
                                          {formData.reportStatus === 'Other' && (
                                            <div className="form-group">
                                              <input
                                                id="other"
                                                name="otherReportStatus"
                                                type="text"
                                                className="form-control"
                                                placeholder="Others"
                                                value={formData?.otherReportStatus}
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
                                <button type="submit" className="btn btn-info submitt">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
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

export default EditDispose