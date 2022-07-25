import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import dateTime from '../dateTime'
import Exports from './pdf_epoints'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Spinner from 'react-bootstrap/Spinner'

class Aepoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      view: {},
      isloaded: false,
      error: false,
      err_msg: "",
      cisloaded: false,
      cerror: false,
      pisloaded: false,
      perror: false,
      approve: false,
      capprove: false,
      hisloaded: false,
      page: 1,
      next: false,
      cpage: 1,
      cnext: false,
      ppage: 1,
      pnext: false,
      hpage: 1,
      hnext: false,
      pendinglist: [],
      pending_check: [],
      pending_selected: [],
      pending_total: 0,
      redeemlist: [],
      redeem_check: [],
      redeem_selected: [],
      redeem_total: 0,
      rewardlist: [],
      reward_check: [],
      reward_selected: [],
      historylist: [],
    };
  }

  handleChange = (e) => {
    console.log(e)
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  checkOrder = (i, type) => {
    var selected = [];
    var array = [];
    var semua = [];
    var total = 0;
    var payam = 0;

    if (type === 'redeem') {
      array = this.state.redeem_check;
      semua = this.state.redeemlist;
    } else if (type === 'pending') {
      array = this.state.pending_check;
      semua = this.state.pendinglist;
    } else if (type === 'reward') {
      array = this.state.reward_check;
      semua = this.state.rewardlist;
    }

    if (i.target && (i.target.checked === true || i.target.checked === false)) {
      array = Array(semua.length).fill(i.target.checked)
    } else {
      array[i] = !array[i];
    }

    array.forEach(function (part, index) {
      if (part) {
        selected = selected.concat(semua[index]);
        if (semua[index].status === 'APPROVED' || semua[index].status === 'PENDING') { total = total + semua[index].epoint; payam = payam + 1; }
      }
    });

    total = (total * 0.50 - (payam * 0.50)).toFixed(2);
    console.log(selected)

    if (type === 'redeem') {
      this.setState({
        redeem_check: array,
        redeem_selected: selected,
        redeem_total: total,
      })
    } else if (type === 'pending') {
      this.setState({
        pending_check: array,
        pending_selected: selected,
        pending_total: total,
      })
    } else if (type === 'reward') {
      this.setState({
        reward_check: array,
        reward_selected: selected,
      })
    }
  }

  approveRedeem = () => {
    this.setState({ pisloaded: false, approve: false, })
    for (var i = 0; i < this.state.pending_selected.length; i++) {
      api.put(routes.epoint_requests + '/' + this.state.pending_selected[i].id + '/approve')
        .then(res => this.setState({ approve: true }))
        .catch(err => {
          var msg = err.response?.data?.error ||
            err.response?.data?.error_messages ||
            err.response?.data?.message ||
            err.message ||
            "An unexpected error has occurred";
          this.setState({ perror: true, err_msg: msg })
        })
    }
    setTimeout(() => { this.getPending(); }, 500)
    setTimeout(() => { this.getPoints(); }, 500)
  }

  approveReward = () => {
    this.setState({ cisloaded: false, capprove: false, })
    for (var i = 0; i < this.state.reward_selected.length; i++) {
      api.put(routes.epoint_rewards + '/' + this.state.reward_selected[i].id + '/approve')
        .then(res => this.setState({ capprove: true }))
        .catch(err => {
          var msg = err.response?.data?.error ||
            err.response?.data?.error_messages ||
            err.response?.data?.message ||
            err.message ||
            "An unexpected error has occurred";
          this.setState({ cerror: true, err_msg: msg })
        })
    }
    setTimeout(() => { this.getIncentives(); }, 500)
    setTimeout(() => { this.getRewards(); }, 500)
  }

  getPending = (str) => {
    this.setState({ pisloaded: false })
    const pagy = this.state.ppage + parseInt(str || 0);
    api.get(routes.epoint_requests + '?page=' + pagy + '&status=PENDING')
      .then(res => {
        const rows = res.data.epoint_requests;
        if (rows.length >= 20) { this.setState({ pnext: true, ppage: pagy }) }
        else { this.setState({ pnext: false, ppage: pagy }) }
        console.log(rows)
        this.setState({ pisloaded: true, pendinglist: rows, pending_check: Array(rows.length).fill(false) })
      })
      .catch(err => {
        var msg = err.response?.data?.error ||
          err.response?.data?.error_messages ||
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred"
        this.setState({ error: true, pisloaded: true, err_msg: msg })
      })
  }

  getPoints = (str) => {
    this.setState({ isloaded: false })
    const pagy = this.state.page + parseInt(str || 0);
    api.get(routes.epoint_requests + '?page=' + pagy + '&scope=HISTORY')
      .then(res => {
        const rows = res.data.epoint_requests;
        if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
        else { this.setState({ next: false, page: pagy }) }
        console.log(rows)
        this.setState({ isloaded: true, redeemlist: rows, redeem_check: Array(rows.length).fill(false) })
      })
      .catch(err => {
        var msg = err.response?.data?.error ||
          err.response?.data?.error_messages ||
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred"
        this.setState({ error: true, isloaded: true, err_msg: msg })
      })
  }

  getIncentives = (str) => {
    this.setState({ cisloaded: false })
    const pagy = this.state.cpage + parseInt(str || 0);
    api.get(routes.epoint_rewards + '?page=' + pagy + '&status=PENDING')
      .then(res => {
        const rows = res.data.epoint_rewards;
        if (rows.length >= 20) { this.setState({ cnext: true, cpage: pagy }) }
        else { this.setState({ cnext: false, cpage: pagy }) }
        console.log(rows)
        this.setState({ rewardlist: rows, cisloaded: true, reward_check: Array(rows.length).fill(false) })
      })
      .catch(err => {
        var msg = err.response?.data?.error ||
          err.response?.data?.error_messages ||
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred"
        this.setState({ error: true, cisloaded: true, err_msg: msg })
      })
  }

  getRewards = (str) => {
    this.setState({ hisloaded: false })
    const pagy = this.state.hpage + parseInt(str || 0);
    api.get(routes.epoint_rewards + '?page=' + pagy + '&scope=HISTORY')
      .then(res => {
        const rows = res.data.epoint_rewards;
        if (rows.length >= 20) { this.setState({ hnext: true, hpage: pagy }) }
        else { this.setState({ hnext: false, hpage: pagy }) }
        console.log(rows)
        this.setState({ historylist: rows, hisloaded: true })
      })
      .catch(err => {
        var msg = err.response?.data?.error ||
          err.response?.data?.error_messages ||
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred"
        this.setState({ error: true, hisloaded: true, err_msg: msg })
      })
  }

  componentDidMount() {
    this.getIncentives();
    this.getRewards();
    this.getPoints();
    this.getPending();
  }

  render() {

    return (
      <div className="admin-reports-tabs">
        <Tabs defaultActiveKey="reimbursement">
          <Tab eventKey="reimbursement" title="● Reimbursement">
            {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.nexcl}>!</span>
                {(this.state.err_msg && typeof this.state.err_msg === 'string') && <div>{this.state.err_msg}</div>}
                {(this.state.err_msg && typeof this.state.err_msg === 'object') && <ul className="m-0 pl-4">
                  {Object.keys(this.state.err_msg).map(key =>
                    <li value={key} key={key}>{`${key}: ${this.state.err_msg[key][0]}`}</li>
                  )}
                </ul>}
              </div>
              <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.perror && <div className={`mb-4 ${form.notice_error}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.nexcl}>!</span>
                {(this.state.err_msg && typeof this.state.err_msg === 'string') && <div>{this.state.err_msg}</div>}
                {(this.state.err_msg && typeof this.state.err_msg === 'object') && <ul className="m-0 pl-4">
                  {Object.keys(this.state.err_msg).map(key =>
                    <li value={key} key={key}>{`${key}: ${this.state.err_msg[key][0]}`}</li>
                  )}
                </ul>}
              </div>
              <div onClick={() => this.setState({ perror: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.approve && <div className={`mb-4 ${form.notice_success}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.sexcl}>✓</span>
                <div><b>Success - </b> Reimbursement Request(s) Approved</div>
              </div>
              <div onClick={() => this.setState({ approve: false })} className={`col-2 ${form.sclose}`}>Close</div>
            </div>}
            <div className={styles.table}>
              <div className="dn-mb py-4"></div>
              <div className="admin-generic-tabs report-tabs border-0 m-0">
                <Tabs defaultActiveKey="list">
                  <Tab eventKey="list" title="Reimbursement List">
                    <div className={styles.tab_btns}>
                      <button onClick={this.approveRedeem} className={`mr-2 py-2 ${styles.tbtn}`}>Mark as Done</button>
                      <Exports list={this.state.pending_selected} total={this.state.pending_total} />
                    </div>
                    {this.state.pisloaded ? <Table responsive>
                      <thead>
                        <tr className={styles.cell_center}>
                          <th className="pl-4"><input type="checkbox" onChange={(e) => this.checkOrder(e, 'pending')} /></th>
                          <th>Member ID</th>
                          <th>Redeem At</th>
                          <th>Redeem Amount</th>
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
                          <th>Status</th>
                          <th>Slip</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.pendinglist.map((u, i) => <tr className={styles.cell_center} key={i}>
                          <td className="pl-4"><input type="checkbox" checked={this.state.pending_check[i]} onChange={() => this.checkOrder(i, 'pending')} /></td>
                          <td>{u.requested_by.username}</td>
                          <td>{dateTime(u.created_at)}</td>
                          <td>{u.epoint} Pts</td>
                          <td>RM {((u.epoint / 2) - 0.50).toFixed(2)}</td>
                          {u.status === 'PENDING' && <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'APPROVED' && <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'CANCELLED' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'REJECTED' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true, view: u })}>View</button></td>
                        </tr>)}
                      </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg' /></div>}
                    {this.state.pisloaded && !this.state.pendinglist.length && <div className="p-5 text-center">No pending E-Points Reimbursement found.</div>}
                    {(this.state.pnext || this.state.ppage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                      {this.state.ppage > 1 && <button onClick={() => this.getPending(-1)} className={styles.tbtn}>Prev</button>}
                      <div>Page {this.state.ppage} Showing {(this.state.ppage - 1) * 20 + 1} - {(this.state.ppage - 1) * 20 + this.state.pendinglist.length}</div>
                      {this.state.pnext && <button onClick={() => this.getPending(1)} className={styles.tbtn}>Next</button>}
                    </div>}
                  </Tab>
                  <Tab eventKey="history" title="Reimbursement History">
                    <div className={styles.tab_btns}>
                      <Exports list={this.state.redeem_selected} total={this.state.redeem_total} />
                    </div>
                    {this.state.isloaded ? <Table responsive>
                      <thead>
                        <tr className={styles.cell_center}>
                          <th className="pl-4"><input type="checkbox" onChange={(e) => this.checkOrder(e, 'redeem')} /></th>
                          <th>Member ID</th>
                          <th>Paid At</th>
                          <th>Redeem Amount</th>
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
                          <th>Status</th>
                          <th>Slip</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.redeemlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                          <td className="pl-4"><input type="checkbox" checked={this.state.redeem_check[i]} onChange={() => this.checkOrder(i, 'redeem')} /></td>
                          <td>{u.requested_by.username}</td>
                          <td>{dateTime(u.approved_at)}</td>
                          <td>{u.epoint} Pts</td>
                          <td>RM {((u.epoint / 2) - 0.50).toFixed(2)}</td>
                          {u.status === 'PENDING' && <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'APPROVED' && <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'CANCELLED' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                          {u.status === 'REJECTED' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true, view: u })}>View</button></td>
                        </tr>)}
                      </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg' /></div>}
                    {this.state.isloaded && !this.state.redeemlist.length && <div className="p-5 text-center">No pending E-Points Reimbursement found.</div>}
                    {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                      {this.state.page > 1 && <button onClick={() => this.getPoints(-1)} className={styles.tbtn}>Prev</button>}
                      <div>Page {this.state.page} Showing {(this.state.page - 1) * 20 + 1} - {(this.state.page - 1) * 20 + this.state.redeemlist.length}</div>
                      {this.state.next && <button onClick={() => this.getPoints(1)} className={styles.tbtn}>Next</button>}
                    </div>}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Tab>
          <Tab eventKey="incentives" title="● Monthly incentives">
            {this.state.cerror && <div className={`mb-4 ${form.notice_error}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.nexcl}>!</span>
                <div><b>Error - </b> Approving failed, please try again later</div>
              </div>
              <div onClick={() => this.setState({ cerror: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.capprove && <div className={`mb-4 ${form.notice_success}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.sexcl}>✓</span>
                <div><b>Success - </b> Reward(s) Approved</div>
              </div>
              <div onClick={() => this.setState({ capprove: false })} className={`col-2 ${form.sclose}`}>Close</div>
            </div>}
            <div className={styles.table}>
              <div className="dn-mb py-4"></div>
              <div className="admin-generic-tabs report-tabs border-0 m-0">
                <Tabs defaultActiveKey="monthly">
                  <Tab eventKey="monthly" title="Monthly Incentives">
                    <div className={styles.tab_btns}>
                      <button onClick={this.approveReward} className={`py-2 ${styles.tbtn}`}>Approve</button>
                    </div>
                    {this.state.cisloaded ? <Table responsive>
                      <thead>
                        <tr>
                          <th className="pl-4"><input type="checkbox" onChange={(e) => this.checkOrder(e, 'reward')} /></th>
                          <th>Member ID</th>
                          <th>Incentives Points</th>
                          <th className="w-50">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.rewardlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                          <th className="pl-4"><input type="checkbox" checked={this.state.reward_check[i]} onChange={() => this.checkOrder(i, 'reward')} /></th>
                          <td>{u.user.username}</td>
                          <td>{u.epoint} Pts</td>
                          <td className="w-50"><button className={styles.status_green} disabled>{u.status}</button></td>
                        </tr>)}
                      </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg' /></div>}
                    {this.state.cisloaded && !this.state.rewardlist.length && <div className="p-5 text-center">No Pending Incentives Payout found.</div>}
                    {(this.state.cnext || this.state.cpage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                      {this.state.cpage > 1 && <button onClick={() => this.getIncentives(-1)} className={styles.tbtn}>Prev</button>}
                      <div>Page {this.state.cpage} Showing {(this.state.cpage - 1) * 20 + 1} - {(this.state.cpage - 1) * 20 + this.state.rewardlist.length}</div>
                      {this.state.cnext && <button onClick={() => this.getIncentives(1)} className={styles.tbtn}>Next</button>}
                    </div>}
                  </Tab>
                  <Tab eventKey="history" title="History">
                    {this.state.hisloaded ? <Table responsive>
                      <thead>
                        <tr>
                          <th className="pl-4">Member ID</th>
                          <th>Approved At</th>
                          <th>Incentives Points</th>
                          <th>Reward Type</th>
                          <th className="w-50">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.historylist.map((u, i) => <tr className={styles.cell_center} key={i}>
                          <td className="pl-4">{u.user.username}</td>
                          <td>{dateTime(u.approved_at)}</td>
                          <td>{u.epoint} Pts</td>
                          <td>{u.reward_type}</td>
                          <td className="w-50"><button className={styles.status_green} disabled>{u.status}</button></td>
                        </tr>)}
                      </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg' /></div>}
                    {this.state.hisloaded && !this.state.historylist.length && <div className="p-5 text-center">No E-Points Reward Payout History found.</div>}
                    {(this.state.hnext || this.state.hpage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                      {this.state.hpage > 1 && <button onClick={() => this.getRewards(-1)} className={styles.tbtn}>Prev</button>}
                      <div>Page {this.state.hpage} Showing {(this.state.hpage - 1) * 20 + 1} - {(this.state.hpage - 1) * 20 + this.state.rewardlist.length}</div>
                      {this.state.hnext && <button onClick={() => this.getRewards(1)} className={styles.tbtn}>Next</button>}
                    </div>}
                  </Tab>
                  {/* <Tab eventKey="settings" title="Monthly Incentives Settings">
                    <div className="d-flex flex-column p-5 border-top">
                      <label className="pb-2">Minimum Points to be Eligible for Monthly incentives</label>
                      <form className="position-relative" style={{ maxWidth: 400 }}>
                        <input type="number" className={form.field_light} style={{ paddingRight: 140 }}/>
                        <input type="submit" value="Save" className={styles.tbtn} style={{ position: 'absolute', top: 3, right: 3 }}/>
                      </form>
                    </div>
                  </Tab> */}
                </Tabs>
              </div>
            </div>
          </Tab>
        </Tabs>
        {this.state.view.requested_by && <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
          <Modal.Body>
            <div className={`px-3 ${utils.modal_summary}`}>E-Points Payout / Redemption Slip</div>
            <Table responsive>
              <thead className={styles.modal_table}>
                <tr>
                  <th className="pl-4">Member ID</th>
                  <th>Redeemed At</th>
                  <th>Bank Details</th>
                  <th>E-Points</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody className={styles.modal_table}>
                <tr>
                  <td className="pl-4 font-weight-bold">{this.state.view.requested_by.username}</td>
                  <td>{this.state.view.approved_at ? dateTime(this.state.view.approved_at) : dateTime(this.state.view.created_at)}</td>
                  <td>{this.state.view.requested_by.bank_name}<br />{this.state.view.requested_by.bank_account_number}</td>
                  <td>{this.state.view.epoint} Pts</td>
                  <td>RM 100</td>
                </tr>
              </tbody>
            </Table>
            <div style={{ color: '#787878', padding: '15px 0' }}>**The payout is after the deduction of RM 0.50 transaction</div>
            <div className="d-flex py-2 px-3">
              <div className={`ml-auto ${styles.payout_total}`}>
                <span>Total Payout</span>
                <span className={`${utils.hightext_lg} pl-5`}>RM 200</span>
              </div>
            </div>
            <button className={styles.modal_closebtn} onClick={() => this.setState({ show: false })}><MdCancel /> Close</button>
          </Modal.Body>
        </Modal>}
      </div>
    )
  }
}

export default Aepoints;