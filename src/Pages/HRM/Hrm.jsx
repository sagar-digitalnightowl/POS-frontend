import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import HeaderHrm from './HeaderHrm'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faCoins, faSignOutAlt, faSuitcaseRolling, faUserCheck, faUsers, faUserTimes } from '@fortawesome/free-solid-svg-icons'

const Hrm = () => {
  const textStyle={color:'black'}
  return (
    <div><div>
    <div className="wrapper thetop" style={textStyle}>
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <HeaderHrm/>
        <section className="content">
          <div className="row row-custom">
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-header with-border">
                <FontAwesomeIcon icon={faSignOutAlt} />
                  <h3 className="box-title">My leaves</h3>
                </div>
                <div className="box-body p-10">
                  <table className="table no-margin">
                    <thead>
                      <tr>
                        <td colSpan={2} className="text-center">No data</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <FontAwesomeIcon icon={faBullseye} />
                  <h3 className="box-title">My sales targets</h3>
                </div>
                <div className="box-body p-10">
                  <table className="table no-margin">
                    <thead>
                      <tr>
                        <td>
                          <strong>Target achieved last month:
                          </strong>
                          <h4 className="text-success">BD 0.000</h4>
                        </td>
                        <td>
                          <strong>Target achieved this month:
                          </strong>
                          <h4 className="text-success">BD 0.000</h4>
                        </td>
                      </tr>
                      <tr>
                        <th>Targets</th>
                        <th>Commission Percent</th>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">No data</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 text-center">
              <Link to="https://medipro.affinity-me.com/hrm/my-payrolls" className="btn btn-lg btn-success">
                <FontAwesomeIcon icon={faCoins} />
                My Payrolls          
              </Link>
            </div>
          </div>
          <hr />
          <div className="row row-custom">
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-body p-10">
                  <div className="info-box info-box-new-style">
                    <span className="info-box-icon bg-aqua">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">Users</span>
                      <span className="info-box-number">1</span>
                    </div>
                  </div>
                  <table className="table no-margin">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="text-center">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <FontAwesomeIcon icon={faUserTimes} />
                  <h3 className="box-title">Leaves</h3>
                </div>
                <div className="box-body p-10">
                  <table className="table no-margin">
                    <tbody><tr>
                        <th className="bg-light-gray" colSpan={2}>Today</th>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">No data</td>
                      </tr>
                      <tr>
                        <td colSpan={2}>&nbsp;</td>
                      </tr>
                      <tr>
                        <th className="bg-light-gray" colSpan={2}>Upcoming</th>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <FontAwesomeIcon icon={faSuitcaseRolling} />
                  <h3 className="box-title">Holidays</h3>
                </div>
                <div className="box-body p-10">
                  <table className="table no-margin">
                    <tbody>
                      <tr>
                        <th className="bg-light-gray" colSpan={3}>Today</th>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-center">No data</td>
                      </tr>
                      <tr>
                        <td colSpan={3}>&nbsp;</td>
                      </tr>
                      <tr>
                        <th className="bg-light-gray" colSpan={3}>Upcoming</th>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-center">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-custom">
            <div className="col-md-4 col-sm-6 col-xs-12 col-custom">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <FontAwesomeIcon icon={faUserCheck} />
                  <h3 className="box-title">Today's Attendance</h3>
                </div>
                <div className="box-body p-10">
                  <table className="table no-margin">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={3} className="text-center">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="box box-solid">
                <div className="box-header with-border">
                  <FontAwesomeIcon icon={faBullseye} />
                  <h3 className="box-title">Sales targets</h3>
                </div>
                <div className="box-body">
                  <table className="table" id="sales_targets_table" style={{width: '100%'}}>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Target achieved last month</th>
                        <th>Target achieved this month</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
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
export default Hrm