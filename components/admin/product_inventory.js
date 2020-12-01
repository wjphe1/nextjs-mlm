import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import dateTime from '../dateTime'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdCancel } from 'react-icons/md'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

class Prodinv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            error: false,
            tisloaded: false,
            terror: false,
            toast: false,
            prodlist: [],
            translist: [],
            show: false,
            selname: '',
            selid: '',
            type: 'INCREASE',
            quantity: null,
            ppage: 1,
            pnext: false,
            tpage: 1,
            tnext: false,
        };
    }

    handleChange = (e) => {
        console.log(e)
        const value = parseInt(e.target.value);
        this.setState({
        [e.target.name]: value
        });
    }

    getProd = (str) => {
        this.setState({ isloaded: false })
        const pagy = this.state.ppage + parseInt(str || 0);
        api.get(routes.inventory + '?page=' + pagy)
            .then(res => {
                const rows = res.data.user_inventories
                if (rows.length >= 20) { this.setState({ pnext: true, ppage: pagy }) }
                else { this.setState({ pnext: false, ppage: pagy }) }
                console.log(rows)
                this.setState({ prodlist: rows, isloaded: true })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ isloaded: true, error: true })
            })
    }

    getTrans = (str) => {
        this.setState({ tisloaded: false })
        const pagy = this.state.tpage + parseInt(str || 0);
        api.get(routes.inven_transac + '?page=' + pagy)
            .then(res => {
                const rows = res.data.inventory_transactions
                if (rows.length >= 20) { this.setState({ tnext: true, tpage: pagy }) }
                else { this.setState({ tnext: false, tpage: pagy }) }
                console.log(rows)
                this.setState({ translist: rows, tisloaded: true })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ terror: true, tisloaded: true })
            })
    }

    editQuantity = () => {
        this.setState({ tisloaded: false, isloaded: false, error: false, terror: false })
        api.post(routes.products + '/' + this.state.selid + routes.inven_transac, {
            inventory_transaction: {
                transaction_type: this.state.type,
                quantity: this.state.quantity
            }
        })
            .then(res => {
                this.getTrans();
                this.getProd();
                this.setState({ show: false })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ error: true, isloaded: true })
            })
    }

    componentDidMount() {
        this.getTrans();
        this.getProd();
    }

    render () {
        return (
            <>
                {(this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                    <div className="col-10 d-flex align-items-center">
                        <span className={form.sexcl}>✓</span>
                        <span><b>Congratulations -</b> Product inventory was changed successfully</span>
                    </div>
                    <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                <div className={`${styles.table} mb-4`}>
                    <div className="d-flex align-items-center p-3">
                        <form className={styles.search_div}>
                            <input type="text" placeholder="Search product here" className={styles.search}/>
                            <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                        </form>
                    </div>
                    {this.state.isloaded ? <Table responsive>
                        <thead>
                            <tr>
                                <th className="pl-4">Product Name</th>
                                <th className="w-50">Inventory</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.prodlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                                <td className="font-weight-bold pl-4">{u.product.name}</td>
                                <td className="w-50">{u.quantity}</td>
                                <td><button onClick={() => this.setState({ selname: u.product.name, selid: u.product.id, show: true })} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                            </tr>)}
                        </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                    {this.state.isloaded && !this.state.prodlist.length && <div className="p-5 text-center">No product inventory found.</div>}
                </div>
                {(this.state.pnext || this.state.ppage > 1) && <div className="d-flex align-items-center justify-content-between pb-5">
                    {this.state.ppage > 1 && <button onClick={() => this.getProd(-1)} className={styles.tbtn}>Prev</button>}
                    <div>Page {this.state.ppage} Showing {(this.state.ppage - 1)*20 + 1} - {(this.state.ppage - 1)*20 + this.state.prodlist.length}</div>
                    {this.state.pnext && <button onClick={() => this.getProd(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}

                <div className={styles.table}>
                    <div className="d-flex align-items-center p-3">
                        <div className={styles.thead}>History</div>
                    </div>
                    {this.state.tisloaded ? <Table responsive>
                        <thead>
                            <tr>
                                <th className="pl-4">Product Name</th>
                                <th>Inventory Changes</th>
                                <th>Changed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.translist.map((u, i) => <tr key={i}>
                                <td className="pl-4 font-weight-bold">{u.product.name}</td>
                                {u.transaction_type === 'INCREASE' ? <td>+{u.quantity}</td> : <td>-{u.quantity}</td>}
                                <td>{dateTime(u.created_at)}</td>
                            </tr>)}
                        </tbody>
                    </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                    {this.state.tisloaded && !this.state.translist.length && <div className="p-5 text-center">No transaction found.</div>}
                </div>
                {(this.state.tnext || this.state.tpage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                    {this.state.tpage > 1 && <button onClick={() => this.getTrans(-1)} className={styles.tbtn}>Prev</button>}
                    <div>Page {this.state.tpage} Showing {(this.state.tpage - 1)*20 + 1} - {(this.state.tpage - 1)*20 + this.state.translist.length}</div>
                    {this.state.tnext && <button onClick={() => this.getTrans(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}

                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="md" aria-labelledby="confirm-log-out" centered>
                    <Modal.Body>
                        <div className="font-weight-bold pb-4 text-center">Modify {this.state.selname}'s Quantity</div>
                        <div className="d-flex flex-column align-items-center">
                            <div className="row m-0 w-100">
                                <div className="col-6 pl-0 pr-2">
                                    <select value={this.state.type} onChange={(e) => this.setState({ type: e.target.value })} className={form.field_light}>
                                        <option value="INCREASE">Increase</option>
                                        <option value="DECREASE">Decrease</option>
                                    </select>
                                </div>
                                <div className="col-6 pr-0 pl-2">
                                    <input type="number" name="quantity" onChange={this.handleChange} className={form.field_light} placeholder="quantity"/>
                                </div>
                            </div>
                            {this.state.tisloaded ? <button onClick={this.editQuantity} className={`w-100 ${styles.tbtn}`}>Confirm</button>  : <button className={`w-100 ${styles.tbtn}`} disabled><Spinner animation="border" size='sm'/></button>}
                            <button onClick={() => this.setState({ show: false })} className={`w-100 ${styles.tbtn_reverse_borderless}`}><MdCancel/> Go Back</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Prodinv;