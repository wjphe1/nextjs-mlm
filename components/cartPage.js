import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import Cookies from 'js-cookie'
import styles from '../styles/module/blog.module.scss'
import utils from '../styles/module/utils.module.scss'
import homes from '../styles/module/home.module.scss'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {RiShareFill, RiDeleteBin5Line} from 'react-icons/ri';
import {FiShoppingBag, FiSend, FiPlus, FiMinus} from 'react-icons/fi';
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
        };
    }

    handleChange = (e) => {
        const value = parseInt(e.target.value);
        this.setState({
            [e.target.name]: value
        });
    }

    getCookies = () => {   
        var cart = Cookies.get('cart');
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
            Cookies.set('cart', current)
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
                        <div className="col-6 d-flex align-items-center pr-3 font-weight-bold">
                            {u.photo.url
                                ? <img src={'http://13.212.45.145' + u.photo.url} alt={u.name} height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                                : <img src="/images/placeholder.png" alt={u.name} height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                            }
                            <span>{u.name}</span>
                        </div>
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
                {this.state.cart.length ? <div className={`${styles.main_lg} p-0 mb-3`}>
                    <div className="border-b prx-5 pt-3">
                        <div className={utils.h_xl}>Tempahan Order</div>
                    </div>
                    <div className="prx-5 pt-4 align-items-center row m-0">
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Nama</label>
                            <input name="name" className={styles.cart_input}/>
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Emel</label>
                            <input name="email" className={styles.cart_input}/>
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Nombor Telefon</label>
                            <input name="phone" className={styles.cart_input}/>
                        </div>
                    </div>
                    <div className="prx-5 align-items-center row m-0">
                        <div className="col-md-8 pb-4">
                            <label className={styles.cart_label}>Alamat</label>
                            <input name="address" className={styles.cart_input}/>
                        </div>
                        <div className="col-md-4 pb-4">
                            <label className={styles.cart_label}>Poskod</label>
                            <input name="postcode" className={styles.cart_input}/>
                        </div>
                    </div>
                    <div className="prx-5 w-100 pb-5">
                        <div className="col-md-12">
                            <label className={styles.cart_label}>Mesej Kepada Store Reezqa</label>
                            <textarea rows="5" name="description" className={styles.cart_input}></textarea>
                        </div>
                        <button className={styles.send_order}><FiSend/>
                            <span className="pl-2">Send Order</span>
                        </button>
                    </div>
                </div> : <div></div>}
            </section>
        )
    }
}

export default Cartpage;