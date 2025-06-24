import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faInfoCircle, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../../../utils/apiCall';
import ProductModal from './ProductModal';

const EditStockTransfer = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductData, setEditProductData] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    referenceNo: '',
    status: '',
    locationFrom: '',
    locationTo: '',
    products: [],
    shippingCharges: '',
    additionalNotes: '',
  });

  const fetchStockTransfer = async () => {
    setLoading(true);
    try {
      const res = await apiCall({ method: "get", url: `/admin/stockTransfer/stockList/getStockTransfer/${id}` });
      if (res.status === 200) {
        setFormData(res?.data?.result)
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in fetch stock transfer by id : ", error)
    } finally {
      setLoading(true);
    }
  }



  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiCall({
        method: "get",
        url: "/admin/product/productList/getProducts",
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


  const handleEditStockTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiCall({ method: "patch", url: `/admin/stockTransfer/stockList/updateStockTransfer/${id}`, data: formData });

      if (res.status === 200) {
        navigate('/stock-transfers')
      } else {
        setError(res?.data?.message)
      }

    } catch (error) {
      setError(error.message);
      console.log("Error in update stock transfer : ", error)
    } finally {
      setLoading(true);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }


  useEffect(() => {
    fetchStockTransfer();
    fetchProducts();
  }, [])


  const deleteProduct = (id) => {
    const products = formData.products;

    setFormData(prev => ({
      ...prev,
      products: products.filter(product => product.product != id)
    }))
  }

  const textStyle = { color: 'black' }
  return (
    <div>
      <div className="wrapper thetop" style={textStyle}>
        <Header />
        <Sidebar />
        <div className=" content-wrapper ">
          <section className="content-header">
            <h1>Edit Stock Transfer</h1>
          </section>
          <section className="content no-print">

            <form onSubmit={handleEditStockTransfer}>
              <div className="box box-solid">
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-4">

                      <div className="form-group">
                        <label htmlFor="transaction_date">Date:*</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faCalendar} />
                          </span>
                          <input className="form-control" readOnly="" required name="date"
                            type="date" defaultValue="17/06/2024 10:20" id="transaction_date"
                            value={formData.date.substring(0, 10) || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="ref_no">Reference No:</label>
                        <input
                          className="form-control"
                          name="referenceNo"
                          type="text"
                          id="ref_no"
                          required
                          value={formData.referenceNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="status">Status:*</label>
                        <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print" aria-hidden="true" data-container="body"
                          data-toggle="popover" data-placement="auto bottom"
                          data-content="Stock transfer will not be editable if status is completed"
                          data-html="true" data-trigger="hover"
                        />
                        <select
                          className="form-control select2"
                          required
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value=""> Please Select </option>
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="clearfix" />

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="location_id">Location (From):*</label>
                        <select
                          className="form-control select2"
                          required
                          id="location_id"
                          name="locationFrom"
                          value={formData.locationFrom}
                          onChange={handleChange}
                        >
                          <option value="">Please Select</option>
                          <option value={'POS APPLICATION'}> POS APPLICATION </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="transfer_location_id"> Location (To):*</label>
                        <select
                          className="form-control select2"
                          required
                          id="transfer_location_id"
                          name="locationTo"
                          value={formData.locationTo}
                          onChange={handleChange}
                        >
                          <option value="">Please Select</option>
                          <option value={'POS APPLICATION'}>POS APPLICATION</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Search Products</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-8 ">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faSearch} />
                          </span>
                          <input className="form-control" id="search_product_for_srock_adjustment" placeholder="Search products for stock adjustment"
                            disabled="" name="search_product" type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="form-group">
                        <button onClick={() => setModal(true)} type="button" className="btn btn-link btn-modal" data-href="https://medipro.affinity-me.com/products/quick_add" data-container=".quick_add_product_modal">
                          <FontAwesomeIcon icon={faPlus} />Add new product
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-condensed" id="stock_adjustment_product_table">
                          <thead>
                            <tr>
                              <th className="col-sm-4 text-center">Product </th>
                              <th className="col-sm-2 text-center">Quantity </th>
                              <th className="col-sm-2 text-center">Unit Price </th>
                              <th className="col-sm-2 text-center">Subtotal </th>
                              <th className="col-sm-2 text-center">
                                <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              formData?.products?.map((product, index) => {

                                const selectedProduct = products.find(pro => pro?._id === product.product)

                                return (
                                  <tr key={index}>
                                    <td className="col-sm-2 text-center">{selectedProduct?.productName}</td>
                                    <td className="col-sm-2 text-center">{product?.quantity}</td>
                                    <td className="col-sm-2 text-center">{selectedProduct?.defaultSellingPrice?.excTax}</td>
                                    <td className="col-sm-2 text-center">{product.totalAmount}</td>
                                    <td className="col-sm-2 text-center" onClick={() => deleteProduct(product.product)}>
                                      <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                          <tfoot>
                            <tr className="text-center">
                              <td colSpan={3} />
                              <td>
                                <div className="pull-right">
                                  <b>Total:</b>{" "}
                                  <span id="total_adjustment">
                                    {
                                      formData.products.reduce((acc, product) => acc + product.totalAmount, 0).toFixed(2) || 0
                                    }
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
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
                        <label htmlFor="shipping_charges">Shipping Charges:</label>
                        <input
                          className="form-control input_number"
                          placeholder="Shipping Charges"
                          name="shippingCharges"
                          type="text"
                          defaultValue={0}
                          required
                          id="shipping_charges"
                          value={formData.shippingCharges}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="additional_notes">Additional Notes</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          name="additionalNotes"
                          cols={50}
                          id="additional_notes"
                          defaultValue={""}
                          required
                          value={formData.additionalNotes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-12 text-right">
                      <b>Total Amount:</b> <span id="final_total_text">{(formData.products.reduce((acc, product) => acc + product.totalAmount, 0) + Number(formData.shippingCharges)).toFixed(2) || 0.00}</span>
                    </div>
                    <br />
                    <br />
                    <div className="col-sm-12 text-center">
                      <button type="submit" id="save_stock_transfer" className="btn btn-primary btn-big">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>


      <ProductModal
        show={modal}
        setModal={setModal}
        editProductData={editProductData}
        setEditProductData={setEditProductData}
        formData={formData}
        setFormData={setFormData}
      />


    </div>
  )
}

export default EditStockTransfer