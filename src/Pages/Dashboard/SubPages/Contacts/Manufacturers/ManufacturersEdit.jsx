import React, { useEffect, useState } from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer'
import { useParams } from 'react-router-dom'
import { Form, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ManufacturersEdit = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState();
  const [letterName, setLetterName] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    telephone: undefined,
    fax: "",
    phoneNumber: undefined,
    email: "",
    website: "",
    city: "",
    country: "",
    profilePhotoUrl: "",
    letterUrl: ""
  })

  const fetchManufacturer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/getManufacturer/${id}`, {
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
        console.log(result.result);

        setData(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const updateManufacturer = async () => {
    try {
      setLoading(true);
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
      if (formData.profilePhotoUrl instanceof File) {
        formDataToSend.append('profilePhoto', formData.profilePhotoUrl, formData.profilePhotoUrl.name);
      }
      if (formData.letterUrl instanceof File) {
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


      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/updateManufacturer/${userId}`, {
        method: 'PATCH',
        headers: {
          // 'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        toast.error(response.json())
        throw new Error('Failed to update manufacturer');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        toast.success("Manufacturer updated succesfully")
        handleUpdate();

      } else {
        toast.error("Unable to update manufacturer. Please try again later")
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchManufacturer(userId);
    }
  }, [userId])

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        name: data.name,
        address: data.address,
        telephone: data.telephone,
        fax: data.fax,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        city: data.city,
        country: data.country,
        profilePhotoUrl: data.profilePhotoUrl,
        letterUrl: data.letterUrl
      }))
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateManufacturer();
  }

  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate("/manufacturers");
  }

  return (
    <div>
      <>
        <div className="wrapper thetop">
          <Header />
          <Sidebar />
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
            <section className="content">
              <div className="box box-primary">
                <div className="box-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card card-secondary">
                          <div className="card-header">
                            <h3 className="card-title">Edit Manufacturer</h3>
                            <a className="btn btn-info" href="https://medipro.affinity-me.com/manufacturers">Go Back</a>
                          </div>
                          <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                              <input
                                type="hidden"
                                name="_token"
                                defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                              />{" "}
                              <input type="hidden" defaultValue={1} name="man_id" />
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="col-lg">
                                    <label>Name</label>
                                    <span className="form-text text-danger" />
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
                                    <input
                                      className="form-control mb-4  validd"
                                      name="name"
                                      type="text"
                                      defaultValue={formData.name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0">
                                    <label>Address</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      className="form-control mb-4"
                                      name="address"
                                      type="text"
                                      defaultValue={formData.address}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0">
                                    <label>Telephone</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      className="form-control mb-4"
                                      name="telephone"
                                      type="text"
                                      defaultValue={formData.telephone}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg">
                                    <label>Fax</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      id="fax"
                                      name="fax"
                                      className="form-control mb-4 fax"
                                      type="text"
                                      defaultValue={formData.fax}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0">
                                    <label>Phone Number</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      name="phoneNumber"
                                      className="form-control mb-4"
                                      type="text"
                                      defaultValue={formData.phoneNumber}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0">
                                    <label>Email Address</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      name="email"
                                      className="form-control mb-4  validd"
                                      type="text"
                                      defaultValue={formData.email}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg">
                                    <label>Website</label>
                                    <input
                                      name="website"
                                      className="form-control mb-4"
                                      type="text"
                                      defaultValue={formData.website}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0">
                                    <label>Country</label>
                                    <select className="form-control validd" name="country" value={formData.country} onChange={handleChange}>
                                      <option selected={formData.country} value="">--select--</option>
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
                                      <option value="Central African Republic"> Central African Republic </option>
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
                                      <option value="Czech Republic">Czech Republic</option>
                                      <option value="Denmark">Denmark</option>
                                      <option value="Djibouti">Djibouti</option>
                                      <option value="Dominica">Dominica</option>
                                      <option value="Dominican Republic"> Dominican Republic </option>
                                      <option value="Ecuador">Ecuador</option>
                                      <option value="Egypt">Egypt</option>
                                      <option value="El Salvador">El Salvador</option>
                                      <option value="Equatorial Guinea"> Equatorial Guinea </option>
                                      <option value="Eritrea">Eritrea</option>
                                      <option value="Estonia">Estonia</option>
                                      <option value="Ethiopia">Ethiopia</option>
                                      <option value="Falkland Islands (Malvinas)"> Falkland Islands (Malvinas)</option>
                                      <option value="Faroe Islands"> Faroe Islands</option>
                                      <option value="Fiji">Fiji</option>
                                      <option value="Finland">Finland</option>
                                      <option value="France">France</option>
                                      <option value="French Guiana"> French Guiana </option>
                                      <option value="French Polynesia"> French Polynesia</option>
                                      <option value="French Southern Territories"> French Southern Territories </option>
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
                                      <option value="Guinea-Bissau"> Guinea-Bissau</option>
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
                                      <option value="Korea, Republic of"> Korea, Republic of</option>
                                      <option value="Kuwait">Kuwait</option>
                                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                                      <option value="Lao People's Democratic Republic"> Lao People's Democratic Republic </option>
                                      <option value="Latvia">Latvia</option>
                                      <option value="Lebanon">Lebanon</option>
                                      <option value="Lesotho">Lesotho</option>
                                      <option value="Liberia">Liberia</option>
                                      <option value="Libya">Libya</option>
                                      <option value="Liechtenstein"> Liechtenstein</option>
                                      <option value="Lithuania">Lithuania</option>
                                      <option value="Luxembourg">Luxembourg</option>
                                      <option value="Macao">Macao</option>
                                      <option value="Macedonia, the Former Yugoslav Republic of"> Macedonia, the Former Yugoslav Republic of</option>
                                      <option value="Madagascar" selected=""> Madagascar</option>
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
                                      <option value="Micronesia, Federated States of"> Micronesia, Federated States of </option>
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
                                      <option value="New Caledonia"> New Caledonia</option>
                                      <option value="New Zealand">New Zealand</option>
                                      <option value="Nicaragua">Nicaragua</option>
                                      <option value="Niger">Niger</option>
                                      <option value="Nigeria">Nigeria</option>
                                      <option value="Niue">Niue</option>
                                      <option value="Norfolk Island"> Norfolk Island </option>
                                      <option value="Northern Mariana Islands"> Northern Mariana Islands </option>
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
                                      <option value="Russian Federation"> Russian Federation </option>
                                      <option value="Rwanda">Rwanda</option>
                                      <option value="Saint Barthélemy"> Saint Barthélemy </option>
                                      <option value="Saint Helena, Ascension and Tristan da Cunha"> Saint Helena, Ascension and Tristan da Cunha</option>
                                      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                      <option value="Saint Lucia">Saint Lucia</option>
                                      <option value="Saint Martin (French part)">Saint Martin (French part)</option>
                                      <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                      <option value="Saint Vincent and the Grenadines"> Saint Vincent and the Grenadines</option>
                                      <option value="Samoa">Samoa</option>
                                      <option value="San Marino">San Marino</option>
                                      <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                      <option value="Saudi Arabia">Saudi Arabia</option>
                                      <option value="Senegal">Senegal</option>
                                      <option value="Serbia">Serbia</option>
                                      <option value="Seychelles">Seychelles</option>
                                      <option value="Sierra Leone">Sierra Leone</option>
                                      <option value="Singapore">Singapore</option>
                                      <option value="Sint Maarten (Dutch part)"> Sint Maarten (Dutch part)</option>
                                      <option value="Slovakia">Slovakia</option>
                                      <option value="Slovenia">Slovenia</option>
                                      <option value="Solomon Islands">Solomon Islands </option>
                                      <option value="Somalia">Somalia</option>
                                      <option value="South Africa"> South Africa </option>
                                      <option value="South Georgia and the South Sandwich Islands"> South Georgia and the South Sandwich Islands </option>
                                      <option value="South Sudan">South Sudan</option>
                                      <option value="Spain">Spain</option>
                                      <option value="Sri Lanka">Sri Lanka</option>
                                      <option value="Sudan">Sudan</option>
                                      <option value="Suriname">Suriname</option>
                                      <option value="Svalbard and Jan Mayen"> Svalbard and Jan Mayen </option>
                                      <option value="Swaziland">Swaziland</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Switzerland">Switzerland</option>
                                      <option value="Syrian Arab Republic"> Syrian Arab Republic </option>
                                      <option value="Taiwan">Taiwan</option>
                                      <option value="Tajikistan">Tajikistan</option>
                                      <option value="Tanzania, United Republic of"> Tanzania, United Republic of </option>
                                      <option value="Thailand">Thailand</option>
                                      <option value="Timor-Leste">Timor-Leste</option>
                                      <option value="Togo">Togo</option>
                                      <option value="Tokelau">Tokelau</option>
                                      <option value="Tonga">Tonga</option>
                                      <option value="Trinidad and Tobago"> Trinidad and Tobago</option>
                                      <option value="Tunisia">Tunisia</option>
                                      <option value="Turkey">Turkey</option>
                                      <option value="Turkmenistan"> Turkmenistan</option>
                                      <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                      <option value="Tuvalu">Tuvalu</option>
                                      <option value="Uganda">Uganda</option>
                                      <option value="Ukraine">Ukraine</option>
                                      <option value="United Arab Emirates">United Arab Emirates</option>
                                      <option value="United Kingdom">United Kingdom</option>
                                      <option value="United States">United States</option>
                                      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                      <option value="Uruguay">Uruguay</option>
                                      <option value="Uzbekistan">Uzbekistan</option>
                                      <option value="Vanuatu">Vanuatu</option>
                                      <option value="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
                                      <option value="Viet Nam">Viet Nam</option>
                                      <option value="Virgin Islands, British">Virgin Islands, British</option>
                                      <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                      <option value="Wallis and Futuna">Wallis and Futuna</option>
                                      <option value="Western Sahara"> Western Sahara</option>
                                      <option value="Yemen">Yemen</option>
                                      <option value="Zambia">Zambia</option>
                                      <option value="Zimbabwe">Zimbabwe</option>
                                    </select>
                                  </div>
                                  <div className="col-lg mg-t-10 mg-lg-t-0 ">
                                    <label>City</label>
                                    <span className="form-text text-danger" />
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="city"
                                      defaultValue={formData.city}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <br />
                                  <div className="col-lg mg-t-10 mg-lg-t-0 ">
                                    <input type="submit" defaultValue="Update" className="btn btn-info btn-flat submitt" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="input-group">
                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            accept='image/*'
                                            className="custom-file-input"
                                            id="image"
                                            name="profilePhotoUrl"
                                            onChange={(e) => {
                                              console.log(e.target.files[0]);
                                              setFormData(prev => ({
                                                ...prev,
                                                profilePhotoUrl: e.target.files[0]
                                              }))
                                              setPhotoName(e.target.files[0].name)
                                            }}
                                          />
                                          <label className="custom-file-label" htmlFor="image"> {photoName ? photoName : "Change"}</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <img style={{ width: 500 }} className="card-img-top" src="no-image.png" alt="Card image cap" />
                                    </div>
                                  </div>
                                  <br />
                                </div>
                                <div className="col-md-12">
                                  <br />
                                  <label htmlFor="image">
                                    {letterName ? letterName : "Authorized Certificate (PDF)"}
                                  </label>
                                  <input
                                    type="file"
                                    accept="file_extension"
                                    id="file"
                                    name="auth_letter"
                                    onChange={(e) => {
                                      console.log(e.target.files[0]);
                                      setFormData(prev => ({
                                        ...prev,
                                        letterUrl: e.target.files[0]
                                      }))
                                      setLetterName(e.target.files[0].name)
                                    }}
                                  />
                                  <h3>No Pdf Found</h3>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </section>
            <div className="scrolltop no-print">
              <div className="scroll icon">
                <i className="fas fa-angle-up" />
              </div>
            </div>
            <section className="invoice print_section" id="receipt_section"></section>
          </div>
          <Footer />
        </div>
        <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
        <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
        <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
      </>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default ManufacturersEdit