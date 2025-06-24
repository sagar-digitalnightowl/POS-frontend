import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall'
import { useNavigate, useParams } from 'react-router-dom'

const EditAuthorizedRepresentative = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [laoding, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        licenseNumber: '',
        CRCPRNo: '',
        authorizedCertificate: null
    });

    const fetchAuthorizedRepresentativeById = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: `/admin/nhra/authorizedRepresentativeList/getAuthorizedRepresentative/${id}`,
            })
            if (res.status === 200) {
                setFormData({...res.data.result, authorizedCertificate: null});
            } else {
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in fetch suppilers : ", error)
        } finally {
            setLoading(false);
        }
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checked" ? checked : value
        }))
    }

    const editAuthorizedRepresentative = async (data) => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "patch",
                url: `/admin/nhra/authorizedRepresentativeList/updateAuthorizedRepresentative/${id}`,
                data: data
            })
            if (res.status === 200) {
                navigate('/ar')
            } else {
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in fetch suppilers : ", error)
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append('name', formData.name)
        form.append('emailAddress', formData.emailAddress)
        form.append('phoneNumber', formData.phoneNumber)
        form.append('licenseNumber', formData.licenseNumber)
        form.append('CRCPRNo', formData.CRCPRNo)
        form.append('authorizedCertificate', formData.authorizedCertificate)
        
        editAuthorizedRepresentative(form);
    }


    useEffect(() => {
        if(id) fetchAuthorizedRepresentativeById();
    }, [id])

    return (
        <div>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className=" content-wrapper ">
                    <section className="content-header">
                        <h1>Edit Authorized Representative</h1>
                    </section>
                    <section className="content">
                        <form className="form formsubmitt" onSubmit={handleSubmit}>
                            <div className="box box-primary">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label>Name</label>
                                                <input
                                                    className="form-control mb-4 company_name validatt"
                                                    id="name"
                                                    placeholder="Name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    id="email"
                                                    name="emailAddress"
                                                    className="form-control mb-4 email validatt"
                                                    placeholder="Email Address"
                                                    type="text"
                                                    value={formData.emailAddress}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    id="phone"
                                                    name="phoneNumber"
                                                    className="form-control mb-4 phone validatt"
                                                    placeholder="Phone Number"
                                                    type="number"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <input type="hidden" name="c_code" id="ccode" />
                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label>license Number</label>
                                                <input
                                                    id="license_no"
                                                    name="licenseNumber"
                                                    className="form-control mb-4 validatt"
                                                    placeholder="license Number"
                                                    type="number"
                                                    value={formData.licenseNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="cpr_no">CR/CPR No</label>
                                                <input
                                                    id="cpr_no"
                                                    name="CRCPRNo"
                                                    className="form-control mb-4"
                                                    placeholder=""
                                                    type="number"
                                                    value={formData.CRCPRNo}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="image">Authorized Certificate (PDF)</label>
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    className="form-control"
                                                    id="certificate"
                                                    name="certificate"
                                                    onChange={e => setFormData(prev => ({ ...prev, authorizedCertificate: e.target.files[0] }))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group"></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-info submitt">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default EditAuthorizedRepresentative;