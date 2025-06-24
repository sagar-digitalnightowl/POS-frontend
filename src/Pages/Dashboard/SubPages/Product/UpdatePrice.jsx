import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'

const UpdatePrice = () => {
    const textStyle = { color: 'black' }
  return (
<div>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <input type="hidden" id="view_export_buttons" />
      <section className="content-header">
        <h1>Update Price </h1>
      </section>
      <section className="content">
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">Import Export Product Price</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-sm-6">
                <a href="https://medipro.affinity-me.com/export-product-price" className="btn btn-primary">
                  Export product prices
                </a>
              </div>
              <div className="col-sm-6">
                <form method="POST" action="https://medipro.affinity-me.com/import-product-price" acceptCharset="UTF-8" encType="multipart/form-data">
                  <input
                    name="_token"
                    type="hidden"
                    defaultValue="OPozcUJeclXii5HnFSzFfUu1f3zdGCo3VKfgF9yX"
                  />
                  <div className="form-group">
                    <label htmlFor="name">File To Import:</label>
                    <input
                      required="required"
                      name="product_group_prices"
                      type="file"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-sm-12">
                <h4>Instructions:</h4>
                <ol>
                  <li style={textStyle}>Export product prices by clicking on above button</li>
                  <li style={textStyle}>
                    Make changes in product price including tax &amp; selling
                    price groups.
                  </li>
                  <li style={textStyle}>Do not change any product name, sku &amp; headers</li>
                  <li style={textStyle}>After making changes import the file</li>
                </ol>
              </div>
            </div>
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
    <Footer/>
  </div>
  <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog"aria-labelledby="gridSystemModalLabel"></div>
  <div className="modal fade" id="clock_in_clock_out_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
  <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel" />
</div>
  )
}

export default UpdatePrice