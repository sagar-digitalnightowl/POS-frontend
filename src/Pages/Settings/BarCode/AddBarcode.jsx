import react from 'react'
import Header from '../../../Components/Header'
import Sidebar from '../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextWidth, faTextHeight, faEllipsisH, faTh } from '@fortawesome/free-solid-svg-icons';
import { FaArrowUp, FaArrowLeft, FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';
import Footer from '../../../Components/Footer'

const AddBarcode = () => {
    return(
<div>
  <div className="wrapper thetop">
    <Header/>
    <Sidebar/>
    <div className=" content-wrapper ">
      <section className="content-header">
        <h1>Add barcode sticker setting</h1>
      </section>
      <section className="content">
        <form method="POST"action="/barcodes"acceptCharset="UTF-8"id="add_barcode_settings_form">
          <div className="box box-solid">
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="name">Sticker Sheet setting Name:*</label>
                    <input className="form-control"required=""placeholder="Sticker Sheet setting Name"name="name"type="text"id="name"/>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="description">Sticker Sheet setting Description</label>
                    <textarea className="form-control"placeholder="Sticker Sheet setting Description"
                      rows={3}name="description"cols={50}id="description"defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input id="is_continuous"name="is_continuous"type="checkbox"defaultValue={1}/>
                        Continous feed or rolls
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="top_margin">Additional top margin (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FaArrowUp />
                      </span>
                      <input className="form-control" placeholder="Additional top margin"min={0}step="1.0E-5"
                        required=""name="top_margin"type="number"defaultValue={0}id="top_margin"
                        />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="left_margin">Additional left margin (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FaArrowLeft />
                      </span>
                      <input className="form-control"placeholder="Additional left margin"min={0}step="1.0E-5"
                        required=""name="left_margin"type="number"defaultValue={0}id="left_margin"
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="width">Width of sticker (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faTextWidth} />
                      </span>
                      <input className="form-control"placeholder="Width of sticker"min="0.1"
                        step="1.0E-5"required=""name="width"type="number"id="width"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="height">
                      Height of sticker (In Inches):*
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faTextHeight} />
                      </span>
                      <input className="form-control"placeholder="Height of sticker"min="0.1"
                        step="1.0E-5"required=""name="height"type="number"id="height"
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="paper_width">Paper width (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faTextWidth} />
                      </span>
                      <input className="form-control" placeholder="Paper width"min="0.1"step="1.0E-5"
                        required=""name="paper_width"type="number"id="paper_width"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 paper_height_div">
                  <div className="form-group">
                    <label htmlFor="paper_height">Paper height (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faTextHeight} />
                      </span>
                      <input className="form-control"placeholder="Paper height"min="0.1"
                        step="1.0E-5"required=""name="paper_height"type="number"id="paper_height"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="stickers_in_one_row">Stickers in one row:*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faEllipsisH} />
                      </span>
                      <input className="form-control"placeholder="Stickers in one row"min={1}
                        required=""name="stickers_in_one_row"type="number"id="stickers_in_one_row"
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="row_distance">Distance between two rows (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FaArrowsAltH/>
                      </span>
                      <input className="form-control"placeholder="Distance between two rows"min={0}step="1.0E-5"
                        required=""name="row_distance"type="number"defaultValue={0}id="row_distance"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="col_distance">Distance between two columns (In Inches):*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                        <FaArrowsAltV/>
                      </span>
                      <input className="form-control"placeholder="Distance between two columns"min={0}step="1.0E-5"
                        required=""name="col_distance"type="number"defaultValue={0}id="col_distance"
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6 stickers_per_sheet_div">
                  <div className="form-group">
                    <label htmlFor="stickers_in_one_sheet"> No. of Stickers per sheet:*</label>
                    <div className="input-group">
                      <span className="input-group-addon">
                      <FontAwesomeIcon icon={faTh} />
                      </span>
                      <input className="form-control"placeholder="No. of Stickers per sheet"min={1}
                        required=""name="stickers_in_one_sheet"type="number"id="stickers_in_one_sheet"
                      />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input name="is_default"type="checkbox"defaultValue={1}/>Set as default </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn btn-primary btn-big">
                    Save
                  </button>
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
 export default AddBarcode