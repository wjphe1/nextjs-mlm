import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import api from '../auth/api'
import routes from '../auth/routes'
import cn from 'classnames'
import dateTime from '../dateTime'
import Ecashph from './payout_history_ecash'
import Referral from './referral_ecash'
import { MdCancel } from 'react-icons/md'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker"
import { FiCalendar } from 'react-icons/fi'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'

class Aecash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      error: false,
      success: false,
      ecisloaded: true,
      ecerror: false,
      page: 1,
      next: false,
      payoutlist: [],
      payout_check: [],
      payout_selected: [],
      fshow: false,
      sshow: false,
      startDate: '',
      endDate: '',
      minEcash: '',
      view: {},
      viewlist: [],
      ppaid: 0,
      shshow: false,
    };
  }

  handleChange = (e) => {
    const value = parseFloat(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  checkPayout = (i) => {
    var array = this.state.payout_check;
    var selected = [];
    const semua = this.state.payoutlist;

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
        payout_check: array,
        payout_selected: selected,
    })
  }

  donePayout = (force) => {
    this.setState({ isloaded: false, success: false, sshow: false, shshow: false })
    var arr = [];
    if (force) {
      arr = arr.concat(force)
    } else {
      arr = this.state.payout_selected
    }
    for (var i = 0; i < arr.length; i ++) {
      api.put(routes.ecash_payouts + '/' + arr[i].id + '/approve')
        .then(res => {
          this.setState({ sshow: false, success: true, err_msg: {error: 'Success - Marked as Done'} });
          setTimeout(() => {Router.reload()}, 300);
        })
        .catch(err => { 
          console.log(err.response); 
          var msg = { error: err.response.status + ' : ' + err.response.statusText };
          if (err.response.data) { msg = err.response.data };
          this.setState({ error: true, err_msg: msg }) 
        })
    }
    this.setState({ isloaded: true })
  }

  postPayout = () => {
    if (this.state.startDate && this.state.endDate && this.state.minEcash) {
      this.setState({ isloaded: false })
      const postdata = { ecash_payout: { start_date: this.state.startDate, end_date: this.state.endDate, minimum_ecash: this.state.minEcash }}
      api.post(routes.ecash_payouts, postdata)
        .then(res => {
          this.setState({ err_msg: { error: 'Payout Created Successully'}, success: true, fshow: false })
          this.getPayout();
        })
        .catch(err => {
          var msg = { error: err.response.status + ' : ' + err.response.statusText };
          if (err.response.data) { msg = err.response.data };
          this.setState({ err_msg: msg, fisloaded: true, ferror: true })
        })
    } else {
      this.setState({ err_msg: { error: 'Please fill in all the required fields'}, ferror: true })
    }
  }

  getUserfromPayout = (u) => {
    this.setState({ view: u })
    api.get(routes.ecash_payouts + '/' + u.id + '/user_ecash_payouts')
      .then(res => {
        const rows = res.data.user_ecash_payouts || res.data;
        console.log(rows)
        var paid = 0;
        for (var i = 0; i < rows.length; i++) {
          if (rows[0].paid) { paid = paid + 1 }
        }
        //if (paid === rows.length) { var arr = []; arr = arr.concat(u); this.setState({ payout_selected: arr });this.donePayout(); alert('You have no pending members on this payout left, this payout is automatically marked as approved.') }
        this.setState({ viewlist: rows, sshow: true, ppaid: paid, ecisloaded: true })
      })
      .catch(err => {
        var msg = { error: err.response.status + ' : ' + err.response.statusText };
        if (err.response.data) { msg = err.response.data };
        this.setState({ err_msg: msg, error: true })
      })
  }

  markUser = (u) => {
    this.setState({ ecisloaded: false, ecerror: false })
    api.put(routes.ecash_payouts + '/' + u.ecash_payout_id + '/user_ecash_payouts/' + u.id, {
      user_ecash_payout: { paid: true }
    })
      .then(res => {
        this.getUserfromPayout(this.state.view);
      })
      .catch(err => {
        var msg = { error: err.response.status + ' : ' + err.response.statusText };
        if (err.response.data) { msg = err.response.data };
        this.setState({ err_msg: msg, ecerror: true })
      })
  }

  getPayout = (str) => {
    this.setState({ isloaded: false })
    const pagy = this.state.page + parseInt(str || 0);
    api.get(routes.ecash_payouts + '?page=' + pagy + '&status=PENDING')
      .then(res => {
        const rows = res.data.ecash_payouts;
        if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
        else { this.setState({ next: false, page: pagy }) }
        console.log(rows)
        this.setState({ payoutlist: rows, isloaded: true })
      })
      .catch(err => {
        var msg = { error: err.response.status + ' : ' + err.response.statusText };
        if (err.response.data) { msg = err.response.data };
        this.setState({ err_msg: msg, isloaded: true, error: true })
      })
  }

  componentDidMount() {
    this.getPayout();
  }

  render () {
    
    return (
      <>
        <div className={utils.h_xl}>Report Overview</div>
        {this.props.links}

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
            <Tabs defaultActiveKey="list">
              <Tab eventKey="list" title="Payout">
                <div className={styles.tab_btns}>
                  <button onClick={() => this.setState({ fshow: true })} className={`mr-2 py-2 ${styles.tbtn}`}>Generate Payout</button>
                  <button onClick={() => this.donePayout()} className={`ml-2 py-2 ${styles.tbtn_reverse}`}>Mark as Done</button>
                </div>
                {this.state.isloaded ? <Table responsive>
                  <thead>
                    <tr>
                      <th className="pl-4"><input type="checkbox" onChange={this.checkPayout}/></th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Minimum E-cash</th>
                      <th>Slip Generated At</th>
                      <th>Status</th>
                      <th>Eligible Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.payoutlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                      <td className="pl-4"><input type="checkbox" checked={this.state.payout_check[i]} onChange={() => this.checkPayout(i)}/></td>
                      <td>{dateTime(u.start_date, 'date')}</td>
                      <td>{dateTime(u.end_date, 'date')}</td>
                      <td>RM {u.minimum_ecash}</td>
                      <td>{dateTime(u.created_at)}</td>
                      {u.status === 'PENDING' && <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td>}
                      {u.status === 'APPROVED' && <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                      {u.status === 'VOID' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                      <td><button className={styles.modal_btn} onClick={() => this.getUserfromPayout(u)}>View</button></td>
                    </tr>)}
                  </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.payoutlist.length && <div className="p-5 text-center">No Generated Payout Found.</div>}
                {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between p-3">
                  {this.state.page > 1 && <button onClick={() => this.getPayout(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.payoutlist.length}</div>
                  {this.state.next && <button onClick={() => this.getPayout(1)} className={styles.tbtn}>Next</button>}
                </div>}
              </Tab>
              <Tab eventKey="history" title="Payout History">
                <Ecashph/>
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <Referral/>
              </Tab>
            </Tabs>
          </div>
        </div>

        {/* Filter Modal */}                  
        <Modal show={this.state.fshow} onHide={() => this.setState({ fshow: false })} size="md" contentClassName="pnl-form-modal" aria-labelledby="pnl-form-modal" centered>
          <Modal.Body>
            <div className="p-4 border-bottom">
              {this.state.ferror && <div className={`mb-4 ${form.notice_error}`}>
                <div className="col-10 d-flex align-items-center">
                  <span className={form.nexcl}>!</span> 
                  {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                  {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                    {Object.keys(this.state.err_msg.error).map(key =>
                      <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                    )}
                  </ul>}
                </div> 
                <div onClick={() => this.setState({ ferror: false })} className={`col-2 ${form.nclose}`}>Close</div>
              </div>}
              <div className="font-weight-bold">Select Members</div>
              <div className={`${utils.text_md} py-2`}>Where E-Cash Amount ≥</div>
              <input type="number" className={`m-0 ${form.field_light}`} value={this.state.minEcash} onChange={this.handleChange} name="minEcash" />
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ fshow: false })}><MdCancel/> Discard</button>
            <button onClick={this.postPayout} className={`px-5 ${styles.tbtn}`}>Generate List</button>
          </Modal.Footer>
        </Modal>

        {/* Eligible Member Modal */}                    
        <Modal show={this.state.sshow} onHide={() => this.setState({ sshow: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
          <Modal.Body>
            <div className={`px-4 ${utils.modal_summary}`}>E-Cash Payout Slip</div>
            <div className="px-4 pb-2">Min. E-Cash: <b>RM {this.state.view.minimum_ecash}</b></div>
            <div className="row m-0 align-items-center px-3">
              <div className="col-lg-6 p-0">       
                <div className="d-flex align-items-center flex-nowrap overflow-auto">
                  <div className="date-div mr-2">
                    <span className="calendar-icon"><FiCalendar/></span>
                    <span className="pl-2 pr-1">From</span>
                    <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.view.start_date, 'date')}</span>
                  </div>
                  <div className="date-div mr-2">
                    <span className="calendar-icon"><FiCalendar/></span>
                    <span className="pl-2 pr-1">To</span>
                    <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.view.end_date, 'date')}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex flex-wrap justify-content-end">       
                <div className="font-weight-bold">Slip Generated At</div>
                <div className="pl-2">{dateTime(this.state.view.created_at)}</div>
              </div>
            </div>
            {this.state.ecerror && <div className={`my-2 ${form.notice_error}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.nexcl}>!</span> 
                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                  {Object.keys(this.state.err_msg.error).map(key =>
                    <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                  )}
                </ul>}
              </div> 
              <div onClick={() => this.setState({ ecerror: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.viewlist.length ? <div className="py-2 px-3 d-flex">
              <div className={styles.sale_info_green}>
                <div className="d-flex">   
                  <div className={utils.text_lg}>{this.state.ppaid}/{this.state.viewlist.length} Members</div>
                  <div className="ml-auto">
                    <OverlayTrigger trigger="click" placement='top'
                      overlay={
                        <Popover id="popover-positioned-top">
                          <Popover.Content>
                            Once all members mark as successful, this batch payout will be automaticaally added in the Payout history
                          </Popover.Content>
                        </Popover>
                      }>
                      <button className={styles.popover_green}>?</button>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className={`py-2 ${utils.text_md}`}>E-Cash Payout has been marked as Successful</div>
              </div>
              <div className={styles.sale_info_red}>
                <div className="d-flex flex-column justify-content-center">
                  <div className={utils.text_lg}>{this.state.viewlist.length - this.state.ppaid} Members</div>
                  <div className={`py-2 ${utils.text_md}`}>left for E-Cash Payout</div>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  <button onClick={() => this.setState({ shshow: true })} className={styles.info_btn_red}>Send to History</button>
                </div>
              </div>
            </div> : <div className="py-3"></div>}
            {this.state.ecisloaded ? <Table responsive>
              <thead>
                <tr className={styles.modal_table}>
                  <th className="pl-4">Member ID</th>
                  <th>Eligible At</th>
                  <th>Bank Details</th>
                  <th>E-Cash</th>
                  <th className="d-flex align-items-center">Payout 
                    <OverlayTrigger trigger="click" placement='top'
                      overlay={
                        <Popover id="popover-positioned-top">
                          <Popover.Content>
                            All the pay our rate had been deducted by the RM 0.50 transaction fees
                          </Popover.Content>
                        </Popover>
                      }>
                      <button className={`ml-2 ${styles.popover}`}>?</button>
                    </OverlayTrigger>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.viewlist.length ? this.state.viewlist.map((u, i) => <tr className={`${cn({['flagged']: u.paid})} ${styles.modal_table}`} key={i}>
                  <td className="pl-4">{u.username}</td>
                  <td>{dateTime(u.updated_at)}</td>
                  <td>{u.bank_name}<br/>{u.bank_account_number}</td>
                  <td>RM {u.ecash}</td>
                  <td>RM {(u.ecash - 0.50).toFixed(2)}</td>
                  <td>{!u.paid ? <button className={styles.modal_btn} onClick={() => this.markUser(u)}>Mark as Successful</button> : <span className={styles.modal_btn} style={{ fontStyle: 'italic' }}>Paid</span>}</td>
                </tr>) : <tr></tr>}
              </tbody>
            </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
            {!this.state.viewlist.length && <div className="p-5 text-center">No Eligible Member Found.</div>}
            <button className={styles.modal_closebtn} onClick={() => this.setState({ sshow: false })}><MdCancel/> Close</button>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.shshow} onHide={() => this.setState({ shshow: false })} size="sm" aria-labelledby="confirm-approve" centered>
          <Modal.Body>
            <div className="font-weight-bold pb-2 text-center">Mark as Approved and Send to History?</div>
            <div className="pb-3 text-justify" style={{ fontSize: '0.9rem' }}>If there are still members left with unsettled e-cash payout, those members will be skipped and this payout batch will be marked as approved.</div>
            <div className="d-flex flex-column align-items-center" style={{fontSize: '1.2rem'}}>
              <button onClick={() => this.donePayout(this.state.view)} className={`w-100 ${styles.tbtn}`}>Confirm</button>
              <button onClick={() => this.setState({ shshow: false })} className={`w-100 ${styles.tbtn_reverse_borderless}`}><MdCancel/> Go Back</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Aecash;