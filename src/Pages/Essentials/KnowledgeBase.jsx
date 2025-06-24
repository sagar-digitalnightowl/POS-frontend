import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import EssentialHeader from './EssentialHeader'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const KnowledgeBase = () => {
  return (
    <div>
    <div className="wrapper thetop">
        <Header/>
        <Sidebar/>
      <div className=" content-wrapper ">
        <section className="no-print">
            <EssentialHeader/>
        </section>
        <section className="content">
          <div className="box box-solid">
            <div className="box-header">
              <h4 className="box-title">Knowledge Base</h4>
              <div className="box-tools pull-right">
                <Link to="/knowledge-base/create" className="btn btn-sm btn-primary">
                  <FontAwesomeIcon icon={faPlus} />
                  Add
                </Link>
              </div>
            </div>
          </div>
        </section> 
      </div>
      </div>
      <Footer/>
   </div>
  )
}
export default KnowledgeBase