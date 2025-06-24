import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';

const EditHealthFacility = () => {
  const inputStyle = {
    width: '100%',
    height: '30px',
    marginBottom: '10px',
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    facilityName: '',
    facilityAddress: '',
    personName: '',
    personPosition: '',
    personMobile: '',
    personEmail: '',
    personCPR: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const fetchHealthFunctionalityById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/healthFacilityList/getHealthFacility/${id}`,
      })
      if (res.status === 200) {
        setFormData({...res?.data?.result})
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error fetch health facility by id : ", error)
    } finally {
      setLoading(false);
    }
  }

  const editHealthFacility = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/healthFacilityList/updateHealthFacility/${id}`,
        data: formData
      })
      if (res.status === 200) {
        navigate('/facility')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error add health facility : ", error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if(id){
      fetchHealthFunctionalityById()
    }
  }, [id])



  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit Health Facility</h1>
          </section>
          <section className="content">
            <div className="box box-primary">
              <div className="box-body">
                <form className="form" id="health_form"
                  onSubmit={editHealthFacility}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card card-secondary">
                          <div className="card-header">
                            <h3 className="card-title"> Health Facility</h3>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12">
                                <label>Name</label>
                                <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                <input className="form-control company_name validd" id="facility_name" name="facilityName" placeholder="Name"
                                  type="text" defaultValue="" style={inputStyle}
                                  value={formData.facilityName}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="col-12">
                                <label>Address</label>
                                <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }} >Please Fill This</label>
                                <input id="facility_address" name="facilityAddress" className="form-control validd email"
                                  placeholder="Address" type="text" defaultValue="" style={inputStyle}
                                  value={formData.facilityAddress}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2"></div>

                      <div className="col-md-5">
                        <div className="card card-secondary">
                          <div className="card-header">
                            <h3 className="card-title">Contact Person</h3>
                          </div>
                          <div className="card-body">
                            <div className="row row-sm">
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <label>Name</label>
                                <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }}>Please Fill This</label>
                                <input
                                  id="person_name"
                                  name="personName"
                                  className="form-control validd"
                                  type="text"
                                  placeholder="Name"
                                  defaultValue=""
                                  style={inputStyle}
                                  value={formData.personName}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <label>Position</label>
                                <input
                                  id="person_position"
                                  name="personPosition"
                                  className="form-control"
                                  type="text"
                                  placeholder="Position"
                                  defaultValue=""
                                  style={inputStyle}
                                  value={formData.personPosition}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="row row-sm">
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <label>Mobile</label>
                                <PhoneInput
                                  country={'us'}
                                  value={String(formData?.personMobile)}
                                  onChange={(phone) => setFormData(prev => ({ ...prev, personMobile: phone }))}
                                  inputProps={{
                                    name: 'personMobile',
                                    id: 'phone',
                                    className: 'form-control validd',
                                  }}
                                  placeholder="Mobile"
                                  containerStyle={{ width: '100%' }}
                                  inputStyle={{ width: '100%', height: '40px' }}  // Consistent height
                                />
                              </div>
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <label>Email</label>
                                <input
                                  id="person_email"
                                  name="personEmail"
                                  className="form-control"
                                  type="email"
                                  placeholder="Email"
                                  defaultValue=""
                                  style={inputStyle}
                                  value={formData.personEmail}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="row row-sm">
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <label>CPR</label>
                                <label htmlFor="name" style={{ color: 'red', marginLeft: '10px' }}>Please Fill This</label>
                                <input
                                  id="person_cpr_no"
                                  name="personCPR"
                                  className="form-control validd cprvalid"
                                  type="number"
                                  placeholder="CPR"
                                  defaultValue=""
                                  style={inputStyle}
                                  value={formData.personCPR}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <br />
                            <div className="row row-sm">
                              <div className="col-lg mg-t-10 mg-lg-t-0">
                                <button type="submit" className="btn btn-info submitt">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default EditHealthFacility