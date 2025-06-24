import react from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import { FaPlus } from 'react-icons/fa';
import Footer from '../../../Components/Footer'
import { Link } from 'react-router-dom'
const ReceiptPrinters = () => {
    const textStyle = {color:'black'}
return(
<div>
  <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <h1>Printers <small>Manage your Printers</small></h1>
      </section>
      <section className="content">
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">All configured Printers</h3>
            <div className="box-tools">
              <Link className="btn btn-block btn-primary"to="/printers/create">
              <FaPlus/> Add Printer
              </Link>
            </div>
          </div>
          <div className="box-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped"id="printer_table">
                <thead>
                  <tr>
                    <th>Printer Name</th>
                    <th>Connection Type</th>
                    <th>Capability Profile</th>
                    <th>Characters per line</th>
                    <th>IP Address</th>
                    <th>Port</th>
                    <th>Path</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
  </div>
</div>
)
}
export default ReceiptPrinters