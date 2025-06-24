import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="container-fluid" style={{ height: '100vh', padding: 0 }}>
      <div className="row eq-height-row" style={{ height: '100%' }}>
        <div className="col-md-5 col-sm-5 hidden-xs left-col eq-height-col" style={{ backgroundColor: 'green', height: '100%' }}>
          <div className="left-col-content login-header" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <Link to="/" style={{ fontSize: '24px', color: 'white' }}>POS APPLICATION</Link>
              <br />
              <small style={{ color: 'white' }}>Affinity Soft</small>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-sm-7 col-xs-12 right-col eq-height-col" style={{ height: '100%' }}>
          <div className="row" style={{ height: '100%' }}>
            <div className="col-md-3 col-xs-4" style={{ textAlign: 'left' }}>
              <select className="form-control input-sm" id="change_lang" style={{ margin: 10 }}>
                <option value="en" selected>English</option>
                <option value="ar">Arabic - العَرَبِيَّة</option>
              </select>
            </div>
            <div className="col-md-9 col-xs-8" style={{ textAlign: 'right', paddingTop: 10 }}>
              &nbsp; &nbsp;
              <span className="text-white">Already registered? </span>
              <Link to="/login">Sign In</Link>
            </div>
            <div className="login-form col-md-12 col-xs-12 right-col-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 50px)' }}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <form method="POST" action="https://medipro.affinity-me.com/password/email">
                  <div className="form-group has-feedback">
                    <input id="email"type="email"className="form-control"name="email"
                      defaultValue=""required=""autoFocus=""placeholder="E-Mail Address"
                    />
                    <span className="fa fa-envelope form-control-feedback" />
                  </div>
                  <br />
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">
                      Send Password Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
