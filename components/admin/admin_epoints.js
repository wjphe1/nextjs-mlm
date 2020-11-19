import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'

class Aepoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleChange = (e) => {
    console.log(e)
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  render () {
    
    return (
      <div className="admin-reports-tabs">
        <Tabs defaultActiveKey="reimbursement">
          <Tab eventKey="reimbursement" title="● Reimbursement">
            <div className={styles.table}>
              <div className="dn-mb py-4"></div>
              <div className="admin-generic-tabs report-tabs border-0 m-0">
                <Tabs defaultActiveKey="list">
                  <Tab eventKey="list" title="Reimbursement List">
                    <div className={styles.tab_btns}>
                      <button className={`mr-2 py-2 ${styles.tbtn}`}>Mark as Done</button>
                      <button className={`ml-2 py-2 ${styles.tbtn_reverse}`}>Download</button>
                    </div>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="pl-4"><input type="checkbox"/></th>
                          <th>Member ID</th>
                          <th>Redeem At</th>
                          <th>Redeem Amount</th>
                          <th>Payout</th>
                          <th>Status</th>
                          <th>Slip</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>20 Oct 2020 11:30 AM</td>
                          <td>200 Pts</td>
                          <td>RM 245.50</td>
                          <td><button className={styles.status_yellow} disabled>In Progress</button></td>
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>20 Oct 2020 11:30 AM</td>
                          <td>200 Pts</td>
                          <td>RM 245.50</td>
                          <td><button className={styles.status_yellow} disabled>In Progress</button></td>
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="history" title="Reimbursement History">
                    <div className={styles.tab_btns}>
                      <button className={`py-2 ${styles.tbtn_reverse}`}>Download</button>
                    </div>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="pl-4"><input type="checkbox"/></th>
                          <th>Member ID</th>
                          <th>Paid At</th>
                          <th>Redeem Amount</th>
                          <th>Payout</th>
                          <th>Status</th>
                          <th>Slip</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>20 Oct 2020 11:30 AM</td>
                          <td>200 Pts</td>
                          <td>RM 245.50</td>
                          <td><button className={styles.status_red} disabled>Paid</button></td>
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>20 Oct 2020 11:30 AM</td>
                          <td>200 Pts</td>
                          <td>RM 245.50</td>
                          <td><button className={styles.status_red} disabled>Paid</button></td>
                          <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Tab>
          <Tab eventKey="incentives" title="● Monthly incentives">
          <div className={styles.table}>
              <div className="dn-mb py-4"></div>
              <div className="admin-generic-tabs report-tabs border-0 m-0">
                <Tabs defaultActiveKey="monthly">
                  <Tab eventKey="monthly" title="Monthly Incentives">
                    <div className={styles.tab_btns}>
                      <button className={`py-2 ${styles.tbtn}`}>Approve</button>
                    </div>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="pl-4"><input type="checkbox"/></th>
                          <th>Member ID</th>
                          <th>Incentives Points</th>
                          <th className="w-50">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>200 Pts</td>
                          <td className="w-50"><button className={styles.status_yellow} disabled>In Progress</button></td>
                        </tr>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>200 Pts</td>
                          <td className="w-50"><button className={styles.status_yellow} disabled>In Progress</button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="history" title="History">
                    <Table responsive>
                    <thead>
                        <tr>
                          <th className="pl-4"><input type="checkbox"/></th>
                          <th>Member ID</th>
                          <th>Incentives Points</th>
                          <th className="w-50">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>200 Pts</td>
                          <td className="w-50"><button className={styles.status_green} disabled>Successful</button></td>
                        </tr>
                        <tr className={styles.cell_center}>
                          <td className="pl-4"><input type="checkbox"/></td>
                          <td>Member1234</td>
                          <td>200 Pts</td>
                          <td className="w-50"><button className={styles.status_green} disabled>Successful</button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="settings" title="Monthly Incentives Settings">
                    <div className="d-flex flex-column p-5">
                      <label className="pb-2">Minimum Points to be Eligible for Monthly incentives</label>
                      <form className="position-relative" style={{ maxWidth: 400 }}>
                        <input type="number" className={form.field_light} style={{ paddingRight: 140 }}/>
                        <input type="submit" className={styles.tbtn} style={{ position: 'absolute', top: 3, right: 3 }}/>
                      </form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Tab>
        </Tabs>
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
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
                  <td className="pl-4 font-weight-bold">Member123</td>
                  <td>2 Feb 2020</td>
                  <td>Maybank<br/>1679379038903</td>
                  <td>200 Pts</td>
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
            <button className={styles.modal_closebtn} onClick={() => this.setState({ show: false })}><MdCancel/> Close</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Aepoints;