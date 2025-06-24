import React from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Settings1 = () => {
  return (
    <div>
    <div className="wrapper thetop">
        <Header/>
        <Sidebar/>
      <div className=" content-wrapper ">
            <section className="no-print">
                <NavbarCrm/>
            </section>
            <section className="content-header"><h1>Settings</h1></section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <form method="POST" action="https://medipro.affinity-me.com/crm/update-settings" acceptCharset="UTF-8"><input name="_token" type="hidden" defaultValue="U5plTqkZ82RKCeAb8UxtPpZ2vZzchL6rgENf484d" />
                        <div className="box box-solid">
                            <div className="box-body">
                                <div className="col-md-4">
                                    <div className="checkbox">
                                        <label>
                                            <input className="input-icheck" name="enable_order_request" type="checkbox" defaultValue={1} /> 
                                            Enable Order Request
                                        </label> 
                                        <FontAwesomeIcon icon={faInfoCircle}
                                        data-container="body" data-toggle="popover" data-placement="auto bottom"
                                        data-content="Sources are used when adding leads" data-html="true" data-trigger="hover"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="order_request_prefix">Order Request Prefix:</label>
                                        <input className="form-control" placeholder="Order Request Prefix" name="order_request_prefix" type="text" id="order_request_prefix" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary pull-right">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
    <Footer/>           
    </div>
  </div>
  )
}

export default Settings1