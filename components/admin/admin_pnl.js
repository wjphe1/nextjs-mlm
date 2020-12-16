import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import dateTime from '../dateTime'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Spinner from 'react-bootstrap/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'

class Apnl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            error: false,
            err_msg: false,
            success: false,
            page: 1,
            next: false,
            exisloaded: false,
            exerror: false,
            exsuccess: false,
            expage: 1,
            exnext: false,
            risloaded: true,
            rerror: false,
            explist: [],
            reportlist: [],
            report_check: [],
            report_selected: [],
            sshow: false,
            pnlshow: false,
            exshow: false,
            exname: '',
            exdate: '',
            examount: '',
            exremark: '',
            exid: '',
            edit: false,
            startDate: '',
            endDate: '',
            revenue: '',
            view: '',
        };
    }

    addComma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    pandL = (arr, rev) => {
        var list = [];
        if (arr && arr.length) { list = arr }
        var total = 0;
        for (var i = 0; i < list.length; i++) {
            total = total + parseFloat(list[i].price)
        }

        if (rev) { 
            const revn = parseFloat(rev); 
            if (revn >= total) { return '+ RM ' + (revn - total).toFixed(2) }
            else { return '- RM ' + (total - revn).toFixed(2) }
        } else {
            return total.toFixed(2)
        }
    }

    handleChange = (e) => {
        var value = e.target.value;
        if (e.target.type === 'number') { value = parseFloat(e.target.value) }
        this.setState({
            [e.target.name]: value
        });
    }

    checkReport = (i) => {
        var array = this.state.report_check;
        var selected = [];
        const semua = this.state.reportlist;
    
        if (i.target && (i.target.checked === true || i.target.checked === false)) {
            array = Array(semua.length).fill(i.target.checked) 
        } else {
            array[i] = !array[i];
        }
        
        array.forEach(function(part, index) {
            if (part) { 
                selected = selected.concat(semua[index]);
            }
        });
    
        console.log(selected)
    
        this.setState({
            report_check: array,
            report_selected: selected,
        })
    }

    deleteReport = (id) => {
        this.setState({ isloaded: false, success: false, error: false });
        api.delete(routes.reports + '/' + id)
        .then(res => {
            this.setState({ err_msg: { error: 'Deleted Successfully'}, success: true })
            this.getReports();
        })
        .catch(err => {
            var msg = { error: err.response.status + ' : ' + err.response.statusText };
            if (err.response.data) { msg = err.response.data };
            this.setState({ err_msg: msg, isloaded: true, error: true })
        })
    }

    deleteExpense = (eid) => {
        this.setState({ exisloaded: false })
        api.delete(routes.expenses + '/' + eid)
            .then(res => {
                this.setState({ err_msg: { error: 'Deleted Successfully'}, success: true })
                this.getExpenses();
            })
            .catch(err => {
                //console.log(err.response.data)
                var msg = { error: err.response.status + ' : ' + err.response.statusText };
                if (err.response.data) { msg = err.response.data };
                this.setState({ err_msg: msg, isloaded: true, error: true })
            })
    }

    editExpense = () => {
        if (this.state.exname && this.state.exdate && this.state.examount) {
            this.setState({ exisloaded: false })
            const expdata = { 
                expense: { 
                    name: this.state.exname,
                    date: this.state.exdate,
                    price: this.state.examount,
                    remark: this.state.exremark,
                }
            }
            api.put(routes.expenses + '/' + this.state.exid, expdata)
                .then(res => {
                    this.setState({ err_msg: { error: 'Expense Updated Successully'}, success: true, exshow: false })
                    this.getExpenses();
                })
                .catch(err => {
                    //console.log(err.response.data)
                    var msg = { error: err.response.status + ' : ' + err.response.statusText };
                    if (err.response.data) { msg = err.response.data };
                    this.setState({ err_msg: msg, exisloaded: true, exerror: true })
                })
        } else {
            alert('Please fill in all required fields')
        }
    }

    postReport = () => {
        if (this.state.startDate && this.state.endDate && this.state.revenue) {
            this.setState({ risloaded: false, rerror: false })
            const rdata = { 
                report: { 
                    start_date: this.state.startDate,
                    end_date: this.state.endDate,
                    revenue: this.state.revenue,
                }
            }
            api.post(routes.reports, rdata)
                .then(res => {
                    this.setState({ pnlshow: false, sshow: true, view: res.data.report })
                    this.getReports();
                })
                .catch(err => {
                    //console.log(err.response.data)
                    var msg = { error: err.response.status + ' : ' + err.response.statusText };
                    if (err.response.data) { msg = err.response.data };
                    this.setState({ err_msg: msg, risloaded: true, rerror: true })
                })
        } else {
            this.setState({ err_msg: { error: 'Please fill in all required fields' }, rerror: true })
        }
    }

    postExpense = () => {
        if (this.state.exname && this.state.exdate && this.state.examount) {
            this.setState({ exisloaded: false })
            const expdata = { 
                expense: { 
                    name: this.state.exname,
                    date: this.state.exdate,
                    price: this.state.examount,
                    remark: this.state.exremark,
                }
            }
            api.post(routes.expenses, expdata)
                .then(res => {
                    this.setState({ err_msg: { error: 'Expense Created Successully'}, exsuccess: true })
                    this.getExpenses();
                })
                .catch(err => {
                    //console.log(err.response.data)
                    var msg = { error: err.response.status + ' : ' + err.response.statusText };
                    if (err.response.data) { msg = err.response.data };
                    this.setState({ err_msg: msg, exisloaded: true, exerror: true })
                })
        } else {
            this.setState({ err_msg: { error: 'Please fill in all required fields' }, exisloaded: true, exerror: true })
        }
    }

    getReports = (str) => {
        this.setState({ isloaded: false })
        const pagy = this.state.page + parseInt(str || 0);
        api.get(routes.reports + '?page=' + pagy)
            .then(res => {
                const rows = res.data.reports;
                if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
                else { this.setState({ next: false, page: pagy }) }
                console.log(rows)
                this.setState({ reportlist: rows, isloaded: true })
            })
            .catch(err => {
                var msg = { error: err.response.status + ' : ' + err.response.statusText };
                if (err.response.data) { msg = err.response.data };
                this.setState({ err_msg: msg, isloaded: true, error: true })
            })
    }

    getExpenses = (str) => {
        this.setState({ exisloaded: false })
        const pagy = this.state.expage + parseInt(str || 0);
        api.get(routes.expenses + '?page=' + pagy)
            .then(res => {
                const rows = res.data.expenses;
                if (rows.length >= 20) { this.setState({ exnext: true, expage: pagy }) }
                else { this.setState({ exnext: false, expage: pagy }) }
                console.log(rows)
                this.setState({ explist: rows, exisloaded: true })
            })
            .catch(err => {
                var msg = { error: err.response.status + ' : ' + err.response.statusText };
                if (err.response.data) { msg = err.response.data };
                this.setState({ err_msg: msg, exisloaded: true, exerror: true })
            })
    }
    
    componentDidMount() {
        this.getReports();
        this.getExpenses();
    }

    render () {
        return (<>
            {this.state.error && <div className={`my-2 ${form.notice_error}`}>
                <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span> 
                    {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                    {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                        {Object.keys(this.state.err_msg.error).map(key =>
                            <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                        )}
                    </ul>}
                </div> 
                <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.success && <div className={`my-2 ${form.notice_success}`}>
                <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span> 
                    <div>{this.state.err_msg.error}</div>
                </div> 
                <div onClick={() => this.setState({ success: false })} className={`col-2 ${form.sclose}`}>Close</div>
            </div>}
            <div className={`mt-3 ${styles.table}`}>
                <div className="dn-mb py-4"></div>
                <div className="admin-generic-tabs report-tabs border-0 m-0">
                    <Tabs defaultActiveKey="pnl">
                        <Tab eventKey="pnl" title="All Profit &amp; Loss">
                            <div className={styles.tab_btns}>
                                <button onClick={() => this.setState({ pnlshow: true })} className={`mr-2 py-2 ${styles.tbtn}`}>Generate Statement</button>
                                <button className={`ml-2 py-2 ${styles.tbtn_reverse}`}>Download</button>
                            </div>
                            {this.state.isloaded ? <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="pl-4"><input type="checkbox" onChange={this.checkReport}/></th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Total Revenue</th>
                                        <th>Total Expenses</th>
                                        <th>Profit/Loss</th>
                                        <th>P&amp;L Statement</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.reportlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                                        <td className="pl-4"><input type="checkbox" checked={this.state.report_check[i]} onChange={() => this.checkReport(i)}/></td>
                                        <td>{dateTime(u.start_date, 'date')}</td>
                                        <td>{dateTime(u.end_date, 'date')}</td>
                                        <td>RM {this.addComma(u.revenue)}</td>
                                        <td>RM {this.pandL(u.expenses)}</td>
                                        <td className="font-weight-bold">{this.pandL(u.expenses, u.revenue)}</td>
                                        <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true, view: u })}>View</button></td>
                                        <td className="table-cell-dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle>
                                                <BsThreeDots/>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                <Dropdown.Item as="button" onClick={() => this.deleteReport(u.id)}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                            {this.state.isloaded && !this.state.reportlist.length && <div className="p-5 text-center">No P&amp;L Report History Found.</div>}
                            {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                                {this.state.page > 1 && <button onClick={() => this.getReports(-1)} className={styles.tbtn}>Prev</button>}
                                <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.redeemlist.length}</div>
                                {this.state.next && <button onClick={() => this.getReports(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                            </div>}
                        </Tab>
                        <Tab eventKey="expenses" title="All Expenses">
                            <div className={styles.tab_btns}>
                                <button onClick={() => this.setState({ exshow: true, exname: '', exdate: '', examount: '', exremark: '', edit: false })} className={`mr-2 py-2 ${styles.tbtn}`}>Add Expenses</button>
                            </div>
                            {this.state.exisloaded ? <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="pl-4">Name</th>
                                        <th>Date</th>
                                        <th>Remark</th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.explist.map((u, i) => <tr className={styles.cell_center} key={i}>
                                        <td className="pl-4">{u.name}</td>
                                        <td>{dateTime(u.date, 'date')}</td>
                                        <td>{u.remark}</td>
                                        <td>RM {u.price}</td>
                                        <td className="table-cell-dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle>
                                                <BsThreeDots/>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as="button" onClick={() => this.setState({ exshow: true, edit: true, exname: u.name, exdate: new Date(u.date), examount: u.price, exid: u.id })}>Edit</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={() => this.deleteExpense(u.id)}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                            {this.state.exisloaded && !this.state.explist.length && <div className="p-5 text-center">No Expenses Found.</div>}
                            {(this.state.exnext || this.state.expage > 1) && <div className="d-flex align-items-center justify-content-between p-3">
                                {this.state.expage > 1 && <button onClick={() => this.getExpenses(-1)} className={styles.tbtn}>Prev</button>}
                                <div>Page {this.state.expage} Showing {(this.state.expage - 1)*20 + 1} - {(this.state.expage - 1)*20 + this.state.explist.length}</div>
                                {this.state.exnext && <button onClick={() => this.getExpenses(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                            </div>}
                        </Tab>
                    </Tabs>
                </div>

                {/* Slip Generated */}
                <Modal show={this.state.sshow} onHide={() => this.setState({ sshow: false })} size="xl" aria-labelledby="pnl-statement-modal" centered>
                    <Modal.Body>
                        <div className={`px-3 ${utils.modal_summary}`}>P&amp;L Statement</div>
                        <div className="pb-4 d-flex align-items-center flex-nowrap overflow-auto">
                            <div className="date-div mr-2">
                                <span className="calendar-icon"><FiCalendar/></span>
                                <span className="pl-2 pr-1">From</span>
                                <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.view.start_date, 'date')}</span>
                            </div>
                            <div className="date-div">
                                <span className="calendar-icon"><FiCalendar/></span>
                                <span className="pl-2 pr-1">To</span>
                                <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.view.end_date, 'date')}</span>
                            </div>
                        </div>
                        <Table responsive>
                            <thead className={styles.modal_table}>
                                <tr>
                                    <th className="pl-4">Revenue</th>
                                    <th>Expenses</th>
                                    <th>Expenses Name</th>
                                    <th>Remark</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody className={styles.modal_table}>
                                <tr>
                                    <td className="pl-4 font-weight-bold">RM {this.state.view.revenue}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {this.state.view.expenses && this.state.view.expenses.map((u, i) => <tr key={i}>
                                    <td className="pl-4 font-weight-bold"></td>
                                    <td>RM {u.price}</td>
                                    <td>{u.name}</td>
                                    <td>{u.remark}</td>
                                    <td>{dateTime(u.date, 'date')}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <div className="d-flex py-2">
                            <div className={styles.payout_total}>
                                <span>Profit/Loss</span>
                                <span className={`${utils.hightext_lg} pl-5`}>{this.pandL(this.state.view.expenses, this.state.view.revenue)}</span>
                            </div>
                        </div>
                        <button className={styles.modal_closebtn} onClick={() => this.setState({ sshow: false })}><MdCancel/> Close</button>
                    </Modal.Body>
                </Modal>

                {/* Profit and Loss Form */}
                <Modal show={this.state.pnlshow} onHide={() => this.setState({ pnlshow: false })} size="md" contentClassName="pnl-form-modal" aria-labelledby="pnl-form-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header_full}>P&amp;L Forms</div>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.rerror && <div className={`m-4 ${form.notice_error}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.nexcl}>!</span> 
                                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                                    {Object.keys(this.state.err_msg.error).map(key =>
                                        <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                                    )}
                                </ul>}
                            </div> 
                            <div onClick={() => this.setState({ rerror: false })} className={`col-2 ${form.nclose}`}>Close</div>
                        </div>}
                        <div className="p-4 border-bottom">
                            <div className="font-weight-bold">Revenue</div>
                            <div className="py-3 row" style={{ margin: '0 -0.5rem' }}>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>From Date</div>
                                    <label className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </label>
                                </div>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>To Date</div>
                                    <label className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </label>
                                </div>
                            </div>
                            <div className="position-relative">
                                <div className="position-absolute font-weight-bold" style={{ top: 14, left: 14, fontSize: '0.9rem' }}>RM</div>
                                <input type="number" className={`pl-5 m-0 ${form.field_light}`} value={this.state.revenue} onChange={this.handleChange} name="revenue" />
                            </div>
                            <p className={`pt-4 ${utils.hightext_sm}`}>The profit and loss statement generated will based on the revenue amount entered above and all the expenses added that are within the range of date selected above.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ pnlshow: false })}><MdCancel/> Discard</button>
                        {this.state.risloaded ? <button className={`px-5 ${styles.tbtn}`} onClick={this.postReport}>Generate</button> : <button className={`px-5 ${styles.tbtn}`} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                    </Modal.Footer>
                </Modal>

                {/* Expenses Form */}
                <Modal show={this.state.exshow} onHide={() => this.setState({ exshow: false })} size="md" contentClassName="expenses-form-modal" aria-labelledby="pnl-form-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header_full}>Expenses Form</div>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.exerror && <div className={`mb-4 ${form.notice_error}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.nexcl}>!</span> 
                                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                                    {Object.keys(this.state.err_msg.error).map(key =>
                                        <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                                    )}
                                </ul>}
                            </div> 
                            <div onClick={() => this.setState({ exerror: false })} className={`col-2 ${form.nclose}`}>Close</div>
                        </div>}
                        {this.state.exsuccess && <div className={`mb-4 ${form.notice_success}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.sexcl}>✓</span> 
                                <div>{this.state.err_msg.error}</div>
                            </div> 
                            <div onClick={() => this.setState({ exsuccess: false })} className={`col-2 ${form.sclose}`}>Close</div>
                        </div>}
                        <div className="p-4 border-bottom">
                            <div className="pt-3 m-0 row">
                                <div className="col-6 pr-2 pl-0">
                                    <label>Expenses Name</label>
                                    <input value={this.state.exname} className={form.field_light} name="exname" onChange={this.handleChange}/>
                                </div>
                                <div className="col-6 pl-2 pr-0 field-datepicker">
                                    <label>Expenses Date</label>
                                    <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className={form.field_light} selected={this.state.exdate} onChange={(date) => this.setState({ exdate: date })}/>
                                </div>
                            </div>
                            <div className="m-0 row">
                                <div className="col-6 pr-2 pl-0">
                                    <label>Expenses Amount</label>
                                    <div className="position-relative">
                                        <div className="position-absolute font-weight-bold" style={{ top: 14, left: 14, fontSize: '0.9rem' }}>RM</div>
                                        <input value={this.state.examount} type="number" className={`pl-5 m-0 ${form.field_light}`} name="examount" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="col-6 pl-2 pr-0">
                                    <label>Remarks</label>
                                    <input value={this.state.exremark} type="text" className={`m-0 ${form.field_light}`} name="exremark" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ exshow: false })}><MdCancel/> Discard</button>
                        {this.state.exisloaded && !this.state.edit && <button onClick={this.postExpense} className={`px-5 ${styles.tbtn}`}>Create</button>}
                        {this.state.exisloaded && this.state.edit && <button onClick={this.editExpense} className={`px-5 ${styles.tbtn}`}>Update</button>}
                        {!this.state.exisloaded && <button className={`px-5 ${styles.tbtn}`} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                    </Modal.Footer>
                </Modal>
            </div>
        </>)
    }
}

export default Apnl;