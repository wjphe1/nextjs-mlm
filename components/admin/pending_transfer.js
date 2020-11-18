import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { FaUsers } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

class Pending extends React.Component {
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
                <div className="d-flex align-items-center p-3 flex-wrap">
                    <form className={styles.search_div}>
                        <input type="text" placeholder="Search category here" className={styles.search}/>
                        <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <button className={`ml-auto ${styles.tbtn}`}>Ship Out</button>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="pl-4"><input type="checkbox"/></th>
                            <th>Transfer ID</th>
                            <th>Member ID</th>
                            <th>Delivery Address</th>
                            <th>Transferred by</th>
                            <th>Transfer Summary</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.cell_center}>
                            <td className="pl-4"><input type="checkbox"/></td>
                            <td className="font-weight-bold">X1896747d</td>
                            <td className="font-weight-bold">Member1902</td>
                            <td className="text-truncate" style={{ maxWidth: 200 }}>2, USJ height, Subang Jaya, Malaysia</td>
                            <td>HQ</td>
                            <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                            <td><button className={styles.status_yellow} disabled>To Ship</button></td>
                        </tr>
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header}>
                            Please confirm your Stock Transfer Details before sending HQ for fulfilment
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.delivery}>
                            <div className={utils.hightext_md}><FaUsers/>&nbsp;&nbsp;Member18979</div>
                            <div className="pt-2">2, USJ height, Subang Jaya, 41500,  Selangor, Malaysia</div>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless}><MdCancel/> Discard</button>
                        <button className={`px-5 ${styles.tbtn}`}>Confirm</button>
                    </Modal.Footer>
                </Modal>
            </div>   
        )
    }
}

export default Pending;