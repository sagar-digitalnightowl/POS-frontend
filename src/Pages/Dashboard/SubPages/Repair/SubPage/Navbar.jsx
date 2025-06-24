import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    const navigate = useNavigate();

    const navLinkStyle = {
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
    };

    return (
        <div>
            <section className="no-print">
                <nav className="navbar navbar-default bg-white m-4">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link className="navbar-brand" to="/repairs" style={navLinkStyle}>
                                <FontAwesomeIcon icon={faTools} /> 
                                <span onClick={() => navigate("/repairs")} style={navLinkStyle}>Repair</span>
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/repairs/job-sheet" style={navLinkStyle}>
                                        <span onClick={() => navigate("/repairs/job-sheet")} style={navLinkStyle}>Job Sheets</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/repairs/job-sheet/create" style={navLinkStyle}>
                                        <span onClick={() => navigate("/repairs/job-sheet/create")} style={navLinkStyle}>Add job sheet</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to="/repairs/repair" style={navLinkStyle}>
                                        <span onClick={() => navigate("/repairs/repair")} style={navLinkStyle}>Invoices</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/repairs-addinvoice" style={navLinkStyle}>
                                        <span onClick={() => navigate("/repairs-addinvoice")} style={navLinkStyle}>Add Invoice</span>
                                    </Link>
                                </li> */}
                                {/* <li>
                                    <Link to="/repairs/brands" style={navLinkStyle}>Brands</Link>
                                </li> */}
                                <li>
                                    <Link to="/repairs/setting" style={navLinkStyle}>Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
};

export default Navbar;
