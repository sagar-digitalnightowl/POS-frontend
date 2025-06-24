import React from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import Footer from '../../../Components/Footer'

const AddProposaltemplates = () => {
  return (
    <div><div>
    <div className="wrapper thetop">
     <Header/>
     <Sidebar/>
      <div className=" content-wrapper ">
        <section className="no-print">
          <NavbarCrm/>
        </section>
        <section className="content-header no-print">
          <h1>Proposal<small>Send</small></h1>
        </section>
        <section className="content">
          <div className="box box-solid">
            <div className="box-body">
              <form method="POST" action="/crm/proposals" acceptCharset="UTF-8" id="proposal_form"><input name="_token" type="hidden" defaultValue="U5plTqkZ82RKCeAb8UxtPpZ2vZzchL6rgENf484d" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="contact_id">Send to:*</label>
                      <select className="form-control select2" id="proposal_contact" style={{width: '100%'}} required name="contact_id"><option selected="selected" value>Please Select</option><option value={3}> - Walk-In Customer (CO0001) (Customer)</option><option value={4}> - test (CO0002) (Customer)</option><option value={24}> - zamini (CO0004) (Customer)</option></select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cc">CC:</label>
                      <input className="form-control" name="cc" type="text" id="cc" />
                      <p className="help-block">Comma separated values of emails</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="bcc">BCC:</label>
                      <input className="form-control" name="bcc" type="text" id="bcc" />
                      <p className="help-block">Comma separated values of emails</p>
                    </div> 
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="subject">Subject:*</label>
                      <input className="form-control" required name="subject" type="text" defaultValue="" id="subject" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="body">Email Body:*</label>
                      <textarea className="form-control" id="proposal_email_body" required name="body" cols={50} rows={10} defaultValue={""} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ladda-button pull-right m-5" data-style="expand-right">
                  <span className="ladda-label">Send</span>
                </button>
              </form>
            </div>
          </div>
          </section>
      </div>
      <Footer/>
    </div>
  </div>
  </div>
  )
}

export default AddProposaltemplates