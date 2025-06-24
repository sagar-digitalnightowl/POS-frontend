import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brochureName, setBrochureName] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([])

  const manufacturersData = [];
  const suppliersData = [];
  const brandData = [];
  const categoryData = [];
  const [formData, setFormData] = useState({
    productName: "",
    SKU: "",
    barcodeType: "",
    unit: "",
    brand: "",
    category: "",
    subCategory: "",
    businessLocations: "",
    isMedical: "No",
    manufacturer: "",
    supplier: "",
    manageStock: false,
    alertQuantity: 0,
    deviceName: "",
    deviceModel: "",
    productDescription: "",
    productImage: "",
    productBrochure: "",
    enableProductDescriptionImeiOrSerialNumber: false,
    notForSelling: false,
    weight: undefined,
    serviceStaffTimerPreparationTime: undefined,
    batchNo: "",
    productModel: "",
    productSerialNo: "",
    productHSCode: "",
    productGMDNCode: "",
    productUseType: "",
    productType: "", // Default to "single"
    productRiskClassification: "",
    shelfLife: "",
    productMarketEntryDate: null,
    applicableTax: "",
    sellingPriceTaxType: "", // Default to "inclusive"
    defaultPurchasePrice: {
      excTax: 0,
      incTax: 0
    },
    margin: 0,
    defaultSellingPrice: {
      excTax: 0
    }
  });

  const navigate = useNavigate()


  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/customerAndSuppliers/getCustomersAndSuppliers?contactType=supplier`, {
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
        console.log("Suppliers:", result.result);
        setSuppliers(result.result)
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchManufacturers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/contacts/manufacturer/getManufacturers`, {
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
        console.log("Manufacturer", result.result);
        setManufacturers(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/category/getCategories`, {
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
        setCategories(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBrand = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/brand/getBrands`, {
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
        setBrands(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUints = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/unit/getUnits`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authentication headers, like Bearer token, if required
          // 'Authorization': `Bearer ${yourToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Units');
      }

      const result = await response.json();
      // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
      if (result) {
        setUnits(result.result);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const addProductData = async (formDataToSend) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/product/productList/addProduct`, {
        method: 'POST',
        headers: {},
        body: formDataToSend
      });

      // 5. Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response:', errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Product added successfully");
      navigate('/listproduct')

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
    fetchUints();
    fetchSuppliers();
    fetchManufacturers();
    fetchBrand();
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('productName', formData.productName);
    formDataToSend.append('SKU', formData.SKU);
    formDataToSend.append('barcodeType', formData.barcodeType);
    formDataToSend.append('unit', formData.unit);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('subCategory', formData.subCategory);
    formDataToSend.append('businessLocations', formData.businessLocations);
    formDataToSend.append('isMedical', formData.isMedical);
    formDataToSend.append('manufacturer', formData.manufacturer);
    formDataToSend.append('supplier', formData.supplier);
    formDataToSend.append('manageStock', formData.manageStock);
    formDataToSend.append('alertQuantity', formData.alertQuantity);
    formDataToSend.append('deviceModel', formData.deviceModel);
    formDataToSend.append('deviceName', formData.deviceName);
    formDataToSend.append('productDescription', formData.productDescription);
    formDataToSend.append('enableProductDescriptionImeiOrSerialNumber', formData.enableProductDescriptionImeiOrSerialNumber);
    formDataToSend.append('notForSelling', formData.notForSelling);
    formDataToSend.append('weight', formData.weight);
    formDataToSend.append('serviceStaffTimerPreparationTime', formData.serviceStaffTimerPreparationTime);
    formDataToSend.append('batchNo', formData.batchNo);
    formDataToSend.append('productModel', formData.productModel);
    formDataToSend.append('productSerialNo', formData.productSerialNo);
    formDataToSend.append('productHSCode', formData.productHSCode);
    formDataToSend.append('productGMDNCode', formData.productGMDNCode);
    formDataToSend.append('productUseType', formData.productUseType);
    formDataToSend.append('productType', formData.productType);
    formDataToSend.append('productRiskClassification', formData.productRiskClassification);
    formDataToSend.append('shelfLife', formData.shelfLife);
    formDataToSend.append('productMarketEntryDate', formData.productMarketEntryDate);
    formDataToSend.append('applicableTax', formData.applicableTax);
    formDataToSend.append('sellingPriceTaxType', formData.sellingPriceTaxType);

    // For nested objects
    const defaultPurchasePrice = {
      excTax: formData.defaultPurchasePrice.excTax,
      incTax: formData.defaultPurchasePrice.incTax
    }
    const defaultSellingPrice = {
      excTax: formData.defaultSellingPrice.excTax,
    }
    formDataToSend.append('defaultPurchasePrice', JSON.stringify(defaultPurchasePrice));
    formDataToSend.append('margin', formData.margin);
    formDataToSend.append('defaultSellingPrice', JSON.stringify(defaultSellingPrice));
    if (formData.productImage instanceof File) {
      formDataToSend.append('productImage', formData.productImage, formData.productImage.name);
    }
    if (formData.productBrochure instanceof File) {
      formDataToSend.append('productBrochure', formData.productBrochure, formData.productBrochure.name);
    }
    addProductData(formDataToSend);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <>
        <div className="wrapper thetop">
          <Header />
          <Sidebar />
          <div className=" content-wrapper ">
            <section className="content-header">
              <h1>Add new product</h1>
            </section>
            <section className="content">
              <form
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  name="_token"
                  type="hidden"
                  defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                />
                <div className="box box-primary">
                  <div className="box-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="productName">Product Name:*</label>
                          <input
                            className="form-control"
                            required=""
                            placeholder="Product Name"
                            name="productName"
                            type="text"
                            id="productName"
                            value={formData?.productName}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="SKU">SKU:</label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Unique product id or Stock Keeping Unit <br><br>Keep it blank to automatically generate sku.<br><small class='text-muted'>You can modify sku prefix in Business settings.</small>"
                            data-html="true"
                            data-trigger="hover"
                          />{" "}
                          <input
                            className="form-control"
                            placeholder="SKU"
                            name="SKU"
                            type="text"
                            id="SKU"
                            value={formData?.SKU}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>


                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="barcodeType">Barcode Type:*</label>
                          <select
                            className="form-control select2"
                            required=""
                            id="barcodeType"
                            name="barcodeType"
                            value={formData?.barcodeType}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Please Select</option>
                            <option value="C128">Code 128 (C128)</option>
                            <option value="C39">Code 39 (C39)</option>
                            <option value="EAN13">EAN-13</option>
                            <option value="EAN8">EAN-8</option>
                            <option value="UPCA">UPC-A</option>
                            <option value="UPCE">UPC-E</option>
                          </select>
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="unit">Unit:*</label>
                          <div className="input-group">

                            <select
                              className="form-control select2"
                              required=""
                              id="unit"
                              name="unit"
                              value={formData?.unit}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">Please Select</option>
                              {
                                units?.map((unit) => (
                                  <option key={unit?._id} value={unit?._id}>{unit?.name} ({unit?.shortName})</option>
                                ))
                              }
                            </select>

                            <span className="input-group-btn">
                              <button
                                type="button"
                                className="btn btn-default bg-white btn-flat btn-modal"
                                data-href="https://medipro.affinity-me.com/units/create?quick_add=1"
                                title="Add Unit"
                                data-container=".view_modal"
                              >
                                <i className="fa fa-plus-circle text-primary fa-lg" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>


                      {/* not show on display  */}
                      <div className="col-sm-4  hide ">
                        <div className="form-group">
                          <label htmlFor="sub_unit_ids">Related Sub Units:</label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Based on selected Unit it will show sub units for it. Select the sub-unit applicable. Leave blank if all sub-units are applicable for the product."
                            data-html="true"
                            data-trigger="hover"
                          />
                          <select
                            className="form-control select2"
                            multiple=""
                            id="sub_unit_ids"
                            name="sub_unit_ids[]"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>


                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="brand">Brand:</label>
                          <div className="input-group">
                            <select
                              className="form-control select2"
                              id="brand"
                              name="brand"
                              value={formData?.brand}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">Please Select</option>
                              {brands.length ? (brands.map((brand) => (
                                <option value={brand._id} key={brand._id}>
                                  {brand.name}
                                </option>
                              ))
                              ) : (
                                <option value="">
                                  Please Select
                                </option>
                              )}
                            </select>
                            <span className="input-group-btn">
                              <button
                                type="button"
                                className="btn btn-default bg-white btn-flat btn-modal"
                                data-href="https://medipro.affinity-me.com/brands/create?quick_add=1"
                                title="Add brand"
                                data-container=".view_modal"
                              >
                                <i className="fa fa-plus-circle text-primary fa-lg" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>


                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="category">Category:</label>
                          <select
                            className="form-control select2"
                            id="category"
                            name="category"
                            value={formData?.category}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Please Select</option>
                            {categories.length ? (categories.map((category) => (
                              <option value={category._id} key={category._id}>
                                {category.name + " - " + category.categoryCode}
                              </option>
                            ))
                            ) : (
                              <option value="">Please Select</option>
                            )}
                          </select>
                        </div>
                      </div>


                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="subCategory">Sub category:</label>
                          {/* <select
                            className="form-control select2"
                            id="subCategory"
                            name="subCategory"
                            // onChange={(e) => handleChange(e)}
                          >
                            <option selected="selected" value="">
                              Please Select
                            </option>
                            <option value="tv">
                              tv
                            </option>
                          </select> */}
                          <input
                            className="form-control"
                            required=""
                            type="text"
                            placeholder="Enter Sub Category"
                            id="subCategory"
                            name="subCategory"
                            value={formData?.subCategory}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>


                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="businessLocations">
                            Business Locations:
                          </label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print"
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Locations where product will be available."
                            data-html="true"
                            data-trigger="hover"
                          />{" "}
                          <select
                            className="form-control select2"
                            multiple=""
                            id="businessLocations"
                            name="businessLocations"
                            value={formData?.businessLocations}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Please Select</option>
                            <option value={"MIDDLE PEARL TRADING COMPANY W.L.L"}>MIDDLE PEARL TRADING COMPANY W.L.L (BL0001)</option>
                          </select>
                        </div>
                      </div>


                      <div className="clearfix" />
                      <div className="col-md-4 ">
                        <div className="row">

                          <div className="col-md-4">
                            <label>Is Medical</label>
                            <select
                              className="form-control select2 is_medical"
                              name="isMedical"
                              defaultValue="Yes"
                              value={formData.isMedical}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>

                          <div className="col-md-8">
                            <div className="form-group">
                              <label htmlFor="manufacturer">Manufacturer:</label>{" "}
                              <i
                                className="fa fa-info-circle text-info hover-q no-print "
                                aria-hidden="true"
                                data-container="body"
                                data-toggle="popover"
                                data-placement="auto bottom"
                                data-content="A manufacturer is a person or company that produces finished goods from raw materials by using various tools, equipment, and processes, and then sells the goods to consumers, wholesalers, distributors, retailers, or to other manufacturers for the production of more complex goods."
                                data-html="true"
                                data-trigger="hover"
                              />{" "}
                              <div className="input-group">
                                <select
                                  className="form-control select2"
                                  required=""
                                  id="manufacturer"
                                  name="manufacturer"
                                  value={formData?.manufacturer}
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option value="">Please Select</option>
                                  {manufacturers.length ? (manufacturers.map((manufacturer) => (
                                    <option value={manufacturer._id} key={manufacturer._id}>
                                      {manufacturer.name}
                                    </option>
                                  ))
                                  ) : (
                                    <option selected="selected" value="">
                                      Please Select
                                    </option>
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="supplier">Supplier:</label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="A supplier is a person or business that provides a product or service to another entity. The role of a supplier in a business is to provide high-quality products from a manufacturer at a good price to a distributor or retailer for resale."
                            data-html="true"
                            data-trigger="hover"
                          />
                          <select
                            className="form-control select2"
                            id="supplier"
                            name="supplier"
                            value={formData?.supplier}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Please Select</option>
                            {suppliers.length ? (suppliers.map((supplier) => (
                              <option value={supplier._id} key={supplier._id}>
                                {supplier.firstName + " " + supplier.middleName + " " + supplier.lastName}
                              </option>
                            ))
                            ) : (
                              <option value="">Please Select</option>
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-4">
                        <div className="form-group">
                          <br />
                          <label>
                            <input
                              className="input-icheck"
                              id="manageStock"
                              defaultChecked="checked"
                              name="manageStock"
                              type="checkbox"
                              defaultValue={1}
                              checked={formData?.manageStock}
                              onChange={(e) => handleChange(e)}
                            />{" "}
                            <strong>Manage Stock?</strong>
                          </label>
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Enable or disable stock management for a product. <br><br><small class='text-muted'>Stock Management should be disable mostly for services. Example: Hair-Cutting, Repairing, etc.</small>"
                            data-html="true"
                            data-trigger="hover"
                          />{" "}
                          <p className="help-block">
                            <i>Enable stock management at product level</i>
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-4 " id="alert_quantity_div">
                        <div className="form-group">
                          <label htmlFor="alertQuantity">Alert quantity:</label>
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Get alert when product stock reaches or goes below the specified quantity.<br><br><small class='text-muted'>Products with low stock will be displayed in dashboard - Product Stock Alert section.</small>"
                            data-html="true"
                            data-trigger="hover"
                          />
                          <input
                            className="form-control input_number"
                            placeholder="Alert quantity"
                            min={0}
                            name="alertQuantity"
                            type="number"
                            id="alertQuantity"
                            value={formData?.alertQuantity}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      {/* not show on display  */}
                      <input name="has_module_data" type="hidden" defaultValue={1} />

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="deviceModel">Device Model:</label>
                          <input
                            type='text'
                            className="form-control input_number"
                            placeholder='Device model'
                            name="deviceModel"
                            id="deviceModel"
                            value={formData?.deviceModel}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </div>
                      </div>{" "}

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="deviceName">Device Name:</label>
                          <input
                            type='text'
                            className="form-control input_number"
                            placeholder='Device Name'
                            name="deviceName"
                            id="deviceName"
                            value={formData?.deviceName}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </div>
                      </div>{" "}

                      <div className="clearfix" />
                      <div className="col-sm-10">
                        <div className="form-group">
                          <label htmlFor="productDescription">
                            Product Description:
                          </label>
                          <textarea
                            className="form-control"
                            name="productDescription"
                            cols={50}
                            rows={10}
                            id="productDescription"
                            defaultValue={""}
                            value={formData?.productDescription}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor="productImage">{photoName ? photoName : "Product image:"}Product image:</label>
                            <input
                              id="productImage"
                              accept="image/*"
                              className="upload-element"
                              name="productImage"
                              type="file"
                              onChange={(e) => {
                                console.log(e.target.files[0]);
                                setFormData(prev => ({
                                  ...prev,
                                  productImage: e.target.files[0]
                                }))
                                setPhotoName(e.target.files[0].name)
                              }}
                            />
                            <small>
                              <p className="help-block">
                                Max File size: 5MB <br /> Aspect ratio should be 1:1
                              </p>
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="productBrochure">{brochureName ? brochureName : "Product brochure:"}Product brochure:</label>
                          <input
                            type="file"
                            id="productBrochure"
                            accept="file_encoding"
                            name="productBrochure"
                            onChange={(e) => {
                              console.log(e.target.files[0]);
                              setFormData(prev => ({
                                ...prev,
                                productBrochure: e.target.files[0]
                              }))
                              setBrochureName(e.target.files[0].name)
                            }}
                          />
                          <small>
                            <p className="help-block">
                              Max File size: 5MB <br />
                              Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg,
                              .png
                            </p>
                          </small>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="box box-primary">
                  <div className="box-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <br />

                          <label>
                            <input
                              className="input-icheck"
                              name="enableProductDescriptionImeiOrSerialNumber"
                              type="checkbox"
                              defaultValue={1}
                              checked={formData?.enableProductDescriptionImeiOrSerialNumber}
                              onChange={(e) => handleChange(e)}
                            />
                            <strong>
                              Enable Product description, IMEI or Serial Number
                            </strong>
                          </label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="Enable or disable adding product description, IMEI or Serial number while selling products in POS screen"
                            data-html="true"
                            data-trigger="hover"
                          />{" "}
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="form-group">
                          <br />
                          <label>
                            <input
                              className="input-icheck"
                              name="notForSelling"
                              type="checkbox"
                              defaultValue={1}
                              checked={formData?.notForSelling}
                              onChange={(e) => handleChange(e)}
                            />
                            <strong>Not for selling</strong>
                          </label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="If checked, product will not be displayed in sales screen for selling purposes."
                            data-html="true"
                            data-trigger="hover"
                          />
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="weight">Weight:</label>
                          <input
                            className="form-control"
                            placeholder="Weight"
                            name="weight"
                            type="number"
                            id="weight"
                            value={formData?.weight}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="serviceStaffTimerPreparationTime">
                            Service staff timer/Preparation time (In minutes):
                          </label>
                          <input
                            className="form-control"
                            placeholder="Service staff timer/Preparation time (In minutes)"
                            name="serviceStaffTimerPreparationTime"
                            type="number"
                            id="serviceStaffTimerPreparationTime"
                            value={formData?.serviceStaffTimerPreparationTime}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="batchNo">Batch No</label>
                          <input
                            className="form-control"
                            placeholder="Batch No"
                            name="batchNo"
                            type="text"
                            id="batchNo"
                            value={formData?.batchNo}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productModel">Product Model:</label>
                          <input
                            className="form-control"
                            placeholder="Product Model"
                            name="productModel"
                            type="text"
                            id="productModel"
                            value={formData?.productModel}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productSerialNo">Product Serial No.:</label>
                          <input
                            className="form-control"
                            placeholder="Product Serial No."
                            name="productSerialNo"
                            type="text"
                            id="productSerialNo"
                            value={formData?.productSerialNo}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productHSCode">Product HS Code:</label>
                          <input
                            className="form-control"
                            placeholder="Product HS Code"
                            name="productHSCode"
                            type="text"
                            id="productHSCode"
                            value={formData?.productHSCode}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productGMDNCode">Product GMDN Code:</label>
                          <input
                            className="form-control"
                            placeholder="Product GMDN Code"
                            name="productGMDNCode"
                            type="number"
                            id="productGMDNCode"
                            value={formData?.productGMDNCode}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productUseType">Product Use Type:</label>
                          <select
                            className="form-control select2"
                            id="productUseType"
                            name="productUseType"
                            value={formData?.productUseType}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value=""> Select Use Type </option>
                            <option value="Single">Single</option>
                            <option value="Multiple">Multiple</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productType">Product Type:</label>
                          <select
                            className="form-control select2 device_type"
                            id="productType"
                            name="productType"
                            value={formData?.productType}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Select Product Type</option>
                            <option value="single">Single</option>
                            <option value="multiple">Multiple</option>
                            <option value="combo">Combo</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productRiskClassification">
                            Product Risk Classification:
                          </label>
                          <select
                            className="form-control select2 device_class"
                            id="productRiskClassification"
                            name="productRiskClassification"
                            value={formData?.productRiskClassification}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">
                              Select Risk classification
                            </option>
                            <option value="I (Low Risk Medical Device)">
                              I (Low Risk Medical Device)
                            </option>
                            <option value="IIa (Low to Medium Risk Device)">
                              IIa (Low to Medium Risk Device)
                            </option>
                            <option value="IIb (Medium to High Risk Device)">
                              IIb (Medium to High Risk Device)
                            </option>
                            <option value="III (High Risk Device)">
                              III (High Risk Device)
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="shelfLife">Shelf Life</label>
                          <input
                            className="form-control"
                            placeholder="Shelf Life (In Years/Months)"
                            name="shelfLife"
                            type="text"
                            id="shelfLife"
                            value={formData?.shelfLife}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="productMarketEntryDate">
                            Product Market Entry Date:
                          </label>
                          <input
                            className="form-control"
                            placeholder="dd-mm-yyyy or N/A"
                            name="productMarketEntryDate"
                            type="text"
                            id="productMarketEntryDate"
                            value={formData?.productMarketEntryDate}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>

                      <div className="clearfix" />

                    </div>
                  </div>
                </div>
                <div className="box box-primary">
                  <div className="box-body">
                    <div className="row">
                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="applicableTax">Applicable Tax:</label>
                          <select
                            className="form-control select2"
                            id="applicableTax"
                            name="applicableTax"
                            value={formData?.applicableTax}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">
                              Please Select
                            </option>
                            <option value="None">
                              None
                            </option>
                            <option value="abc">
                              abc
                            </option>

                          </select>
                        </div>
                      </div>

                      <div className="col-sm-4 ">
                        <div className="form-group">
                          <label htmlFor="sellingPriceTaxType">Selling Price Tax Type:*</label>
                          <select
                            className="form-control select2"
                            required=""
                            id="sellingPriceTaxType"
                            name="sellingPriceTaxType"
                            value={formData?.sellingPriceTaxType}
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected="selected" value="">
                              Please Select
                            </option>
                            <option value="inclusive">Inclusive</option>
                            <option value="exclusive" >
                              Exclusive
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="clearfix" />

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="productType">Product Type:*</label>{" "}
                          <i
                            className="fa fa-info-circle text-info hover-q no-print "
                            aria-hidden="true"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="auto bottom"
                            data-content="<b>Single product</b>: Product with no variations.
  <br><b>Variable product</b>: Product with variations such as size, color etc.
  <br><b>Combo product</b>: A combination of multiple products, also called bundle product"
                            data-html="true"
                            data-trigger="hover"
                          />{" "}
                          <select
                            className="form-control select2"
                            required=""
                            data-action="add"
                            data-product_id={0}
                            id="productType"
                            name="productType"
                            value={formData?.productType}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Please Select</option>
                            <option value="single">Single</option>
                            <option value="multiple">Multiple</option>
                            <option value="combo">Combo</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group col-sm-12" id="product_form_part">
                        <div className="table-responsive">
                          <table className="table table-bordered add-product-price-table table-condensed ">
                            <tbody>
                              <tr>
                                <th>Default Purchase Price</th>
                                <th>
                                  x Margin(%){" "}
                                  <i
                                    className="fa fa-info-circle text-info hover-q no-print "
                                    aria-hidden="true"
                                    data-container="body"
                                    data-toggle="popover"
                                    data-placement="auto bottom"
                                    data-content="Default profit margin for the product. <br><small class='text-muted'>(<i>You can manage default profit margin in Business Settings.</i>)</small>"
                                    data-html="true"
                                    data-trigger="hover"
                                  />
                                </th>
                                <th>Default Selling Price</th>
                              </tr>
                              <tr>
                                <td>
                                  <div className="col-sm-6">
                                    <label htmlFor="defaultPurchasePrice.excTax">Exc. tax:*</label>
                                    <input
                                      className="form-control input-sm dpp input_number"
                                      placeholder="Exc. tax"
                                      required=""
                                      name="defaultPurchasePrice.excTax"
                                      type="number"
                                      id="defaultPurchasePrice.excTax"
                                      value={formData?.defaultPurchasePrice.excTax}
                                      onChange={(e) => setFormData(prev => ({ ...prev, defaultPurchasePrice: { ...prev.defaultPurchasePrice, excTax: e.target.value } }))}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label htmlFor="defaultPurchasePrice.incTax">
                                      Inc. tax:*
                                    </label>
                                    <input
                                      className="form-control input-sm dpp_inc_tax input_number"
                                      placeholder="Inc. tax"
                                      required=""
                                      name="defaultPurchasePrice.incTax"
                                      type="number"
                                      id="defaultPurchasePrice.incTax"
                                      value={formData?.defaultPurchasePrice.incTax}
                                      onChange={(e) => setFormData(prev => ({ ...prev, defaultPurchasePrice: { ...prev.defaultPurchasePrice, incTax: e.target.value } }))}
                                    />
                                  </div>
                                </td>
                                <td>
                                  {/* <br /> */}
                                  <label htmlFor="margin">
                                    Margin:*
                                  </label>
                                  <input
                                    className="form-control input-sm input_number"
                                    id="margin"
                                    required=""
                                    name="margin"
                                    type="number"
                                    value={formData?.margin}
                                    onChange={(e) => handleChange(e)}
                                  />
                                </td>
                                <td>
                                  <label>
                                    <span className="dsp_label">Exc. tax</span>
                                  </label>
                                  <input
                                    className="form-control input-sm dsp input_number"
                                    placeholder="Exc. tax"
                                    id="defaultSellingPrice.excTax"
                                    required=""
                                    name="defaultSellingPrice.excTax"
                                    type="number"
                                    value={formData?.defaultSellingPrice.excTax}
                                    onChange={(e) => setFormData(prev => ({ ...prev, defaultSellingPrice: { ...prev.defaultSellingPrice, excTax: e.target.value } }))}
                                  />

                                  {/* not show on display  */}
                                  <input
                                    className="form-control input-sm hide input_number"
                                    placeholder="Inc. tax"
                                    id="single_dsp_inc_tax"
                                    required=""
                                    name="single_dsp_inc_tax"
                                    type="number"
                                    onChange={(e) => handleChange(e)}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>{" "}
                      </div>
                      <input type="hidden" id="variation_counter" defaultValue={1} />
                      <input
                        type="hidden"
                        id="default_profit_percent"
                        defaultValue={25}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <input type="hidden" name="submit_type" id="submit_type" />
                    <div className="text-center">
                      <div className="btn-group">
                        {/* <button
            id="opening_stock_button"
            type="submit"
            value="submit_n_add_opening_stock"
            className="btn bg-purple btn-big submit_product_form"
          >
            Save &amp; Add Opening Stock
          </button>
          <button
            type="submit"
            value="save_n_add_another"
            className="btn bg-maroon btn-big submit_product_form"
          >
            Save And Add Another
          </button> */}
                        <button
                          type="submit"
                          value="submit"
                          className="btn btn-primary btn-big submit_product_form"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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

export default AddProduct