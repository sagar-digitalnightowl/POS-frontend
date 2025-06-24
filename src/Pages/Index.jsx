import React from 'react';
import {  useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundImage: "url('assets/img/login-bg.jpg')", backgroundSize: 'cover', height: '100vh' }}>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="index">
              Medipro
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <a href="pricing.html">Pricing</a>
              </li>
              <li>
                <a href="repair-status.html">Repair Status </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
              <span onClick={()=>navigate("/login")}>
                Login
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="content">
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `
              .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
                margin-top: 10%;
              }
              .title {
                font-size: 84px;
              }
              .tagline {
                font-size: 25px;
                font-weight: 250;
                text-align: center;
              }
              @media only screen and (max-width: 600px) {
                .title {
                  font-size: 38px;
                }
                .tagline {
                  font-size: 18px;
                }
              }
            `,
            }}
          />
          <div className="title flex-center" style={{ fontWeight: '600 !important' }}>
          Client Company
          </div>
          <p className="tagline">Our Company</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
