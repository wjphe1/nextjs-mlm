import Link from 'next/link'
import React from 'react'
import { withRouter } from 'next/router'
import api from '../auth/api'
import routes from '../auth/routes'
import Cookies from 'js-cookie'
import cn from 'classnames'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import dateTime from '../dateTime'
import Prodinv from './product_inventory'
import Stocktransfer from './stock_transfer'
import DatePicker from "react-datepicker";
import { FaUsers } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { RiErrorWarningLine } from 'react-icons/ri';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Spinner from 'react-bootstrap/Spinner'

class Othprod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      error: false,
      hisloaded: false,
      herror: false,
      shipped: false,
      ferror: false,
      pendinglist: [],
      pending_check: [],
      pending_selected: [],
      historylist: [],
      pshow: false,
      hshow: false,
      pending_view: {},
      history_view: {},
      startDate: '',
      endDate: '',
      page: 1,
      next: false,
      hpage: 1,
      hnext: false,
    };
  }

  flagOrder = (boolean, id) => {
    this.setState({ ferror: false })
    api.put(routes.orders + '/' + id, { order: { flag: !boolean } })
      .then(res => {
        this.getOrders();
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ ferror: true })
      })
  }

  checkOrder = (i) => {
    var array = this.state.pending_check;
    var selected = [];
    const semua = this.state.pendinglist;

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
      pending_check: array,
      pending_selected: selected,
    })
  }

  shipOrders = () => {
    this.setState({ isloaded: false, shipped: false, })
    for (var i = 0; i < this.state.pending_selected.length; i ++) {
      api.put(routes.orders + '/' + this.state.pending_selected[i].id + '/complete')
        .then(res => this.setState({ shipped: true }) )
        .catch(err => { console.log(err.response); this.setState({ error: true }) })
    }
    setTimeout(() => {this.getOrders();}, 500)
    setTimeout(() => {this.gethistoryOrders();}, 500)
  }

  getOrders = (str) => {
    this.setState({ isloaded: false })
    const pagy = this.state.page + parseInt(str || 0);
    api.get(routes.orders + '?page=' + pagy + '&status=PENDING')
      .then(res => {
        const rows = res.data.orders
        if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
        else { this.setState({ next: false, page: pagy }) }
        console.log(rows)
        this.setState({ pendinglist: rows, isloaded: true, pending_check: Array(rows.length).fill(false) })
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ isloaded: true, error: true })
      })
  }

  gethistoryOrders = (str) => {
    this.setState({ hisloaded: false })
    const pagy = this.state.hpage + parseInt(str || 0);
    api.get(routes.orders + '?page=' + pagy + '&status=COMPLETED')
      .then(res => {
        const rows = res.data.orders
        if (rows.length >= 20) { this.setState({ hnext: true, hpage: pagy }) }
        else { this.setState({ hnext: false, hpage: pagy }) }
        console.log(rows)
        this.setState({ historylist: rows, hisloaded: true })
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ hisloaded: true, herror: true })
      })
  }

  componentDidMount() {
    this.getOrders();
    this.gethistoryOrders();
  }

  render () {
    var user = {};
    var role = null;
    var dtab = 'transfer';
    var userStr = Cookies.get('user');
    if (userStr) { user = JSON.parse(userStr); role = user.role; }
    if (role === 'HQ') { dtab = 'inventory'; }
    if (this.props.router.query.tab) { dtab = this.props.router.query.tab; }

    return (
        <section className="py-5 px-4">
          {/* Head Section */}
          <div className="d-flex align-items-center flex-wrap">
            <div className={utils.h_xl}>Product Management</div>
          </div>

          {/* HQ Products Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey={dtab} id="uncontrolled-tab-example">
              {role === 'HQ' && <Tab eventKey="inventory" title="● Inventory">    
                <Prodinv/>
              </Tab>}
              <Tab eventKey="transfer" title="● Stock Transfer">
                <Stocktransfer getOrders={this.getOrders}/>
              </Tab>
              <Tab eventKey="pending" title="● Pending Fulfilment">
                {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span>
                    <div><b>Error - </b> Update error, please try again later</div>
                  </div> 
                  <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                </div>}
                {this.state.shipped && <div className={`mb-4 ${form.notice_success}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span>
                    <div><b>Success - </b> Transfer(s) are marked as completed</div>
                  </div> 
                  <div onClick={() => this.setState({ shipped: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3 flex-wrap">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search transfer here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    {role === 'HQ' && <button onClick={this.shipOrders} className={`ml-auto ${styles.tbtn}`}>Ship Out</button>}
                  </div>
                  {this.state.isloaded ? <Table responsive>
                    <thead>
                      <tr>
                        {role === 'HQ' ? <th className="pl-4"><input type="checkbox" onChange={this.checkOrder}/></th> : <th className="pl-4"></th>}
                        <th>Transfer ID</th>
                        <th>Receiver (M/C)</th>
                        <th>Delivery Address</th>
                        <th>Transferred by</th>
                        <th>Transfer Summary</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.pendinglist.map((u, i) => <tr className={styles.cell_center} key={i}>
                        {role === 'HQ' ? <td className="pl-4"><input type="checkbox" checked={this.state.pending_check[i]} onChange={() => this.checkOrder(i)}/></td> : <td className="pl-4"></td>}
                        <td className="font-weight-bold">{u.order_number}</td>
                        {u.customer ? <td className="font-weight-bold">(M) {u.customer.username}</td> : <td className="font-weight-bold">(C) {u.deliver_to}</td>}
                        <td className="text-truncate" style={{ maxWidth: 200 }}>{u.address ? u.address : '-'}</td>
                        <td>{u.fulfilled_by.username}</td>
                        <td><button className={styles.modal_btn} onClick={() => this.setState({ pshow: true, pending_view: u })}>View</button></td>
                        <td><button className={styles.status_yellow} disabled>{u.status}</button></td>
                      </tr>)}
                    </tbody>
                  </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                  {this.state.isloaded && !this.state.pendinglist.length && <div className="p-5 text-center">No pending transfer found.</div>}
                  <Modal show={this.state.pshow} onHide={() => this.setState({ pshow: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Header>
                      <div className={utils.modal_header}>
                        {role === 'HQ' ? 'Please confirm the details before proceeding to fulfilment' : 'Please wait for HQ to fulfill the transfer'}
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className={styles.delivery}>
                        <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;{this.state.pending_view.customer ? this.state.pending_view.customer.username : this.state.pending_view.deliver_to}</div>
                        <div className="pt-2">{this.state.pending_view.address || <span className="font-italic">No Fulfilment Required</span>}</div>
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
                          {this.state.pending_view.order_items && this.state.pending_view.order_items.map((u, i) => <tr key={i}>
                            <td className="pl-4 font-weight-bold">{u.product_details.name}</td>
                            <td>{u.quantity}</td>
                            <td>{u.unit_price}</td>
                          </tr>)}
                        </tbody>
                        <thead className={`${styles.subtotal} ${styles.modal_table}`}>
                          <tr>
                            <th className={`pl-4 ${styles.ttl}`}>Subtotal</th>
                            <th style={{ fontSize: '0.9rem' }}>{this.state.pending_view.order_items && <span>{this.state.pending_view.order_items.length} item(s)</span>}</th>
                            <th className={styles.tend}>{this.state.pending_view.total_price}</th>
                          </tr>
                        </thead>
                      </Table>
                      {role !== 'HQ' && <button className={styles.modal_closebtn} onClick={() => this.setState({ pshow: false })}><MdCancel/> Close</button>}
                    </Modal.Body>
                    {role === 'HQ' && <Modal.Footer>
                      <button onClick={() => this.setState({ pshow: false })} className={styles.tbtn_reverse_borderless}><MdCancel/> Discard</button>
                      <button className={`px-5 ${styles.tbtn_reverse}`}>Edit</button>
                      <button className={`px-5 ${styles.tbtn}`}>Confirm</button>
                    </Modal.Footer>}
                  </Modal>
                </div>
                {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                  {this.state.page > 1 && <button onClick={() => this.getOrders(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.pendinglist.length}</div>
                  {this.state.next && <button onClick={() => this.getOrders(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}
              </Tab>
              <Tab eventKey="past" title="● Past Transfer">
                {this.state.ferror && <div className={`mb-4 ${form.notice_error}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span>
                    <div><b>Error - </b> Flag error, please try again later</div>
                  </div> 
                  <div onClick={() => this.setState({ ferror: false })} className={`col-2 ${form.nclose}`}>Close</div>
                </div>}
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search transfer here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <OverlayTrigger trigger="click" placement='top'
                      overlay={
                        <Popover id="popover-positioned-top">
                          <Popover.Content>
                            {role === 'HQ' ? 'Flag the transfer if its need more attention' : 'Transfer that are flagged are transfers that may have issues and are checking by HQ'}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <button className={styles.popover}>?</button>
                    </OverlayTrigger>
                  </div>
                  {this.state.isloaded ? <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4">Transfer ID</th>
                          <th>Receiver (M/C)</th>
                          <th>Delivery Address</th>
                          <th>Transfer Summary</th>
                          <th>Status</th>
                          <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.historylist.map((u, i) => <tr key={i} className={`${cn({['flagged']: u.flag})} ${styles.cell_center}`}>
                        <td className="font-weight-bold pl-4">{u.order_number}</td>
                        {u.customer ? <td className="font-weight-bold">(M) {u.customer.username}</td> : <td className="font-weight-bold">(C) {u.deliver_to}</td>}
                        <td className="text-truncate" style={{ maxWidth: 200 }}>{u.address ? u.address : '-'}</td>
                        <td><button className={styles.modal_btn} onClick={() => this.setState({ hshow: true, history_view: u })}>View</button></td>
                        <th>{u.status === 'COMPLETED' ? <button className={styles.status_green} disabled>{u.status}</button> : <button className={styles.status_red} disabled>{u.status}</button>}</th>
                        {role === 'HQ' ? 
                          <td className="text-right"><button className={`mx-3 ${styles.tbtn}`} onClick={() => this.flagOrder(u.flag, u.id)}>{u.flag ? 'Unflag' : 'Flag'}</button></td>
                        :
                          <td className="text-center">{u.flag && <span className={utils.hightext_sm}>Flagged</span>}</td>
                        }
                      </tr>)}
                    </tbody>
                  </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                  {this.state.isloaded && !this.state.historylist.length && <div className="p-5 text-center">No completed transfer found.</div>}
                  <Modal show={this.state.hshow} onHide={() => this.setState({ hshow: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Body>
                      <div className="row m-0">
                        <div className="col-md-6 p-0">
                          <div className={styles.delivery}>
                            <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;{this.state.history_view.customer ? this.state.history_view.customer.username : this.state.history_view.deliver_to}</div>
                            <div className="pt-2">{this.state.history_view.address || <span className="font-italic">No Fulfilment Required</span>}</div>
                          </div>
                        </div>
                        <div className="col-md-6 px-0 pt-3 text-right">
                          {this.state.history_view.flag && <div className={utils.hightext_md}><RiErrorWarningLine/>&nbsp;This Transfer is Flagged</div>}
                          <div className={utils.h_md_n}>Order ID: {this.state.history_view.order_number}</div>
                          <div className={utils.text_md}>Order at {dateTime(this.state.history_view.created_at)}</div>
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
                          {this.state.history_view.order_items && this.state.history_view.order_items.map((u, i) => <tr key={i}>
                            <td className="pl-4 font-weight-bold">{u.product_details.name}</td>
                            <td>{u.quantity}</td>
                            <td>{u.unit_price}</td>
                          </tr>)}
                        </tbody>
                        <thead className={`${styles.subtotal} ${styles.modal_table}`}>
                          <tr>
                            <th className={`pl-4 ${styles.ttl}`}>Subtotal</th>
                            <th style={{ fontSize: '0.9rem' }}>{this.state.history_view.order_items && <span>{this.state.history_view.order_items.length} item(s)</span>}</th>
                            <th className={styles.tend}>{this.state.history_view.total_price}</th>
                          </tr>
                        </thead>
                      </Table>
                      <div className="py-3"></div>
                      <button className={styles.modal_closebtn} onClick={() => this.setState({ hshow: false })}><MdCancel/> Close</button>
                    </Modal.Body>
                  </Modal>
                </div>
                {(this.state.hnext || this.state.hpage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                  {this.state.hpage > 1 && <button onClick={() => this.gethistoryOrders(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.hpage} Showing {(this.state.hpage - 1)*20 + 1} - {(this.state.hpage - 1)*20 + this.state.historylist.length}</div>
                  {this.state.hnext && <button onClick={() => this.gethistoryOrders(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}
              </Tab>
            </Tabs>
          </div>
        </section>
    )
  }
}

export default withRouter(Othprod);