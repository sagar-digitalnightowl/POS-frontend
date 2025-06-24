import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faInfoCircle, faPrint } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import Footer from '../../../../Components/Footer'


const TrendingProduct = () => {
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

    const textStyle={color:'black'}
  return (
    <div>
    <div className="wrapper thetop" style={textStyle}>
      <Header/>
      <Sidebar/>
      <div className=" content-wrapper ">
        <section className="content-header">
          <h1>Trending Products</h1>
        </section>
        <section className="content">
          <div className="row no-print">
              <div className="box  box-solid " id="accordion">
                <div className="box-header with-border" style={{ cursor: "pointer" }}>
                  <h3 className="box-title">
                    <Link data-toggle="collapse" data-parent="#accordion"to="#collapseFilter">
                       <FontAwesomeIcon icon={faFilter} aria-hidden="true" /> Filters
                    </Link>
                  </h3>
                </div>
                <div id="collapseFilter" className="panel-collapse active collapse  in " aria-expanded="true">
                  <div className="box-body">
                    <form method="GET"action="/reports/trending-products"acceptCharset="UTF-8">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="location_id">Business Location:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="location_id" name="location_id">
                            <option value="" selected="selected"> All locations</option>
                            <option value={4}>
                              POS APPLICATION
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="category_id">Category:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="category_id"name="category">
                            <option selected="selected" value="">All</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                          <label htmlFor="sub_category_id">Sub category:</label>
                          <select className="form-control select2" style={{ width: "100%" }} id="sub_category_id" name="sub_category">
                            <option selected="selected" value="">All</option>
                          </select>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="brand">Brand:</label>
                          <select className="form-control select2" style={{ width: "100%" }}id="brand"name="brand">
                            <option selected="selected" value="">All</option>
                            <option value={61}>Sanibel</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="unit">Unit:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="unit"name="unit">
                            <option selected="selected" value="">All</option>
                            <option value={4}>Pc(s)</option>
                            <option value={21}>box</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="trending_product_date_range">Date Range:</label>
                          <DatePicker selected={startDate} onChange={handleDateChange}startDate={startDate}endDate={endDate}
                          selectsRange placeholderText="Select a date range"className="form-control"id="sell_list_filter_date_range"
                         />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="limit">Number of products:</label>{" "}
                          <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="Number of top trending products to be compared in the chart below."data-html="true"data-trigger="hover"
                          />
                          <input placeholder="Number of products"className="form-control"min={1}name="limit"type="number"defaultValue={5}id="limit"/>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="product_type">Product Type:</label>
                          <select className="form-control select2"style={{ width: "100%" }}id="product_type"name="product_type">
                            <option selected="selected" value="">All</option>
                            <option value="single">Single</option>
                            <option value="variable">Variable</option>
                            <option value="combo">Combo</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <button type="submit"className="btn btn-primary pull-right">
                            Apply Filters
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>{" "}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    Top Trending Products{" "}
                    <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                      data-content="Top selling products of your shop. <br/><small class='text-muted'>Apply filters to know trending products for specific Category, Brand, Business Location etc.</small>"
                      data-html="true"data-trigger="hover"
                    />
                  </h3>
                </div>
                <div className="box-body">
                  <div id="orvmnjdlyfsikhwxuegzbqapc"style={{ height: "400px !important" }}/>
                  <div id="orvmnjdlyfsikhwxuegzbqapc_loader"style={{display: "flex",justifyContent: "center",opacity: 1,alignItems: "center",height: 400}}>
                    <svg width={50}height={50}viewBox="0 0 38 38"xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient x1="8.042%"y1="0%"x2="65.682%"y2="23.865%"id="a">
                          <stop stopColor="#22292F" stopOpacity={0} offset="0%" />
                          <stop stopColor="#22292F"stopOpacity=".631"offset="63.146%"/>
                          <stop stopColor="#22292F" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)">
                          <path d="M36 18c0-9.94-8.06-18-18-18"id="Oval-2"stroke="url(#a)"strokeWidth={2}>
                            <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite"/>
                          </path>
                          <circle fill="#22292F" cx={36} cy={18} r={1}>
                            <animateTransform attributeName="transform" type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite"/>
                          </circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="col-sm-12">
              <button type="button" className="btn btn-primary pull-right" aria-label="Print" onclick="window.print();">
                 <FontAwesomeIcon icon={faPrint} /> Print
              </button>
            </div>
        </section>
      </div>
      <Footer/>
    </div>
 </div>
  )
}

export default TrendingProduct