import react from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import { FaInfoCircle } from 'react-icons/fa';
import Footer from '../../../Components/Footer'
const AddPrinters = () =>{
return(
<div>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <h1>Add Printer</h1>
      </section>
      <section className="content">
        <form method="POST"action="/printers"acceptCharset="UTF-8"id="add_printer_form">
          <div className="box box-solid">
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="name">Printer Name:*</label>
                    <input className="form-control"required=""placeholder="Short Descriptive Name to recognize printer"
                      name="name"type="text"id="name"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="connection_type">Connection Type:*</label>
                    <select className="form-control select2"id="connection_type"name="connection_type">
                      <option value="network">Network</option>
                      <option value="windows">Windows</option>
                      <option value="linux">Linux</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="capability_profile">Capability Profile:*</label>
                    <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                      data-content="Support for commands and code pages varies between printer vendors and models. If you're not sure, it's a good idea to use the 'simple' Capability Profile"
                      data-html="true"data-trigger="hover"
                    />
                    <select className="form-control select2"id="capability_profile"name="capability_profile">
                      <option value="default">Default</option>
                      <option value="simple">Simple</option>
                      <option value="SP2000">Star Branded</option>
                      <option value="TEP-200M">Espon Tep</option>
                      <option value="P822D">P822D</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="char_per_line">Characters per line:*</label>
                    <input className="form-control"required=""placeholder="Number of character that can be printed per line"
                      name="char_per_line"type="number"defaultValue={42}id="char_per_line"
                    />
                  </div>
                </div>
                <div className="col-sm-12" id="ip_address_div">
                  <div className="form-group">
                    <label htmlFor="ip_address">IP Address:*</label>
                    <input className="form-control"required=""
                      placeholder="IP address for connecting to the printer"name="ip_address"type="text"id="ip_address"
                    />
                  </div>
                </div>
                <div className="col-sm-12" id="port_div">
                  <div className="form-group">
                    <label htmlFor="port">Port:*</label>
                    <input className="form-control"required=""name="port"type="text"defaultValue={9100}id="port"/>
                    <span className="help-block">
                      Most printer works on port 9100
                    </span>
                  </div>
                </div>
                <div className="col-sm-12 hide" id="path_div">
                  <div className="form-group">
                    <label htmlFor="path">Path:*</label>
                    <input className="form-control"required=""name="path"type="text"id="path"/>
                    <span className="help-block">
                      <b>Connection Type Windows: </b> The device files will be
                      along the lines of <code>LPT1</code> (parallel) /{" "}
                      <code>COM1</code> (serial). <br />
                      <b>Connection Type Linux: </b> Your printer device file
                      will be somewhere like <code>/dev/lp0</code> (parallel),{" "}
                      <code>/dev/usb/lp1</code> (USB), <code>/dev/ttyUSB0</code>{" "}
                      (USB-Serial), <code>/dev/ttyS0</code> (serial). <br />
                    </span>
                  </div>
                </div>
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn btn-primary btn-big">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
    <Footer/>
  </div>
</div>
    )
}
export default AddPrinters