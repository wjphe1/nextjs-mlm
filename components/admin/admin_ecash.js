import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
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

class Aecash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render () {
    
    return (
      <>
        <div className="d-flex align-items-center flex-wrap">
          <div className={utils.h_xl}>Report Overview</div>
          {/* E-Cash Filter */}
          <div className="ml-auto d-flex align-items-center flex-wrap">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="17" fill="#C4C4C4"/>
              <circle cx="9.88975" cy="13.6183" r="3.88975" fill="white" fillOpacity="0.53"/>
              <circle cx="24.3691" cy="9.51268" r="1.51268" fill="white"/>
              <circle cx="16.5887" cy="17.2923" r="6.69901" fill="white"/>
              <path d="M18.4019 18.4353C18.4019 18.6571 18.3434 18.8628 18.2265 19.0524C18.1135 19.238 17.9441 19.3913 17.7182 19.5123C17.4963 19.6293 17.2321 19.6938 16.9255 19.7059V20.196H16.5383V19.6999C16.1107 19.6636 15.7658 19.5365 15.5036 19.3187C15.2414 19.0968 15.1023 18.7963 15.0861 18.4171H16.1874C16.2116 18.6591 16.3285 18.8144 16.5383 18.883V17.927C16.2237 17.8463 15.9716 17.7677 15.782 17.691C15.5964 17.6144 15.433 17.4914 15.2919 17.3219C15.1507 17.1525 15.0801 16.9206 15.0801 16.6261C15.0801 16.259 15.2152 15.9646 15.4855 15.7427C15.7598 15.5208 16.1107 15.3958 16.5383 15.3675V14.8774H16.9255V15.3675C17.3491 15.3998 17.6839 15.5229 17.93 15.7366C18.176 15.9504 18.3132 16.2469 18.3414 16.6261H17.2341C17.2099 16.4083 17.1071 16.2671 16.9255 16.2025V17.1404C17.2604 17.2332 17.5185 17.3159 17.7 17.3885C17.8816 17.4611 18.0429 17.5821 18.1841 17.7515C18.3293 17.9169 18.4019 18.1448 18.4019 18.4353ZM16.1753 16.5777C16.1753 16.6785 16.2055 16.7632 16.266 16.8318C16.3306 16.9004 16.4213 16.9609 16.5383 17.0133V16.1723C16.4254 16.1925 16.3366 16.2368 16.2721 16.3054C16.2075 16.37 16.1753 16.4607 16.1753 16.5777ZM16.9255 18.9012C17.0466 18.881 17.1414 18.8326 17.2099 18.756C17.2825 18.6793 17.3188 18.5845 17.3188 18.4716C17.3188 18.3667 17.2846 18.282 17.216 18.2174C17.1514 18.1489 17.0546 18.0904 16.9255 18.042V18.9012Z" fill="#A9A9A9"/>
              <circle cx="23.5033" cy="21.6141" r="3.85585" stroke="#A9A9A9" strokeWidth="0.5"/>
            </svg>
            {(this.state.minEcash && this.state.startDate && this.state.endDate) ? 
            <div className="px-2 font-weight-bold" onClick={() => this.setState({ endDate: '', startDate: '', minEcash: '' })} style={{ cursor: 'pointer' }}>Reset Filter</div>
            :
            <div className="px-2 font-weight-bold" onClick={() => this.setState({ fshow: true })} style={{ cursor: 'pointer' }}>E-Cash Filter</div>}
          </div>
        </div>
        {this.props.links}

        {/* Date Picker */}
        <div className={`py-2 d-flex align-items-center flex-wrap border-b mb-4 ${utils.text_md}`}>
          <div className="d-flex align-items-center flex-wrap">
            <div className="font-weight-bold px-2">
              Member List with 
              {this.state.minEcash ? <span style={{ color: '#FF6202' }}> RM {this.state.minEcash} </span> : <span style={{ color: '#FF6202' }}> - </span>}
              E-cash generate 
            </div>
            <label className="date-div" style={{ pointerEvents: 'none'}}>
              <span className="calendar-icon"><FiCalendar/></span>
              <span className="pl-2 pr-1">From</span>
              <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} />
            </label>
            <label className="date-div" style={{ pointerEvents: 'none'}}>
              <span className="calendar-icon"><FiCalendar/></span>
              <span className="pl-2 pr-1">To</span>
              <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd/>
            </label>
          </div>
          {this.state.minEcash && this.state.startDate && this.state.endDate && <div className="ml-auto">
            <button className={styles.modal_btn} onClick={() => this.setState({ endDate: '', startDate: '', minEcash: '' })}>Reset Filter</button>
          </div>}
        </div>


        <div className={styles.table}>
          <div className="dn-mb py-4"></div>
          <div className="admin-generic-tabs report-tabs border-0 m-0">
            <Tabs defaultActiveKey="list">
              <Tab eventKey="list" title="Payout">
                <div className={styles.tab_btns}>
                  <button className={`ml-2 py-2 ${styles.tbtn_reverse}`}>Download</button>
                </div>
                <Table responsive>
                  <thead>
                    <tr className={styles.cell_center}>
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
                      <th>E-Cash Slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.cell_center}>
                      <td className="pl-4"><input type="checkbox"/></td>
                      <td>Member1234</td>
                      <td>20 Oct 2020 11:30 AM</td>
                      <td>RM 200</td>
                      <td>RM 245.50</td>
                      <td><button className={styles.status_yellow} disabled>In Progress</button></td>
                      <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                    </tr>
                    <tr className={styles.cell_center}>
                      <td className="pl-4"><input type="checkbox"/></td>
                      <td>Member1234</td>
                      <td>20 Oct 2020 11:30 AM</td>
                      <td>RM 200</td>
                      <td>RM 245.50</td>
                      <td><button className={styles.status_yellow} disabled>In Progress</button></td>
                      <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                    </tr>
                  </tbody>
                </Table>
                <div className="p-5 text-center m-auto" style={{ maxWidth: 400 }}>
                  <div className="pb-3">Generate member List who are eligible for E-cash reimburstment</div>
                  <button className={styles.tbtn}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="17" cy="17" r="17" fill="white"/>
                      <circle cx="9.88975" cy="13.6183" r="3.88975" fill="#FF6202" fillOpacity="0.53"/>
                      <circle cx="24.3691" cy="9.51268" r="1.51268" fill="#FF6202"/>
                      <circle cx="16.5887" cy="17.2923" r="6.69901" fill="#FF6202"/>
                      <path d="M18.4019 18.4353C18.4019 18.6571 18.3434 18.8628 18.2265 19.0524C18.1135 19.238 17.9441 19.3913 17.7182 19.5123C17.4963 19.6293 17.2321 19.6938 16.9255 19.7059V20.196H16.5383V19.6999C16.1107 19.6636 15.7658 19.5365 15.5036 19.3187C15.2414 19.0968 15.1023 18.7963 15.0861 18.4171H16.1874C16.2116 18.6591 16.3285 18.8144 16.5383 18.883V17.927C16.2237 17.8463 15.9716 17.7677 15.782 17.691C15.5964 17.6144 15.433 17.4914 15.2919 17.3219C15.1507 17.1525 15.0801 16.9206 15.0801 16.6261C15.0801 16.259 15.2152 15.9646 15.4855 15.7427C15.7598 15.5208 16.1107 15.3958 16.5383 15.3675V14.8774H16.9255V15.3675C17.3491 15.3998 17.6839 15.5229 17.93 15.7366C18.176 15.9504 18.3132 16.2469 18.3414 16.6261H17.2341C17.2099 16.4083 17.1071 16.2671 16.9255 16.2025V17.1404C17.2604 17.2332 17.5185 17.3159 17.7 17.3885C17.8816 17.4611 18.0429 17.5821 18.1841 17.7515C18.3293 17.9169 18.4019 18.1448 18.4019 18.4353ZM16.1753 16.5777C16.1753 16.6785 16.2055 16.7632 16.266 16.8318C16.3306 16.9004 16.4213 16.9609 16.5383 17.0133V16.1723C16.4254 16.1925 16.3366 16.2368 16.2721 16.3054C16.2075 16.37 16.1753 16.4607 16.1753 16.5777ZM16.9255 18.9012C17.0466 18.881 17.1414 18.8326 17.2099 18.756C17.2825 18.6793 17.3188 18.5845 17.3188 18.4716C17.3188 18.3667 17.2846 18.282 17.216 18.2174C17.1514 18.1489 17.0546 18.0904 16.9255 18.042V18.9012Z" fill="white"/>
                      <circle cx="23.5033" cy="21.6141" r="3.85585" stroke="#FFAC79" strokeWidth="0.5"/>
                    </svg>
                    <span className="pl-2" onClick={() => this.setState({ fshow: true })}>E-Cash Filter</span>
                  </button>
                </div>
              </Tab>
              <Tab eventKey="pending" title="Pending">
                <div className={styles.tab_btns}>
                  <button className={`ml-2 py-2 ${styles.tbtn}`}>Mark As Successful</button>
                </div>
                <div className="py-2 px-3 border-top d-flex">
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
                    <tr className={styles.cell_center}>
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
                      <th>E-Cash Slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.cell_center}>
                      <td className="pl-4"><input type="checkbox"/></td>
                      <td>Member1234</td>
                      <td>20 Oct 2020 11:30 AM</td>
                      <td>RM 200</td>
                      <td>RM 245.50</td>
                      <td><button className={styles.status_red} disabled>Pending</button></td>
                      <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                    </tr>
                    <tr className={styles.cell_center}>
                      <td className="pl-4"><input type="checkbox"/></td>
                      <td>Member1234</td>
                      <td>20 Oct 2020 11:30 AM</td>
                      <td>RM 200</td>
                      <td>RM 245.50</td>
                      <td><button className={styles.status_red} disabled>Pending</button></td>
                      <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                    </tr>
                  </tbody>
                </Table>
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
            <button className={`px-5 ${styles.tbtn}`}>Generate List</button>
          </Modal.Footer>
        </Modal>

        {/* Payout Slip Modal */}                    
        <Modal show={this.state.sshow} onHide={() => this.setState({ sshow: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
          <Modal.Body>
            <div className="row m-0 align-items-center">
              <div className="col-6 p-0">       
                <div className={`px-3 ${utils.modal_summary}`}>E-Cash Slip</div>
              </div>
              <div className="col-6 p-0 d-flex flex-wrap justify-content-end">       
                <div className="font-weight-bold">Slip Generated At</div>
                <div className="pl-2">2 Feb 2020 11:30 AM</div>
              </div>
            </div>
            <Table responsive>
              <thead className={styles.modal_table}>
                <tr>
                  <th className="pl-4">Member ID</th>
                  <th>Eligible At</th>
                  <th>Bank Details</th>
                  <th>E-Cash</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody className={styles.modal_table}>
                <tr>
                  <td className="pl-4 font-weight-bold">Member123</td>
                  <td>2 Feb 2020</td>
                  <td>Maybank<br/>1679379038903</td>
                  <td>RM 200</td>
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
            <button className={styles.modal_closebtn} onClick={() => this.setState({ sshow: false })}><MdCancel/> Close</button>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Aecash;