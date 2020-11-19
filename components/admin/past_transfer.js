import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import Stocktransfer from './stock_transfer'
import Pending from './pending_transfer'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md'
import { HiOutlineSearch } from 'react-icons/hi';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

class Past extends React.Component {
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
            <div className="d-flex align-items-center p-3">
                <form className={styles.search_div}>
                    <input type="text" placeholder="Search category here" className={styles.search}/>
                    <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                </form>
                <OverlayTrigger trigger="click" placement='top'
                    overlay={
                        <Popover id="popover-positioned-top">
                          <Popover.Content>
                            Flag the transfer if its need more attention
                          </Popover.Content>
                        </Popover>
                    }
                >
                    <button className={styles.popover}>?</button>
                </OverlayTrigger>
            </div>
            <Table responsive>
                <thead>
                    <tr>
                        <th className="pl-4">Transfer ID</th>
                        <th>Member ID</th>
                        <th>Delivery Address</th>
                        <th>Transfer Summary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.cell_center}>
                        <td className="font-weight-bold pl-4">X1896747d</td>
                        <td className="font-weight-bold">Member1902</td>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>2, USJ height, Subang Jaya, Malaysia</td>
                        <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        <td className="text-right"><button className={`mx-3 ${styles.tbtn}`}>Flag</button></td>
                    </tr>
                    <tr className={styles.cell_center} style={{ background: '#FFF6F0' }}>
                        <td className="font-weight-bold pl-4">X1896547e</td>
                        <td className="font-weight-bold">Member3714</td>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>B-17-01, Koi Kinrara, Jalan Pipit, Puchong, Malaysia</td>
                        <td><button className={styles.modal_btn} onClick={() => this.setState({ show: true })}>View</button></td>
                        <td className="text-right"><button className={`mx-3 ${styles.tbtn_flag}`}>Unflag</button></td>
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

export default Past;