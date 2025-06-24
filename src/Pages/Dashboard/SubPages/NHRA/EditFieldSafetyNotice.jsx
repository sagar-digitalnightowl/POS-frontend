import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { apiCall } from '../../../../utils/apiCall'

const EditFieldSafetyNotice = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [products, setProducts] = useState([]);
  const [manufacturers, setManufactures] = useState([]);
  const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);
  const [healthCareFacilities, setHealthCareFacilities] = useState([]);

  const [formData, setFormData] = useState({
    reportType: '',
    riskClassification: '',
    reporterIssuer: '',
    regulatoryAuthority: '',
    reportReferenceLink: '',
    copyOfReport: null,
    manufacturer: '',
    device: '',
    lpo: null,
    importationHistory: null,
    nhraMedicalDeviceRegistrationLicense: null,
    descriptionOfFSN: '',
    advisedActionByTheManufacturer: '',
    authorizedRepresentative: '',
    correctiveAction: '',
    recall: '',
    returnInvoice: null,
    destructionInvoice: null,
    healthCareFacility: '',
    acknowledgment: null,
    contactPerson: '',
    signature: null,
    signatureDeclarationLetter: null
  });


  const fetchFieldSafetyById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/safetyNoticeList/getSafetyNotice/${id}`,
      })
      if (res.status === 200) {
        setFormData({
          ...res.data.result,
          copyOfReport: null,
          lpo: null,
          importationHistory: null,
          nhraMedicalDeviceRegistrationLicense: null,
          returnInvoice: null,
          destructionInvoice: null,
          acknowledgment: null,
          signature: null, 
          signatureDeclarationLetter: null
        })
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error get Field Safety Notice by id : ", error)
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
    fetchFieldSafetyById();
    fetchAllAuthorizedRepresentative();
    fetchAllManufactures();
    fetchProducts();
    fetchAllHealthFacility();
  }, []);


  const editFieldSafetyNotice = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/safetyNoticeList/updateSafetyNotice/${id}`,
        data: data
      })
      if (res.status === 200) {
        navigate('/FieldSafteyNotice')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error add Field Safety Notice : ", error)
    } finally {
      setLoading(false);
    }
  }




  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();


    form.append('reportType', formData.reportType);
    form.append('riskClassification', formData.riskClassification);
    form.append('reporterIssuer', formData.reporterIssuer);
    form.append('regulatoryAuthority', formData.regulatoryAuthority);
    form.append('reportReferenceLink', formData.reportReferenceLink);
    if (formData.copyOfReport) {
      form.append('copyOfReport', formData.copyOfReport);
    }
    form.append('manufacturer', formData.manufacturer);
    form.append('device', formData.device);
    if (formData.lpo) {
      form.append('lpo', formData.lpo);
    }
    if (formData.importationHistory) {
      form.append('importationHistory', formData.importationHistory);
    }
    if (formData.nhraMedicalDeviceRegistrationLicense) {
      form.append('nhraMedicalDeviceRegistrationLicense', formData.nhraMedicalDeviceRegistrationLicense);
    }
    form.append('descriptionOfFSN', formData.descriptionOfFSN);
    form.append('advisedActionByTheManufacturer', formData.advisedActionByTheManufacturer);
    form.append('authorizedRepresentative', formData.authorizedRepresentative);
    form.append('correctiveAction', formData.correctiveAction);
    form.append('recall', formData.recall);
    if (formData.returnInvoice) {
      form.append('returnInvoice', formData.returnInvoice);
    }
    if (formData.destructionInvoice) {
      form.append('destructionInvoice', formData.destructionInvoice);
    }
    form.append('healthCareFacility', formData.healthCareFacility);
    if (formData.acknowledgment) {
      form.append('acknowledgment', formData.acknowledgment);
    }
    form.append('contactPerson', formData.contactPerson);
    if (formData.signature) {
      form.append('signature', formData.signature);
    }
    if (formData.signatureDeclarationLetter) {
      form.append('signatureDeclarationLetter', formData.signatureDeclarationLetter);
    }


    editFieldSafetyNotice(form);

  }


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }



  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit Safety Notice</h1>
          </section>
          <section className="content">
            <div className="box box-primary addborder">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card-body">
                        <div className="panel">
                          <div className="panel-body wizard-content">
                            <form id="safteyForm"
                              className="tab-wizard wizard-circle wizard clearfix"
                              onSubmit={handleSubmit}
                            >
                              <section>
                                <br />
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Report</h3>
                                </div>
                                <br />
                                <br />
                                <div className="row">
                                  <div className="col-sm-12 ">
                                    <div className="form-group clearfix">
                                      <label htmlFor="Report Type">Report Type</label>
                                      <div className="row">

                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              className="report_type"
                                              id="reptype1"
                                              name="reportType"
                                              value={'Recall'}
                                              checked={formData.reportType === 'Recall'}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="reptype1">Recall</label>
                                          </div>
                                        </div>

                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              className="report_type"
                                              id="reptype2"
                                              name="reportType"
                                              value={'Corrective Action'}
                                              checked={formData.reportType === 'Corrective Action'}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="reptype2">Corrective Action</label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              className="report_type"
                                              id="reptype3"
                                              name="reportType"
                                              value={'Alert'}
                                              checked={formData.reportType === 'Alert'}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="reptype3">Alert</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="form-group clearfix">
                                      <label htmlFor="Risk Classification">Risk Classification</label>
                                      <div className="row">
                                        <select
                                          className="form-control"
                                          name="riskClassification"
                                          value={formData.riskClassification}
                                          onChange={handleChange}
                                        >
                                          <option value="">Select Risk Classification</option>
                                          <option value="Class A (Low Individual Risk and Low Public Health Risk)">
                                            Class A (Low Individual Risk and LowPublic Health Risk)
                                          </option>
                                          <option value="Class B (Moderate Individual Risk and/or Low Public Health Risk)">
                                            Class B (Moderate Individual Risk and/orLow Public Health Risk)
                                          </option>
                                          <option value="Class C (High Individual Risk and/or Moderate Public Health Risk)">
                                            Class C (High Individual Risk and/or Moderate Public Health Risk)
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
                                    <br />
                                    <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                      <h3 className="text-white">Reporter Details</h3>
                                    </div>
                                    <br />
                                    <div className="form-group clearfix">
                                      <label htmlFor="Application Type">Reporter Issuer</label>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              className="report_issuer"
                                              id="reportertype1"
                                              name="reporterIssuer"
                                              value={'Regulatory Authority'}
                                              checked={formData.reporterIssuer === 'Regulatory Authority'}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="reportertype1">Regulatory Authority</label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="icheck-primary ">
                                            <input
                                              type="radio"
                                              className="report_issuer"
                                              id="reportertype2"
                                              name="reporterIssuer"
                                              value={'Manufacturer'}
                                              checked={formData.reporterIssuer === 'Manufacturer'}
                                              onChange={handleChange}
                                            />
                                            <label htmlFor="reportertype2">Manufacturer</label>
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                      <div className="form-group clearfix">
                                        <label htmlFor="Application Type">Regulatory Authority</label>
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory1"
                                                name="regulatoryAuthority"
                                                value={'FDA'}
                                                checked={formData.regulatoryAuthority === 'FDA'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory1">FDA</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory2"
                                                name="regulatoryAuthority"
                                                value={'SFDA'}
                                                checked={formData.regulatoryAuthority === 'SFDA'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory2">SFDA</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory3"
                                                name="regulatoryAuthority"
                                                value={'MHRA'}
                                                checked={formData.regulatoryAuthority === 'MHRA'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory3">MHRA</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory4"
                                                name="regulatoryAuthority"
                                                value={'GHC'}
                                                checked={formData.regulatoryAuthority === 'GHC'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory4">GHC</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory5"
                                                name="regulatoryAuthority"
                                                value={'Swissmedic'}
                                                checked={formData.regulatoryAuthority === 'Swissmedic'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory5">Swissmedic</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory6"
                                                name="regulatoryAuthority"
                                                value={'TGA'}
                                                checked={formData.regulatoryAuthority === 'TGA'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory6">TGA</label>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="icheck-primary ">
                                              <input
                                                type="radio"
                                                className="regulatory_authority"
                                                id="regulatory7"
                                                name="regulatoryAuthority"
                                                value={'N/A'}
                                                checked={formData.regulatoryAuthority === 'N/A'}
                                                onChange={handleChange}
                                              />
                                              <label htmlFor="regulatory7">N/A</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                      <div className="form-group">
                                        <label htmlFor="report_reference">Report Reference Link</label>
                                        <input
                                          id="report_reference"
                                          name="reportReferenceLink"
                                          type="text"
                                          className="form-control"
                                          placeholder="Report Reference Link"
                                          value={formData.reportReferenceLink}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <br />
                                      <div className="form-group">
                                        <label htmlFor="copyofreport">
                                          Copy of Report (pdf)
                                        </label>
                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            className="custom-file-input"
                                            id="copyofreport"
                                            accept="application/pdf"
                                            name="copyofreport"
                                            placeholder="Copy of Report"
                                            onChange={(e) => setFormData(prev => ({ ...prev, copyOfReport: e.target.files[0] }))}
                                          />
                                        </div>
                                      </div>
                                      <br />
                                      <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                        <h3 className="text-white">Manufacturer Details</h3>
                                      </div>
                                      <br />
                                      <div className="row">
                                        <div className="col-sm-4">
                                          <div className="form-group">
                                            <label htmlFor="manufacture_name">
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
                                              <option value="">--Select--</option>
                                              {
                                                manufacturers.map(manufacturer => (
                                                  <option key={manufacturer?._id} value={manufacturer?._id}>{manufacturer?.name}</option>
                                                ))
                                              }
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-sm-4">
                                          <div className="form-group">
                                            <label htmlFor="manufacture_origin">Country of origin</label>
                                            <input
                                              id="manufacture_origin"
                                              name="manufacture_origin"
                                              type="text"
                                              className="form-control"
                                              placeholder="Country of origin"
                                              readOnly
                                              value={manufacturers.find(manu => manu?._id === formData.manufacturer)?.country}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-sm-4">
                                          <div className="form-group">
                                            <label htmlFor="manufacture_email">Manufacturer Email</label>
                                            <input
                                              id="manufacture_email"
                                              name="manufacture_email"
                                              type="email"
                                              className="form-control"
                                              placeholder="Manufacturer Email"
                                              readOnly
                                              value={manufacturers.find(manu => manu?._id === formData.manufacturer)?.email}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <h6>Medical Device Details</h6>
                              <section>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Medical Device Details</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label htmlFor="devicename">Device Name</label>
                                      <span className="form-text text-danger" />
                                      <select
                                        className="form-control validd productselect select2"
                                        name="device"
                                        id="device"
                                        value={formData.device}
                                        onChange={handleChange}
                                      >
                                        <option value="">--Select Device--</option>
                                        {
                                          products.map(product => (
                                            <option key={product?._id} value={product?._id}>{product.productName}</option>
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
                                        value={products.find(pro => pro._id === formData.device)?.productModel}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="serial_no">Serial Number
                                      </label>
                                      <input
                                        id="serial"
                                        name="serial_no"
                                        type="text"
                                        className="form-control"
                                        placeholder="Serial Number"
                                        readOnly
                                        value={products.find(pro => pro._id === formData.device)?.productSerialNo}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="lot_no">GDMN CODE</label>
                                      <input
                                        id="lot"
                                        name="lot_no"
                                        type="text"
                                        className="form-control"
                                        placeholder="GDMN Number"
                                        readOnly
                                        value={products.find(pro => pro._id === formData.device)?.productGMDNCode}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="hs_code">HS Code</label>
                                      <input
                                        id="hs_code"
                                        name="hs_code"
                                        type="text"
                                        className="form-control"
                                        placeholder="HS Code"
                                        readOnly
                                        value={products.find(pro => pro._id === formData.device)?.productHSCode}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="lpo">LPO (pdf)</label>
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="lpo"
                                        name="lpo"
                                        placeholder="LPO"
                                        onChange={(e) => setFormData(prev => ({ ...prev, lpo: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="importation_history">
                                        Importation History (pdf)
                                      </label>
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="importation_history"
                                        name="importation_history"
                                        placeholder="Importation History"
                                        onChange={(e) => setFormData(prev => ({ ...prev, importationHistory: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label htmlFor="nhra_license">
                                        NHRA Medical Device Registration License
                                        (pdf)
                                      </label>
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="nhra_license"
                                        name="nhra_license"
                                        placeholder="NHRA Medical Device Registration License"
                                        onChange={(e) => setFormData(prev => ({ ...prev, nhraMedicalDeviceRegistrationLicense: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>
                                  <br />
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="fsn_description">
                                        Description of FSN
                                      </label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <span className="form-text text-danger" />
                                      <textarea id="fsn_description" name="descriptionOfFSN" type="text"
                                        className="form-control validd" placeholder="Description of FSN" rows={6}
                                        value={formData.descriptionOfFSN}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="manufacturer_action">
                                        Advised Action by the Manufacturer
                                      </label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <span className="form-text text-danger" />
                                      <textarea id="manufacturer_action" name="advisedActionByTheManufacturer" type="text" className="form-control validd"
                                        placeholder="Advised Action by the Manufacturer"
                                        rows={6}
                                        value={formData.advisedActionByTheManufacturer}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </section>
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
                                      <label htmlFor="arname">
                                        Authorized Representative Name
                                      </label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <span className="form-text text-danger" />
                                      <select
                                        className="form-control validd"
                                        name="authorizedRepresentative"
                                        id="arid"
                                        value={formData.authorizedRepresentative}
                                        onChange={handleChange}
                                      >
                                        <option value="" selected="">--Select--</option>
                                        {
                                          authorizedRepresentatives.map(rep => (
                                            <option key={rep?._id} value={rep?._id}>{rep.name}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="aremail">
                                        Authorized Representative Email
                                      </label>
                                      <input id="aremail" name="aremail" type="email"
                                        className="form-control" placeholder="Authorized Representative Email"
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
                                      <input id="armobile" name="armobile" type="text"
                                        className="form-control" placeholder="Mobile Number" readOnly
                                        value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.phoneNumber}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="arlicense">
                                        NHRA License Number
                                      </label>
                                      <input id="arlicense" name="arlicense" type="text"
                                        className="form-control" placeholder="NHRA License Number" readOnly
                                        value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.licenseNumber}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="armobile">CPR Number</label>
                                      <input id="cpr_no" name="armobile" type="text" className="form-control"
                                        placeholder="Mobile Number" readOnly
                                        value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.CRCPRNo}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Action Required</h3>
                                </div>
                                <br />
                                <div className="form-group clearfix">
                                  <label htmlFor="Corrective action">
                                    Corrective action
                                  </label>
                                  <div className="row">
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" className="corrective_action" id="correctiveaction1"
                                          name="correctiveAction"
                                          value={'Software update'}
                                          checked={formData.correctiveAction === 'Software update'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="correctiveaction1">
                                          Software update
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" className="corrective_action" id="correctiveaction2"
                                          name="correctiveAction"
                                          value={'New IFU'}
                                          checked={formData.correctiveAction === 'New IFU'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="correctiveaction2">
                                          New IFU
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" className="corrective_action" id="correctiveaction3"
                                          name="correctiveAction"
                                          value={'Spare part replacement'}
                                          checked={formData.correctiveAction === 'Spare part replacement'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="correctiveaction3">
                                          Spare part replacement
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" className="corrective_action" id="correctiveaction4"
                                          name="correctiveAction"
                                          value={'No Action (Alert Report)'}
                                          checked={formData.correctiveAction === 'No Action (Alert Report)'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="correctiveaction4">
                                          No Action (Alert Report)
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group clearfix">
                                  <label htmlFor="Recall">Recall</label>
                                  <div className="row">
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" id="recall0"
                                          name="recall"
                                          value={'No Action'}
                                          checked={formData.recall === 'No Action'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall0">No Action</label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary ">
                                        <input type="radio" id="recall1"
                                          name="recall"
                                          value={'Return to manufacturer'}
                                          checked={formData.recall === 'Return to manufacturer'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall1">Return to manufacturer</label>
                                      </div>
                                      {formData.recall === 'Return to manufacturer' && (
                                        <div className="form-group">
                                          <label htmlFor="pdfUpload">Return Invoice(Pdf)</label>
                                          <input
                                            id="pdfUpload"
                                            name="pdfUpload"
                                            type="file"
                                            className="form-control"
                                            accept="application/pdf"
                                            onChange={(e) => setFormData(prev => ({ ...prev, returnInvoice: e.target.files[0] }))}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div className="col-md-3">
                                      <div className="icheck-primary">
                                        <input type="radio" id="recall2"
                                          name="recall"
                                          value={'Destruction in Bahrain'}
                                          checked={formData.recall === 'Destruction in Bahrain'}
                                          onChange={handleChange}
                                        />
                                        <label htmlFor="recall2">Destruction in Bahrain</label>
                                      </div>
                                      {formData.recall === 'Destruction in Bahrain' && (
                                        <div className="form-group">
                                          <label htmlFor="pdfUpload">Destruction Invoice(Pdf)</label>
                                          <input
                                            id="pdfUpload"
                                            name="pdfUpload"
                                            type="file"
                                            className="form-control"
                                            accept="application/pdf"
                                            onChange={(e) => setFormData(prev => ({ ...prev, destructionInvoice: e.target.files[0] }))}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <br />
                              </section>
                              <h6>End-User Details</h6>
                              <section>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">End-user Details</h3>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="healthcarename">
                                        Healthcare facility Name
                                      </label>
                                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                      <span className="form-text text-danger" />
                                      <select
                                        className="form-control validd"
                                        name="healthCareFacility"
                                        id="hcfid"
                                        value={formData.healthCareFacility}
                                        onChange={handleChange}
                                      >
                                        <option value=""> --Select-- </option>
                                        {
                                          healthCareFacilities.map(facility => (
                                            <option key={facility?._id} value={facility?._id}>{facility?.facilityName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="contactperson"> Contact Person </label>
                                      <input
                                        id="contactperson"
                                        name="contactperson"
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact Person"
                                        readOnly
                                        value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personName}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="contactpersonmobile">Contact Person Mobile</label>
                                      <input
                                        id="contactpersonmobile"
                                        name="contactpersonmobile"
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact Person Mobile"
                                        readOnly
                                        value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personMobile}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="contactpersonemail">
                                        Email
                                      </label>
                                      <input id="contactpersonemail" name="contactpersonemail" type="email"
                                        className="form-control" placeholder="Email" readOnly
                                        value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personEmail}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="contactpersoncpr">
                                        Contact Person CPR
                                      </label>
                                      <input id="contactpersoncpr" name="contactpersoncpr" type="text"
                                        className="form-control" placeholder="Contact Person CPR" readOnly
                                        value={healthCareFacilities.find(facility => facility?._id === formData.healthCareFacility)?.personCPR}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="acknowledgment">
                                        Acknowledgment (pdf)
                                      </label>
                                      <input type="file" className="custom-file-input" id="acknowledgment" name="acknowledgment"
                                        placeholder="Acknowledgment"
                                        onChange={(e) => setFormData(prev => ({ ...prev, acknowledgment: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                              </section>
                              <h6>Declaration</h6>
                              <section>
                                <div className="card-header" style={{ textAlign: "center", backgroundColor: "#6c757d", color: "white", padding: 0 }}>
                                  <h3 className="text-white">Declaration</h3>
                                </div>
                                <br />
                                <div className="col-sm-12">
                                  <h5>
                                    I hereby declare that all the above information is correct and accurate, and all the required
                                    documents will be submitted within ONE month starting from the date of NHRA receiving the
                                    form, and I am fully aware of the consequences of the non-compliance to the time frame set. And
                                    I will inform NHRA of any difficulties to implement the action required.
                                  </h5>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="contactperson_dec">
                                        Contact Person
                                      </label>
                                      <input
                                        id="contactperson_dec"
                                        name="contactPerson"
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact Person"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                      />

                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="signature">
                                        Signature (pdf)
                                      </label>
                                      <input type="file" className="custom-file-input" id="signature"
                                        name="signature" placeholder="Signature/Declaration Letter"
                                        onChange={(e) => setFormData(prev => ({ ...prev, signature: e.target.files[0] }))}
                                      />
                                      <label className="custom-file-label" htmlFor="signature">
                                        Signature/Declaration Letter
                                      </label>
                                      <input type="file" className="custom-file-input" id="signature"
                                        name="signature" placeholder="Signature/Declaration Letter"
                                        onChange={(e) => setFormData(prev => ({ ...prev, signatureDeclarationLetter: e.target.files[0] }))}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section>
                                <button type="submit" className="btn btn-info submitt">
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
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default EditFieldSafetyNotice