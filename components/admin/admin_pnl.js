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
            exisloaded: false,
            exerror: false,
            exsuccess: false,
            expage: 1,
            exnext: false,
            explist: [],
            show: false,
            pnlshow: false,
            exshow: false,
            exname: '',
            exdate: '',
            examount: '',
            exremark: '',
            exid: '',
            edit: false,
        };
    }

    handleChange = (e) => {
        var value = e.target.value;
        if (e.target.type === 'number') { value = parseInt(e.target.value) }
        this.setState({
            [e.target.name]: value
        });
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
            alert('Please fill in all required fields')
        }
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
        this.getExpenses();
    }

    render () {
        return (<>
            {this.state.error && <div className={`mb-2 ${form.notice_error}`}>
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
            {this.state.success && <div className={`mb-2 ${form.notice_success}`}>
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
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="pl-4"><input type="checkbox"/></th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Total Revenue</th>
                                        <th>Total Expenses</th>
                                        <th>Profit/Loss</th>
                                        <th>P&amp;L Statement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.cell_center}>
                                        <td className="pl-4"><input type="checkbox"/></td>
                                        <td>20 Nov 2020</td>
                                        <td>20 Oct 2020</td>
                                        <td>RM 2,000.00</td>
                                        <td>RM 445.74</td>
                                        <td className="font-weight-bold">+ RM 1554.26</td>
                                        <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                                    </tr>
                                </tbody>
                            </Table>
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
                                <span className="font-weight-bold pl-2 text-nowrap">20 Oct 2020</span>
                            </div>
                            <div className="date-div">
                                <span className="calendar-icon"><FiCalendar/></span>
                                <span className="pl-2 pr-1">To</span>
                                <span className="font-weight-bold pl-2 text-nowrap">20 Nov 2020</span>
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
                                    <td className="pl-4 font-weight-bold">RM 100</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>10 Oct 2020</td>
                                </tr>
                                <tr>
                                    <td className="pl-4 font-weight-bold"></td>
                                    <td>RM 50</td>
                                    <td>Travel Fees</td>
                                    <td>More than usual<br/>Take note..</td>
                                    <td>20 Oct 2020</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="d-flex py-2">
                            <div className={styles.payout_total}>
                                <span>Profit/Loss</span>
                                <span className={`${utils.hightext_lg} pl-5`}>RM 200</span>
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
                        <div className="p-4 border-bottom">
                            <div className="font-weight-bold">Revenue</div>
                            <div className="py-3 row" style={{ margin: '0 -0.5rem' }}>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>From Date</div>
                                    <label className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </label>
                                </div>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>To Date</div>
                                    <label className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
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
                        <button className={`px-5 ${styles.tbtn}`}>Generate</button>
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