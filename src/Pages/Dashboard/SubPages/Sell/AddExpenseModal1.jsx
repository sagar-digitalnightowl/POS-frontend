import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faInfo, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddExpenseModal1 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '600px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Add Expense</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.2em', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_location_id">Business Location:*</label>
                <select className="form-control select2 select2-hidden-accessible" required="" name="location_id" tabIndex={-1} aria-hidden="true" aria-required="true">
                  <option selected="selected" value="">Please Select</option>
                </select>
                <span className="select2 select2-container select2-container--default select2-container--below" dir="ltr" style={{ width: '100%' }}>
                  <span className="selection">
                    <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-expense_location_id-container">
                      <span className="select2-selection__rendered" id="select2-expense_location_id-container" title="Please Select">
                        Please Select
                      </span>
                      <span className="select2-selection__arrow" role="presentation">
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_category_id">Expense Category:</label>
                <select className="form-control select2 select2-hidden-accessible" id="expense_category_id" name="expense_category_id" tabIndex={-1} aria-hidden="true">
                  <option selected="selected" value="">Please Select</option>
                </select>
                <span className="select2 select2-container select2-container--default select2-container--below" dir="ltr" style={{ width: '100%' }}>
                  <span className="selection">
                    <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-expense_category_id-container">
                      <span className="select2-selection__rendered" id="select2-expense_category_id-container" title="Please Select">
                        Please Select
                      </span>
                      <span className="select2-selection__arrow" role="presentation">
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="clearfix" />
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_ref_no">Reference No:</label>
                <input className="form-control" id="expense_ref_no" name="ref_no" type="text" />
                <p className="help-block">Leave empty to autogenerate </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_transaction_date">Date:*</label>
                <div className="input-group">
                  <span className="input-group-addon">
                    <FontAwesomeIcon icon={faCalendar} />
                  </span>
                  <input className="form-control" readOnly="" required="" id="expense_transaction_date" name="transaction_date" type="text" defaultValue="31/07/2024 10:31" aria-required="true" />
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_for">Expense for:</label>{" "}
                <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom"
                  data-content="Choose the user for which expense is related to. <i>(Optional)</i><br/><small>Example: Salary of an employee.</small>"
                  data-html="true" data-trigger="hover"
                />
                <select className="form-control select2 select2-hidden-accessible" id="expense_for" name="expense_for" tabIndex={-1} aria-hidden="true">
                  <option selected="selected" value="">Please Select</option>
                  <option value="" selected="selected">None</option>
                  <option value={4}> POS ADMIN </option>
                </select>
                <span className="select2 select2-container select2-container--default select2-container--below" dir="ltr" style={{ width: '100%' }}>
                  <span className="selection">
                    <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-expense_for-container">
                      <span className="select2-selection__rendered" id="select2-expense_for-container" title="None">
                        None
                      </span>
                      <span className="select2-selection__arrow" role="presentation">
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="expense_tax_id">Applicable Tax:</label>
                <div className="input-group">
                  <span className="input-group-addon">
                    <FontAwesomeIcon icon={faInfo} />
                  </span>
                  <select className="form-control" id="expense_tax_id" name="tax_id">
                    <option value="" selected="selected">None</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_final_total">Total amount:*</label>
                <input className="form-control input_number" placeholder="Total amount" required="" id="expense_final_total" name="final_total" type="text" aria-required="true" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="expense_additional_notes">Expense note:</label>
                <textarea className="form-control" rows={3} id="expense_additional_notes" name="additional_notes" cols={50} defaultValue={""} />
              </div>
            </div>
          </div>
          <div className="payment_row">
            <h4>Add payment:</h4>
            <div className="row">
              <input type="hidden" className="payment_row_index" defaultValue={0} />
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="amount_0">Amount:*</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fas fa-money-bill-alt" />
                    </span>
                    <input className="form-control payment-amount input_number" required="" id="amount_0" placeholder="Amount" name="payment[0][amount]" type="text" defaultValue={0.0} aria-required="true" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="paid_on_0">Paid on:*</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                    <input className="form-control paid_on" readOnly="" required="" name="payment[0][paid_on]" type="text" defaultValue="31/07/2024 10:31 AM" aria-required="true" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="method_0">Payment Method:*</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fas fa-money-bill-alt" />
                    </span>
                    <select className="form-control col-md-12 payment_types_dropdown" required="" id="method_0" style={{ width: '100%' }} name="payment[0][method]" aria-required="true">
                      <option value="cash" selected="selected">Cash</option>
                      <option value="card">Card</option>
                      <option value="cheque">Cheque</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="other">Other</option>
                      <option value="custom_pay_1">Benefit Pay</option>
                      <option value="custom_pay_2">Custom Payment 2</option>
                      <option value="custom_pay_3">Custom Payment 3</option>
                      <option value="custom_pay_4">Custom Payment 4</option>
                      <option value="custom_pay_5">Custom Payment 5</option>
                      <option value="custom_pay_6">Custom Payment 6</option>
                      <option value="custom_pay_7">Custom Payment 7</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="note_0">Payment note:</label>
                  <textarea className="form-control" rows={3} id="note_0" name="payment[0][note]" cols={50} defaultValue={""} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <div className="pull-right">
                  <strong>Payment due:</strong>
                  <span id="expense_payment_due">0.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '10px 15px', marginRight: '10px' }}>Close</button>
          <button style={{ padding: '10px 15px' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal1;
