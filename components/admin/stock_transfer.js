import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import api from '../auth/api'
import routes from '../auth/routes'
import Cookies from 'js-cookie'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { FaUsers, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Spinner from 'react-bootstrap/Spinner'

class Stocktransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: {},
            isloaded: false,
            error: false,
            oisloaded: true,
            oerror: false,
            oerr_msg: {},
            osuccess: false,
            member: true,
            fulfilment: false,
            show: false,
            prodlist: [],
            userlist: [],
            target_member: null,
            target_address: null,
            target_customer: '',
            target_phone_number: '',
            target_role: 3,
            products_check: [],
            products_selected: [],
            products_selected_quantity: [],
            ppage: 1,
            pnext: false,
            pquery: '',
            uquery: '',
        };
    }

    handleChange = (e) => {
        var value = e.target.value;
        if (value === null) { value = '' }
        this.setState({
            [e.target.name]: value
        });

        if (e.target.name === 'uquery') { this.getUsers(); }
    }

    checkProduct = (i) => {
        var array = this.state.products_check;
        if (i.target && (i.target.checked === true || i.target.checked === false)) {
            array = Array(this.state.prodlist.length).fill(i.target.checked) 
        } else {
            array[i] = !array[i];
        }

        var selected = [];
        var quantity = [];
        const semua = this.state.prodlist;
        const sedia = this.state.products_selected;
        
        array.forEach(function(part, index) {
            if (part) { 
                selected = selected.concat(semua[index]);
                quantity = quantity.concat(1)
            }
        });

        console.log(selected)
        console.log(quantity)

        this.setState({
            products_check: array,
            products_selected: selected,
            products_selected_quantity: quantity,
        })
    }

    selectMember = (i) => {
        const selected = this.state.userlist[i];
        const role = selected.role;
        var index = 3;
        if (role === 'MASTER_STOKIS') { index = 0 }
        else if (role === 'STOKIS') { index = 1 }
        else if ( role === 'AGENT' ) { index = 2 }

        this.setState({
            target_member: selected.id,
            target_address: selected.address,
            target_phone_number: selected.phone_number,
            target_role: index,
            userlist: [],
            uquery: selected.username
        });
    }

    openFulfilment = (membool, fulbool) => {
        this.setState({
            member: membool,
            fulfilment: fulbool,
            show: true,
        });

        if (!membool) {
            this.setState({
                target_member: null,
                target_address: null,
                target_phone_number: null,
            });
        }
    }

    editQuantity = (i, e) => {
        var quantity = this.state.products_selected_quantity;
        if (e.target) { 
            if (!e.target.value) { quantity[i] = e.target.value }
            else { quantity[i] = parseInt(e.target.value) }
        } else { quantity[i] = quantity[i] + parseInt(e) }

        this.setState({
            products_selected_quantity: quantity
        })
    }

    submitOrder = () => {
        this.setState({ oerror: false })
        var orderitems = [];
        var itemerror = false;
        for (var i = 0; i < this.state.products_selected.length; i++) {
            orderitems[i] = { 
                product_id: this.state.products_selected[i].product.id,
                quantity: this.state.products_selected_quantity[i]
            }
            if (typeof this.state.products_selected_quantity[i] !== 'number' || this.state.products_selected_quantity[i] < 1) {
                itemerror = true;
            }
        }
        var otype = 'EXTERNAL';
        var cust = this.state.target_customer;
        if (this.state.member) { otype = 'INTERNAL'; cust = this.state.target_member; }

        console.log(orderitems)

        if (itemerror) {
            const msg = 'Please select product(s) and valid quantity'
            this.setState({ oerror: true, oerr_msg: msg })
        } else if ((!this.state.target_member && !this.state.target_customer) || (this.state.fulfilment && !this.state.target_address) || !this.state.target_phone_number) {
            const msg = 'Please fill in all the order details'
            this.setState({ oerror: true, oerr_msg: msg })
        } else {
            this.setState({ oisloaded: false, oerror: false, osuccess: false })

            var theorder = {
                deliver_to: cust,
                delivery_required: this.state.fulfilment, 
                address: this.state.target_address,
                phone_number: this.state.target_phone_number,
                order_items_attributes: orderitems,
                order_type: otype,
                fulfilled_by_id: this.state.current_user.id,
                sales_by_id: this.state.current_user.id,
            }

            if (this.state.member) {
                theorder = {
                    customer_id: cust,
                    delivery_required: this.state.fulfilment, 
                    address: this.state.target_address,
                    phone_number: this.state.target_phone_number,
                    order_items_attributes: orderitems,
                    order_type: otype,
                    fulfilled_by_id: this.state.current_user.id,
                    sales_by_id: this.state.current_user.id,
                }
            }

            const orderdata = { order: theorder }

            api.post(routes.orders, orderdata)
                .then(res => {
                    console.log(res)
                    this.setState({ osuccess: true, oisloaded: true })
                    this.getProd();
                    setTimeout(() => {Router.push({ pathname: '/admin/products', query: { tab: 'pending'}})}, 500)
                    setTimeout(() => {Router.reload()}, 600)
                })
                .catch(err => {
                    var msg = err.response?.data?.error ||
                      err.response?.data?.error_messages ||
                      err.response?.data?.message ||
                      err.message ||
                      "An unexpected error has occurred"
                    this.setState({ oerr_msg: msg, oisloaded: true, oerror: true })
                })
        }
    }

    getProd = (str) => {
        this.setState({ isloaded: false })
        var pagy = this.state.ppage + parseInt(str || 0);
        if (this.state.pquery && !str) { pagy = 1 }
        api.get(routes.inventory + '?page=' + pagy + '&query=' + this.state.pquery)
            .then(res => {
                const rows = res.data.user_inventories
                if (rows.length >= 20) { this.setState({ pnext: true, ppage: pagy }) }
                else { this.setState({ pnext: false, ppage: pagy }) }
                console.log(rows)
                this.setState({ prodlist: rows, isloaded: true, products_check: Array(rows.length).fill(false), })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ isloaded: true, error: true })
            })
    }

    getUsers = () => {
        api.get(routes.users + '?query=' + this.state.uquery)
        .then(res => {
            const rows = res.data.users;
            const active = rows.filter((u) => u.active && u.id !== this.state.current_user.id );
            this.setState({ userlist: active, target_member: active[0].id, target_address: active[0].address, target_phone_number: active[0].phone_number })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({ error: true })
        })
    }

    componentDidMount = () => {
        this.getProd();

        const current = JSON.parse(Cookies.get('user'))
        console.log(current)
        this.setState({ current_user: current})
    }

    render () {
        return (
            <div className={styles.table}>
                <div className="d-flex align-items-center p-3">
                    <div className={styles.search_div}>
                        <input type="text" placeholder="Search product here" className={styles.search} onChange={(e) => this.setState({ pquery: e.target.value })}/>
                        <button onClick={() => this.getProd()} className={styles.submit}><HiOutlineSearch/></button>
                    </div>
                    <div className="ml-auto btn-dropdown">
                        <DropdownButton
                            menuAlign="right"
                            title="Transfer Stock"
                        >
                            <Dropdown.Header>To Members</Dropdown.Header>
                            <Dropdown.Item onClick={() => this.openFulfilment(true, true)}>Fulfilment</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.openFulfilment(true, false)}>No Fulfilment</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>To Non-members</Dropdown.Header>
                            <Dropdown.Item onClick={() => this.openFulfilment(false, true)}>Fulfilment</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.openFulfilment(false, false)}>No Fulfilment</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                {this.state.isloaded ? <Table responsive>
                    <thead>
                        <tr>
                            <th className="pl-4"><input type="checkbox" onChange={this.checkProduct}/></th>
                            <th style={{ width: '30%' }}>Product Name</th>
                            <th style={{ width: '30%' }}>Inventory</th>
                            <th>Role Based Pricing (MYR)</th>
                        </tr>
                    </thead>
                    {this.state.prodlist.length ? <tbody>
                        {this.state.prodlist.map((u, i) => 
                            <tr key={i}>
                                <td className="pl-4"><input type="checkbox" checked={this.state.products_check[i]} onChange={() => this.checkProduct(i)}/></td>
                                <td className="font-weight-bold" style={{ width: '30%' }}>{u.product.name}</td>
                                <td style={{ width: '30%' }}>{u.quantity}</td>
                                <td className="table-cell-collapse">
                                <Accordion>
                                    <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        {(u.product.product_prices[0].price_cents/100).toFixed(2)} For MS <BsFillCaretDownFill/>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {(u.product.product_prices[1].price_cents/100).toFixed(2)} For S<br/>
                                            {(u.product.product_prices[2].price_cents/100).toFixed(2)} For A<br/>
                                            {(u.product.product_prices[3].price_cents/100).toFixed(2)} For C
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                </td>
                            </tr>
                        )}
                    </tbody> : <tbody><tr></tr></tbody>}
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.prodlist.length && <div className="p-5 text-center">No product inventory found.</div>}
                {(this.state.pnext || this.state.ppage > 1) && <div className="d-flex align-items-center justify-content-between pb-5">
                    {this.state.ppage > 1 && <button onClick={() => this.getProd(-1)} className={styles.tbtn}>Prev</button>}
                    <div>Page {this.state.ppage} Showing {(this.state.ppage - 1)*20 + 1} - {(this.state.ppage - 1)*20 + this.state.prodlist.length}</div>
                    {this.state.pnext && <button onClick={() => this.getProd(1)} className={styles.tbtn}>Next</button>}
                </div>}
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header}>
                            New Transfer to {this.state.member ? <span>Member</span> : <span>Non-member</span>} {this.state.fulfilment ? <span>with</span> : <span>without</span>} Fulfilment
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.oerror && <div className={`w-100 mb-4 ${form.notice_error}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.nexcl}>!</span> 
                                {(this.state.oerr_msg && typeof this.state.oerr_msg === 'string') && <div>{this.state.oerr_msg}</div>}
                                {(this.state.oerr_msg && typeof this.state.oerr_msg === 'object') && <ul className="m-0 pl-4">
                                {Object.keys(this.state.oerr_msg).map(key =>
                                    <li value={key} key={key}>{`${key}: ${this.state.oerr_msg[key][0]}`}</li>
                                )}
                                </ul>}
                            </div>
                            <div onClick={() => this.setState({ oerror: false, show: false })} className={`col-2 ${form.nclose}`}>Close</div>
                        </div>}
                        {this.state.osuccess && <div className={`w-100 mb-4 ${form.notice_success}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.sexcl}>✓</span>
                                <div><b>Success -</b> Transfer Created</div>
                            </div>
                            <div onClick={() => this.setState({ osuccess: false })} className={`col-2 ${form.sclose}`}>Close</div>
                        </div>}
                        <div className={styles.target_info}>
                            <div className="row m-0 flex-nowrap align-items-center">
                                <div className="font-weight-bold px-2" style={{ minWidth: 80 }}>To</div>
                                <div className="position-relative pl-0" style={{ flex: 'auto'}}>{this.state.member ? <>
                                        <input onChange={this.handleChange} name="uquery" className={styles.info_input} placeholder="Name" value={this.state.uquery} autocomplete="chrome-off"/>
                                        {this.state.userlist.length ? <div className={styles.autocomplete}>
                                            {this.state.userlist.map((u, i) =>
                                                <div onClick={() => this.selectMember(i)} key={i} className={styles.selection}>{u.username}</div>
                                            )}
                                        </div> : <div></div>}
                                    </>: <input onChange={this.handleChange} name="target_customer" className={styles.info_input} placeholder="Name"/>}
                                    <div className={styles.info_icon}><FaUsers/></div>
                                </div>
                            </div>
                            {!this.state.member && <div className="row m-0 pt-3 flex-nowrap align-items-center">
                                <div className="font-weight-bold px-2" style={{ minWidth: 80 }}>Contact</div>
                                <div className="position-relative pl-0" style={{ flex: 'auto'}}>
                                    <input onChange={this.handleChange} name="target_phone_number" className={styles.info_input} placeholder="Phone Number"/>
                                    <div className={styles.info_icon}><FaPhoneAlt/></div>
                                </div>
                            </div>}
                            {this.state.fulfilment && <div className="row m-0 pt-3 flex-nowrap align-items-center">
                                <div className="font-weight-bold px-2" style={{ minWidth: 80 }}>Address</div>
                                <div className="position-relative pl-0" style={{ flex: 'auto'}}>
                                    <input onChange={this.handleChange} name="target_address" className={styles.info_input} value={this.state.target_address} placeholder="Delivery Address"/>
                                    <div className={styles.info_icon}><FaMapMarkerAlt/></div>
                                </div>
                            </div>}
                        </div>
                        <div className={utils.modal_summary}>Stock Transfer Summary</div>
                        {this.state.products_selected.length ? <Table responsive>
                            <thead className={styles.modal_table}>
                                <tr>
                                    <th className="pl-4">Product Name</th>
                                    <th className="w-50">Quantity</th>
                                    <th>Pricing (MYR)</th>
                                </tr>
                            </thead>
                            <tbody className={styles.modal_table}>
                                {this.state.products_selected.map((u, i) =>
                                    <tr key={i}>
                                        <td className="pl-4 font-weight-bold">{u.product.name}</td>
                                        <td className="d-flex align-items-center">
                                        {this.state.products_selected_quantity[i] > 1 ? <button onClick={() => this.editQuantity(i,-1)} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                                        <input type="number" name="count" value={this.state.products_selected_quantity[i]} onChange={(e) => this.editQuantity(i, e)} className={styles.prod_qinput}/>
                                        <button onClick={() => this.editQuantity(i,1)} className={styles.prod_abtn}><FiPlus/></button>
                                        </td>
                                        <td>{(u.product.product_prices[this.state.target_role].price_cents/100).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table> : <div className="text-center">No Products Selected</div>}
                        <button className={styles.add_more} onClick={() => this.setState({ show: false })}><FiPlus/> Add More Products</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ show: false, oerror: false })}><MdCancel/> Discard</button>
                        {this.state.oisloaded ? <button onClick={this.submitOrder} className={`px-5 ${styles.tbtn}`}>Transfer Now</button> : <button className={`px-5 ${styles.tbtn}`} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Stocktransfer;