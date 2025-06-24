import React, { useState, useEffect } from 'react';
import Footer from '../../../../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWindowClose,faUser,faPlusCircle,faSearchPlus,faInfoCircle,faTimes,faEdit,faPause,faCheck,faCreditCard,faMobile,faMoneyCheckAlt,faClock} from '@fortawesome/free-solid-svg-icons';
import POSHeader from './PosHeader';

const Pos = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = [
        { id: 1, name: 'Product A', brand: 'Sanibel', image: 'imageA.jpg' },
        { id: 2, name: 'Product B', brand: 'Sanibel', image: 'imageB.jpg' },
        { id: 3, name: 'Product C', brand: 'Other', image: 'imageC.jpg' },
      ];
      const filteredProducts = selectedBrand === 'all'
        ? allProducts
        : allProducts.filter(product => product.brand === selectedBrand);
      setProducts(filteredProducts);
    };

    fetchProducts();
  }, [selectedBrand]);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const textStyle = { color: 'black' };
  const wrapperStyle = { backgroundColor: 'grey', minHeight: '100vh' };

  return (
    <div style={textStyle}>
      <div className="wrapper thetop" style={wrapperStyle}>
        <POSHeader />
        <div className="">
          <section className="content no-print">
            <input type="hidden" id="amount_rounding_method" defaultValue="" />
            <input type="hidden" id="is_overselling_allowed" />
            <form method="POST" action="https://medipro.affinity-me.com/pos" acceptCharset="UTF-8" id="add_pos_sell_form">
              <input name="_token" type="hidden" defaultValue="OCtOTtpSqKejuK6HZ33xB0MN14XnCqeo1iE7piy4" />
              <div className="row mb-12">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-7 no-padding pr-12">
                      <div className="box box-solid mb-12 mb-40">
                        <div className="box-body pb-0">
                          <input type="hidden" id="item_addition_method" defaultValue={1} />
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon">
                                    <FontAwesomeIcon icon={faSearchPlus} className="fa fa-user" />
                                  </span>
                                  <select className="form-control mousetrap" id="customer_id" required="" name="contact_id">
                                    <option selected="selected" value="">Enter Customer name / phone</option>
                                  </select>
                                  <span className="input-group-btn">
                                    <button
                                      type="button"
                                      className="btn btn-default bg-white btn-flat add_new_customer"
                                      data-name=""
                                    >
                                      <FontAwesomeIcon icon={faInfoCircle} className="text-info hover-q no-print" />
                                    </button>
                                  </span>
                                </div>
                                <small className="text-danger hide contact_due_text">
                                  <strong>Customer Due:</strong> <span />
                                </small>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-btn">
                                    <button
                                      type="button"
                                      className="btn btn-default bg-white btn-flat"
                                      data-toggle="modal"
                                      data-target="#configure_search_modal"
                                      title="Configure product search"
                                    >
                                      <FontAwesomeIcon icon={faSearchPlus} className="fas fa-search-plus" />
                                    </button>
                                  </div>
                                  <input
                                    className="form-control"
                                    id="search_product"
                                    placeholder="Enter Product name / SKU / Scan bar code"
                                    autoFocus=""
                                    name="search_product"
                                    type="text"
                                  />
                                  <span className="input-group-btn">
                                    <button
                                      type="button"
                                      className="btn btn-default bg-white btn-flat pos_add_quick_product"
                                      data-href="https://medipro.affinity-me.com/products/quick_add"
                                      data-container=".quick_add_product_modal"
                                    >
                                      <FontAwesomeIcon icon={faPlusCircle} className="text-primary fa-lg" />
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 pos_product_div">
                              <table className="table table-condensed table-bordered table-striped table-responsive" id="pos_table">
                                <thead>
                                  <tr>
                                    <th className="tex-center col-md-4">
                                      Product
                                      <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        className="text-info hover-q no-print"
                                        aria-hidden="true"
                                        data-container="body"
                                        data-toggle="popover"
                                        data-placement="auto bottom"
                                        data-content="Click <i>product name</i> to edit price, discount & tax. <br/>Click <i>Comment Icon</i> to enter serial number / IMEI or additional note.<br/><br/>Click <i>Modifier Icon</i>(if enabled) for modifiers"
                                        data-html="true"
                                        data-trigger="hover"
                                      />
                                    </th>
                                    <th className="text-center col-md-3">Quantity</th>
                                    <th className="text-center col-md-2">Price inc. tax</th>
                                    <th className="text-center col-md-2">Subtotal</th>
                                    <th className="text-center">
                                      <FontAwesomeIcon icon={faTimes} className="fas fa-times" aria-hidden="true" />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.map(product => (
                                    <tr key={product.id} onClick={() => handleProductClick(product)}>
                                      <td>{product.name}</td>
                                      <td className="text-center">1</td>
                                      <td className="text-center">$100</td>
                                      <td className="text-center">$100</td>
                                      <td className="text-center">
                                        <FontAwesomeIcon icon={faTimes} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <div className="row pos_form_totals">
                            <div className="col-md-12">
                              <table className="table table-condensed">
                                <tbody>
                                  <tr>
                                    <td>
                                      <b>ITEM:</b>&nbsp;
                                      <span className="total_quantity">0</span>
                                    </td>
                                    <td>
                                      <b>Total:</b> &nbsp;
                                      <span className="price_total">0</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Discount
                                        <FontAwesomeIcon
                                          icon={faInfoCircle}
                                          className="text-info hover-q no-print"
                                          aria-hidden="true"
                                          data-container="body"
                                          data-toggle="popover"
                                          data-placement="auto bottom"
                                          data-content="Set 'Default Sale Discount' for all sales in Business Settings. Click on the edit icon below to add/update discount."
                                          data-html="true"
                                          data-trigger="hover"
                                        />
                                        (-):
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          className="fas fa-edit cursor-pointer"
                                          id="pos-edit-discount"
                                          title="Edit Discount"
                                          aria-hidden="true"
                                          data-toggle="modal"
                                          data-target="#posEditDiscountModal"
                                        />
                                        <span id="total_discount">0</span>
                                      </b>
                                    </td>
                                    <td className="">
                                      <span>
                                        <b>Order Tax(+):
                                          <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className="text-info hover-q no-print"
                                            aria-hidden="true"
                                            data-container="body"
                                            data-toggle="popover"
                                            data-placement="auto bottom"
                                            data-content="Set 'Default Sale Tax' for all sales in Business Settings. Click on the edit icon below to add/update Order Tax."
                                            data-html="true"
                                            data-trigger="hover"
                                          />
                                        </b>
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          className="fas fa-edit cursor-pointer"
                                          title="Edit Order Tax"
                                          aria-hidden="true"
                                          data-toggle="modal"
                                          data-target="#posEditOrderTaxModal"
                                          id="pos-edit-tax"
                                        />
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        <b>Shipping(+):
                                          <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className="fa fa-info-circle text-info hover-q no-print"
                                            aria-hidden="true"
                                            data-container="body"
                                            data-toggle="popover"
                                            data-placement="auto bottom"
                                            data-content="Set shipping details and shipping charges. Click on the edit icon below to add/update shipping details and charges."
                                            data-html="true"
                                            data-trigger="hover"
                                          />
                                        </b>
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          className="fas fa-edit cursor-pointer"
                                          title="Shipping"
                                          aria-hidden="true"
                                          data-toggle="modal"
                                          data-target="#posShippingModal"
                                        />
                                        <span id="shipping_charges_amount">0</span>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 no-padding">
                      <div className="row">
                        <div className="col-sm-4" id="product_brand_div">
                          <select id="product_brand" className="select2" name="size" style={{ width: '100% !important' }} onChange={handleBrandChange}>
                            <option value="all">All Brands</option>
                            <option value="Sanibel">Sanibel</option>
                          </select>
                        </div>
                        <div className="col-md-6 hide" id="product_service_div">
                          <select id="is_enabled_stock" className="select2" name="is_enabled_stock" style={{ width: '100% !important' }}>
                            <option value="" selected="selected">
                              All
                            </option>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                          </select>
                        </div>
                        <div className="col-sm-4 hide" id="feature_product_div">
                          <button type="button" className="btn btn-primary btn-flat" id="show_featured_products">
                            Featured Products
                          </button>
                        </div>
                      </div>
                      <br />
                      {selectedProduct && (
                        <div className="product-details">
                          <h3>{selectedProduct.name}</h3>
                          <img src={selectedProduct.image} alt={selectedProduct.name} style={{ maxWidth: '100%' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pos-form-actions">
                  <div className="col-md-12">
                    <button type="button" className="btn bg-info text-white btn-default btn-flat" id="pos-draft">
                      <FontAwesomeIcon icon={faEdit} /> Draft
                    </button>
                    <button type="button" className="btn btn-default bg-yellow btn-flat" id="pos-quotation">
                      <FontAwesomeIcon icon={faEdit} /> Quotation
                    </button>
                    <button
                      type="button"
                      className="btn bg-red btn-default btn-flat no-print pos-express-finalize"
                      data-pay_method="suspend"
                      title="Suspend Sales (pause)"
                    >
                      <FontAwesomeIcon icon={faPause} aria-hidden="true" /> Suspend
                    </button>
                    <button
                      type="button"
                      className="btn bg-purple btn-default btn-flat no-print pos-express-finalize"
                      data-pay_method="credit_sale"
                      title="Checkout as credit sale"
                    >
                      <FontAwesomeIcon icon={faCheck} aria-hidden="true" /> Credit Sale
                    </button>
                    <button
                      type="button"
                      className="btn bg-maroon btn-default btn-flat no-print pos-express-finalize"
                      data-pay_method="card"
                      title="Express checkout using card"
                    >
                      <FontAwesomeIcon icon={faCreditCard} className="fas fa-credit-card" aria-hidden="true" /> Card{' '}
                    </button>
                    <button
                      type="button"
                      className="btn bg-maroon btn-default btn-flat no-print pos-express-finalize"
                      data-pay_method="custom_pay_1"
                      title="Benefit Pay"
                    >
                      <FontAwesomeIcon icon={faMobile} className="fas fa-mobile" aria-hidden="true" /> Benefit Pay
                    </button>
                    <button type="button"
                      className="btn bg-navy btn-default btn-flat no-print"
                      id="pos-finalize"
                      title="Checkout using multiple payment methods"
                    >
                      <FontAwesomeIcon icon={faMoneyCheckAlt} className="fas fa-money-check-alt" aria-hidden="true" /> Multiple Pay
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-flat no-print pos-express-finalize"
                      data-pay_method="cash"
                      title="Mark complete paid & checkout"
                    >
                      <FontAwesomeIcon icon={faMoneyCheckAlt} className="fas fa-money-bill-alt" aria-hidden="true" /> Cash
                    </button>
                    <button type="button" className="btn btn-danger btn-flat btn-xs" id="pos-cancel">
                      <FontAwesomeIcon icon={faWindowClose} className="fas fa-window-close" /> Cancel
                    </button>
                    <span className="text">
                      <b> Total Payable</b>
                    </span>
                    <span id="total_payable" className="number">
                      <b>0.000</b>
                    </span>
                    <button type="button" className="pull-right btn btn-primary btn-flat" data-toggle="modal" data-target="#recent_transactions_modal" id="recent-transactions">
                      <FontAwesomeIcon icon={faClock} className="fas fa-clock" /> Recent Transactions
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Pos;
