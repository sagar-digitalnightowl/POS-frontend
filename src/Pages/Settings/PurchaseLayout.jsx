import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Footer from '../../Components/Footer';

const PurchaseLayout = () => {
    const [showLetterHead, setShowLetterHead] = useState(false);

  const handleShowLetterHeadChange = () => {
    setShowLetterHead(!showLetterHead);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('/invoice-layouts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Invoice layout saved successfully!');
        // Handle successful save (e.g., redirect or reset form)
      } else {
        alert('Failed to save invoice layout.');
      }
    } catch (error) {
      console.error('Error saving invoice layout:', error);
      alert('An error occurred while saving the invoice layout.');
    }
  };
  return (
    <div>
      <div className="wrapper thetop">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Add new invoice layout</h1>
          </section>
          <section className="content">
            <form
              method="POST"
              action="/invoice-layouts"
              acceptCharset="UTF-8"
              id="add_invoice_layout_form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="box box-solid">
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="name">Layout name:*</label>
                        <input
                          className="form-control"
                          required
                          placeholder="Layout name"
                          name="name"
                          type="text"
                          id="name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="design">Design:*</label>
                        <input
                          className="form-control design_select"
                          type="text"
                          defaultValue="Delivery Note"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input
                              className="input-icheck"
                              id="show_letter_head"
                              name="show_letter_head"
                              type="checkbox"
                              checked={showLetterHead}
                              onChange={handleShowLetterHeadChange}
                            />
                            Show letter head
                          </label>
                        </div>
                      </div>
                    </div>
                    {showLetterHead && (
                      <div className="col-sm-6 letter_head_input">
                        <div className="form-group">
                          <label htmlFor="letter_head">Letter Head:</label>
                          <input
                            accept="image/*"
                            name="letter_head"
                            type="file"
                            id="letter_head"
                          />
                          <span className="help-block">
                            Upload a letterhead image containing all details of your business. Letterhead will be added at the top of the invoices. <br /> Max 1 MB, jpeg, gif, png formats only.
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="clearfix" />
                    <div className="col-sm-6 hide-for-letterhead">
                      <div className="form-group">
                        <label htmlFor="logo">Invoice Logo:</label>
                        <input
                          accept="image/*"
                          name="logo"
                          type="file"
                          id="logo"
                        />
                        <span className="help-block">
                          Max 1 MB, jpeg, gif, png formats only.
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6 hide-for-letterhead">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input
                              className="input-icheck"
                              name="show_logo"
                              type="checkbox"
                              defaultValue={1}
                            />
                            Show invoice Logo
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 hide-for-letterhead">
                      <div className="form-group">
                        <label htmlFor="header_text">Header text:</label>
                        <textarea
                          className="form-control"
                          placeholder="Header text"
                          rows={3}
                          name="header_text"
                          cols={50}
                          id="header_text"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row hide-for-letterhead">
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="sub_heading_line1">
                          Sub Heading Line 1:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Sub Heading Line 1"
                          name="sub_heading_line1"
                          type="text"
                          id="sub_heading_line1"
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="sub_heading_line2">
                          Sub Heading Line 2:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Sub Heading Line 2"
                          name="sub_heading_line2"
                          type="text"
                          id="sub_heading_line2"
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="sub_heading_line3">
                          Sub Heading Line 3:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Sub Heading Line 3"
                          name="sub_heading_line3"
                          type="text"
                          id="sub_heading_line3"
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="sub_heading_line4">
                          Sub Heading Line 4:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Sub Heading Line 4"
                          name="sub_heading_line4"
                          type="text"
                          id="sub_heading_line4"
                        />
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label htmlFor="sub_heading_line5">
                          Sub Heading Line 5:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Sub Heading Line 5"
                          name="sub_heading_line5"
                          type="text"
                          id="sub_heading_line5"
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 show-for-full hide">
                      <div className="form-group">
                        <label htmlFor="invoice_font_size">
                          Invoice Font Size:
                        </label>
                        <input
                          className="form-control"
                          placeholder="Invoice Font Size"
                          name="invoice_font_size"
                          type="number"
                          defaultValue={14}
                          id="invoice_font_size"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn btn-primary btn-big">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PurchaseLayout