import React from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { Link } from 'react-router-dom'

const ImportOpeningStocks = () => {
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
                      <td>
                        SKU<small className="text-muted">(Required)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>2</td>
                      <td> Location
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
                      <td>3</td>
                      <td>
                      Quantity{" "}
                        <small className="text-muted">(Required)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        Unit Cost (Before Tax){" "}
                        <small className="text-muted">(Required)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        Lot Number{" "}
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>6</td>
                      <td> Expiry Date
                        <small className="text-muted">(Optional)</small>
                      </td>
                      <td>
                        Stock expiry date in <b>Business date format</b> <br />
                        <b>dd/mm/yyyy</b>, Type: <b>text</b>, Example:
                        <b>07/06/2024</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

export default ImportOpeningStocks