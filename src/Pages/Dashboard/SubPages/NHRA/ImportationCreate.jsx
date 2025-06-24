import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';
import { useNavigate } from 'react-router-dom';

const ImportationCreate = () => {
    const textStyle = { color: 'black' }

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [authorizedRepresentatives, setAuthorizedRepresentatives] = useState([]);
    const [manufactures, setManufactures] = useState([]);
    const [products, setProducts] = useState([])

    const [formData, setFormData] = useState({
        invoiceNo: '',
        invoiceDate: '',
        deliveryMethod: '',
        paymentMethod: '',
        cRNumber: '',
        ofoqLicenseNumber: '',
        grn: '',
        lpo: '',
        portOfDelivery: '',
        dateOfDelivery: '',
        totalPayment: '',
        totalTax: '',
        invoice: '',
        purchaseOrder: '',
        catalogue: '',
        freeSaleCertificate: '',
        qualityAssuranceCertificate: '',
        authorizedRepresentative: '',
        manufacturer: '',
        products: [
            {
                product: '',
                quantity: 1,
                expiry: '',
                lotNo: '',
            }
        ],
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checked' ? checked : value
        }))
    }

    const handleAddMoreProduct = () => {
        const existProduct = formData.products;
        existProduct.push({
            product: '',
            quantity: 1,
            expiry: '',
            lotNo: '',
        });

        setFormData(prev => ({
            ...prev,
            products: existProduct
        }))
    }

    const handleRemoveProduct = (i) => {
        const existProduct = formData.products;

        console.log(i, 'index')

        if (existProduct.length <= 1) {
            alert('Please add atleast one product');
            return;
        }

        setFormData(prev => ({
            ...prev,
            products: existProduct.filter((_, index) => index !== i)
        }))
    }

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updatedProducts = [...prev.products];

            updatedProducts[index] = {
                ...updatedProducts[index],
                [name]: value
            }

            return {
                ...prev,
                products: updatedProducts
            }
        })
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


    const fetchAllManufactures = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: `/admin/contacts/manufacturer/getManufacturers`,
            })

            if (res.status === 200) {
                setManufactures(res?.data?.result)
            } else {
                setError(res?.data?.message)
            }

        } catch (error) {
            setError(error.message);
            console.log("Error in fetch all manufactures : ", error)
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
        fetchAllManufactures();
        fetchProducts();
    }, []);


    const addImportation = async (data) => {
        try {
            setLoading(true);
            const res = await apiCall({
                method: "post",
                url: "/admin/nhra/importationList/addImportation",
                data: data
            });

            if (res.status == 201) {
                navigate('/Importation/show')
            } else {
                throw new Error("Failed to add importation");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append('invoiceNo', formData.invoiceNo)
        form.append('invoiceDate', formData.invoiceDate)
        form.append('deliveryMethod', formData.deliveryMethod)
        form.append('paymentMethod', formData.paymentMethod)
        form.append('cRNumber', formData.cRNumber)
        form.append('ofoqLicenseNumber', formData.ofoqLicenseNumber)
        form.append('grn', formData.grn)
        form.append('lpo', formData.lpo)
        form.append('portOfDelivery', formData.portOfDelivery)
        form.append('dateOfDelivery', formData.dateOfDelivery)
        form.append('totalPayment', formData.totalPayment)
        form.append('totalTax', formData.totalTax)

        form.append('invoice', formData.invoice)
        form.append('purchaseOrder', formData.purchaseOrder)
        form.append('catalogue', formData.catalogue)
        form.append('freeSaleCertificate', formData.freeSaleCertificate)
        form.append('qualityAssuranceCertificate', formData.qualityAssuranceCertificate)

        form.append('authorizedRepresentative', formData.authorizedRepresentative)
        form.append('manufacturer', formData.manufacturer)
        form.append('products', JSON.stringify(formData.products))

        addImportation(form);
    }


    return (
        <div>
            <div className="wrapper thetop" style={textStyle}>
                <Header />
                <Sidebar />
                <div className=" content-wrapper ">
                    <section className="content-header">
                        <h1>Import</h1>
                    </section>
                    <section className="content">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <form className="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit}>
                                                <div className="card card-secondary">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Add Imports</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="invoicenum"> Invoice No </label>
                                                                <input type="text" name="invoiceNo" id="invoicenum" className="form-control"
                                                                    placeholder="Invoice No" defaultValue="" required
                                                                    value={formData.invoiceNo}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="invoicedate"> Invoice Date </label>
                                                                <input type="date" name="invoiceDate" id="invoicedate" className="form-control"
                                                                    placeholder="Invoice Date" defaultValue="" required
                                                                    value={formData?.invoiceDate}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="short_name">Delivery Method</label>
                                                                <input type="text" name="deliveryMethod" id="delivery_method"
                                                                    className="form-control" placeholder="Delivery Method" defaultValue=""
                                                                    value={formData?.deliveryMethod}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="short_name"> Payment Method </label>
                                                                <input type="text" name="paymentMethod" id="payment_method"
                                                                    className="form-control" placeholder="Payment Method" defaultValue=""
                                                                    value={formData.paymentMethod}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="crnum"> CR Number </label>
                                                                <input type="text" name="cRNumber" id="crnum"
                                                                    className="form-control" placeholder="CR Number" defaultValue=""
                                                                    value={formData.cRNumber}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="ofoqnum"> Ofoq License Number </label>
                                                                <input type="text" name="ofoqLicenseNumber" id="ofoqnum"
                                                                    className="form-control" placeholder="Ofoq License Number" defaultValue=""
                                                                    value={formData.ofoqLicenseNumber}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="grn">GRN</label>
                                                                <input type="text" name="grn" id="grn" className="form-control"
                                                                    placeholder="Goods Receipt Note" defaultValue=""
                                                                    value={formData.grn}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="lpo">LPO</label>
                                                                <input type="text" name="lpo" id="lpo" className="form-control"
                                                                    placeholder="Lpo" defaultValue=""
                                                                    value={formData.lpo}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="port"> Port of Delivery </label>
                                                                <input type="text" name="portOfDelivery" id="port" className="form-control"
                                                                    placeholder="Port of Delivery" defaultValue=""
                                                                    value={formData.portOfDelivery}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="dateofdelivery"> Date of Delivery</label>
                                                                <input type="date" name="dateOfDelivery" id="dateofdelivery"
                                                                    className="form-control" placeholder="Date of Delivery" defaultValue=""
                                                                    value={formData.dateOfDelivery}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="totalpayment"> Total Payment</label>
                                                                <input type="text" name="totalPayment" id="totalpayment" className="form-control"
                                                                    placeholder="Total Payment" defaultValue=""
                                                                    value={formData.totalPayment}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="totaltax"> Total Tax </label>
                                                                <input type="text" name="totalTax" id="totaltax" className="form-control"
                                                                    placeholder="Total Tax" defaultValue=""
                                                                    value={formData.totalTax}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card card-secondary">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Documents</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="importinvoice">Invoice</label>
                                                                <div className="input-group">
                                                                    <div className="custom-file">
                                                                        <input type="file" name="importinvoice" id="importinvoice"
                                                                            className="custom-file-input"
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, invoice: e.target.files[0] }))}
                                                                        />
                                                                        <label className="custom-file-label" htmlFor="importinvoice">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="purchaseorder"> Purchase Order </label>
                                                                <div className="input-group">
                                                                    <div className="custom-file">
                                                                        <input type="file" name="purchaseorder" id="purchaseorder"
                                                                            className="custom-file-input"
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, purchaseOrder: e.target.files[0] }))}
                                                                        />
                                                                        <label className="custom-file-label" htmlFor="purchaseorder">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="catalogue">Catalogue</label>
                                                                <div className="input-group">
                                                                    <div className="custom-file">
                                                                        <input type="file" name="catalogue" id="catalogue"
                                                                            lassName="custom-file-input"
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, catalogue: e.target.files[0] }))}
                                                                        />
                                                                        <label className="custom-file-label" htmlFor="catalogue"> Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="freesale_doc"> Free Sale Certificate </label>
                                                                <div className="input-group">
                                                                    <div className="custom-file">
                                                                        <input type="file" name="freesale_doc" id="freesale_doc"
                                                                            className="custom-file-input"
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, freeSaleCertificate: e.target.files[0] }))}
                                                                        />
                                                                        <label className="custom-file-label" htmlFor="freesale_doc">Choose file </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="qualityassurance"> Quality Assurance Certificate</label>
                                                                <div className="input-group">
                                                                    <div className="custom-file">
                                                                        <input type="file" name="qualityassurance" id="qualityassurance"
                                                                            className="custom-file-input"
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, qualityAssuranceCertificate: e.target.files[0] }))}
                                                                        />
                                                                        <label className="custom-file-label" htmlFor="qualityassurance">Choose file</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card card-secondary">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Authorized Representative Details</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="arname">Authorized Representative Name</label>
                                                                    <select
                                                                        className="form-control"
                                                                        name="authorizedRepresentative"
                                                                        id="arid"
                                                                        required
                                                                        value={formData.authorizedRepresentative}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="" selected="" disabled="">--Select Authorized Representative--</option>
                                                                        {
                                                                            authorizedRepresentatives?.map((ar, index) => (
                                                                                <option key={index} value={ar?._id}>{ar?.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="ar_email">Authorized Representative Email</label>
                                                                    <input id="ar_email" name="ar_email" type="email" className="form-control"
                                                                        placeholder="Authorized Representative Email" readOnly
                                                                        value={authorizedRepresentatives.find(ar => ar?._id === formData?.authorizedRepresentative)?.emailAddress}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="armobile">Mobile Number</label>
                                                                    <input id="armobile" name="armobile" type="text"
                                                                        className="form-control" placeholder="Mobile Number" readOnly
                                                                        value={authorizedRepresentatives.find(ar => ar?._id === formData?.authorizedRepresentative)?.phoneNumber}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card card-secondary">
                                                        <div className="card-header">
                                                            <h3 className="card-title"> Manfacture Details</h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="manufaturername">Manufacturer Name</label>
                                                                        <select
                                                                            className="form-control"
                                                                            name="manufacturer"
                                                                            id="manid"
                                                                            required=""
                                                                            value={formData.manufacturer}
                                                                            onChange={handleChange}
                                                                        >
                                                                            <option value="" disabled> --Select Manufacturer--</option>
                                                                            {
                                                                                manufactures?.map((manufacturer, index) => (
                                                                                    <option key={index} value={manufacturer?._id}>{manufacturer?.name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label htmlFor="manufatureremail"> Manufacturer Email </label>
                                                                        <input id="manufatureremail" name="manufatureremail" type="email"
                                                                            className="form-control" placeholder="Manufacturer Email" readOnly
                                                                            value={manufactures.find(manu => manu?._id === formData.manufacturer)?.email}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="manufaturermobile">Contact Person Number</label>
                                                                        <input id="manufaturermobile" name="manufaturermobile" type="text"
                                                                            className="form-control" placeholder="Contact Person Number" readOnly
                                                                            value={manufactures.find(manu => manu?._id === formData.manufacturer)?.phoneNumber}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="countryoforigin">Manufacturer Country Of Origin </label>
                                                                        <input id="countryoforigin" name="countryoforigin" type="text"
                                                                            className="form-control" placeholder="Manufacturer Country of Origin" readOnly
                                                                            value={manufactures.find(manu => manu?._id === formData.manufacturer)?.country}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-secondary">
                                                            <div className="card-header">
                                                                <h3 className="card-title"> Medical Device Details </h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="table-responsive">
                                                                    <table className="table nowrap text-nowrap border mt-5">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="w-30">Product Name</th>
                                                                                <th className="w-30">Qty</th>
                                                                                <th className="w-30">Expiry</th>
                                                                                <th className="w-30">Lot No</th>
                                                                                <th />
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody id="objectiveDiv">
                                                                            {
                                                                                formData?.products?.map((_, index) => (
                                                                                    <tr id="objDiv0">
                                                                                        <td>
                                                                                            <select
                                                                                                className="form-control validd productselect select2"
                                                                                                name="product"
                                                                                                id="tax0"
                                                                                                value={formData?.products[index]?.product}
                                                                                                onChange={(e) => handleProductChange(index, e)}
                                                                                            >
                                                                                                <option value=""> --Select Device--</option>
                                                                                                {
                                                                                                    products.map((product, i) => (
                                                                                                        <option key={i} value={product?._id}>{product?.productName}</option>
                                                                                                    ))
                                                                                                }
                                                                                            </select>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                name="quantity"
                                                                                                value={formData?.products[index]?.quantity}
                                                                                                onChange={(e) => handleProductChange(index, e)}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="date"
                                                                                                className="form-control"
                                                                                                name="expiry"
                                                                                                value={formData?.products[index]?.expiry}
                                                                                                onChange={(e) => handleProductChange(index, e)}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                name="lotNo"
                                                                                                value={formData?.products[index]?.lotNo}
                                                                                                onChange={(e) => handleProductChange(index, e)}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <button className="btn btn-success" id="addobjective" type='button' style={{ marginLeft: 10, background: 'red' }} onClick={() => handleRemoveProduct(index)}>
                                                                                                <FontAwesomeIcon icon={faSubtract} /> 
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            }

                                                                            <tr>
                                                                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                                                                    <button className="btn btn-success" type='button' id="addobjective" style={{ marginLeft: 10 }} onClick={handleAddMoreProduct}>
                                                                                        <FontAwesomeIcon icon={faPlus} /> Add New
                                                                                    </button>
                                                                                </td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </table>
                                                                    <br />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-12 d-flex justify-content-center">
                                                            <input type="submit" defaultValue="Submit" className="btn btn-info btn-flat" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ImportationCreate