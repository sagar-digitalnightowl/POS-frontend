import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';

const EditComplaint = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    complainantName: '',
    complainantMobNo: '',
    complainantEmail: '',
    complainantCPRnumber: '',
    complaintDate: '',
    authorizedRepresentative: '',
    medicalDevice: '',
    complaintDescription: '',
    actionTakenByAR: '',
    supportiveDocuments: null,
  });


  const fetchComplaintById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/complaintHandeling/getComplaintHandling/${id}`
      })
      if (res.status === 200) {
        setFormData({ ...res?.data?.result, supportiveDocuments: null })
      } else {
        setError(res?.data?.message)
      }
    } catch (error) {
      setError(error.message);
      console.log("Error fetch complaint by id : ", error)
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
    fetchProducts();
    fetchComplaintById();
  }, [])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    })
    )
  }


  const editComplaint = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/complaintHandeling/updateHandling/${id}`,
        data: data
      })
      if (res.status === 200) {
        navigate('/complain-handling')
      } else {
        setError(res?.data?.message)
      }
    } catch (error) {
      setError(error.message);
      console.log("Error edit complaint : ", error)
    } finally {
      setLoading(false);
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('complainantName', formData.complainantName)
    form.append('complainantMobNo', formData.complainantMobNo)
    form.append('complainantEmail', formData.complainantEmail)
    form.append('complainantCPRnumber', formData.complainantCPRnumber)
    form.append('complaintDate', formData.complaintDate)
    form.append('authorizedRepresentative', formData.authorizedRepresentative)
    form.append('medicalDevice', formData.medicalDevice)
    form.append('complaintDescription', formData.complaintDescription)
    form.append('actionTakenByAR', formData.actionTakenByAR)
    if (formData.supportiveDocuments) {
      form.append('supportiveDocuments', formData.supportiveDocuments)
    }

    editComplaint(form)

  }




  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit Complaint</h1>
          </section>
          <form id="cmp_form" onSubmit={handleSubmit}>
            <section className="content">
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name"> Complainant Name </label>
                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                      <input
                        type="text"
                        name="complainantName"
                        id="name"
                        className="form-control validd"
                        placeholder="Complainant Name"
                        value={formData.complainantName}
                        onChange={handleChange}
                      />

                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="mobile"> Complainant Mob no </label>
                      <input
                        type="text"
                        name="complainantMobNo"
                        id="phone"
                        className="form-control validd"
                        placeholder="Complainant Mob no"
                        value={formData.complainantMobNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Complainant Email </label>
                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                      <input
                        type="email"
                        name="complainantEmail"
                        id="email"
                        className="form-control validd"
                        placeholder="Complainant Email"
                        value={formData.complainantEmail}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="cpr">Complainant CPR Number</label>
                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                      <input
                        type="number"
                        name="complainantCPRnumber"
                        id="cpr"
                        className="form-control validd cprvalid"
                        placeholder="Complainant CPR Number"
                        value={formData.complainantCPRnumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="date"> Complaint Date </label>
                      <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                      <input
                        type="date"
                        name="complaintDate"
                        id="date"
                        className="form-control validd"
                        value={formData?.complaintDate?.substring(0, 10) || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="arname">
                          Authorized Representative Name
                        </label>
                        <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                        <select
                          className="form-control validd"
                          name="authorizedRepresentative"
                          id="arid"
                          value={formData?.authorizedRepresentative}
                          onChange={handleChange}
                        >

                          <option value="" selected="">--Select Authorized Representative--</option>
                          {
                            authorizedRepresentatives?.map(representative => (
                              <option key={representative?._id} value={representative?._id}>{representative?.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="ar_email"> Authorized Representative Email</label>
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
                        <label htmlFor="cprnum">CR/CPR No</label>
                        <input
                          id="cprnum"
                          name="cprnum"
                          type="text"
                          className="form-control "
                          placeholder="CR/CPR No"
                          readOnly
                          value={authorizedRepresentatives.find(rep => rep?._id === formData.authorizedRepresentative)?.CRCPRNo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label htmlFor="company"> Medical Device Name </label>
                      <select
                        className="form-control productselect select2 validd"
                        name="medicalDevice"
                        id="device"
                        value={formData.medicalDevice}
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
                    <div className="form-group col-md-6">
                      <label htmlFor="model"> Model </label>
                      <input
                        type="text"
                        name="model"
                        id="model"
                        className="form-control"
                        placeholder="Model"
                        readOnly
                        value={products.find(pro => pro?._id === formData.medicalDevice)?.productModel}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="serial"> Serial no </label>
                      <input
                        type="text"
                        name="serial"
                        id="serial"
                        className="form-control"
                        placeholder="Serial no"
                        readOnly
                        value={products.find(pro => pro?._id === formData.medicalDevice)?.productSerialNo}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="gmdn_code"> GMDN Code </label>
                      <input
                        type="text"
                        name="gmdn_code"
                        id="gmdn_code"
                        className="form-control"
                        placeholder="GMDN Code"
                        readOnly
                        value={products.find(pro => pro?._id === formData.medicalDevice)?.productGMDNCode}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="hs_code"> HS Code</label>
                      <input
                        type="text"
                        name="hs_code"
                        id="hs_code"
                        className="form-control"
                        placeholder="HS Code"
                        readOnly
                        value={products.find(pro => pro?._id === formData.medicalDevice)?.productHSCode}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-primary">
                <div className="box-body">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="description"> Complaint Description </label>
                      <textarea
                        id="description"
                        name="complaintDescription"
                        type="text"
                        className="form-control validd"
                        placeholder="Complaint Description"
                        rows={6}
                        value={formData.complaintDescription}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="action"> Action Taken By AR</label>
                      <textarea
                        id="action"
                        name="actionTakenByAR"
                        type="text"
                        className="form-control validd"
                        placeholder="Action Taken By AR"
                        rows={6}
                        value={formData.actionTakenByAR}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row" id="objectiveDiv">
                    <div className="col-md-12">
                      <div className="form-group col-md-8">
                        <label htmlFor={`supportivedocs`}>Supportive Documents</label>
                        <input
                          id={`supportivedocs`}
                          name="supportivedocs[]"
                          type="file"
                          className="form-control"
                          placeholder="Supportive Documents"
                          onChange={(e) => setFormData(prev => ({ ...prev, supportiveDocuments: e.target.files[0] }))}
                        />
                      </div>
                      {/* <div className="form-group col-md-4">
                          {doc.id === documents.length - 1 ? (
                            <button
                              className="btn btn-success"
                              type="button"
                              id="addobjective"
                              style={{ marginLeft: 10, marginTop: 25 }}
                              onClick={addDocumentField}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          ) : (
                            <button className="btn btn-danger" type="button" style={{ marginLeft: 10, marginTop: 25 }} onClick={() => removeDocumentField(doc.id)}>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          )}
                        </div> */}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-info submitt">
                    Submit
                  </button>
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

export default EditComplaint