import Link from 'next/link'
import React from 'react'
import cn from 'classnames'
import api from '../auth/api'
import routes from '../auth/routes'
import Exports from './pdf_sales'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md'
import { RiErrorWarningLine } from 'react-icons/ri';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import dateTime from '../dateTime';
import Spinner from 'react-bootstrap/Spinner'

class Asales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            sales: '-',
            show: false,
            isloaded: false,
            error: false,
            orderlist: [],
            order_check: [],
            order_selected: [],
            view: {},
            page: 1,
            next: false,
        };
    }

    handleChange = (e) => {
        console.log(e)
        const value = parseInt(e.target.value);
        this.setState({
        [e.target.name]: value
        });
    }

    getSales = () => {
      api.get(routes.reports + '/sales?from_date=' + dateTime(this.state.startDate, 'si') + '&to_date=' + dateTime(this.state.endDate, 'si'))
        .then(res => {
          const sales = res.data.sales;
          this.setState({ sales: sales })
        })
        .catch(err => {
          this.setState({ sales: '-' })
        })
    }

    checkOrder = (i) => {
        var array = this.state.order_check;
        var selected = [];
        const semua = this.state.orderlist;
    
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
            order_check: array,
            order_selected: selected,
        })
    }

    getOrders = (str) => {
        this.setState({ isloaded: false })
        const pagy = this.state.page + parseInt(str || 0);
        api.get(routes.orders + '?page=' + pagy + '&from_date=' + dateTime(this.state.startDate, 'si') + '&to_date=' + dateTime(this.state.endDate, 'si'))
            .then(res => {
                const rows = res.data.orders
                if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
                else { this.setState({ next: false, page: pagy }) }
                console.log(rows)
                this.setState({ orderlist: rows, isloaded: true, order_check: Array(rows.length).fill(false) })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ isloaded: true, error: true })
            })
    }

    changeDate = (date, type) => {
        if (type === 'start') {
            this.setState({ startDate: date })
        } else {
            this.setState({ endDate: date })
        }

        setTimeout(() => {this.getOrders()}, 300);
        setTimeout(() => {this.getSales()}, 300);
    }
    
    componentDidMount() {
        this.getOrders();
        this.getSales();
    }

    render () {
    
        return (<>
            <div className="d-flex align-items-center flex-wrap">
              <div className={utils.h_xl}>Report Overview</div>
              {/* Date Pickers */}
              <div className="ml-auto d-flex align-items-center flex-wrap">
                <label className="date-div">
                  <span className="calendar-icon"><FiCalendar/></span>
                  <span className="pl-2 pr-1">From</span>
                  <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.changeDate(date, 'start')} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                </label>
                <label className="date-div">
                  <span className="calendar-icon"><FiCalendar/></span>
                  <span className="pl-2 pr-1">To</span>
                  <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.changeDate(date, 'end')} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                </label>
              </div>
            </div>

            {this.props.tablinks}

            <div className={`mt-3 ${styles.table}`}>
                <div className="d-flex align-items-center p-3 pl-4" style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <div className={styles.thead}>Transaction History</div>
                    <Exports list={this.state.order_selected}/>
                </div>
                <div className="py-2">
                    <button disabled className={`my-3 mx-4 ${styles.sale_info}`}>
                        <div className={utils.text_md}>Summary of Sales</div>
                        <div className={utils.hightext_lg}>RM {this.state.sales}</div>
                    </button>
                </div>
                {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span>
                    <div><b>Error - </b> Some Error Occurred</div>
                  </div> 
                  <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                </div>}
                {this.state.isloaded ? <Table responsive>
                    <thead>
                        <tr>
                            <th className="pl-4"><input type="checkbox" onChange={this.checkOrder}/></th>
                            <th>Transfer ID</th>
                            <th>Transferred By</th>
                            <th>Transferred At</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderlist.map((u, i) => <tr className={`${cn({['flagged']: u.flag})} ${styles.cell_center}`} key={i}>
                            <td className="pl-4"><input type="checkbox" checked={this.state.order_check[i]} onChange={() => this.checkOrder(i)}/></td>
                            <td>{u.order_number}</td>
                            <td>{u.sales_by.username}</td>
                            <td>{dateTime(u.created_at)}</td>
                            <td>RM {u.total_price}</td>
                            {u.status === 'COMPLETED' && <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                            {u.status === 'VOID' && <td><button className={`text-capitalize ${styles.status_red}`} disabled>{u.status.toLowerCase()}</button></td>}
                            {u.status === 'PENDING' && <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td>}
                            <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true, view: u })}>View</button></td>
                        </tr>)}
                    </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.orderlist.length && <div className="p-5 text-center">No transfer found.</div>}
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Body>
                        <div className="row m-0">
                            <div className="col-md-6 p-0">
                                <div className={styles.delivery}>
                                    <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;{this.state.view.customer ? this.state.view.customer.username : this.state.view.deliver_to}</div>
                                    <div className="pt-2">{this.state.view.address || <span className="font-italic">No Fulfilment Required</span>}</div>
                                </div>
                            </div>
                            <div className="col-md-6 px-0 pt-3 text-right">
                            {this.state.view.flag && <div className={utils.hightext_md}><RiErrorWarningLine/>&nbsp;This Transfer is Flagged</div>}
                                <div className={utils.h_md_n}>Invoice ID: {this.state.view.order_number}</div>
                                <div className={utils.text_md}>Order at {dateTime(this.state.view.created_at)}</div>
                            </div>
                        </div>
                        <div className={`px-3 ${utils.modal_summary}`}>Order Summary</div>
                        <Table responsive>
                            <thead className={styles.modal_table}>
                                <tr>
                                    <th className="pl-4">Product Name</th>
                                    <th>Quantity</th>
                                    <th>Pricing (MYR)</th>
                                </tr>
                            </thead>
                            <tbody className={styles.modal_table}>
                                {this.state.view.order_items && this.state.view.order_items.map((u, i) => <tr key={i}>
                                    <td className="pl-4 font-weight-bold">{u.product_details.name}</td>
                                    <td>{u.quantity}</td>
                                    <td>{u.unit_price}</td>
                                </tr>)}
                            </tbody>
                            <thead className={`${styles.subtotal} ${styles.modal_table}`}>
                                <tr>
                                    <th className={`pl-4 ${styles.ttl}`}>Subtotal</th>
                                    <th style={{ fontSize: '0.9rem' }}>{this.state.view.order_items && <span>{this.state.view.order_items.length} item(s)</span>}</th>
                                    <th className={styles.tend}>{this.state.view.total_price}</th>
                                </tr>
                            </thead>
                        </Table>
                        <div className="py-3"></div>
                        <button className={styles.modal_closebtn} onClick={() => this.setState({ show: false })}><MdCancel/> Close</button>
                    </Modal.Body>
                </Modal>
            </div>
            {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                {this.state.page > 1 && <button onClick={() => this.getOrders(-1)} className={styles.tbtn}>Prev</button>}
                <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.orderlist.length}</div>
                {this.state.next && <button onClick={() => this.getOrders(1)} className={styles.tbtn}>Next</button>}
            </div>}
        </>)
    }
}

export default Asales;