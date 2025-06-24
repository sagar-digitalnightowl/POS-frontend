import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { Form, useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { type } from '@testing-library/user-event/dist/type'
import base64String from 'base64-js';
import { all } from 'axios'
// import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';
// import 'flag-icon-css/css/flag-icon.min.css';

const AddManufacturer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData,setFormData] = useState({
    name : "",
    address : "",
    telephone : undefined,
    fax : "",
    phoneNumber : undefined,
    email : "",
    website : "",
    city : "",
    country : "",
    profilePhotoUrl : "",
    letterUrl : ""
  })
  const [letterName,setLetterName] = useState("");
  const [photoName,setPhotoName] = useState("");

  const addManufacturer = async () => {
    try {
      setLoading(true);
  
      // 1. Create FormData with EXACT field names from Postman
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('telephone', formData.telephone);
      formDataToSend.append('fax', formData.fax);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('country', formData.country);
      
      // 2. Append files with EXACT field names
      if(formData.profilePhotoUrl instanceof File){
        formDataToSend.append('profilePhoto', formData.profilePhotoUrl, formData.profilePhotoUrl.name);
      }
      if(formData.letterUrl instanceof File){
        formDataToSend.append('letter', formData.letterUrl, formData.letterUrl.name);
      }
      // 3. Debug: Verify all form data entries
      console.log('--- FormData Contents ---');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value instanceof File ? 
          `FILE: ${value} (${value.size} bytes)` : 
          `TEXT: ${value}`
        );
      }
  
      // 4. Make the request
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/addManufacturer`, {
        method: 'POST',
        headers: {
          // 'Content-Type' : "multipart/form-data",
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      
      // 5. Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      toast.success("Manufacturer added successfully");
      handleAdd();
  
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addManufacturer();  
    }

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }));
    };

    const navigate = useNavigate();
    const handleAdd = () => {
      navigate("/manufacturers");
    }

  return (
    <div><>
    <div className="wrapper thetop">
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <div id="app"></div>
        <input type="hidden" id="__code" defaultValue="BHD" />
        <input type="hidden" id="__symbol" defaultValue="BD" />
        <input type="hidden" id="__thousand" defaultValue="," />
        <input type="hidden" id="__decimal" defaultValue="." />
        <input type="hidden" id="__symbol_placement" defaultValue="before" />
        <input type="hidden" id="__precision" defaultValue={3} />
        <input type="hidden" id="__quantity_precision" defaultValue={2} />
        <input type="hidden" id="view_export_buttons" />
        <section className="content-header">
          <h1>Manufacturer</h1>
        </section>
        <section className="content">
          <div className="box box-primary">
            <div className="box-body">
              <form
                className="form formsubmitt"
                id="create_form"
                onSubmit={(e)=>handleSubmit(e)}
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card card-secondary">
                        <div className="card-header">
                          <h3 className="card-title">Add Manufacturer</h3>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <input
                              type="hidden"
                              name="continue"
                              className="continue"
                              defaultValue={0}
                            />
                            <input
                              type="hidden"
                              name="supplier_id"
                              defaultValue={0}
                            />
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Name </label>
                                <span className="form-text text-danger" />
                                <input
                                  className="form-control company_name validd"
                                  id="name"
                                  name="name"
                                  placeholder="Name"
                                  type="text"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Telephone </label>
                                <span className="form-text text-danger" />
                                <input
                                  className="form-control tel"
                                  id="tel"
                                  name="telephone"
                                  placeholder="Telephone"
                                  type="number"
                                  value={formData.telephone}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                            <div className="form-group">
                              <label>Phone Number </label>
                              <span className="form-text text-danger" />
                              <input 
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control  phone"
                                placeholder="Phone Number"
                                type="number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                />
                            </div>
                          </div>
                            {/* <div className="col-md-6">
                             <div className="form-group">
                              <label>Phone Number</label>
                                <span className="form-text text-danger" />
                              <PhoneInput
                                 country={'us'}
                                  value={phone}
                                   onChange={phone => setPhone(phone)}
                                  inputProps={{
                                    name: 'phone',
                                   required: true,
                                  className: 'form-control',
            style: { color: 'black' }
          }}
        />
      </div>
    </div> */}
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email Address </label>
                                <span className="form-text text-danger" />
                                <input
                                  id="email"
                                  name="email"
                                  className="form-control validd mb-4 email"
                                  placeholder="Email Address"
                                  type="text"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Website</label>
                                <input
                                  id="website"
                                  name="website"
                                  className="form-control mb-4"
                                  placeholder="Website"
                                  type="url"
                                  value={formData.website}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Fax</label>
                                <span className="form-text text-danger" />
                                <input
                                  id="fax"
                                  name="fax"
                                  className="form-control  fax"
                                  placeholder="Fax"
                                  type="string"
                                  value={formData.fax}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>                            
                            <div className="col-md-6">
                              <div className="form-group">
                              <label>Address </label>
                                <span className="form-text text-danger" />
                                <input
                                  className="form-control address"
                                  id="address"
                                  name="address"
                                  placeholder="Address Line"
                                  type="text"
                                  value={formData.address}
                                  onChange={handleChange}
                                />
                                <label>City </label>
                                <span className="form-text text-danger" />
                                <input
                                  type="text"
                                  className="form-control city"
                                  name="city"
                                  placeholder="City"
                                  value={formData.city}
                                  onChange={handleChange}
                                />
                                <label>Country </label>
                                <span className="form-text text-danger" />
                                <select className="form-control validd country"style={{ width: "100%" }}name="country" value={formData.country} onChange={handleChange}>
                                  <option value="" selected="" disabled=""> Select a country </option>
                                  <option value="Afghanistan">Afghanistan</option>
                                  <option value="Åland Islands"> Åland Islands </option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa"> American Samoa </option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antarctica">Antarctica</option>
                                  <option value="Antigua and Barbuda"> Antigua and Barbuda </option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia, Plurinational State of"> Bolivia, Plurinational State of </option>
                                  <option value="Bonaire, Sint Eustatius and Saba"> Bonaire, Sint Eustatius and Saba </option>
                                  <option value="Bosnia and Herzegovina"> Bosnia and Herzegovina </option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Bouvet Island"> Bouvet Island </option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Territory"> British Indian Ocean Territory </option>
                                  <option value="Brunei Darussalam"> Brunei Darussalam </option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso"> Burkina Faso </option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands"> Cayman Islands </option>
                                  <option value="Central African Republic">Central African Republic </option>
                                  <option value="Chad">Chad</option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island"> Christmas Island </option>
                                  <option value="Cocos (Keeling) Islands"> Cocos (Keeling) Islands </option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo">Congo</option>
                                  <option value="Congo, the Democratic Republic of the"> Congo, the Democratic Republic of the </option>
                                  <option value="Cook Islands"> Cook Islands </option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Côte d'Ivoire"> Côte d'Ivoire </option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Curaçao">Curaçao</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic"> Czech Republic </option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic"> Dominican Republic</option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">El Salvador</option>
                                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                  <option value="Faroe Islands">Faroe Islands</option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">French Guiana</option>
                                  <option value="French Polynesia">French Polynesia</option>
                                  <option value="French Southern Territories">French Southern Territories</option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guernsey">Guernsey</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Heard Island and McDonald Mcdonald Islands"> Heard Island and McDonald Mcdonald Islands</option>
                                  <option value="Holy See (Vatican City State)"> Holy See (Vatican City State) </option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="India">India</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="Iran, Islamic Republic of"> Iran, Islamic Republic of </option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Isle of Man">Isle of Man</option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jersey">Jersey</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Korea, Democratic People's Republic of"> Korea, Democratic People's Republic of</option>
                                  <option value="Korea, Republic of"> Korea, Republic of </option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libya">Libya</option>
                                  <option value="Liechtenstein"> Liechtenstein</option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macao">Macao</option>
                                  <option value="Macedonia, the Former Yugoslav Republic of"> Macedonia, the Former Yugoslav Republic of </option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands"> Marshall Islands</option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                  <option value="Moldova, Republic of"> Moldova, Republic of</option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montenegro">Montenegro</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Namibia">Namibia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherlands">Netherlands</option>
                                  <option value="New Caledonia">New Caledonia</option>
                                  <option value="New Zealand">New Zealand</option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">Norfolk Island</option>
                                  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau">Palau</option>
                                  <option value="Palestine, State of"> Palestine, State of</option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea"> Papua New Guinea </option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Philippines">Philippines</option>
                                  <option value="Pitcairn">Pitcairn</option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">Puerto Rico</option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Réunion">Réunion</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russian Federation">Russian Federation </option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="Saint Barthélemy"> Saint Barthélemy </option>
                                  <option value="Saint Helena, Ascension and Tristan da Cunha"> Saint Helena, Ascension and Tristan da Cunha</option>
                                  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                  <option value="Saint Lucia">Saint Lucia</option>
                                  <option value="Saint Martin (French part)">Saint Martin (French part) </option>
                                  <option value="Saint Pierre and Miquelon"> Saint Pierre and Miquelon</option>
                                  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines </option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                  <option value="Saudi Arabia"> Saudi Arabia</option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Serbia">Serbia</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra Leone"> Sierra Leone</option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Sint Maarten (Dutch part)"> Sint Maarten (Dutch part) </option>
                                  <option value="Slovakia">Slovakia</option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">Solomon Islands </option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Africa"> South Africa</option>
                                  <option value="South Georgia and the South Sandwich Islands"> South Georgia and the South Sandwich Islands</option>
                                  <option value="South Sudan">South Sudan</option>
                                  <option value="Spain">Spain</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Svalbard and Jan Mayen"> Svalbard and Jan Mayen</option>
                                  <option value="Swaziland">Swaziland</option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">Switzerland</option>
                                  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                  <option value="Taiwan">Taiwan</option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania, United Republic of"> Tanzania, United Republic of </option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Timor-Leste">Timor-Leste</option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">Turkmenistan</option>
                                  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Emirates">United Arab Emirates</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="United States"> United States</option>
                                  <option value="United States Minor Outlying Islands"> United States Minor Outlying Islands </option>
                                  <option value="Uruguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Venezuela, Bolivarian Republic of"> Venezuela, Bolivarian Republic of</option>
                                  <option value="Viet Nam">Viet Nam</option>
                                  <option value="Virgin Islands, British"> Virgin Islands, British</option>
                                  <option value="Virgin Islands, U.S."> Virgin Islands, U.S.</option>
                                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                                  <option value="Western Sahara"> Western Sahara </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="image">Photo(png,jpeg,jpg)</label>
                                <div className="input-group">
                                  <div className="custom-file">
                                    <input type="file" accept='image/*' className="custom-file-input" id="image" name="profilePhotoUrl"
                                    onChange={(e)=>{    
                                      // const reader = new FileReader()
                                      // reader.readAsDataURL(e.target.files[0])
                                      // reader.onload = ()=>{
                                        setFormData(prev => ({
                                            ...prev,
                                            profilePhotoUrl : e.target.files[0]
                                        }))
                                      // }  
                                      setPhotoName(e.target.files[0].name)
                                      }} />
                                    <label className="custom-file-label" htmlFor="image" >
                                      {photoName?photoName:"Choose file"}
                                    </label>
                                  </div>
                                </div>       
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="image">{letterName?letterName:"Letter(pdf)"}</label>
                                <div className="input-group">
                                  <div className="custom-file">
                                    <input accept="file_extension" type="file" className="custom-file-input" id="file" name="auth_letter"
                                      onChange={(e)=>{   
                                        console.log(e.target.files[0]);
                                        
                                        // const reader = new FileReader()
                                        // reader.readAsDataURL(e.target.files[0])   
                                        // reader.onload = () => {              
                                          setFormData(prev => ({
                                              ...prev,
                                              letterUrl : e.target.files[0]
                                          }))
                                        // }
                                        setLetterName(e.target.files[0].name)
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <button type="submit" className="btn btn-info btn-flat submitt"> Submit </button>
                              </div>
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
        <div className="scrolltop no-print">
          <div className="scroll icon">
            <i className="fas fa-angle-up" />
          </div>
        </div>
        <section className="invoice print_section" id="receipt_section"></section>
      </div>
      <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Today's profit
              </h4>
            </div>
            <div className="modal-body">
              <input type="hidden" id="modal_today" defaultValue="2024-06-06" />
              <div className="row">
                <div id="todays_profit"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
    <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"/>
  </>
  <ToastContainer  position="top-right" autoClose={3000} />
  </div>
  )
}
export default AddManufacturer