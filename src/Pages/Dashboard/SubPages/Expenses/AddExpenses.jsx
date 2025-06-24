import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header'
import Sidebar from '../../../../Components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faInfoCircle, faInfo, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../../Components/Footer'
import { apiCall } from '../../../../utils/apiCall';
import { useNavigate } from 'react-router-dom';

const AddExpenses = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])



    const [formData, setFormData] = useState({
        businessLocation: '',
        expenseCategory: '',
        subCategory: '',
        referenceNo: '',
        date: '',
        expenseFor: '',
        expenseForContact: '',
        attachDocument: null,
        applicableTax: '',
        totalAmount: '',
        expenseNote: '',
        isRefund: '',
        isRecurring: '',
        recurringInterval: {
            value: "",
            unit: ""
        },
        numberOfRepetitions: '',
        payment: {
            amount: '',
            paidOn: '',
            paymentMethod: '',
            paymentNote: '',
        },
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleIsRefundChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            isRefund: checked,
            isRecurring: '',
            recurringInterval: {
                value: "",
                unit: ""
            },
            numberOfRepetitions: '',
        }))
    }

    const handleRecurringIntervalChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            recurringInterval: {
                ...prev.recurringInterval,
                [name]: value
            }
        }))
    }

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                [name]: value
            }
        }))
    }

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: `/admin/expense/expenseCategory/getAllExpenseCategory`,
            });

            if (res.status === 200) {
                setCategories(res.data.result);
            } else {
                setError(res?.data?.message);
            }
        } catch (error) {
            setError(error.message);
            console.log("Error in get all expence category : ", error);
        } finally {
            setLoading(true);
        }
    }


    const addExpenses = async (data) => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "post",
                url: `/admin/expense/addExpense/addExpense`,
                data: data
            });

            if (res.status === 201) {
                navigate('/expenses')
            } else {
                setError(res?.data?.message);
            }
        } catch (error) {
            setError(error.message);
            console.log("Error add new expense : ", error);
        } finally {
            setLoading(true);
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("businessLocation", formData.businessLocation)
        form.append("expenseCategory", formData.expenseCategory)
        form.append("subCategory", formData.subCategory)
        form.append("referenceNo", formData.referenceNo)
        form.append("date", formData.date)
        form.append("expenseFor", formData.expenseFor)
        form.append("expenseForContact", formData.expenseForContact)
        if (formData?.attachDocument) {
            form.append("attachDocument", formData.attachDocument)
        }
        form.append("applicableTax", formData.applicableTax)
        form.append("totalAmount", formData.totalAmount)
        form.append("expenseNote", formData.expenseNote)
        form.append("isRefund", formData.isRefund)
        form.append("isRecurring", formData.isRecurring)
        form.append("recurringInterval", JSON.stringify(formData.recurringInterval))
        form.append("numberOfRepetitions", formData.numberOfRepetitions)
        form.append("payment", JSON.stringify(formData.payment))

        addExpenses(form);

    }


    useEffect(() => {
        fetchCategories();
    }, [])


    return (
        <div>
            <div className="wrapper thetop">
                <Header />
                <Sidebar />
                <div className=" content-wrapper ">
                    <section className="content-header">
                        <h1>Add Expense</h1>
                    </section>
                    <section className="content">
                        <form
                            id="add_expense_form"
                            onSubmit={handleSubmit}
                        >
                            <div className="box box-solid">
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="location_id">Business Location:*</label>
                                                <select
                                                    className="form-control select2"
                                                    required
                                                    id="location_id"
                                                    name="businessLocation"
                                                    value={formData.businessLocation}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Please Select</option>
                                                    <option value="POS APPLICATION">
                                                        POS APPLICATION
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="expense_category_id">Expense Category:</label>
                                                <select
                                                    className="form-control select2"
                                                    id="expense_category_id"
                                                    name="expenseCategory"
                                                    value={formData.expenseCategory}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Please Select</option>
                                                    {
                                                        categories?.map(category => (
                                                            <option key={category?._id} value={category?._id}>{category.categoryName}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="expense_sub_category_id">Sub category:</label>
                                                {/* <select className="form-control select2" id="expense_sub_category_id" name="expense_sub_category_id">
                                                    <option selected="selected" value="">Please Select</option>
                                                </select> */}
                                                <input
                                                    className="form-control"
                                                    name="subCategory"
                                                    type="text"
                                                    id="expense_sub_category_id"
                                                    value={formData.subCategory}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="ref_no">Reference No:</label>
                                                <input
                                                    className="form-control"
                                                    name="referenceNo"
                                                    type="text"
                                                    id="ref_no"
                                                    value={formData.referenceNo}
                                                    onChange={handleChange}
                                                />
                                                <p className="help-block">Leave empty to autogenerate </p>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="transaction_date">Date:*</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <FontAwesomeIcon icon={faCalendar} />
                                                    </span>
                                                    <input className="form-control" readOnly="" required="" id="expense_transaction_date"
                                                        name="date" type="date"
                                                        value={formData?.date?.substring(0, 10) || 0}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group"><label htmlFor="expense_for">Expense for:</label>
                                                <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"
                                                    data-container="body" data-toggle="popover" data-placement="auto bottom"
                                                    data-content="Choose the user for which expense is related to. <i>(Optional)</i><br/><small>Example: Salary of an employee.</small>"
                                                    data-html="true" data-trigger="hover"
                                                />
                                                <select
                                                    className="form-control select2"
                                                    id="expense_for"
                                                    name="expenseFor"
                                                    value={formData.expenseFor}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Please Select</option>
                                                    {/* <option value="None">None</option> */}
                                                    <option value="POS APPLICATION ADMIN"> POS APPLICATION ADMIN </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="contact_id">Expense for contact:</label>
                                                <select
                                                    className="form-control select2"
                                                    id="contact_id"
                                                    name="expenseForContact"
                                                    value={formData.expenseForContact}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Please Select</option>
                                                    <option value="Walk-In Customer - (CO0001)">Walk-In Customer - (CO0001)</option>
                                                    <option value="test - (CO0002)">test - (CO0002)</option>
                                                    <option value="Seeam - (CO0003)">Seeam - (CO0003)</option>
                                                    <option value="zamini - (CO0004)">zamini - (CO0004)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="document">Attach Document:</label>
                                                <input id="upload_document"
                                                    accept="application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png"
                                                    name="document" type="file"
                                                    onChange={(e) => setFormData(prev => ({ ...prev, attachDocument: e.target.files[0] }))}
                                                />
                                                <small>
                                                    <p className="help-block">
                                                        Max File size: 5MB <br />Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg,.jpg, .png
                                                    </p>
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="tax_id">Applicable Tax:</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <FontAwesomeIcon icon={faInfo} />
                                                    </span>
                                                    <select
                                                        className="form-control"
                                                        id="tax_id"
                                                        name="applicableTax"
                                                        value={formData.applicableTax}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">None</option>
                                                    </select>
                                                    <input type="hidden" name="tax_calculation_amount" id="tax_calculation_amount" defaultValue={0} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="final_total">Total amount:*</label>
                                                <input className="form-control input_number" placeholder="Total amount"
                                                    required="" name="totalAmount" type="text" id="final_total"
                                                    value={formData.totalAmount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="additional_notes">Expense note:</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    name="expenseNote"
                                                    cols={50}
                                                    id="additional_notes"
                                                    value={formData.expenseNote}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <br />
                                            <label>
                                                <input className="input-icheck" id="is_refund" name="isRefund" type="checkbox"
                                                    checked={formData.isRefund}
                                                    onChange={handleIsRefundChange}
                                                />
                                                Is refund?
                                            </label>
                                            <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" data-container="body"
                                                data-toggle="popover" data-placement="auto bottom" data-content="If checked expense will be refunded and will be added to net profit"
                                                data-html="true" data-trigger="hover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {formData?.isRefund && (
                                <div className="box box-solid" id="recur_expense_div">
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-4 col-sm-6">
                                                <br />
                                                <label>
                                                    <input
                                                        className="input-icheck"
                                                        id="is_recurring"
                                                        name="isRecurring"
                                                        type="checkbox"
                                                        defaultValue={1}
                                                        checked={formData?.isRecurring}
                                                        onChange={handleChange}
                                                    />
                                                    Is Recurring?
                                                </label>
                                                <FontAwesomeIcon
                                                    icon={faInfoCircle}
                                                    aria-hidden="true"
                                                    data-container="body"
                                                    data-toggle="popover"
                                                    data-placement="auto bottom"
                                                    data-content="If checked this expense will be automatically generated at regular intervals."
                                                    data-html="true"
                                                    data-trigger="hover"
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="recur_interval">Recurring interval:*</label>
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            style={{ width: '50%' }}
                                                            name="value"
                                                            type="number"
                                                            id="recur_interval"
                                                            value={formData?.recurringInterval?.value}
                                                            onChange={handleRecurringIntervalChange}
                                                        />
                                                        <select
                                                            className="form-control"
                                                            style={{ width: '50%' }}
                                                            id="recur_interval_type"
                                                            name="unit"
                                                            value={formData?.recurringInterval?.unit}
                                                            onChange={handleRecurringIntervalChange}
                                                        >
                                                            <option value="">select</option>
                                                            <option value="days">Days</option>
                                                            <option value="months">Months</option>
                                                            <option value="years">Years</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="recur_repetitions">No. of Repetitions:</label>
                                                    <input
                                                        className="form-control"
                                                        name="numberOfRepetitions"
                                                        type="number"
                                                        id="recur_repetitions"
                                                        value={formData?.numberOfRepetitions}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="help-block">If blank expense will be generated infinite times</p>
                                                </div>
                                            </div>
                                            <div className="recur_repeat_on_div col-md-4 hide">
                                                <div className="form-group">
                                                    <label htmlFor="subscription_repeat_on">Repeat on:</label>
                                                    <select
                                                        className="form-control"
                                                        id="subscription_repeat_on"
                                                        name="subscription_repeat_on"
                                                    >
                                                        <option selected="selected" value="">Please Select</option>
                                                        <option value={1}>1st</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="box box-solid" id="payment_rows_div">
                                <div className="box-header">
                                    <h3 className="box-title">Add payment</h3>
                                </div>
                                <div className="box-body">
                                    <div className="payment_row">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="amount_0">Amount:*</label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <FontAwesomeIcon icon={faMoneyBillAlt} />
                                                        </span>
                                                        <input className="form-control payment-amount input_number" required="" id="amount_0"
                                                            placeholder="Amount" name="amount" type="text"
                                                            value={formData?.payment?.amount}
                                                            onChange={handlePaymentChange}
                                                        />
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
                                                        <input className="form-control paid_on" readOnly="" required="" name="paidOn"
                                                            type="date"
                                                            value={formData?.payment?.paidOn?.substring(0, 10) || ''}
                                                            onChange={handlePaymentChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="method_0">Payment Method:*</label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <FontAwesomeIcon icon={faMoneyBillAlt} />
                                                        </span>
                                                        <select className="form-control col-md-12 payment_types_dropdown" required=""
                                                            id="method_0" style={{ width: "100%" }} name="paymentMethod"
                                                            value={formData?.payment?.paymentMethod}
                                                            onChange={handlePaymentChange}
                                                        >
                                                            <option value="">select</option>
                                                            <option value="Cash">Cash</option>
                                                            <option value="Card">Card</option>
                                                            <option value="Cheque">Cheque</option>
                                                            <option value="Bank Transfer">Bank Transfer</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Benefit Pay">Benefit Pay</option>
                                                            <option value="Custom Payment 2">Custom Payment 2</option>
                                                            <option value="Custom Payment 3">Custom Payment 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="payment_details_div  hide " data-type="card">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="card_transaction_number_0">Card Transaction No.</label>
                                                        <input className="form-control" placeholder="Card Transaction No."
                                                            id="card_transaction_number_0" name="payment[0][card_transaction_number]" type="text" defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                            <div className="payment_details_div  hide " data-type="cheque">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="cheque_number_0">Cheque No.</label>
                                                        <input className="form-control" placeholder="Cheque No." id="cheque_number_0"
                                                            name="payment[0][cheque_number]" type="text" defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payment_details_div  hide " data-type="bank_transfer">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="bank_account_number_0">Bank Account No</label>
                                                        <input className="form-control" placeholder="Bank Account No" id="bank_account_number_0"
                                                            name="payment[0][bank_account_number]" type="text" defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="note_0">Payment note:</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3} id="note_0"
                                                        name="paymentNote"
                                                        cols={50}
                                                        value={formData?.payment?.paymentNote}
                                                        onChange={handlePaymentChange}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="pull-right">
                                                    <strong>Payment due:</strong>
                                                    <span id="payment_due">0.000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 text-center">
                                <button type="submit" className="btn btn-primary btn-big">
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AddExpenses