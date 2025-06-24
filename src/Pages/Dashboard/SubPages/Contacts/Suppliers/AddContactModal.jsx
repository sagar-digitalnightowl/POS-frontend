import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import './AddContactModal.css';

const AddContactModal = ({ show, onClose, data }) => {
    // Main form state
    console.log(data);
    const [formData, setFormData] = useState({
        contactType: 'supplier',
        isIndividual: true,
        showMoreInfo: false,
        showContactPerson1: false,
        prefix: '',
        firstName: '',
        middleName: '',
        lastName: '',
        businessName: '',
        mobileNo: '',
        alternateContactNo: '',
        email: '',
        assignedTo: '',
        taxNumber: '',
        openingBalance: '',
        payTerm: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        customField1: '',
        customField2: '',
        customField3: '',
        customField4: '',
        contactPerson1: {
            prefix: '',
            firstName: '',
            lastName: '',
            email: '',
            mobileNo: '',
            alternateContactNo: '',
            familyContactNo: '',
            department: '',
            designation: '',
            salesCommission: '',
            allowLogin: false,
        }
    });


    console.log(formData, "form data")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const textStyle = { color: 'black' };

    // Initialize form with data when modal opens or data changes
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setFormData(prev => ({
                ...prev,
                contactType: data.contactType || 'supplier',
                isIndividual: data.individual,
                prefix: data.prefix || '',
                firstName: data.firstName || '',
                middleName: data.middleName || '',
                lastName: data.lastName || '',
                businessName: data.businessName || '',
                mobileNo: data.mobileNo || '',
                alternateContactNo: data.alternateContactNo || '',
                email: data.email || '',
                assignedTo: data.assignedTo || '',
                taxNumber: data.taxNumber || '',
                openingBalance: data.openingBalance || '',
                payTerm: data.payTerm || '',
                addressLine1: data.addressLine1 || '',
                addressLine2: data.addressLine2 || '',
                city: data.city || '',
                state: data.state || '',
                country: data.country || '',
                zipCode: data.zipCode || '',
                customField1: data.customField1 || '',
                customField2: data.customField2 || '',
                customField3: data.customField3 || '',
                customField4: data.customField4 || '',
                contactPerson1: data.contactPerson1 || {
                    prefix: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNo: '',
                    alternateContactNo: '',
                    familyContactNo: '',
                    department: '',
                    designation: '',
                    salesCommission: '',
                    allowLogin: false,
                }
            }));
        }
    }, [data]);

    // Reset form when modal closes
    useEffect(() => {
        if (!show) {
            setFormData({
                contactType: 'supplier',
                isIndividual: true,
                showMoreInfo: false,
                showContactPerson1: false,
                prefix: '',
                firstName: '',
                middleName: '',
                lastName: '',
                businessName: '',
                mobileNo: '',
                alternateContactNo: '',
                email: '',
                assignedTo: '',
                taxNumber: '',
                openingBalance: '',
                payTerm: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                country: '',
                zipCode: '',
                customField1: '',
                customField2: '',
                customField3: '',
                customField4: '',
                contactPerson1: {
                    prefix: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNo: '',
                    alternateContactNo: '',
                    familyContactNo: '',
                    department: '',
                    designation: '',
                    salesCommission: '',
                    allowLogin: false,
                }
            });
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContactPersonChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            contactPerson1: {
                ...prev.contactPerson1,
                [field]: value
            }
        }));
    };

    const toggleContactPerson = () => {
        setFormData(prev => ({
            ...prev,
            showContactPerson1: !prev.showContactPerson1
        }));
    };

    const toggleMoreInfo = () => {
        setFormData(prev => ({
            ...prev,
            showMoreInfo: !prev.showMoreInfo
        }));
    };

    const addSupplier = async (supplierData) => {
        try {
            if (supplierData.isIndividual) {
                supplierData['individual'] = true;
                supplierData['business'] = false;
            } else {
                supplierData['business'] = true;
                supplierData['individual'] = false;
            }

            const payload = { ...supplierData }
            delete payload.isIndividual;
            delete payload.showMoreInfo;
            delete payload.showContactPerson1;
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/addCustomerAndSupplier`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (response.status === 400) {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to add supplier');
                throw new Error('Failed to add supplier');
            }

            const result = await response.json();
            if (result) {
                toast.success("Supplier added successfully");
                onClose();
            } else {
                throw new Error('Failed to add supplier');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateSupplier = async (supplierData, id) => {
        try {
            if (supplierData.isIndividual) {
                supplierData['individual'] = true;
                supplierData['business'] = false;
            } else {
                supplierData['business'] = true;
                supplierData['individual'] = false;
            }
            
            const payload = { ...supplierData }
            delete payload.isIndividual;
            delete payload.showMoreInfo;
            delete payload.showContactPerson1;
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/updateCustomerAndSupplier/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (response.status === 400) {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to update supplier');
                throw new Error('Failed to update supplier');
            }

            const result = await response.json();
            if (result) {
                toast.success("Supplier updated successfully");
                onClose();
            } else {
                throw new Error('Failed to update supplier');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (data && data._id) {
            updateSupplier(formData, data._id);
        } else {
            addSupplier(formData);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay" style={textStyle}>
            <div className="modal-content">
                <header className="modal-header">
                    <h2>{data && data._id ? "Update Contact" : "Add New Contact"}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </header>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="column">
                                <label htmlFor="contact-type">Contact Type:</label>
                                <select
                                    id="contact-type"
                                    name="contactType"
                                    value={formData.contactType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="supplier">Supplier</option>
                                    <option value="customer">Customer</option>
                                    {/* <option value="both">Both (Supplier & Customer)</option> */}
                                </select>
                            </div>
                            <div className="column">
                                <label>
                                    <input
                                        type="radio"
                                        name="isIndividual"
                                        checked={formData.isIndividual}
                                        onChange={() => setFormData(prev => ({ ...prev, businessName: "", ['isIndividual']: true }))}
                                        required
                                    />
                                    Individual
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="isIndividual"
                                        checked={!formData.isIndividual}
                                        onChange={() => setFormData(prev => ({ ...prev, businessName: "", ['isIndividual']: false }))}
                                        required
                                    />
                                    Business
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            {!formData.isIndividual &&
                                <div className='column'>
                                    <label htmlFor="business-name">Business Name:</label>
                                    <input
                                        type="text"
                                        id="business-name"
                                        name="businessName"
                                        placeholder="Business Name"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                    />
                                </div>
                            }
                        </div>
                        <div className='row'>
                            <div className="column">
                                <label htmlFor="prefix">Prefix:</label>
                                <input
                                    type="text"
                                    id="prefix"
                                    name="prefix"
                                    placeholder="Prefix"
                                    value={formData.prefix}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="column">
                                <label htmlFor="first-name">First Name:</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="column">
                                <label htmlFor="middle-name">Middle Name:</label>
                                <input
                                    type="text"
                                    id="middle-name"
                                    name="middleName"
                                    placeholder="Middle Name"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="column">
                                <label htmlFor="last-name">Last Name:</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="column">
                                <label htmlFor="mobile-no">Mobile No:</label>
                                <input
                                    type="text"
                                    id="mobile-no"
                                    name="mobileNo"
                                    placeholder="Mobile No"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="column">
                                <label htmlFor="alternate-contact-no">Alternate Contact No:</label>
                                <input
                                    type="text"
                                    id="alternate-contact-no"
                                    name="alternateContactNo"
                                    placeholder="Alternate Contact No"
                                    value={formData.alternateContactNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="column">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <label htmlFor="assigned-to">Assigned To:</label>
                                <input
                                    type="text"
                                    id="assigned-to"
                                    name="assignedTo"
                                    placeholder="Assigned To"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <button type="button" className="btn-more-info" onClick={toggleMoreInfo}>
                                More Information
                            </button>
                        </div>
                        {formData.showMoreInfo && (
                            <div className="more-info">
                                <div className="row">
                                    <div className="column">
                                        <label htmlFor="tax-number">Tax Number:</label>
                                        <input
                                            type="text"
                                            id="tax-number"
                                            name="taxNumber"
                                            placeholder="Tax Number"
                                            value={formData.taxNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="opening-balance">Opening Balance:</label>
                                        <input
                                            type="text"
                                            id="opening-balance"
                                            name="openingBalance"
                                            placeholder="Opening Balance"
                                            value={formData.openingBalance}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="pay-term">Pay Term:</label>
                                        <select
                                            id="pay-term"
                                            name="payTerm"
                                            value={formData.payTerm}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Pay Term</option>
                                            <option value="net30">Net 30</option>
                                            <option value="net60">Net 60</option>
                                            <option value="net90">Net 90</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <label htmlFor="address-line1">Address Line 1:</label>
                                        <input
                                            type="text"
                                            id="address-line1"
                                            name="addressLine1"
                                            placeholder="Address Line 1"
                                            value={formData.addressLine1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="address-line2">Address Line 2:</label>
                                        <input
                                            type="text"
                                            id="address-line2"
                                            name="addressLine2"
                                            placeholder="Address Line 2"
                                            value={formData.addressLine2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <label htmlFor="city">City:</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="state">State:</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="country">Country:</label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="zip-code">Zip Code:</label>
                                        <input
                                            type="text"
                                            id="zip-code"
                                            name="zipCode"
                                            placeholder="Zip Code"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <label htmlFor="customField1">Custom Field 1:</label>
                                        <input
                                            type="text"
                                            id="customField1"
                                            name="customField1"
                                            placeholder="Custom Field 1"
                                            value={formData.customField1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="customField2">Custom Field 2:</label>
                                        <input
                                            type="text"
                                            id="customField2"
                                            name="customField2"
                                            placeholder="Custom Field 2"
                                            value={formData.customField2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="customField3">Custom Field 3:</label>
                                        <input
                                            type="text"
                                            id="customField3"
                                            name="customField3"
                                            placeholder="Custom Field 3"
                                            value={formData.customField3}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <label htmlFor="customField4">Custom Field 4:</label>
                                        <input
                                            type="text"
                                            id="customField4"
                                            name="customField4"
                                            placeholder="Custom Field 4"
                                            value={formData.customField4}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="column">
                            <div className='row'>
                                <button type="button" className="btn-contact-person" onClick={toggleContactPerson}>
                                    {data && data._id ? "Update Contact Person 1" : "Add Contact Person 1"}
                                </button>
                            </div>
                            {formData.showContactPerson1 && (
                                <div className="contact-person">
                                    <h3>Contact Person 1</h3>
                                    <div className="row">
                                        <div className="column">
                                            <label htmlFor="contact-person1-prefix">Prefix:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-prefix"
                                                placeholder="Prefix"
                                                value={formData.contactPerson1.prefix}
                                                onChange={(e) => handleContactPersonChange('prefix', e.target.value)}
                                            />
                                        </div>
                                        <div className="column">
                                            <label htmlFor="contact-person1-first-name">First Name:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-first-name"
                                                placeholder="First Name"
                                                value={formData.contactPerson1.firstName}
                                                onChange={(e) => handleContactPersonChange('firstName', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="column">
                                            <label htmlFor="contact-person1-last-name">Last Name:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-last-name"
                                                placeholder="Last Name"
                                                value={formData.contactPerson1.lastName}
                                                onChange={(e) => handleContactPersonChange('lastName', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            <label htmlFor="contact-person1-email">Email:</label>
                                            <input
                                                type="email"
                                                id="contact-person1-email"
                                                placeholder="Email"
                                                value={formData.contactPerson1.email}
                                                onChange={(e) => handleContactPersonChange('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="column">
                                            <label htmlFor="contact-person1-mobile-no">Mobile No:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-mobile-no"
                                                placeholder="Mobile No"
                                                value={formData.contactPerson1.mobileNo}
                                                onChange={(e) => handleContactPersonChange('mobileNo', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            <label htmlFor="contact-person1-alternate-contact-no">Alternate Contact No:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-alternate-contact-no"
                                                placeholder="Alternate Contact No"
                                                value={formData.contactPerson1.alternateContactNo}
                                                onChange={(e) => handleContactPersonChange('alternateContactNo', e.target.value)}
                                            />
                                        </div>
                                        <div className="column">
                                            <label htmlFor="contact-person1-family-contact-no">Family Contact No:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-family-contact-no"
                                                placeholder="Family Contact No"
                                                value={formData.contactPerson1.familyContactNo}
                                                onChange={(e) => handleContactPersonChange('familyContactNo', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            <label htmlFor="contact-person1-department">Department:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-department"
                                                placeholder="Department"
                                                value={formData.contactPerson1.department}
                                                onChange={(e) => handleContactPersonChange('department', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="column">
                                            <label htmlFor="contact-person1-designation">Designation:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-designation"
                                                placeholder="Designation"
                                                value={formData.contactPerson1.designation}
                                                onChange={(e) => handleContactPersonChange('designation', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                            <label htmlFor="contact-person1-sales-commission">Sales Commission:</label>
                                            <input
                                                type="text"
                                                id="contact-person1-sales-commission"
                                                placeholder="Sales Commission"
                                                value={formData.contactPerson1.salesCommission}
                                                onChange={(e) => handleContactPersonChange('salesCommission', e.target.value)}
                                            />
                                        </div>
                                        <div className="column">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.contactPerson1.allowLogin}
                                                    onChange={(e) => handleContactPersonChange('allowLogin', e.target.checked)}
                                                />
                                                Allow Login
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn-save" disabled={loading}>
                                {loading ? 'Processing...' : 'Save'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddContactModal;