import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faInfoCircle, faLock } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  return (
    <div>
    <div className="wrapper thetop">
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>My Profile</h1>
        </section>
        <section className="content">
          <form method="POST"action="https://medipro.affinity-me.com/user/update-password"
            acceptCharset="UTF-8"id="edit_password_form"className="form-horizontal">
            <div className="row">
              <div className="col-sm-12">
                <div className="box box-solid">
                  <div className="box-header">
                    <div className="box-header">
                      <h3 className="box-title"> Change Password</h3>
                    </div>
                  </div>
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="current_password"className="col-sm-3 control-label">
                        Current password:
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input className="form-control"placeholder="Current password"required=""
                            name="current_password"type="password"defaultValue=""id="current_password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="new_password"className="col-sm-3 control-label">
                        New password:
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input className="form-control"placeholder="New password"required=""
                            name="new_password"type="password"defaultValue=""id="new_password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm_password"className="col-sm-3 control-label">
                        Confirm new password:
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input className="form-control"placeholder="Confirm new password"required=""
                            name="confirm_password"type="password"defaultValue=""id="confirm_password"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary pull-right">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form method="POST"action="/user/update"
            acceptCharset="UTF-8"id="edit_user_profile_form"encType="multipart/form-data">
            <div className="row">
              <div className="col-sm-8">
                <div className="box box-solid">
                  <div className="box-header">
                    <div className="box-header">
                      <h3 className="box-title"> Edit Profile</h3>
                    </div>
                  </div>
                  <div className="box-body">
                    <div className="form-group col-md-2">
                      <label htmlFor="surname">Prefix:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesomeIcon icon={faInfo} />
                        </span>
                        <input className="form-control"placeholder="Mr / Mrs / Miss"name="surname"type="text"id="surname"/>
                      </div>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="first_name">First Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesomeIcon icon={faInfo} />
                        </span>
                        <input className="form-control"placeholder="First Name"required=""
                          name="first_name"type="text"defaultValue="MIDDLE PEARL ADMIN"id="first_name"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="last_name">Last Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesomeIcon icon={faInfo} />
                        </span>
                        <input className="form-control"placeholder="Last Name"
                          name="last_name"type="text"id="last_name"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesomeIcon icon={faInfo} />
                        </span>
                        <input className="form-control"placeholder="Email"
                          name="email"type="email"defaultValue="fadi@middlepearl.com"id="email"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="language">Language:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FontAwesomeIcon icon={faInfo} />
                        </span>
                        <select className="form-control select2"id="language"name="language">
                          <option value="en" selected="selected">English</option>
                          <option value="ar">Arabic - العَرَبِيَّة</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box box-solid">
                  <div className="box-header">
                    <h3 className="box-title">Profile Photo</h3>
                  </div>
                  <div className="box-body">
                    <div className="col-md-12 text-center">
                      <img
                        src="https://medipro.affinity-me.com/uploads/media/1698649031_1249173008_middle%20pearl%20logo.jpeg"
                        width={150}height={150}className="img-circle"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="profile_photo">Upload Image:</label>
                        <input id="profile_photo"accept="image/*"name="profile_photo"type="file"/>
                        <small>
                          <p className="help-block">Max File size: 5MB</p>
                        </small>
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
                      <input className="form-control"placeholder="Date of birth"readOnly=""id="user_dob"name="dob"type="text"/>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="gender">Gender:</label>
                      <select className="form-control" id="gender" name="gender">
                        <option selected="selected" value="">Please Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="marital_status">Marital Status:</label>
                      <select className="form-control"id="marital_status"name="marital_status">
                        <option selected="selected" value="">Marital Status</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                        <option value="divorced">Divorced</option>
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="blood_group">Blood Group:</label>
                      <input className="form-control"placeholder="Blood Group"
                        name="blood_group"type="text"id="blood_group"
                      />
                    </div>
                    <div className="clearfix" />
                    <div className="form-group col-md-3">
                      <label htmlFor="contact_number">Mobile Number:</label>
                      <input className="form-control"placeholder="Mobile Number"
                        name="contact_number"type="text"id="contact_number"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="alt_number">
                        Alternate contact number:
                      </label>
                      <input className="form-control"placeholder="Alternate contact number"
                        name="alt_number"type="text"id="alt_number"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="family_number">
                        Family contact number:
                      </label>
                      <input className="form-control"placeholder="Family contact number"
                        name="family_number"type="text"id="family_number"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="fb_link">Facebook Link:</label>
                      <input className="form-control" placeholder="Facebook Link"
                        name="fb_link"type="text"id="fb_link"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="twitter_link">Twitter Link:</label>
                      <input className="form-control"placeholder="Twitter Link"
                        name="twitter_link"type="text"id="twitter_link"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="social_media_1">Social Media 1:</label>
                      <input className="form-control"placeholder="Social Media 1"
                        name="social_media_1"type="text"id="social_media_1"
                      />
                    </div>
                    <div className="clearfix" />
                    <div className="form-group col-md-3">
                      <label htmlFor="social_media_2">Social Media 2:</label>
                      <input className="form-control"placeholder="Social Media 2"
                        name="social_media_2"type="text"id="social_media_2"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="custom_field_1">Custom field 1:</label>
                      <input className="form-control" placeholder="Custom field 1"
                        name="custom_field_1"type="text"id="custom_field_1"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="custom_field_2">Custom field 2:</label>
                      <input className="form-control"placeholder="Custom field 2"
                        name="custom_field_2"type="text"id="custom_field_2"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="custom_field_3">Custom field 3:</label>
                      <input className="form-control"placeholder="Custom field 3"
                        name="custom_field_3"type="text"id="custom_field_3"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="custom_field_4">Custom field 4:</label>
                      <input className="form-control" placeholder="Custom field 4"
                        name="custom_field_4"type="text"id="custom_field_4"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="guardian_name">Guardian Name:</label>
                      <input className="form-control"placeholder="Guardian Name"
                        name="guardian_name"type="text"id="guardian_name"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="id_proof_name">ID proof name:</label>
                      <input className="form-control"placeholder="ID proof name"
                        name="id_proof_name"type="text"id="id_proof_name"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="id_proof_number">ID proof number:</label>
                      <input className="form-control"placeholder="ID proof number"
                        name="id_proof_number"type="text"id="id_proof_number"
                      />
                    </div>
                    <div className="clearfix" />
                    <div className="form-group col-md-6">
                      <label htmlFor="permanent_address">Permanent Address:</label>
                      <textarea className="form-control"placeholder="Permanent Address"rows={3}
                        name="permanent_address"cols={50}id="permanent_address"defaultValue={""}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="current_address">Current Address:</label>
                      <textarea className="form-control"placeholder="Current Address"rows={3}
                        name="current_address"cols={50}id="current_address"defaultValue={""}
                      />
                    </div>
                    <div className="col-md-12">
                      <hr />
                      <h4>Bank Details:</h4>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="account_holder_name">Account Holder's Name:</label>
                      <input className="form-control"id="account_holder_name"
                        placeholder="Account Holder's Name"name="bank_details[account_holder_name]"type="text"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="account_number">Account Number:</label>
                      <input className="form-control"id="account_number"placeholder="Account Number"
                        name="bank_details[account_number]"type="text"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="bank_name">Bank Name:</label>
                      <input className="form-control"id="bank_name"placeholder="Bank Name"
                        name="bank_details[bank_name]"type="text"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="bank_code">Bank Identifier Code:</label>
                      <FontAwesomeIcon icon={faInfoCircle}aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                        data-content="A unique code to identify the bank in your country, for example: IFSC code"
                        data-html="true"data-trigger="hover"
                      />
                      <input className="form-control"id="bank_code"
                        placeholder="Bank Identifier Code"name="bank_details[bank_code]"type="text"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="branch">Branch:</label>
                      <input  className="form-control"id="branch"
                        placeholder="Branch"name="bank_details[branch]"type="text"
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="tax_payer_id">Tax Payer ID:</label>
                      <FontAwesomeIcon icon={faInfoCircle}aria-hidden="true"data-container="body"data-toggle="popover"
                        data-placement="auto bottom"data-html="true"data-trigger="hover"
                        data-content="Tax number id of the employee, for example, PAN card in India"
                      />
                      <input className="form-control"id="tax_payer_id"placeholder="Tax Payer ID"
                        name="bank_details[tax_payer_id]"type="text"
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary btn-big">Update</button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <footer/>
    </div>
  </div>
  )
}

export default Profile