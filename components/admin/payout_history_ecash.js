import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { MdCancel } from 'react-icons/md'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import { FiCalendar } from 'react-icons/fi'

class Ecashph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sshow: false,
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
        <div className={styles.tab_btns}>
            <button className={`py-2 ${styles.tbtn_reverse}`}>Download</button>
        </div>
        <Table responsive>
            <thead>
                <tr>
                    <th className="pl-4"><input type="checkbox"/></th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Slip Generated At</th>
                    <th>Status</th>
                    <th>Payout Slip</th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.cell_center}>
                    <td className="pl-4"><input type="checkbox"/></td>
                    <td>20 Sept 2020</td>
                    <td>20 Oct 2020</td>
                    <td>20 Oct 2020 11:30 AM</td>
                    <td><button className={styles.status_green} disabled>Successful</button></td>
                    <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                </tr>
                <tr className={styles.cell_center}>
                    <td className="pl-4"><input type="checkbox"/></td>
                    <td>20 Sept 2020</td>
                    <td>20 Oct 2020</td>
                    <td>20 Oct 2020 11:30 AM</td>
                    <td><button className={styles.status_green} disabled>Successful</button></td>
                    <td><button className={styles.modal_btn} onClick={() => this.setState({ sshow: true })}>View</button></td>
                </tr>
            </tbody>
        </Table>

        <Modal show={this.state.sshow} onHide={() => this.setState({ sshow: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
            <Modal.Body>
                <div className={`px-3 ${utils.modal_summary}`}>E-Cash Payout Slip</div>
                <div className="row m-0 align-items-center pb-4">
                    <div className="col-lg-6 p-0">       
                        <div className="d-flex align-items-center flex-nowrap overflow-auto">
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
                    </div>
                    <div className="col-lg-6 d-flex flex-wrap justify-content-end">       
                        <div className="font-weight-bold">Slip Generated At</div>
                        <div className="pl-2">2 Feb 2020 11:30 AM</div>
                    </div>
                </div>
                <Table responsive>
                    <thead className={styles.modal_table}>
                        <tr>
                            <th className="pl-4">Member ID</th>
                            <th>Eligible Date</th>
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
                        <tr>
                            <td className="pl-4 font-weight-bold">Member223</td>
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

export default Ecashph;