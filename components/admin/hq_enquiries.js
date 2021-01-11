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
import { BsFillCaretDownFill } from 'react-icons/bs'
import { ImBin } from 'react-icons/im';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import dateTime from '../dateTime';
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class Hqenq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            sales: '-',
            show: false,
            isloaded: false,
            error: false,
            enqlist: [],
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

    removeEnq = () => {
        if (confirm('Are you sure to remove?')) {
            this.setState({ show: false })
            api.delete(routes.enquiries + '/' + this.state.view.id)
                .then(res => {
                    this.getEnquiries();
                })
                .catch(err => {
                    console.log(err.response)
                    this.setState({ isloaded: true, error: true })
                })
        }
    }

    getEnquiries = (str) => {
        this.setState({ isloaded: false })
        const pagy = this.state.page + parseInt(str || 0);
        api.get(routes.enquiries + '?page=' + pagy)
            .then(res => {
                const rows = res.data.enquiries
                if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
                else { this.setState({ next: false, page: pagy }) }
                console.log(rows)
                this.setState({ enqlist: rows, isloaded: true })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ isloaded: true, error: true })
            })
    }
    
    componentDidMount() {
        this.getEnquiries();
    }

    render () {
    
        return (<>
            <div className={utils.h_xl}>Customer Enquiries</div>

            <div className={`mt-5 ${styles.table}`}>
                <div className="d-flex align-items-center p-3 pl-4">
                    <div className={styles.thead}>Enquiries</div>
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
                            <th className="pl-4">Customer Name</th>
                            <th>Phone Number</th>
                            <th>Enquiry At</th>
                            <th style={{ width: '20%'}}>Products</th>
                            <th style={{ width: '15%'}}>Message</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.enqlist.map((u, i) => <tr className={`${cn({['flagged']: u.flag})} ${styles.cell_center}`} key={i}>
                            <td className="pl-4">{u.name}</td>
                            <td>{u.phone_number}</td>
                            <td>{dateTime(u.created_at)}</td>
                            <td className="table-cell-collapse" style={{ width: '20%'}}>
                                {u.enquiry_products.length && <Accordion>
                                    <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <b>{u.enquiry_products.length} items</b> <BsFillCaretDownFill/>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {u.enquiry_products.map((v, j) => <div key={j}>{v.product.name}</div>)}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                </Accordion>}
                            </td>
                            <td style={{ width: '15%'}} className="text-truncate">{u.message}</td>
                            <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true, view: u })}>View</button></td>
                        </tr>)}
                    </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.enqlist.length && <div className="p-5 text-center">No enquiries found.</div>}
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Body>
                        <div className="row m-0">
                            <div className="col-md-6 p-0">
                                <div className={styles.delivery}>
                                    <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;{this.state.view.name}</div>
                                    <div className="pt-2">{this.state.view.address}</div>
                                    <div className="pt-2">{this.state.view.postcode}</div>
                                </div>
                            </div>
                            <div className="col-md-6 px-0 pt-3 text-right">
                                <div className={utils.text_md}>Enquiried at {dateTime(this.state.view.created_at)}</div>
                            </div>
                        </div>
                        <div className={`px-3 ${utils.modal_summary}`}>Order Summary</div>
                        <Table responsive>
                            <thead className={styles.modal_table}>
                                <tr>
                                    <th className="pl-4">Product Name</th>
                                    <th>SKU</th>
                                </tr>
                            </thead>
                            <tbody className={styles.modal_table}>
                                {this.state.view.enquiry_products && this.state.view.enquiry_products.map((u, i) => <tr key={i}>
                                    <td className="pl-4 font-weight-bold">{u.product.name}</td>
                                    <td>{u.product.sku}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <div className="d-flex align-items-end">
                            <div className={`${styles.delivery} p-4 mt-4`} style={{ minWidth: '40%' }}>
                                <div className={`font-weight-bold ${styles.ttl}`}>Message:</div>
                                <div>{this.state.view.message}</div>
                            </div>
                            <button onClick={this.removeEnq} className={`ml-auto ${styles.tbtn_reverse}`}><ImBin/> Remove</button>
                        </div>
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

export default Hqenq;