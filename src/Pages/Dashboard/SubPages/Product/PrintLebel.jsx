import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'

const PrintLebel = () => {
  const textStyle = { color: 'gray' }
  return (
    <div>
        <>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <br />
        <h1>
          Print Labels
          <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body"
            data-toggle="popover" data-placement="auto bottom"
            data-content="Add products ->Choose informations to show in Labels -> Select Barcode Setting -> Preview Labels -> Print"
            data-html="true" data-trigger="hover"
          />
        </h1>
      </section>
      <section className="content no-print">
        <form
          method="POST"
          action="https://medipro.affinity-me.com/labels/preview"
          acceptCharset="UTF-8"
          target="blank"
        >
          <input
            name="_token"
            type="hidden"
            defaultValue="LyIyfJahVepCfncRYepe43qTbik6bgBm0r6GmpS5"
          />
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">Add products to generate Labels</h3>
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-search" />
                      </span>
                      <input className="form-control"
                        id="search_product_for_label"
                        placeholder="Enter products name to print labels"
                        autofocus="" name="search_product" type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10 col-sm-offset-2">
                  <table
                    className="table table-bordered table-striped table-condensed"
                    id="product_table"
                  >
                    <thead>
                      <tr>
                        <th style={textStyle}>Products</th>
                        <th style={textStyle}>No. of labels</th>
                        <th style={textStyle}>Packing Date</th>
                        <th style={textStyle}>Selling Price Group</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">Information to show in Labels</h3>
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="print[name]"
                                defaultValue={1}
                              />
                              <b>Product Name</b>
                            </label>
                          </div>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <b>Size</b>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="print[name_size]"
                              defaultValue={10}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="print[variations]"
                                defaultValue={1}
                              />
                              <b>Product Variation (recommended)</b>
                            </label>
                          </div>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <b>Size</b>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="print[variations_size]"
                              defaultValue={8}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="print[price]"
                                defaultValue={1}
                                id="is_show_price"
                              />
                              <b>Product Price</b>
                            </label>
                          </div>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <b>Size</b>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="print[price_size]"
                              defaultValue={10}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="" id="price_type_div">
                            <div className="form-group">
                              <label htmlFor="print[price_type]">
                                Show Price:
                              </label>
                              <div className="input-group">
                                <span className="input-group-addon">
                                  <i className="fa fa-info" />
                                </span>
                                <select
                                  className="form-control"
                                  id="print[price_type]"
                                  name="print[price_type]"
                                >
                                  <option value="inclusive" selected="selected">
                                    Inc. tax
                                  </option>
                                  <option value="exclusive">Exc. tax</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="print[business_name]"
                                defaultValue={1}
                              />
                              <b>Business name</b>
                            </label>
                          </div>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <b>Size</b>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="print[business_name_size]"
                              defaultValue={12}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked=""
                                name="print[packing_date]"
                                defaultValue={1}
                              />
                              <b>Print packing date</b>
                            </label>
                          </div>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <b>Size</b>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              name="print[packing_date_size]"
                              defaultValue={8}
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-sm-12">
                  <hr />
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="price_type">Barcode setting:</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-cog" />
                      </span>
                      <select className="form-control" name="barcode_setting">
                        <option value={1}>
                          20 Labels per Sheet, Sheet Size: 8.5" x 11", Label
                          Size: 4" x 1", Labels per sheet: 20
                        </option>
                        <option value={2}>
                          30 Labels per sheet, Sheet Size: 8.5" x 11", Label
                          Size: 2.625" x 1", Labels per sheet: 30
                        </option>
                        <option value={3}>
                          32 Labels per sheet, Sheet Size: 8.5" x 11", Label
                          Size: 2" x 1.25", Labels per sheet: 32
                        </option>
                        <option value={4}>
                          40 Labels per sheet, Sheet Size: 8.5" x 11", Label
                          Size: 2" x 1", Labels per sheet: 40
                        </option>
                        <option value={5}>
                          50 Labels per Sheet, Sheet Size: 8.5" x 11", Label
                          Size: 1.5" x 1", Labels per sheet: 50
                        </option>
                        <option value={6}>
                          Continuous Rolls - 31.75mm x 25.4mm, Label Size:
                          31.75mm x 25.4mm, Gap: 3.18mm
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-12 text-center">
                  <input
                    type="preview"
                    className="btn btn-primary pull-right btn-flat btn-block"
                    defaultValue="Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="col-sm-8 hide display_label_div">
          <h3 className="box-title">Preview</h3>
          <button
            type="button"
            className="col-sm-offset-2 btn btn-success btn-block"
            id="print_label"
          >
            Print
          </button>
        </div>
        <div className="clearfix" />
      </section>
      <div id="preview_box"></div>
      <div className="scrolltop no-print">
        <div className="scroll icon">
          <i className="fas fa-angle-up" />
        </div>
      </div>
      <section className="invoice print_section" id="receipt_section"></section>
    </div>
    <div
      className="modal fade"
      id="todays_profit_modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Today's profit
            </h4>
          </div>
          <div className="modal-body">
            <input type="hidden" id="modal_today" defaultValue="2024-06-07" />
            <div className="row">
              <div id="todays_profit"></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal"> Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog"aria-labelledby="gridSystemModalLabel"></div>
  <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog"aria-labelledby="gridSystemModalLabel"/>
  <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"/>
</>
</div>
  )
}

export default PrintLebel