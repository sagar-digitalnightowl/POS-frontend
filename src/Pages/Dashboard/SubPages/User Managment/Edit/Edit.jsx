import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import './edit.css'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../../utils/apiCall';

const Edit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');


  const [formvalue, setFormValue] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    active: true,
    enableServiceStaffPin: false,
    userProfile: {
      allowLogin: true,
      role: "",
      accessAllLocations: true,
      posApplicationTradingCompanyWLL: false,
      salesCommissionPercentage: 10,
      maxSalesDiscountPercent: 5,
      allowSelectedContacts: false,
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      bloodGroup: "",
      mobileNumber: "",
      alternateContactNumber: "",
      familyContactNumber: "",
      facebookLink: "",
      twitterLink: "",
      socialMedia1: "",
      socialMedia2: "",
      customField1: "",
      customField2: "",
      customField3: "",
      customField4: "",
      guardianName: "",
      IDproofName: "",
      IDproofNumber: "",
      permanentAddress: "",
      currentAddress: "",
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      bankIdentifierCode: "",
      bankBranch: "",
      taxPayerID: "",
      department: "",
      designation: "",
      primaryWorkLocation: "",
      basicSalary: "",
      payComponents: "",
    }
  })


  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await apiCall({ method: 'get', url: `/admin/userManagement/user/getUser/${id}` })

      if (res.status === 200) {
        setFormValue(res?.data?.result)
      }

    } catch (error) {
      console.log("Error in fetching user by id : ", error)
      toast.error(error?.response?.data?.message || "Error in user fetching")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id])



  const updateUser = async () => {
    try {
      setLoading(true);
      
      const res = await apiCall({ method: 'patch', url: `/admin/userManagement/user/updateUser/${id}`, data: formvalue })

      if (res.status === 200) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          navigate('/users')
        }, 1000)
        setFormValue({
          prefix: "",
          firstName: "",
          lastName: "",
          email: "",
          active: true,
          enableServiceStaffPin: false,
          userProfile: {
            allowLogin: true,
            role: "",
            accessAllLocations: true,
            posApplicationTradingCompanyWLL: false,
            salesCommissionPercentage: 10,
            maxSalesDiscountPercent: 5,
            allowSelectedContacts: false,
            dateOfBirth: "",
            gender: "",
            maritalStatus: "",
            bloodGroup: "",
            mobileNumber: "",
            alternateContactNumber: "",
            familyContactNumber: "",
            facebookLink: "",
            twitterLink: "",
            socialMedia1: "",
            socialMedia2: "",
            customField1: "",
            customField2: "",
            customField3: "",
            customField4: "",
            guardianName: "",
            IDproofName: "",
            IDproofNumber: "",
            permanentAddress: "",
            currentAddress: "",
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            bankIdentifierCode: "",
            bankBranch: "",
            taxPayerID: "",
            department: "",
            designation: "",
            primaryWorkLocation: "",
            basicSalary: "",
            payComponents: "",
          }
        })
      }else{
        toast.error(res?.data?.message);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRole = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/userManagement/role/getAllRole`, {
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
        setRoles(result.result.roles)
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchRole();
      setLoading(true);
    }
  }, []);

  const handleChange = (e, fieldName) => {
    setFormValue((prev) => ({
      ...prev,
      [fieldName]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  }
  return (
    <>

      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit user</h1>
          </section>
          <section className="content">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="row">
                <div className="col-md-12">
                  <div className="box box-solid">
                    <div className="box-body">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="surname">Prefix:</label>
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, prefix: e.target.value }))}
                            className="form-control"
                            placeholder="Mr / Mrs / Miss"
                            name="prefix"
                            value={formvalue.prefix}
                            type="text"
                            id="surname"
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <label htmlFor="first_name">First Name:*</label>
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, firstName: e.target.value }))}
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={formvalue.firstName}
                            type="text"
                            id="first_name"
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <label htmlFor="last_name">Last Name:</label>
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, lastName: e.target.value }))}
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={formvalue.lastName}
                            type="text"
                            id="last_name"
                          />
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="email">Email:*</label>
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, email: e.target.value }))}
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={formvalue.email}
                            type="text"
                            id="email"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <div className="checkbox">
                            <br />
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, active: e.target.checked }))}
                                className="input-icheck status"
                                name="active"
                                type="checkbox"
                                checked={formvalue.active}
                              />
                              {isActive ? "Active" : "Inactive"}
                            </label>
                            <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                              data-placement="auto bottom" data-content="Check/Uncheck to make a user active/inactive." data-html="true" data-trigger="hover" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="checkbox">
                            <br />
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, enableServiceStaffPin: e.target.checked }))}
                                className="input-icheck status"
                                id="is_enable_service_staff_pin"
                                name="enableServiceStaffPin"
                                type="checkbox"
                                defaultValue={1}
                                checked={formvalue?.enableServiceStaffPin}
                              />
                              Enable service staff pin
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 hide service_staff_pin_div">
                        <div className="form-group">
                          <label htmlFor="service_staff_pin">Staff Pin:</label>
                          <input onChange={(e) => handleChange(e, "service_staff_pin")} className="form-control" required="" placeholder="Staff Pin" name="service_staff_pin"
                            type="password" defaultValue="" id="service_staff_pin" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="box box-solid">
                    <div className="box-header">
                      <h3 className="box-title">Roles and Permissions</h3>
                    </div>
                    <div className="box-body">
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="checkbox">
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, allowLogin: e.target.checked } }))}
                                className="input-icheck"
                                id="allowLogin"
                                defaultChecked="checked"
                                name="allowLogin"
                                type="checkbox"
                                defaultValue={1}
                                checked={formvalue?.userProfile?.allowLogin}
                              />
                              Allow login
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* <div className="clearfix" /> */}
                      {/* <div className="user_auth_fields">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="password">Password:*</label>
                        <input className="form-control" required="" placeholder="Password" name="password" type="password" defaultValue="" id="password"/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="confirm_password">
                          Confirm Password:*
                        </label>
                        <input className="form-control" required="" placeholder="Confirm Password" name="confirm_password" type="password" defaultValue="" id="confirm_password" />
                      </div>
                    </div>
                  </div> */}
                      {/* <div className="clearfix" /> */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="role">Role:*</label>{" "}
                          <i className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                            data-content="Admin can access all locations" data-html="true" data-trigger="hover" />
                          <select
                            value={formvalue.userProfile.role || ""} // Fallback if undefined
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, role: e.target.value } }))}
                            className="form-control select2"
                            id="role"
                            name="role"
                          >
                            <option value="" disabled>Select a role</option>
                            {(roles || []).map((role) => ( // Fallback if roles is undefined
                              <option key={role._id} value={role._id}>
                                {role.roleName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-3">
                        <h4>
                          Access locations
                          <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"
                            data-toggle="popover" data-placement="auto bottom"
                            data-content="Choose all locations this role can access. All data for the selected location will only be displayed to the user.<br/><br/><small>For Example: You can use this to define <i>Store Manager / Cashier / Stock manager / Branch Manager, </i>of particular Location.</small>"
                            data-html="true" data-trigger="hover" />
                        </h4>
                      </div>
                      <div className="col-md-9">
                        <div className="col-md-12">
                          <div className="checkbox">
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, accessAllLocations: e.target.checked } }))}
                                className="input-icheck"
                                defaultChecked="checked"
                                name="access_all_locations"
                                type="checkbox"
                                defaultValue="access_all_locations"
                                checked={formvalue?.userProfile?.accessAllLocations}
                              />
                              All Locations
                            </label>
                            <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                              data-placement="auto bottom" data-content="If 
                          <b>All Locations</b> selected this role will have permission to access all business locations"
                              data-html="true" data-trigger="hover"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="checkbox">
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, posApplicationTradingCompanyWLL: e.target.checked } }))}
                                className="input-icheck"
                                name="location_permissions[]"
                                type="checkbox"
                                defaultValue="location.4"
                                checked={formvalue?.userProfile?.posApplicationTradingCompanyWLL}
                              />
                              POS APPLICATION TRADING COMPANY W.L.L (BL0001)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="box box-solid">
                    <div className="box-header">
                      <h3 className="box-title">Sales</h3>
                    </div>
                    <div className="box-body">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="cmmsn_percent">
                            Sales Commission Percentage (%):
                          </label>{" "}
                          <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Used only if Sales Commission Agent Type setting is: 'Logged In user' or 'Select from users list'"
                            data-html="true" data-trigger="hover"
                          />
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, salesCommissionPercentage: e.target.value } }))}
                            value={formvalue?.userProfile?.salesCommissionPercentage}
                            className="form-control input_number"
                            placeholder="Sales Commission Percentage (%)"
                            name="cmmsn_percent"
                            type="text"
                            id="cmmsn_percent"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="max_sales_discount_percent">
                            Max sales discount percent:
                          </label>{" "}
                          <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                            data-content="Maximum discount percentage that a user can give during sale. Leave it blank for no constraints" data-html="true" data-trigger="hover"
                          />
                          <input
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, maxSalesDiscountPercent: e.target.value } }))}
                            value={formvalue?.userProfile?.maxSalesDiscountPercent}
                            className="form-control input_number"
                            placeholder="Max sales discount percent"
                            name="max_sales_discount_percent"
                            type="text"
                            id="max_sales_discount_percent"
                          />
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="checkbox">
                            <br />
                            <label>
                              <input
                                onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, allowSelectedContacts: e.target.checked } }))}
                                className="input-icheck"
                                id="selected_contacts"
                                name="selected_contacts"
                                type="checkbox"
                                defaultValue={1}
                                checked={formvalue?.userProfile?.allowSelectedContacts}
                              />{" "}
                              Allow Selected Contacts
                            </label>
                            <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                              data-content="Only allow access to selected contacts in sells/purchase customer/supplier search box" data-html="true" data-trigger="hover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 hide selected_contacts_div">
                        <div className="form-group">
                          <label htmlFor="user_allowed_contacts">
                            Select Contacts:
                          </label>
                          <div className="form-group">
                            <select
                              onChange={(e) => handleChange(e, "selectedContactIds")}
                              className="form-control select2"
                              multiple=""
                              style={{ width: "100%" }}
                              id="user_allowed_contacts"
                              name="selected_contact_ids[]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="box box-solid">
                    <div className="box-header">
                      <h3 className="box-title">More Informations</h3>
                    </div>
                    <div className="box-body">
                      <div className="form-group col-md-3">
                        <label htmlFor="user_dob">Date of birth:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, dateOfBirth: e.target.value } }))}
                          value={formvalue?.userProfile?.dateOfBirth}
                          className="form-control"
                          placeholder="Date of birth"
                          readOnly=""
                          id="user_dob"
                          name="dob"
                          type="text"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="gender">Gender:</label>
                        <select
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, gender: e.target.value } }))}
                          className="form-control"
                          id="gender"
                          name="gender"
                          value={formvalue?.userProfile?.gender}
                        >
                          <option selected="selected" value="">
                            Please Select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="marital_status">Marital Status:</label>
                        <select
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, maritalStatus: e.target.value } }))} className="form-control"
                          id="marital_status"
                          name="marital_status"
                          value={formvalue?.userProfile?.maritalStatus}
                        >
                          <option value="">
                            Marital Status
                          </option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="blood_group">Blood Group:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, bloodGroup: e.target.value } }))}
                          value={formvalue?.userProfile?.bloodGroup}
                          className="form-control"
                          placeholder="Blood Group"
                          name="blood_group"
                          type="text"
                          id="blood_group"
                        />
                      </div>

                      <div className="clearfix" />

                      <div className="form-group col-md-3">
                        <label htmlFor="contact_number">Mobile Number:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, mobileNumber: e.target.value } }))}
                          value={formvalue?.userProfile?.mobileNumber}
                          className="form-control"
                          placeholder="Mobile Number"
                          name="contact_number"
                          type="text"
                          id="contact_number"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="alt_number">
                          Alternate contact number:
                        </label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, alternateContactNumber: e.target.value } }))}
                          value={formvalue?.userProfile?.allowSelectedContacts}
                          className="form-control"
                          placeholder="Alternate contact number"
                          name="alt_number"
                          type="text"
                          id="alt_number"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="family_number">
                          Family contact number:
                        </label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, familyContactNumber: e.target.value } }))}
                          value={formvalue?.userProfile?.familyContactNumber}
                          className="form-control"
                          placeholder="Family contact number"
                          name="family_number"
                          type="text"
                          id="family_number"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="fb_link">Facebook Link:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, facebookLink: e.target.value } }))}
                          value={formvalue?.userProfile?.facebookLink}
                          className="form-control"
                          placeholder="Facebook Link"
                          name="fb_link"
                          type="text"
                          id="fb_link"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="twitter_link">Twitter Link:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, twitterLink: e.target.value } }))}
                          value={formvalue?.userProfile?.twitterLink}
                          className="form-control"
                          placeholder="Twitter Link"
                          name="twitter_link"
                          type="text"
                          id="twitter_link"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="social_media_1">Social Media 1:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, socialMedia1: e.target.value } }))}
                          value={formvalue?.userProfile?.socialMedia1}
                          className="form-control"
                          placeholder="Social Media 1"
                          name="social_media_1"
                          type="text"
                          id="social_media_1"
                        />
                      </div>

                      <div className="clearfix" />

                      <div className="form-group col-md-3">
                        <label htmlFor="social_media_2">Social Media 2:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, socialMedia2: e.target.value } }))}
                          value={formvalue?.userProfile?.socialMedia2}
                          className="form-control"
                          placeholder="Social Media 2"
                          name="social_media_2"
                          type="text"
                          id="social_media_2"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="custom_field_1">Custom field 1:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, customField1: e.target.value } }))}
                          value={formvalue?.userProfile?.customField1}
                          className="form-control"
                          placeholder="Custom field 1"
                          name="custom_field_1"
                          type="text"
                          id="custom_field_1"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="custom_field_2">Custom field 2:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, customField2: e.target.value } }))}
                          value={formvalue?.userProfile?.customField2}
                          className="form-control"
                          placeholder="Custom field 2"
                          name="custom_field_2"
                          type="text"
                          id="custom_field_2"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="custom_field_3">Custom field 3:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, customField3: e.target.value } }))}
                          value={formvalue?.userProfile?.customField3}
                          className="form-control"
                          placeholder="Custom field 3"
                          name="custom_field_3"
                          type="text"
                          id="custom_field_3"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="custom_field_4">Custom field 4:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, customField4: e.target.value } }))}
                          value={formvalue?.userProfile?.customField4}
                          className="form-control"
                          placeholder="Custom field 4"
                          name="custom_field_4"
                          type="text"
                          id="custom_field_4"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="guardian_name">Guardian Name:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, guardianName: e.target.value } }))}
                          value={formvalue?.userProfile?.guardianName}
                          className="form-control"
                          placeholder="Guardian Name"
                          name="guardian_name"
                          type="text"
                          id="guardian_name"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="id_proof_name">ID proof name:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, IDproofName: e.target.value } }))}
                          value={formvalue?.userProfile?.IDproofName}
                          className="form-control"
                          placeholder="ID proof name"
                          name="id_proof_name"
                          type="text"
                          id="id_proof_name"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="id_proof_number">ID proof number:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, IDproofNumber: e.target.value } }))}
                          value={formvalue?.userProfile?.IDproofNumber}
                          className="form-control"
                          placeholder="ID proof number"
                          name="id_proof_number"
                          type="text"
                          id="id_proof_number"
                        />
                      </div>

                      <div className="clearfix" />
                      <div className="form-group col-md-6">
                        <label htmlFor="permanent_address">
                          Permanent Address:
                        </label>
                        <textarea
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, permanentAddress: e.target.value } }))}
                          value={formvalue?.userProfile?.permanentAddress}
                          className="form-control"
                          placeholder="Permanent Address"
                          rows={3}
                          name="permanent_address"
                          cols={50}
                          id="permanent_address"
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="current_address">Current Address:</label>
                        <textarea
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, currentAddress: e.target.value } }))}
                          value={formvalue?.userProfile?.currentAddress}
                          className="form-control"
                          placeholder="Current Address"
                          rows={3}
                          name="current_address"
                          cols={50}
                          id="current_address"
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-md-12">
                        <hr />
                        <h4>Bank Details:</h4>
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="account_holder_name">
                          Account Holder's Name:
                        </label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, accountHolderName: e.target.value } }))}
                          value={formvalue?.userProfile?.accountHolderName}
                          className="form-control"
                          id="account_holder_name"
                          placeholder="Account Holder's Name"
                          name="bank_details[account_holder_name]"
                          type="text"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="account_number">Account Number:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, accountNumber: e.target.value } }))}
                          value={formvalue?.userProfile?.accountNumber}
                          className="form-control"
                          id="account_number"
                          placeholder="Account Number"
                          name="bank_details[account_number]"
                          type="text"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="bank_name">Bank Name:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, bankName: e.target.value } }))}
                          value={formvalue?.userProfile?.bankName}
                          className="form-control"
                          id="bank_name"
                          placeholder="Bank Name"
                          name="bank_details[bank_name]"
                          type="text"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="bank_code">Bank Identifier Code:</label>{" "}
                        <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"
                          data-toggle="popover" data-placement="auto bottom" data-content="A unique code to identify the bank in your country, for example: IFSC code"
                          data-html="true" data-trigger="hover"
                        />

                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, bankIdentifierCode: e.target.value } }))}
                          value={formvalue?.userProfile?.bankIdentifierCode}
                          className="form-control"
                          id="bank_code"
                          placeholder="Bank Identifier Code"
                          name="bank_details[bank_code]"
                          type="text"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="branch">Branch:</label>
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, bankBranch: e.target.value } }))}
                          value={formvalue?.userProfile?.bankBranch}
                          className="form-control" id="branch"
                          placeholder="Branch"
                          name="bank_details[branch]"
                          type="text"
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="tax_payer_id">Tax Payer ID:</label>
                        <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover"
                          data-placement="auto bottom" data-content="Tax number id of the employee, for example, PAN card in India"
                          data-html="true" data-trigger="hover"
                        />
                        <input
                          onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, taxPayerID: e.target.value } }))}
                          value={formvalue?.userProfile?.taxPayerID}
                          className="form-control"
                          id="tax_payer_id"
                          placeholder="Tax Payer ID"
                          name="bank_details[tax_payer_id]"
                          type="text"
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">HRM Details</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="essentials_department_id">
                          Department:
                        </label>

                        <div className="form-group">
                          <select
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, department: e.target.value } }))}
                            value={formvalue?.userProfile?.department}
                            className="form-control select2"
                            style={{ width: "100%" }}
                            id="essentials_department_id"
                            name="essentials_department_id"
                          >
                            <option selected="selected" value="">
                              Please Select
                            </option>
                          </select>
                        </div>

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="essentials_designation_id">
                          Designation:
                        </label>

                        <div className="form-group">
                          <select
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, designation: e.target.value } }))}
                            value={formvalue?.userProfile?.designation}
                            className="form-control select2"
                            style={{ width: "100%" }}
                            id="essentials_designation_id"
                            name="essentials_designation_id"
                          >
                            <option selected="selected" value="">
                              Please Select
                            </option>
                          </select>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Payroll</h3>
                </div>
                <div className="box-body">
                  <div className="row">

                    <div className="col-md-4">
                      <label htmlFor="location_id">Primary work location:</label>
                      <select
                        onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, primaryWorkLocation: e.target.value } }))}
                        value={formvalue?.userProfile?.primaryWorkLocation}
                        className="form-control select2"
                        id="location_id"
                        name="location_id"
                      >
                        <option value="">
                          Please Select
                        </option>
                        <option value={4}>
                          POS APPLICATION  TRADING COMPANY W.L.L (BL0001)
                        </option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <div className="multi-input">
                          <label htmlFor="essentials_salary">Basic salary:</label>
                          <br />
                          <select
                            onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, basicSalary: e.target.value } }))}
                            value={formvalue?.userProfile?.basicSalary}
                            className="form-control width-60 pull-left"
                            name="essentials_pay_period"
                          >
                            <option value="month">Per Month</option>
                            <option value="week">Per Week</option>
                            <option value="day">Per Day</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="pay_components">Pay Components:</label>
                      <select
                        onChange={(e) => setFormValue(prev => ({ ...prev, userProfile: { ...formvalue.userProfile, payComponents: e.target.value } }))}
                        value={formvalue?.userProfile?.payComponents}
                        className="form-control select2"
                        multiple=""
                        name="pay_components[]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-primary btn-big" id="submit_user_button">
                    Save
                  </button>
                </div>
              </div>
            </form>
            <div className="scrolltop no-print">
              <div className="scroll icon">
                <i className="fas fa-angle-up" />
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  )
}
export default Edit