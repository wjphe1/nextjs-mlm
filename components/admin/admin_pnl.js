import Link from 'next/link'
import React from 'react'
import Pnlform from './profit_loss_form'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'

class Apnl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            startDate: new Date(),
            endDate: (new Date()).setDate(new Date().getDate()+1)
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
            <div className={styles.table}>
                <div className="d-flex align-items-center p-3 pl-4 flex-wrap" style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <div className={styles.thead}>All Profit &amp; Loss</div>
                    <div className="d-flex align-items-center ml-auto flex-wrap">
                        <Pnlform/>
                        <button className={`m-2 py-2 ${styles.tbtn_reverse}`}>Download</button>
                    </div>
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
                                    <td>2 Feb 2020</td>
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
            </div>
        )
    }
}

export default Apnl;