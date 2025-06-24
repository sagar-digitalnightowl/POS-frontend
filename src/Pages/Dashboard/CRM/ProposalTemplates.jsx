import React from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import NavbarCrm from './NavbarCrm'
import Footer from '../../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ProposalTemplates = () => {
  return (
    <div>
        <>
  <div className="wrapper thetop">
   <Header/>
   <Sidebar/>
    <div className=" content-wrapper ">
      <section className="no-print">
       <NavbarCrm/>
      </section>
      <section className="content-header no-print">
        <h1>Proposal template</h1>
      </section>
      <div className="box-header">
        <div className="box-tools">
          <Link className="btn btn-primary pull-right m-5" to="/crm/add-proposal-template">
          <FontAwesomeIcon icon={faPaperPlane} /> Send		              
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</>
</div>
  )
}

export default ProposalTemplates