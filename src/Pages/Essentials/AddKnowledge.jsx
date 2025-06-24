import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import EssentialHeader from './EssentialHeader'
import Footer from '../../Components/Footer'

const AddKnowledge = () => {
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
          <form
            method="POST"
            action="https://medipro.affinity-me.com/essentials/knowledge-base"
            acceptCharset="UTF-8"
          >
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Add knowledge base</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="title">Title:*</label>
                      <input
                        className="form-control"
                        placeholder="Title"
                        required=""
                        name="title"
                        type="text"
                        id="title"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="content">Content:</label>
                      <textarea
                        className="form-control"
                        placeholder="Content"
                        name="content"
                        cols={50}
                        rows={10}
                        id="content"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="share_with">Share with:</label>
                      <select className="form-control select2" id="share_with"name="share_with">
                        <option value="public" selected="selected">Public</option>
                        <option value="private">Private</option>
                        <option value="only_with">Only with</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6"id="user_ids_div"style={{ display: "none" }}>
                    <div className="form-group">
                      <label htmlFor="user_ids">Share only with:</label>
                      <select className="form-control select2"multiple=""id="user_ids"style={{ width: "100%" }}name="user_ids[]">
                        <option value={4}>POS  ADMIN </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary pull-right">Save</button>
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

export default AddKnowledge