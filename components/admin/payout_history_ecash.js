import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import Cookies from 'js-cookie'
import Exports from './pdf_ecash'
import dateTime from '../dateTime'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { MdCancel } from 'react-icons/md'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import { FiCalendar } from 'react-icons/fi'
import Spinner from 'react-bootstrap/Spinner'

class Ecashph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            error: false,
            success: false,
            page: 1,
            next: false,
            payoutlist: [],
            userlist: [],
            payout_check: [],
            payout_selected: [],
            user_selected: [],
            sshow: false,
            view: 0,
            total_ecash: 0,
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
        var u_selected = [];
        const semua = this.state.payoutlist;
        const usersemua = this.state.userlist;
    
        if (i.target && (i.target.checked === true || i.target.checked === false)) {
            array = Array(semua.length).fill(i.target.checked) 
        } else {
            array[i] = !array[i];
        }
        
        array.forEach(function(part, index) {
            if (part) { 
                selected = selected.concat(semua[index]);
                u_selected = u_selected.concat(usersemua[index]);
            }
        });
    
        console.log(u_selected)
    
        this.setState({
            payout_check: array,
            payout_selected: selected,
            user_selected: u_selected,
        })
    }

    getUserfromPayout = (rows) => {
        var zrows = rows;
        var app_rows = [];
        for (var i = 0; i < zrows.length; i++) {
            var last = false; if (i === zrows.length - 1) { last = true; }
            api.get(routes.ecash_payouts + '/' + zrows[i].id + '/user_ecash_payouts')
                .then(res => {
                    var arows = res.data.user_ecash_payouts;
                    arows = arows.filter( chk => chk.paid )
                    var total_ecash = 0;
                    for (var j = 0; j < arows.length; j++) { total_ecash = total_ecash + arows[j].ecash - 0.50 }
                    const row = { payoutlist: arows, total_ecash: total_ecash.toFixed(2) };
                    app_rows = app_rows.concat(row)
                    if (last) { this.setState({ userlist: app_rows, isloaded: true })}
                })
                .catch(err => {})
        }
    }

    getPayouts = (str) => {
        this.setState({ isloaded: false })
        const pagy = this.state.page + parseInt(str || 0);
        api.get(routes.ecash_payouts + '?page=' + pagy + '&scope=HISTORY')
            .then(res => {
                const rows = res.data.ecash_payouts;
                this.getUserfromPayout(rows)
                if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
                else { this.setState({ next: false, page: pagy }) }
                this.setState({ payoutlist: rows, isloaded: true })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ error: true, isloaded: true })
            })
    }

    componentDidMount() {
        this.getPayouts();
    }

    render () {
    
        return (<>

            <div className={styles.tab_btns}>
                <Exports list={this.state.payout_selected} user={this.state.user_selected} />
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
                        <th>Payout Slip</th>
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
                        <td><button className={styles.modal_btn} onClick={() => this.setState({ view: i, sshow: true })}>View</button></td>
                    </tr>)}
                </tbody>
            </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
            {this.state.isloaded && !this.state.payoutlist.length && <div className="p-5 text-center">No Generated Payout Found.</div>}
            {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between p-3">
                {this.state.page > 1 && <button onClick={() => this.getPayouts(-1)} className={styles.tbtn}>Prev</button>}
                <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.payoutlist.length}</div>
                {this.state.next && <button onClick={() => this.getPayouts(1)} className={styles.tbtn}>Next</button>}
            </div>}

            {this.state.payoutlist.length > 0 && this.state.userlist.length > 0 && <Modal show={this.state.sshow} onHide={() => this.setState({ sshow: false })} size="xl" aria-labelledby="fulfilment-modal" centered>
                <Modal.Body>
                    <div className={`px-4 ${utils.modal_summary}`}>E-Cash Payout Slip</div>
                    <div className="px-4 pb-2">Min. E-Cash: <b>RM {this.state.payoutlist[this.state.view].minimum_ecash}</b></div>
                    <div className="row m-0 align-items-center px-3 pb-3">
                        <div className="col-lg-6 p-0">       
                            <div className="d-flex align-items-center flex-nowrap overflow-auto">
                            <div className="date-div mr-2">
                                <span className="calendar-icon"><FiCalendar/></span>
                                <span className="pl-2 pr-1">From</span>
                                <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.payoutlist[this.state.view].start_date, 'date')}</span>
                            </div>
                            <div className="date-div mr-2">
                                <span className="calendar-icon"><FiCalendar/></span>
                                <span className="pl-2 pr-1">To</span>
                                <span className="font-weight-bold pl-2 text-nowrap">{dateTime(this.state.payoutlist[this.state.view].end_date, 'date')}</span>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex flex-wrap justify-content-end">       
                            <div className="font-weight-bold">Slip Generated At</div>
                            <div className="pl-2">{dateTime(this.state.payoutlist[this.state.view].created_at)}</div>
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
                            {this.state.userlist[this.state.view].payoutlist.length ? this.state.userlist[this.state.view].payoutlist.map((u, i) => <tr key={i}>
                                <td className="pl-4 font-weight-bold">{u.username}</td>
                                <td>{dateTime(u.updated_at)}</td>
                                <td>{u.bank_name}<br/>{u.bank_account_number}</td>
                                <td>RM {u.ecash}</td>
                                <td>RM {(u.ecash - 0.50).toFixed(2)}</td>
                            </tr>) : <tr></tr>}
                        </tbody>
                    </Table>
                    {this.state.userlist[this.state.view]?.payoutlist?.length > 0 && <div className="p-5 text-center">No Eligible Member Found.</div>}
                    <div style={{ color: '#787878', padding: '15px 0' }}>**The payout is after the deduction of RM 0.50 transaction</div>
                    <div className="d-flex py-2 px-3">
                        <div className={`ml-auto ${styles.payout_total}`}>
                            <span>Total Payout</span>
                            <span className={`${utils.hightext_lg} pl-5`}>RM {this.state.userlist[this.state.view].total_ecash}</span>
                        </div>
                    </div>
                    <button className={styles.modal_closebtn} onClick={() => this.setState({ sshow: false })}><MdCancel/> Close</button>
                </Modal.Body>
            </Modal>}
        </>)
    }
}

export default Ecashph;