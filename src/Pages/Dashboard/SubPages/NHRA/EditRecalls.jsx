import React, { useEffect, useState } from 'react';
import Header from '../../../../Components/Header';
import Sidebar from '../../../../Components/Sidebar';
import Footer from '../../../../Components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';

const EditRecalls = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [products, setProducts] = useState([]);
  const [manufacturers, setManufactures] = useState([]);


  const [formData, setFormData] = useState({
    recalls: 'By Manufacturer',
    manufacturer: '',
    batchNo: ''
  })

  const fetchRecallById = async () => {
    setLoading(true);
    try {
      const res = await apiCall({
        method: "get",
        url: `/admin/nhra/recall/getRecallById/${id}`
      });
      if (res.status === 200) {
        setFormData(res?.data?.result)
      } else {
        setError(res?.data?.message)
      }
    } catch (error) {
      setError(error.message);
      console.log("Error get recall by id : ", error)
    } finally {
      setLoading(false);
    }
  }



  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "get",
        url: '/admin/product/productList/getProducts',
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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  useEffect(() => {
    fetchProducts();
    fetchAllManufactures();
    fetchRecallById();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiCall({
        method: "patch",
        url: `/admin/nhra/recall/updateRecall/${id}`,
        data: formData
      })
      if (res.status === 200) {
        navigate('/recalls/all')
      } else {
        setError(res?.data?.message)
      }
    } catch (error) {
      setError(error.message);
      console.log("Error update recall : ", error)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="box box-primary">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="card card-secondary">
                        <div className="card-header">
                          <h3 className="card-title">Edit Recalls</h3>
                        </div>
                        <div className="card-body">
                          <form
                            id="recall_form"
                            onSubmit={handleSubmit}
                          >
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="formanf" style={{ marginRight: '5px' }}>
                                    By Manufacturer
                                  </label>
                                  <input
                                    className="byy"
                                    id="formanf"
                                    type="radio"
                                    name="recalls"
                                    value="By Manufacturer"
                                    checked={formData.recalls === 'By Manufacturer'}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="forbatch" style={{ marginRight: '5px' }}>
                                    By Batch No
                                  </label>
                                  <input
                                    className="byy"
                                    id="forbatch"
                                    type="radio"
                                    name="recalls"
                                    value="By Batch No"
                                    checked={formData.recalls === 'By Batch No'}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            {formData.recalls === 'By Batch No' && (
                              <div className="row batchdiv">
                                <div className="card-header" style={{ textAlign: 'center', backgroundColor: '#6c757d', color: 'white', padding: 0 }}>
                                  <h3 className="text-white">Choose Batch No</h3>
                                </div>
                                <br />
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="manufaturername">Batch No</label>
                                    <span className="form-text text-danger" />
                                    <select
                                      className="form-control validd"
                                      name="batchNo"
                                      id="batch_no"
                                      value={formData.batchNo}
                                      onChange={handleChange}
                                    >

                                      <option value="" >--Select--</option>
                                      {
                                        products.map(product => (
                                          <option key={product?._id} value={product?._id} >{product?.batchNo}</option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                            {formData.recalls === 'By Manufacturer' && (
                              <div className="row manfdiv">
                                <div className="card-header" style={{ textAlign: 'center', backgroundColor: '#6c757d', color: 'white', padding: 0 }}>
                                  <h3 className="text-white">Manufacturer Information</h3>
                                </div>
                                <br />
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="manufaturername">Manufacturer Name</label>
                                    <span className="form-text text-danger" />
                                    <select
                                      className="form-control validd"
                                      name="manufacturer"
                                      id="manid"
                                      value={formData.manufacturer}
                                      onChange={handleChange}
                                    >
                                      <option value="" selected>--Select--</option>
                                      {
                                        manufacturers.map(manu => (
                                          <option key={manu?._id} value={manu?._id}>{manu?.name}</option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="manufatureremail">Manufacturer Email</label>
                                    <input
                                      id="manufatureremail"
                                      name="manufatureremail"
                                      type="email"
                                      className="form-control"
                                      placeholder="Manufacturer Email"
                                      readOnly
                                      value={manufacturers.find(manu => manu?._id === formData.manufacturer)?.email || ""}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="manufaturermobile">Contact Person Number</label>
                                    <input
                                      id="manufaturermobile"
                                      name="manufaturermobile"
                                      type="text"
                                      className="form-control"
                                      placeholder="Contact Person Number"
                                      readOnly
                                      value={manufacturers.find(manu => manu?._id === formData.manufacturer)?.phoneNumber || ""}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="countryoforigin">Country Of Origin</label>
                                    <input
                                      id="countryoforigin"
                                      name="countryoforigin"
                                      type="text"
                                      className="form-control"
                                      placeholder="Country Of Origin"
                                      readOnly
                                      value={manufacturers.find(manu => manu?._id === formData.manufacturer)?.country || ""}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="form-group col-md-12 d-flex justify-content-center">
                              <input type="submit" value="Submit" className="btn btn-info btn-flat" />
                            </div>
                          </form>
                        </div>
                      </div>
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
  );
};

export default EditRecalls;
