import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { Link } from 'react-router-dom'

const ImportProduct = () => {
    const textStyle = { color: 'black' }
  return (
    <div>
        <>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <h1>Import Products </h1>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-primary">
              <div className="box-body">
                <form
                  method="POST"
                  action="https://medipro.affinity-me.com/import-products/store"
                  acceptCharset="UTF-8"
                  encType="multipart/form-data"
                >
                  <input
                    name="_token"
                    type="hidden"
                    defaultValue="LyIyfJahVepCfncRYepe43qTbik6bgBm0r6GmpS5"
                  />
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label htmlFor="name">File To Import:</label>
                          <input 
                          accept=".xls, .xlsx, .csv" 
                          required="required" name="products_csv"
                          type="file"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <br />
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <br />
                <div className="row">
                  <div className="col-sm-4">
                    <Link to="https://medipro.affinity-me.com/files/import_products_csv_template.xls" className="btn btn-success" download="">
                      <i className="fa fa-download" /> Download template file
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Instructions</h3>
              </div>
              <div className="box-body" style={textStyle}>
                <strong>
                  Follow the instructions carefully before importing the file.
                </strong>
                <br />
                The columns of the file should be in the following order. <br />
                <br />
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th>Column Number</th>
                      <th>Column Name</th>
                      <th >Instruction</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td> Product Name <small className="text-muted">(Required)</small> </td>
                      <td >Name of the product</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>2</td>
                      <td> Brand <small className="text-muted">(Optional)</small></td>
                      <td> Name of the brand <br />
                        <small className="text-muted">
                          (If not found new brand with the given name will be
                          created)
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td> Unit <small className="text-muted">(Required)</small> </td>
                      <td>Name of the unit</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td> Category <small className="text-muted">(Optional)</small> </td>
                      <td> Name of the Category <br />
                        <small className="text-muted">
                          (If not found new category with the given name will be
                          created)
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td> Sub category <small className="text-muted">(Optional)</small> </td>
                      <td>
                        Name of the Sub-Category <br />
                        <small className="text-muted">
                          (If not found new sub-category with the given name
                          under the <br /> parent Category will be created)
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td> SKU <small className="text-muted">(Optional)</small> </td>
                      <td> Product SKU. If blank an SKU will be automatically generated</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td> Barcode Type
                        <small className="text-muted">
                          (Optional, Default: C128)
                        </small>
                      </td>
                      <td>
                        Barcode Type for the product. <br />
                        <strong>
                          Currently supported: C128, C39, EAN-13, EAN-8, UPC-A,
                          UPC-E, ITF-14
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>
                        Manage Stock?{" "}
                        <small className="text-muted">(Required)</small>
                      </td>
                      <td>
                        Enable or disable stock managemant
                        <br />
                        <strong>
                          1 = Yes
                          <br />0 = No
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>
                        Alert quantity{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>Alert quantity</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>
                        Expires in{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>Product expiry period (Only in numbers)</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>
                        Expiry Period Unit{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Unit for the expiry period
                        <br />
                        <strong>Available Options: days, months</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>
                        Applicable Tax{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Name of the Tax Rate <br />
                        <br />
                        If purchase Price (Excluding Tax) is not same as <br />
                        Purchase Price (Including Tax) <br />
                        then you must supply the tax rate name.
                      </td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>
                        Selling Price Tax Type{" "}
                        <small className="text-muted">(Required)</small>
                      </td>
                      <td>
                        Selling Price Tax Type <br />
                        <strong>Available Options: inclusive, exclusive</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>
                        Product Type{" "}
                        <small className="text-muted">(Required)</small>
                      </td>
                      <td>
                        Product Type <br />
                        <strong>Available Options: single, variable</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>
                        Variation Name{" "}
                        <small className="text-muted">
                          (Required if product type is variable)
                        </small>
                      </td>
                      <td>Name of the variation (Ex: Size, Color etc )</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>
                        Variation Values{" "}
                        <small className="text-muted">
                          (Required if product type is variable)
                        </small>
                      </td>
                      <td>
                        Values for the variation separated with '|' <br />
                        (Ex: Red|Blue|Green)
                      </td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td>
                        Variation SKUs{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        SKUs of each variations separated by "|" if product type
                        is variable
                      </td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>
                        {" "}
                        Purchase Price (Including Tax)
                        <br />
                        <small className="text-muted">
                          (Required if Purchase Price Excluding Tax is not
                          given)
                        </small>
                      </td>
                      <td>
                        Purchase Price (Including Tax) (Only in numbers)
                        <br />
                        <br />
                        For variable products '|' separated values with <br />
                        the same order as Variation Values <br />
                        (Ex: 84|85|88)
                      </td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>
                        Purchase Price (Excluding Tax) <br />
                        <small className="text-muted">
                          (Required if Purchase Price Including Tax is not
                          given)
                        </small>
                      </td>
                      <td>
                        Purchase Price (Excluding Tax) (Only in numbers)
                        <br />
                        <br />
                        For variable products '|' separated values with <br />
                        the same order as Variation Values <br />
                        (Ex: 84|85|88)
                      </td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>
                        Profit Margin %{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Profit Margin (Only in numbers)
                        <br />
                        <small className="text-muted">
                          If blank default profit margin for the <br /> business
                          will be used
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>
                        Selling Price{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Selling Price (Only in numbers)
                        <br />
                        <small className="text-muted">
                          If blank selling price will be calculated <br />
                          with the given Purchase Price <br />
                          and Applicable Tax{" "}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>
                        Opening Stock{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Opening Stock (Only in numbers) <br />
                        <br />
                        For variable products separate stock quantities with '|'{" "}
                        <br />
                        (Ex: 100|150|200)
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td>
                        Opening stock location{" "}
                        <small className="text-muted">
                          (Optional) <br />
                          If blank first business location will be used
                        </small>
                      </td>
                      <td>
                        Name of the business location
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>
                        Expiry Date{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Stock Expiry Date <br />
                        <b>Format: mm-dd-yyyy; Ex: 11-25-2018</b>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>
                        Enable Product description, IMEI or Serial Number{" "}
                        <small className="text-muted">
                          (Optional, Default: 0)
                        </small>
                      </td>
                      <td>
                        <strong>
                          1 = Yes
                          <br />0 = No
                        </strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>
                        Weight <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Optional
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>
                        Rack <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Rack details seperated by '|' for different business
                        locations serially.
                        <br /> (Ex: R1|R5|R12){" "}
                      </td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>
                        Row <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Row details seperated by '|' for different business
                        locations serially.
                        <br /> (Ex: ROW1|ROW2|ROW3){" "}
                      </td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>
                        Position{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Position details seperated by '|' for different business
                        locations serially.
                        <br /> (Ex: POS1|POS2|POS3){" "}
                      </td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>
                        Image <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Image name with extension.
                        <br /> (Image name must be uploaded to the server
                        public/uploads/img ) <br />
                        <br />
                        Or URL of the image
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>
                        Product Description{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>
                        Custom Field1{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>
                        Custom Field2{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>
                        Custom Field3{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>
                        Custom Field4{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>
                        Not for selling{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        <strong>
                          1 = Yes
                          <br />0 = No
                        </strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>
                        Product locations{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Comma separated string of business location names where
                        product will be available{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>{" "}
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
    <audio id="success-audio">
      <source src="https://medipro.affinity-me.com/audio/success.ogg?v=530" type="audio/ogg"/>
      <source src="https://medipro.affinity-me.com/audio/success.mp3?v=530" type="audio/mpeg"/>
    </audio>
    <audio id="error-audio">
      <source src="https://medipro.affinity-me.com/audio/error.ogg?v=530" type="audio/ogg"/>
      <source src="https://medipro.affinity-me.com/audio/error.mp3?v=530" type="audio/mpeg"/>
    </audio>
    <audio id="warning-audio">
      <source src="https://medipro.affinity-me.com/audio/warning.ogg?v=530" type="audio/ogg" />
      <source src="https://medipro.affinity-me.com/audio/warning.mp3?v=530" type="audio/mpeg"
      />
    </audio>
  </div>
  <div
    className="modal fade"
    id="task_modal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="gridSystemModalLabel"
  ></div>
  <div
    className="modal fade"
    id="clock_in_clock_out_modal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="gridSystemModalLabel"
  >
  </div>
  <div
    className="modal fade view_modal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="gridSystemModalLabel"
  />
</>

    </div>
  )
}

export default ImportProduct