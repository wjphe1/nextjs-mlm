import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { FaUsers } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'

class Asales extends React.Component {
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
            <div className={styles.table}>
                <div className="d-flex align-items-center p-3 pl-4" style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <div className={styles.thead}>Transaction History</div>
                    <button className={`ml-auto ${styles.tbtn}`}>Export</button>
                </div>
                <div className="py-2">
                    <button disabled className={`my-3 mx-4 ${styles.sale_info}`}>
                        <div className={utils.text_md}>Summary of Sales</div>
                        <div className={utils.hightext_lg}>RM 1,200.00</div>
                    </button>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="pl-4"><input type="checkbox"/></th>
                            <th>Transfer ID</th>
                            <th>Transferred At</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.cell_center}>
                            <td className="pl-4"><input type="checkbox"/></td>
                            <td>X1896747d</td>
                            <td>20 Oct 2020 11:30 AM</td>
                            <td>RM 200</td>
                            <td><button className={styles.status_green} disabled>Successful</button></td>
                            <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                        <tr className={styles.cell_center}>
                            <td className="pl-4"><input type="checkbox"/></td>
                            <td>X1896747d</td>
                            <td>20 Oct 2020 11:30 AM</td>
                            <td>RM 200</td>
                            <td><button className={styles.status_green} disabled>Successful</button></td>
                            <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        </tr>
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Body>
                        <div className="row m-0">
                            <div className="col-md-6 p-0">
                                <div className={styles.delivery}>
                                    <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;Member18979</div>
                                    <div className="pt-2">2, USJ height, Subang Jaya, 41500,  Selangor, Malaysia</div>
                                </div>
                            </div>
                            <div className="col-md-6 px-0 pt-3 text-right">
                                <div className={utils.h_md_n}>Invoice ID: XD10234t</div>
                                <div className={utils.text_md}>Order at 10 Oct 2020 11:30 AM</div>
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
                                <tr>
                                    <td className="pl-4 font-weight-bold">Kozi Reezqa</td>
                                    <td>1</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td className="pl-4 font-weight-bold">Soft Cream Reezqa</td>
                                    <td>1</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                            <thead className={`${styles.subtotal} ${styles.modal_table}`}>
                                <tr>
                                    <th className={`pl-4 ${styles.ttl}`}>Subtotal</th>
                                    <th>2</th>
                                    <th className={styles.tend}>200</th>
                                </tr>
                            </thead>
                        </Table>
                        <div className="py-3"></div>
                        <button className={styles.modal_closebtn} onClick={() => this.setState({ show: false })}><MdCancel/> Close</button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Asales;