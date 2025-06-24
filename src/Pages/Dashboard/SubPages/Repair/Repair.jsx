import React, { useState,useEffect } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import Footer from '../../../../Components/Footer'
import { faFileCsv, faPrint, faFileExcel, faFilePdf, faColumns, faDollarSign, faEye, faEdit, faTrash, faBan, faBook, faFileAlt, faShoppingCart, faBox } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './SubPage/Navbar'

const Repair = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchJobSheets = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/Repair/JobSheet/getAllJobSheet`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // You may need to add authentication headers, like Bearer token, if required
            // 'Authorization': `Bearer ${yourToken}`
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch warranty');
        }
  
        const result = await response.json();
        // Assuming result is an array of users, each user having the desired properties (username, name, role, email)
        if (result) {
            setData(result.result)
        } else {
          throw new Error('Failed to fetch warranty');
        }  
      } catch (error) {
        setError(error.message);
      }
    };

    useEffect(()=>{
      fetchJobSheets();
    },[])
    const textStyle = { color: 'black' };
  return (
<div >
  <div className="wrapper thetop" style={textStyle}>
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <Navbar/>
      <section className="content-header no-print">
        <h1> Repair <small>Dashboard</small></h1>
      </section>
      <section className="content no-print">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-solid">
              <div className="box-header with-border">
                <h4 className="box-title">Job sheets by status</h4>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="alert alert-info">
                      <h4>No data found, please add repair!</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Top Trending Brands</h3>
              </div>
              <div className="box-body">
                <div id="tyjrponhuvibegmqdsfckzwlx" style={{ height: "400px !important" }}></div>
                <div id="tyjrponhuvibegmqdsfckzwlx_loader"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    opacity: 1,
                    alignItems: "center",
                    height: 400
                  }}
                >
                <svg
                    width={50}
                    height={50}
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                <defs>
                    <linearGradient
                        x1="8.042%" y1="0%"
                        x2="65.682%" y2="23.865%"
                        id="a"
                    >
                       <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                       <stop stopColor="#22292F" stopOpacity=".631" offset="63.146%"/>
                       <stop stopColor="#22292F" offset="100%" />
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2"stroke="url(#a)" strokeWidth={2}>
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#22292F" cx={36} cy={18} r={1}>
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Top Trending Devices</h3>
              </div>
              <div className="box-body">
                <div id="zarbiocvjdxtgmqlwkpyshufn" style={{ height: "400px !important" }}></div>
                <div id="zarbiocvjdxtgmqlwkpyshufn_loader"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    opacity: 1,
                    alignItems: "center",
                    height: 400
                  }}
                >
                <svg
                    width={50}
                    height={50}
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                      <linearGradient
                        x1="8.042%"
                        y1="0%"
                        x2="65.682%"
                        y2="23.865%"
                        id="a"
                      >
                        <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                        <stop stopColor="#22292F" stopOpacity=".631" offset="63.146%"/>
                        <stop stopColor="#22292F" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2} >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#22292F" cx={36} cy={18} r={1}>
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-solid">
              <div className="box-header">
                <h3 className="box-title">Top Trending Device Models</h3>
              </div>
              <div className="box-body">
                <div id="ryqlvusbjzoxihpkcgnatdfem" style={{ height: "400px !important" }}></div>
                <div id="ryqlvusbjzoxihpkcgnatdfem_loader"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    opacity: 1,
                    alignItems: "center",
                    height: 400
                  }}
                >
                  <svg
                    width={50}
                    height={50}
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="8.042%"
                        y1="0%"
                        x2="65.682%"
                        y2="23.865%"
                        id="a"
                      >
                        <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                        <stop
                          stopColor="#22292F"
                          stopOpacity=".631"
                          offset="63.146%"
                        />
                        <stop stopColor="#22292F" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={2} >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#22292F" cx={36} cy={18} r={1}>
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                </div>
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
    <div className="modal fade" id="todays_profit_modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel"> Today's profit </h4>
          </div>
          <div className="modal-body">
            <input type="hidden" id="modal_today" defaultValue="2024-06-10" />
            <div className="row">
              <div id="todays_profit"></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  <div className="modal fade" id="task_modal" tabIndex={-1} role="dialog" aria-labelledby="gridSystemModalLabel"/>
</div>
  )
}

export default Repair