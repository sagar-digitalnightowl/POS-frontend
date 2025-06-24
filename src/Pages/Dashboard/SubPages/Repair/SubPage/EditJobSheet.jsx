import React, { useEffect, useState } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { Link, useParams } from 'react-router-dom'
import { faInfoCircle, faPlusCircle, faLock, faCalendar, faTimesCircle, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { apiCall } from '../../../../../utils/apiCall'

const EditJobSheet = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);


    const [error, setError] = useState('');
    const [productData, setProductData] = useState("");
    const [customerData, setCustomerData] = useState("");
    const [brandData, setBrandData] = useState("");
    const [formData, setFormData] = useState({
        businessLocation: "",
        customer: "",
        serviceType: "",
        pickUpOrOnSiteAddress: "",
        brand: "",
        device: "",
        deviceModel: "",
        serialNumber: "",
        passwordOrPatternLock: "",
        productConfiguration: "",
        problemReportedByTheCustomer: "",
        conditionOfTheProduct: "",
        commentByTechnician: "",
        estimatedCost: 0,
        status: "Pending",
        expectedDeliveryDate: "",
        document: "",
        sendNotification: "Sms",
        customField1: "",
        customField2: "",
        customField3: "",
        customField4: "",
        customField5: ""
    })

    const fetchJobSheet = async () => {
        setLoading(true);
        try {
            const res = await apiCall({ method: "get", url: `/admin/repair/jobSheet/getJobSheet/${id}` });

            console.log(res, "response form jobsheet")

            if(res.status === 200){
                setFormData(res?.data?.result)
            }else{
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productList/getProducts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                setProductData(result.result)
            } else {
                throw new Error('Failed to fetch product');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/getCustomersAndSuppliers?contactType=customer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                setCustomerData(result.result)

                // setData(result.result.roles)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getBrands?useForRepair=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to add authentication headers, like Bearer token, if required
                    // 'Authorization': `Bearer ${yourToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch units');
            }

            const result = await response.json();
            // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
            if (result) {
                setBrandData(result.result)
            } else {
                throw new Error('Failed to fetch brands');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editJobSheet = async (formDataToSend) => {
        try {
            // console.log(formDataToSend);

            setLoading(true);

           const res = await apiCall({method: "patch", url: `/admin/repair/jobSheet/updateJobSheet/${id}`, data: formDataToSend});

            if(res.status === 200) {
                toast.success("Product added successfully");
                navigate('/repairs/job-sheet')
            }

        } catch (error) {
            console.error('Full Error:', error);
            toast.error(error.message.includes('Server error') ?
                'Server processing failed' :
                'Failed to send request'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobSheet();
        fetchCustomers();
        fetchProducts();
        fetchBrands();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data on submit:", formData);

        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('businessLocation', formData.businessLocation);
        formDataToSend.append('customer', formData.customer); // Assuming this is the ObjectId
        formDataToSend.append('serviceType', formData.serviceType);
        formDataToSend.append('pickUpOrOnSiteAddress', formData.pickUpOrOnSiteAddress);
        formDataToSend.append('brand', formData.brand); // Assuming this is the ObjectId
        formDataToSend.append('device', formData.device);
        formDataToSend.append('deviceModel', formData.deviceModel);
        formDataToSend.append('serialNumber', formData.serialNumber);
        formDataToSend.append('passwordOrPatternLock', formData.passwordOrPatternLock);
        formDataToSend.append('productConfiguration', formData.productConfiguration);
        formDataToSend.append('problemReportedByTheCustomer', formData.problemReportedByTheCustomer);
        formDataToSend.append('conditionOfTheProduct', formData.conditionOfTheProduct);
        formDataToSend.append('commentByTechnician', formData.commentByTechnician || '');
        formDataToSend.append('estimatedCost', formData.estimatedCost);
        formDataToSend.append('status', formData.status);

        if (formData.expectedDeliveryDate) {
            formDataToSend.append('expectedDeliveryDate', new Date(formData.expectedDeliveryDate).toISOString());
        }

        if (formData.document instanceof File) {
            formDataToSend.append('document', formData.document, formData.document.name);
        }
        formDataToSend.append('sendNotification', formData.sendNotification);

        if (formData.customField1) formDataToSend.append('customField1', formData.customField1);
        if (formData.customField2) formDataToSend.append('customField2', formData.customField2);
        if (formData.customField3) formDataToSend.append('customField3', formData.customField3);
        if (formData.customField4) formDataToSend.append('customField4', formData.customField4);
        if (formData.customField5) formDataToSend.append('customField5', formData.customField5);

        // Call your API function

        editJobSheet(formDataToSend);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const textStyle = { color: 'black' };


    if (loading) return null;

    return (
        <div style={textStyle}>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <Navbar />
                    <section className="content-header no-print">
                        <h1> Job sheet <small>Edit</small> </h1>
                    </section>
                    <section className="content">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="box box-solid">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="businessLocation">Business Location:*</label>
                                                <select
                                                    className="form-control"
                                                    required
                                                    style={{ width: "100%" }}
                                                    id="businessLocation"
                                                    name="businessLocation"
                                                    value={formData.businessLocation}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                    <option value="">Please Select</option>
                                                    {/* {productData.length ? (productData.map((product) => (
                                                        <option value={product._id} key={product._id}>
                                                            {product.businessLocations}
                                                        </option>
                                                    ))) : (
                                                        <option value="">Please Select</option>
                                                    )} */}
                                                    <option value={"MIDDLE PEARL TRADING COMPANY W.L.L"}>MIDDLE PEARL TRADING COMPANY W.L.L (BL0001)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="customer">Customer:*</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-control mousetrap"
                                                        id="customer"
                                                        required
                                                        style={{ width: "100%" }}
                                                        name="customer"
                                                        value={formData.customer}
                                                        onChange={(e) => handleChange(e)}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {customerData.length ? (customerData.map((customer) => (
                                                            <option value={customer._id} key={customer._id}>
                                                                {customer.firstName + " " + customer.middleName + " " + customer.lastName}
                                                            </option>
                                                        ))) : (
                                                            <option value="">Please Select</option>
                                                        )}
                                                    </select>
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default bg-white btn-flat add_new_customer" data-name="">
                                                            <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="serviceType" style={{ marginLeft: 20 }}>Service type:*</label>
                                            <br />
                                            <label className="radio-inline">
                                                <input
                                                    className="input-icheck"
                                                    required
                                                    name="serviceType"
                                                    type="radio"
                                                    value="Carryin"
                                                    checked={formData.serviceType === 'Carryin'}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                Carry in
                                            </label>
                                            <label className="radio-inline">
                                                <input
                                                    className="input-icheck"
                                                    name="serviceType"
                                                    type="radio"
                                                    value="Pickup"
                                                    checked={formData.serviceType === 'Pickup'}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                Pick up
                                            </label>
                                            <label className="radio-inline radio_btns">
                                                <input
                                                    className="input-icheck"
                                                    name="serviceType"
                                                    type="radio"
                                                    value="Onsite"
                                                    checked={formData.serviceType === 'Onsite'}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                On site
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row pick_up_onsite_addr" style={{ display: " " }}>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="pickUpOrOnSiteAddress">Pick up/On site address:</label>
                                                <textarea
                                                    className="form-control"
                                                    id="pickUpOrOnSiteAddress"
                                                    placeholder="Pick up/On site address"
                                                    rows={3}
                                                    name="pickUpOrOnSiteAddress"
                                                    value={formData.pickUpOrOnSiteAddress}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box box-solid">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="brand">Brand:</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-control select2"
                                                        id="brand"
                                                        name="brand"
                                                        value={formData.brand}
                                                        onChange={(e) => handleChange(e)}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {brandData.length ? (brandData.map((brand) => (
                                                            <option value={brand._id} key={brand._id}>
                                                                {brand.name}
                                                            </option>
                                                        ))) : (
                                                            <option value="">Please Select</option>
                                                        )}
                                                    </select>
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default bg-white btn-flat add_new_customer" data-name="">
                                                            <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="device">Device:</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-control select2"
                                                        id="device"
                                                        name="device"
                                                        value={formData.device}
                                                        onChange={(e) => handleChange(e)}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {productData.length ? (productData.map((product) => (
                                                            <option value={product._id} key={product._id}>
                                                                {product.deviceName}
                                                            </option>
                                                        ))) : (
                                                            <option value="">Please Select</option>
                                                        )}
                                                    </select>
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default bg-white btn-flat add_new_customer" data-name="">
                                                            <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="deviceModel">Device Model:</label>
                                                <div className="input-group">
                                                    <select
                                                        className="form-control select2"
                                                        id="deviceModel"
                                                        name="deviceModel"
                                                        value={formData.deviceModel}
                                                        onChange={(e) => handleChange(e)}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {productData.length ? (productData.map((product) => (
                                                            <option value={product._id} key={product._id}>
                                                                {product.deviceModel}
                                                            </option>
                                                        ))) : (
                                                            <option value="">Please Select</option>
                                                        )}
                                                    </select>
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-default bg-white btn-flat add_new_customer" data-name="">
                                                            <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box box-solid">
                                                <div className="box-header with-border">
                                                    <h5 className="box-title">Pre Repair Checklist:
                                                        <FontAwesomeIcon icon={faInfoCircle}
                                                            className="fa fa-info-circle text-info hover-q no-print "
                                                            aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                                                            data-content="Based on device model, the checklist will appear here" data-html="true"
                                                            data-trigger="hover" />
                                                        <small>N/A = Not Applicable </small>
                                                    </h5>
                                                </div>
                                                <div className="box-body">
                                                    <div className="append_checklists" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="serialNumber">Serial Number:*</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Serial Number"
                                                    required
                                                    name="serialNumber"
                                                    type="text"
                                                    id="serialNumber"
                                                    value={formData.serialNumber}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="passwordOrPatternLock">Password:</label>
                                                <div className="input-group">
                                                    <input
                                                        className="form-control"
                                                        placeholder="Password"
                                                        name="passwordOrPatternLock"
                                                        type="text"
                                                        id="passwordOrPatternLock"
                                                        value={formData.passwordOrPatternLock}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn btn-primary btn-flat" data-toggle="modal" data-target="#security_pattern">
                                                            <FontAwesomeIcon icon={faLock} /> Lock
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="productConfiguration">Product Configuration:</label>
                                                <br />
                                                <textarea
                                                    className="tags-look"
                                                    rows={3}
                                                    name="productConfiguration"
                                                    cols={50}
                                                    id="productConfiguration"
                                                    value={formData.productConfiguration}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="problemReportedByTheCustomer">Problem Reported By The Customer</label>
                                                <br />
                                                <textarea
                                                    className="tags-look"
                                                    rows={3}
                                                    name="problemReportedByTheCustomer"
                                                    cols={50}
                                                    id="problemReportedByTheCustomer"
                                                    value={formData.problemReportedByTheCustomer}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="conditionOfTheProduct">Condition Of The Product:</label>
                                                <br />
                                                <textarea
                                                    className="tags-look"
                                                    rows={3}
                                                    name="conditionOfTheProduct"
                                                    cols={50}
                                                    id="conditionOfTheProduct"
                                                    value={formData.conditionOfTheProduct}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box box-solid">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="commentByTechnician">Comment by technician:</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    name="commentByTechnician"
                                                    cols={50}
                                                    id="commentByTechnician"
                                                    value={formData.commentByTechnician}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="estimatedCost">Estimated Cost:</label>
                                                <input
                                                    className="form-control input_number"
                                                    placeholder="Estimated Cost"
                                                    name="estimatedCost"
                                                    type="text"
                                                    id="estimatedCost"
                                                    value={formData.estimatedCost}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="status">Status:*</label>
                                                <select
                                                    name="status"
                                                    className="form-control status"
                                                    id="status"
                                                    required
                                                    value={formData.status}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="expectedDeliveryDate">Expected Delivery Date:</label>
                                                <FontAwesomeIcon icon={faInfoCircle}
                                                    className="fa fa-info-circle text-info hover-q no-print "
                                                    aria-hidden="true" data-container="body" data-toggle="popover"
                                                    data-placement="auto bottom" data-content="repair::lang.delivery_date_tooltip" data-html="true" data-trigger="hover"
                                                />
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <FontAwesomeIcon icon={faCalendar} />
                                                    </span>
                                                    <input
                                                        className="form-control"
                                                        name="expectedDeliveryDate"
                                                        type="date"
                                                        id="expectedDeliveryDate"
                                                        value={formData.expectedDeliveryDate}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                    <span className="input-group-addon">
                                                        <FontAwesomeIcon icon={faTimesCircle} className="cursor-pointer clear_delivery_date" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="document">Document:</label>
                                                <input
                                                    id="document"
                                                    accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png"
                                                    name="document"
                                                    type="file"
                                                    onChange={(e) => {
                                                        console.log(e.target.files[0]);
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            document: e.target.files[0]
                                                        }))
                                                    }}
                                                />
                                                <small>
                                                    <p className="help-block">
                                                        Max File size: 5MB <br />Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg,.jpg, .png
                                                    </p>
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">

                                            <div className="form-group">
                                                <label htmlFor="status">Send Notification</label>
                                                <select
                                                    name="sendNotification"
                                                    className="form-control status"
                                                    id="sendNotification"
                                                    required
                                                    value={formData.sendNotification}
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                    <option value="Sms">Sms</option>
                                                    <option value="Email">Email</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <hr />
                                        <div className="clearfix" />
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="customField1">Custom Field 1:</label>
                                                <input
                                                    className="form-control"
                                                    name="customField1"
                                                    type="text"
                                                    id="customField1"
                                                    value={formData.customField1}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="customField2">Custom Field 2:</label>
                                                <input
                                                    className="form-control"
                                                    name="customField2"
                                                    type="text"
                                                    id="customField2"
                                                    value={formData.customField2}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="customField3">Custom Field 3:</label>
                                                <input
                                                    className="form-control"
                                                    name="customField3"
                                                    type="text"
                                                    id="customField3"
                                                    value={formData.customField3}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="customField4">Custom Field 4:</label>
                                                <input
                                                    className="form-control"
                                                    name="customField4"
                                                    type="text"
                                                    id="customField4"
                                                    value={formData.customField4}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="customField5">Custom Field 5:</label>
                                                <input
                                                    className="form-control"
                                                    name="customField5"
                                                    type="text"
                                                    id="customField5"
                                                    value={formData.customField5}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        value="submit"
                                        className="btn btn-primary btn-big submit_product_form"
                                    >
                                        Save
                                    </button>
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

export default EditJobSheet;
