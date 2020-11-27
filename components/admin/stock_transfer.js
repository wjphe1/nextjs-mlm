import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
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
            isloaded: false,
            error: false,
            member: true,
            fulfilment: false,
            show: false,
            prodlist: [],
            userlist: [],
            target_member: null,
            target_address: null,
            products_check: ['','',''],
            products_selected: [],
            products_selected_quantity: [],
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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

    selectMember = (e) => {
        const i = e.target.value;
        this.setState({
            target_member: this.state.userlist[i].id,
            target_address: this.state.userlist[i].address,
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
            });
        }
    }

    editQuantity = (i, e) => {
        var quantity = this.state.products_selected_quantity;
        if (e.target) { 
            if (!e.target.value) { quantity[i] = 0 }
            else { quantity[i] = parseInt(e.target.value) }
        } else { quantity[i] = quantity[i] + parseInt(e) }

        this.setState({
            products_selected_quantity: quantity
        })
    }

    getProd = () => {
        api.get(routes.inventory)
            .then(res => {
                const rows = res.data.user_inventories
                console.log(rows)
                this.setState({ prodlist: rows, isloaded: true, products_check: Array(rows.length).fill(false), })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({ isloaded: true, error: true })
            })
    }

    getUsers = () => {
        api.get(routes.users)
        .then(res => {
            const rows = res.data.users
            const active = rows.filter((u) => u.active)
            console.log(active)
            this.setState({ userlist: active, target_member: active[0].id, target_address: active[0].address })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({ error: true })
        })
    }

    componentDidMount = () => {
        this.getUsers();
        this.getProd();
    }

    render () {
        return (
            <div className={styles.table}>
                <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                        <input type="text" placeholder="Search category here" className={styles.search}/>
                        <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
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
                                        100 For MS <BsFillCaretDownFill/>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>20 For S<br/>10 For A</Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                </td>
                            </tr>
                        )}
                    </tbody> : <tbody><tr></tr></tbody>}
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.prodlist.length && <div className="p-5 text-center">No product inventory found.</div>}
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="lg" aria-labelledby="fulfilment-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header}>
                            New Transfer to {this.state.member ? <span>Member</span> : <span>Non-member</span>} {this.state.fulfilment ? <span>with</span> : <span>without</span>} Fulfilment
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.target_info}>
                            <div className="row m-0 flex-nowrap align-items-center">
                                <div className="font-weight-bold px-2" style={{ minWidth: 80 }}>To</div>
                                <div className="position-relative pl-0" style={{ flex: 'auto'}}>{this.state.member ? 
                                        <select onChange={this.selectMember} className={styles.info_input}>
                                            {this.state.userlist.map((u, i) =>
                                                <option key={i} value={i}>{u.username}</option>
                                            )}
                                        </select> 
                                    : 
                                        <input onChange={this.handleChange} name="target_member" className={styles.info_input} placeholder="Name"/>}
                                    <div className={styles.info_icon}><FaUsers/></div>
                                </div>
                            </div>
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
                                        {u.quantity > 1 ? <button onClick={() => this.editQuantity(i,-1)} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                                        <input type="number" name="count" value={this.state.products_selected_quantity[i]} onChange={(e) => this.editQuantity(i, e)} className={styles.prod_qinput}/>
                                        <button onClick={() => this.editQuantity(i,1)} className={styles.prod_abtn}><FiPlus/></button>
                                        </td>
                                        <td>100</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table> : <div className="text-center">No Products Selected</div>}
                        <button className={styles.add_more} onClick={() => this.setState({ show: false })}><FiPlus/> Add More Products</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ show: false })}><MdCancel/> Discard</button>
                        <button className={`px-5 ${styles.tbtn}`}>Transfer Now</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Stocktransfer;