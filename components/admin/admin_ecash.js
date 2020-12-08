import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import api from '../auth/api'
import routes from '../auth/routes'
import Cookies from 'js-cookie'
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

class Aecash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      error: false,
      success: false,
      page: 1,
      next: false,
      payoutlist: [],
      fshow: false,
      sshow: false,
      startDate: '',
      endDate: '',
      minEcash: '',
    };
  }

  handleChange = (e) => {
    const value = parseFloat(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  postPayout = () => {
    if (this.state.startDate && this.state.endDate && this.state.minEcash) {
      this.setState({ isloaded: false })
      const postdata = { ecash_payout: { start_date: this.state.startDate, end_date: this.state.endDate, minimum_ecash: this.state.minEcash }}
      api.post(routes.ecash_payouts, postdata)
        .then(res => {
          this.setState({ err_msg: { error: 'Expense Created Successully'}, success: true, fshow: false })
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

        {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
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
        {this.state.success && <div className={`mb-4 ${form.notice_success}`}>
          <div className="col-10 d-flex align-items-center">
            <span className={form.sexcl}>✓</span> 
            <div>{this.state.err_msg.error}</div>
          </div> 
          <div onClick={() => this.setState({ success: false })} className={`col-2 ${form.sclose}`}>Close</div>
        </div>}
        <div className={styles.table}>
          <div className="dn-mb py-4"></div>
          <div className="admin-generic-tabs report-tabs border-0 m-0">
            <Tabs defaultActiveKey="list">
              <Tab eventKey="list" title="Payout">
                <div className={styles.tab_btns}>
                  <button onClick={() => this.setState({ fshow: true })} className={`mr-2 py-2 ${styles.tbtn}`}>Generate Payout</button>
                  <button className={`ml-2 py-2 ${styles.tbtn_reverse}`}>Mark as Done</button>
                </div>
                {this.state.isloaded ? <Table responsive>
                  <thead>
                    <tr>
                      <th className="pl-4"><input type="checkbox"/></th>
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
                      <td className="pl-4"><input type="checkbox"/></td>
                      <td>{dateTime(u.start_date, 'date')}</td>
                      <td>{dateTime(u.end_date, 'date')}</td>
                      <td>{u.minimum_ecash}</td>
                      <td>{dateTime(u.created_at)}</td>
                      {u.status === 'PENDING' && <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td>}
                      {u.status === 'APPROVED' && <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                      {u.status === 'VOID' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                      <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                    </tr>)}
                  </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.payoutlist.length && <div className="p-5 text-center">No Generated Payout Found.</div>}
                {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between p-3">
                  {this.state.page > 1 && <button onClick={() => this.getPayout(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.payoutlist.length}</div>
                  {this.state.next && <button onClick={() => this.getPayout(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
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
            <div className="py-2 px-3 d-flex">
              <div className={styles.sale_info_green}>
                <div className="d-flex">   
                  <div className={utils.text_lg}>56/200 Members</div>
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
                <div className={`py-2 ${utils.text_md}`}>E- Cash pay out had mark as Successful</div>
              </div>
              <div className={styles.sale_info_red}>
                <div className="d-flex flex-column justify-content-center">
                  <div className={utils.text_lg}>142 Members</div>
                  <div className={`py-2 ${utils.text_md}`}>left for E-Cash Pay out</div>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  <button className={styles.info_btn_red}>Send to History</button>
                </div>
              </div>
            </div>
            <Table responsive>
              <thead>
                <tr className={styles.modal_table}>
                  <th className="pl-4"><input type="checkbox"/></th>
                  <th>Member ID</th>
                  <th>Eligible At</th>
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
                  <th>Status</th>
                  <th><button className={`py-2 ${styles.tbtn}`}>Download</button></th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.modal_table}>
                  <td className="pl-4"><input type="checkbox"/></td>
                  <td>Member1234</td>
                  <td>20 Oct 2020 11:30 AM</td>
                  <td>RM 200</td>
                  <td>RM 245.50</td>
                  <td><button className={styles.status_red} disabled>Pending</button></td>
                  <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>Mark as Successful</button></td>
                </tr>
                <tr className={styles.modal_table}>
                  <td className="pl-4"><input type="checkbox"/></td>
                  <td>Member1234</td>
                  <td>20 Oct 2020 11:30 AM</td>
                  <td>RM 200</td>
                  <td>RM 245.50</td>
                  <td><button className={styles.status_red} disabled>Pending</button></td>
                  <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>Mark as Successful</button></td>
                </tr>
              </tbody>
            </Table>
            <button className={styles.modal_closebtn} onClick={() => this.setState({ sshow: false })}><MdCancel/> Close</button>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Aecash;