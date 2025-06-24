import React from 'react'
import Header from '../../../../../Components/Header'
import Sidebar from '../../../../../Components/Sidebar'
import Footer from '../../../../../Components/Footer';

const ImportContacts = () => {
    const textStyle = { color: 'black' };
  return (
<div>
<>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <div id="app"></div>
      <input type="hidden" id="__code" defaultValue="BHD" />
      <input type="hidden" id="__symbol" defaultValue="BD" />
      <input type="hidden" id="__thousand" defaultValue="," />
      <input type="hidden" id="__decimal" defaultValue="." />
      <input type="hidden" id="__symbol_placement" defaultValue="before" />
      <input type="hidden" id="__precision" defaultValue={3} />
      <input type="hidden" id="__quantity_precision" defaultValue={2} />
      <input type="hidden" id="view_export_buttons" />
      <section className="content-header">
        <h1>Import Contacts </h1>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="box box-primary">
              <div className="box-body">
                <form method="POST" action="https://medipro.affinity-me.com/contacts/import" acceptCharset="UTF-8" encType="multipart/form-data">
                  <input name="_token" type="hidden" defaultValue="fd2xti21DKJsmJXEb0pyOnFISFFcspd5jhAByrNX"/>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label htmlFor="name">File To Import:</label>
                          <input accept=".xls" required="required" name="contacts_csv" type="file"/>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <br />
                        <button type="submit" className="btn btn-primary"> Submit </button>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <br />
                <div className="row">
                  <div className="col-sm-4">
                    <a href="https://medipro.affinity-me.com/files/import_contacts_csv_template.xls" className="btn btn-success" download="">
                      <i className="fa fa-download" /> Download template file
                    </a>
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
                      <th style={textStyle}>Column Number</th>
                      <th style={textStyle}>Column Name</th>
                      <th style={textStyle}>Instruction</th>
                    </tr>
                    <tr>
                      <td style={textStyle}>1</td>
                      <td style={textStyle}> Contact type <small className="text-muted">(Required)</small></td>
                      <td style={textStyle}> Available Options:
                        <strong>
                          <br /> 1 = Customer, <br /> 2 = Supplier <br /> 3 = Both
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td style={textStyle}>2</td>
                      <td style={textStyle}> Prefix <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>3</td>
                      <td style={textStyle}> First Name <small className="text-muted">(Required)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>4</td>
                      <td style={textStyle}> Middle name <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>5</td>
                      <td style={textStyle}> Last Name <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>6</td>
                      <td style={textStyle}> Business Name <br /> <small className="text-muted"> (Required if contact type is supplier or both)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>7</td>
                      <td style={textStyle}> Contact ID <small className="text-muted">(Optional)</small></td>
                      <td style={textStyle}>Leave blank to auto generate Contact ID</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>8</td>
                      <td style={textStyle}> Tax number<small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>9</td>
                      <td style={textStyle}>Opening Balance<small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>10</td>
                      <td style={textStyle}>
                        Pay term <br />
                        <small className="text-muted">
                          (Required if contact type is supplier or both)
                        </small>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>11</td>
                      <td style={textStyle}>
                        Pay term period <br />
                        <small className="text-muted">
                          (Required if contact type is supplier or both)
                        </small>
                      </td>
                      <td style={textStyle}><strong>Available Options: days and months</strong></td>
                    </tr>
                    <tr>
                      <td style={textStyle}>12</td>
                      <td style={textStyle}> Credit Limit <small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>13</td>
                      <td style={textStyle}> Email <small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>14</td>
                      <td style={textStyle}>Mobile <small className="text-muted">(Required)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>15</td>
                      <td style={textStyle}>Alternate contact number<small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>16</td>
                      <td style={textStyle}> Landline <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>17</td>
                      <td style={textStyle}> City <small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>18</td>
                      <td style={textStyle}>State <small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>19</td>
                      <td style={textStyle}> Country <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>20</td>
                      <td style={textStyle}> Address line 1<small className="text-muted">(Optional)</small></td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>21</td>
                      <td style={textStyle}> Address line 2 <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>22</td>
                      <td style={textStyle}> Zip Code <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>23</td>
                      <td style={textStyle}> Date of birth <small className="text-muted">(Optional)</small> </td>
                      <td style={textStyle}>Format Y-m-d (2024-06-05)</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>24</td>
                      <td style={textStyle}> Custom Field 1 <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>25</td>
                      <td style={textStyle}> Custom Field 2 <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>26</td>
                      <td style={textStyle}> Custom Field 3 <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td style={textStyle}>27</td>
                      <td style={textStyle}> Custom Field 4 <small className="text-muted">(Optional)</small> </td>
                      <td>&nbsp;</td>
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
    <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel"> Today's profit</h4>
          </div>
          <div className="modal-body">
            <input type="hidden" id="modal_today" defaultValue="2024-06-05" />
            <div className="row">
              <div id="todays_profit"></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal"> Close</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"></div>
  <div className="modal fade view_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"/>
</>
</div>
  )
}

export default ImportContacts