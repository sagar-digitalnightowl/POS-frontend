import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faFilter, faInfoCircle, faMapMarker, faPrint, faSync } from '@fortawesome/free-solid-svg-icons'

const PurchaseSale = () => {
    const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>
            Purchase &amp; Sale Report
            <small>Purchase &amp; sale details for the selected date range</small>
          </h1>
        </section>
        <section className="content">
          <div className="row no-print">
            <div className="col-md-3 col-md-offset-7 col-xs-6">
              <div className="input-group">
                <span className="input-group-addon bg-light-blue">
                <FontAwesomeIcon icon={faMapMarker} />
                </span>
                <select className="form-control select2" id="purchase_sell_location_filter">
                  <option value="">All locations</option>
                  <option value={4}>POS APPLICATION</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-xs-6">
              <div className="form-group pull-right">
                <div className="input-group">
                  <button type="button" className="btn btn-primary" id="purchase_sell_date_filter">
                    <span>
                    <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filter by date
                    </span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-6">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Purchases</h3>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Total Purchase:</th>
                        <td>
                          <span className="total_purchase">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Purchase Including tax:</th>
                        <td>
                          <span className="purchase_inc_tax">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Total Purchase Return Including Tax:</th>
                        <td>
                          <span className="purchase_return_inc_tax">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Purchase Due:
                          <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" data-container="body"data-toggle="popover"
                            data-placement="auto bottom"data-content="Total unpaid amount for purchases."
                            data-html="true"data-trigger="hover"
                          />
                        </th>
                        <td>
                          <span className="purchase_due">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">Sales</h3>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Total Sale:</th>
                        <td>
                          <span className="total_sell">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Sale Including tax:</th>
                        <td>
                          <span className="sell_inc_tax">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Total Sell Return Including Tax:</th>
                        <td>
                          <span className="total_sell_return">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Sale Due:{" "}
                          <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" data-container="body"data-toggle="popover"
                            data-placement="auto bottom"data-content="Total amount to be received from sales"data-html="true"data-trigger="hover"
                          />
                        </th>
                        <td>
                          <span className="sell_due">
                            <FontAwesomeIcon icon={faSync} spin />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid">
                <div className="box-header">
                  <h3 className="box-title">
                    Overall ((Sale - Sell Return) - (Purchase - Purchase Return) )
                    <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"data-container="body"data-toggle="popover"
                      data-placement="auto bottom"data-content="-ve value = Amount to pay <br>+ve Value = Amount to receive"
                      data-html="true"data-trigger="hover"
                    />
                  </h3>
                </div>
                <div className="box-body">
                  <h3 className="text-muted">
                    Sale - Purchase:
                    <span className="sell_minus_purchase">
                      <FontAwesomeIcon icon={faSync} spin />
                    </span>
                  </h3>
                  <h3 className="text-muted">
                    Due amount:
                    <span className="difference_due">
                      <FontAwesomeIcon icon={faSync} spin />
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row no-print">
            <div className="col-sm-12">
              <button type="button"className="btn btn-primary pull-right"aria-label="Print"onclick="window.print();">
              <FontAwesomeIcon icon={faPrint} /> Print
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  </div>
  )
}

export default PurchaseSale