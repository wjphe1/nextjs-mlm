import Head from 'next/head'
import api from './auth/api'
import routes from './auth/routes'
import Link from 'next/link'
import React from 'react';
import styles from '../styles/module/blog.module.scss'
import utils from '../styles/module/utils.module.scss'
import form from '../styles/module/form.module.scss'
import { RiDeleteBin5Line} from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import Spinner from 'react-bootstrap/Spinner'
import Router from 'next/router'

class Cartpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            count: 1,
            cart: [],
            total: 0,
            name: '',
            email: '',
            phone: '',
            address: '',
            postcode: '',
            message: '',
            misloaded: true,
            merror: false,
            msuccess: false,
            mmsg: { error: '' },
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendEnquiry = () => {
        if (!this.state.cart.length) {
            alert('Please add item to cart.')
        } else if (this.state.name && this.state.email && this.state.phone && this.state.address && this.state.postcode && this.state.message) {
            this.setState({ misloaded: false, merror: false, msuccess: false })

            var product_ids = [];
            for (var i = 0; i < this.state.cart.length; i++) {
                product_ids = product_ids.concat({ product_id: this.state.cart[i].id })
            }

            const endata = { enquiry : {
                name: this.state.name,
                email: this.state.email,
                phone_number: this.state.phone,
                address: this.state.address,
                postcode: this.state.postcode,
                message: this.state.message,
                enquiry_products_attributes: product_ids,
            }}

            api.post(routes.enquiries, endata)
                .then(res => {
                    console.log(res)
                    this.setState({ msuccess: true, misloaded: true })
                    localStorage.setItem('cart', JSON.stringify([]))
                    this.getCookies();
                })
                .catch(err => {
                    console.log(err.response)
                    var msg = { error: err.response.status + ' : ' + err.response.statusText };
                    if (err.response.data) { msg = err.response.data };
                    this.setState({ mmsg: msg, misloaded: true, merror: true })
                })
        } else {
            alert('Please fill in the required fields.')
        }
    }

    getCookies = () => {   
        var cart = localStorage.getItem('cart');
        var truecart = [];
        var total = 0;
        if (cart) { 
            truecart = JSON.parse(cart); 
            for (var i = 0; i < truecart.length; i++) {
                if (truecart[i].product_prices[3]) {
                    total = total + parseFloat(truecart[i].product_prices[3].price)
                }
            }
        }
        this.setState({ cart: truecart, isloaded: true, total: total.toFixed(2) });
    }

    removeCart = (i) => {
        if (confirm('Remove item?')) {
            var current = this.state.cart;
            current.splice(i, 1);
            this.setState({ cart: current })
            localStorage.setItem('cart', JSON.stringify(current))
            Router.reload();
        }
    }

    componentDidMount() {
        this.getCookies();
    }

    render() {
        return (
            <section className="py-5 px-4">
                <div className={`${styles.main_lg} p-0 mb-3`}>
                    <div className="border-b prx-5 pt-3">
                        <div className={utils.h_xl}>Order Summary</div>
                    </div>
                    <div className="prx-5 py-4 align-items-center row m-0" style={{ fontSize: '0.9rem' }}>
                        {/* <input type="checkbox"/> */}
                        <div className="col-6 pr-5 font-weight-bold">ALL ITEMS</div>
                        {/* <div className="font-weight-bold">KUANTITI</div> */}
                        <div className="col-3 ml-auto font-weight-bold">TINDAKAN</div>
                        <div className="col-3 font-weight-bold pr-0">HARGA (MYR)</div>
                    </div>
                </div>

                {/* Cart Body */}
                {this.state.isloaded ? this.state.cart.map((u, i) => <div className={`${styles.main_lg} p-0 mb-3`} style={{ fontSize: '1.1rem' }} key={i}>
                    <div className="prx-5 py-4 align-items-center row m-0">
                        {/* <input type="checkbox"/> */}
                        <Link href={"/products/" + u.id}><a className="col-6 d-flex align-items-center pr-3 font-weight-bold">
                            {u.photo.url
                                ? <img src={'http://13.212.45.145' + u.photo.url} alt={u.name} height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                                : <img src="/images/placeholder.png" alt={u.name} height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                            }
                            <span>{u.name}</span>
                        </a></Link>
                        {/* <div className="d-flex align-items-center justify-content-center">
                            {this.state.count > 1
                                ? <button onClick={() => this.setState({ count: this.state.count - 1 })} className={styles.prod_mbtn}><FiMinus/></button>
                                : <button className={styles.prod_dbtn} disabled><FiMinus/></button>
                            }
                            <input type="number" name="count" value={this.state.count} onChange={this.handleChange} className={styles.prod_qinput}/>
                            <button onClick={() => this.setState({ count: this.state.count + 1 })} className={styles.prod_abtn}><FiPlus/></button>
                        </div> */}
                        <div className="col-3 ml-auto">
                            <button onClick={() => this.removeCart(i)} className={styles.destroy_btn}><RiDeleteBin5Line/></button>
                        </div>
                        <div className="col-3 font-weight-bold pr-0">RM {u.product_prices[3] ? u.product_prices[3].price : '-'}</div>
                    </div>
                </div>) : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.cart.length && <div className="p-5 text-center">No product found in cart.</div>}

                {/* Total Price */}
                {this.state.cart.length ? <div className={`${styles.main_lg} p-0 mb-3`}>
                    <div className="prx-5 pt-5 pb-4 align-items-center row m-0">
                        <div className="col-9 p-0 border-r-dot">
                            <div className={utils.hightext_md}>Sila semak senarai barangan yang telah anda pilih sebelum Send Enquiry</div>
                            <div className={`pt-2 ${utils.text_md}`}>* Jumlah barangan di sebelah dalah tidak termasuk caj penghantaran.<br/>** Caj Penghantaran seunit - SM: RM 7 / SS: RM10</div>
                        </div>
                        <div className="col-3 p-0 m-0">
                            <div className={`text-center ${utils.text_lg}`}>Jumlah Barangan</div>
                            <div className={`text-center ${utils.hightext_xl}`}>RM {this.state.total}</div>
                        </div>
                    </div>
                </div> : <div></div>}

                {/* Form */}
                <div className={`${styles.main_lg} p-0 mb-3`}>
                    <div className="border-b prx-5 pt-3">
                        <div className={utils.h_xl}>Tempahan Order</div>
                    </div>

                    {this.state.merror && <div className={`mx-5 my-3 ${form.notice_error}`}>
                        <div className="col-10 d-flex align-items-center">
                            <span className={form.nexcl}>!</span> 
                            {(this.state.mmsg.error && typeof this.state.mmsg.error === 'string') && <div>{this.state.mmsg.error}</div>}
                                {(this.state.mmsg.error && typeof this.state.mmsg.error === 'object') && <ul className="m-0 pl-4">
                                {Object.keys(this.state.mmsg.error).map(key =>
                                    <li value={key} key={key}>{`${key}: ${this.state.mmsg.error[key][0]}`}</li>
                                )}
                            </ul>}
                        </div>
                        <div onClick={() => this.setState({ merror: false })} className={`col-2 ${form.nclose}`}>Close</div>
                    </div>}
                    {this.state.msuccess && <div className={`mx-5 my-3 ${form.notice_success}`}>
                        <div className="col-10 d-flex align-items-center">
                            <span className={form.sexcl}>✓</span>
                            <div><b>Success -</b> Enquiry Sent</div>
                        </div>
                        <div onClick={() => this.setState({ msuccess: false })} className={`col-2 ${form.sclose}`}>Close</div>
                    </div>}

                    <div className="prx-5 pt-4 align-items-center row m-0">
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Nama</label>
                            <input name="name" className={styles.cart_input} onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Emel</label>
                            <input name="email" className={styles.cart_input} onChange={this.handleChange} value={this.state.email}/>
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Nombor Telefon</label>
                            <input name="phone" className={styles.cart_input} onChange={this.handleChange} value={this.state.phone} />
                        </div>
                    </div>
                    <div className="prx-5 align-items-center row m-0">
                        <div className="col-md-8 pb-4">
                            <label className={styles.cart_label}>Alamat</label>
                            <input name="address" className={styles.cart_input} onChange={this.handleChange} value={this.state.address}/>
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Poskod</label>
                            <input name="postcode" className={styles.cart_input} onChange={this.handleChange} value={this.state.postcode}/>
                        </div>
                    </div>
                    <div className="prx-5 w-100 pb-5">
                        <div className="col-md-12">
                            <label className={styles.cart_label}>Mesej Kepada Store Reezqa</label>
                            <textarea rows="5" name="message" className={styles.cart_input} onChange={this.handleChange} value={this.state.message}></textarea>
                        </div>
                        <button onClick={this.sendEnquiry} className={styles.send_order}><FiSend/>
                            <span className="pl-2">Send Enquiry</span>
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

export default Cartpage;