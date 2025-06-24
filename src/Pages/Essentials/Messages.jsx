import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import EssentialHeader from './EssentialHeader'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Messages = () => {
  return (
    <div><>
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
              <i className="fa fa-comments-o" />
              <h3 className="box-title">Messages</h3>
            </div>
            <div className="box-body"id="chat-box"style={{ height: "70vh", overflowY: "scroll" }}/>
            <div className="box-footer">
              <form method="POST"action="https://medipro.affinity-me.com/essentials/messages"
                acceptCharset="UTF-8"id="add_essentials_msg_form">
                <div className="input-group">
                  <textarea
                    className="form-control"
                    required=""
                    id="chat-msg"
                    placeholder="Type message..."
                    rows={1}
                    name="message"
                    cols={50}
                    defaultValue={""}
                  />
                  <div className="input-group-addon"style={{ width: 137, padding: 0, border: "none" }}>
                    <select className="form-control"style={{ width: "100%" }}name="location_id">
                      <option selected="selected" value="">Select location</option>
                    </select>
                  </div>
                  <div className="input-group-btn">
                    <button type="submit"className="btn btn-success pull-right ladda-button"data-style="expand-right">
                      <span className="ladda-label">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  </>
  </div>
  )
}

export default Messages