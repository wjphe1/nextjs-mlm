import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import Layout from '../components/layout'
import styles from '../styles/module/blog.module.scss'
import utils from '../styles/module/utils.module.scss'
import homes from '../styles/module/home.module.scss'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { RiShareFill, RiDeleteBin5Line } from 'react-icons/ri';
import { FiShoppingBag, FiSend, FiPlus, FiMinus } from 'react-icons/fi';


class FirstPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      cart: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  render () {
    return (
      <Layout page={'index'} cart={this.state.cart} {...this.props}>
        <Head>
          <title>{this.props.name} - Product</title>
        </Head>

        {/* Cart Section Header */}
        <section className="py-5 px-4">
          <div className={`${styles.main_lg} p-0 mb-3`}>
            <div className="border-b prx-5 pt-3"><div className={utils.h_xl}>Order Summary</div></div>
            <div className="prx-5 py-4 align-items-center row m-0" style={{ fontSize: '0.9rem' }}>
              <div className="col-md-6 d-flex align-items-center p-0">
                <input type="checkbox"/>
                <div className="px-5 font-weight-bold">ALL ITEMS</div>
              </div>
              <div className="col-md-6 row align-items-center p-0 m-0 df-mn">
                <div className="font-weight-bold">KUANTITI</div>
                <div className="col-3 ml-auto font-weight-bold">TINDAKAN</div>
                <div className="col-3 font-weight-bold pr-0">HARGA (MYR)</div>
              </div>
            </div>
          </div>

          {/* Cart Body */}
          <div className={`${styles.main_lg} p-0 mb-3`} style={{ fontSize: '1.1rem' }}>
            <div className="prx-5 py-4 align-items-center row m-0">
              <div className="col-md-6 p-0 d-flex flex-nowrap align-items-center">
                <input type="checkbox"/>
                <div className="d-flex align-items-center pl-5 pr-3 font-weight-bold">
                  <img src="/images/sample-2.png" height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                  <span>KOPI REEZQA KOPI REEZQA</span>
                </div>
              </div>
              <div className={`${styles.cart_pad} col-md-6 row align-items-center`}>
                <div className="d-flex align-items-center justify-content-center">
                  {this.state.count > 1 ? <button onClick={() => this.setState({ count: this.state.count - 1 })} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                  <input type="number" name="count" value={this.state.count} onChange={this.handleChange} className={styles.prod_qinput}/>
                  <button onClick={() => this.setState({ count: this.state.count + 1 })} className={styles.prod_abtn}><FiPlus/></button>
                </div>
                <div className="col-3 ml-auto"><button className={styles.destroy_btn}><RiDeleteBin5Line/></button></div>
                <div className="col-3 font-weight-bold pr-0">10.00</div>
              </div>
            </div>
            <div className="prx-5 py-4 align-items-center row m-0">
              <div className="col-md-6 p-0 d-flex flex-nowrap align-items-center">
                <input type="checkbox"/>
                <div className="d-flex align-items-center pl-5 pr-3 font-weight-bold">
                  <img src="/images/sample-2.png" height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                  <span>KOPI REEZQA KOPI REEZQA</span>
                </div>
              </div>
              <div className={`${styles.cart_pad} col-md-6 row align-items-center`}>
                <div className="d-flex align-items-center justify-content-center">
                  {this.state.count > 1 ? <button onClick={() => this.setState({ count: this.state.count - 1 })} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                  <input type="number" name="count" value={this.state.count} onChange={this.handleChange} className={styles.prod_qinput}/>
                  <button onClick={() => this.setState({ count: this.state.count + 1 })} className={styles.prod_abtn}><FiPlus/></button>
                </div>
                <div className="col-3 ml-auto"><button className={styles.destroy_btn}><RiDeleteBin5Line/></button></div>
                <div className="col-3 font-weight-bold pr-0">10.00</div>
              </div>
            </div>
            <div className="prx-5 py-4 align-items-center row m-0">
              <div className="col-md-6 p-0 d-flex flex-nowrap align-items-center">
                <input type="checkbox"/>
                <div className="d-flex align-items-center pl-5 pr-3 font-weight-bold">
                  <img src="/images/sample-2.png" height="50px" width="50px" style={{ borderRadius: 4, marginRight: 20 }}/>
                  <span>KOPI REEZQA KOPI REEZQA</span>
                </div>
              </div>
              <div className={`${styles.cart_pad} col-md-6 row align-items-center`}>
                <div className="d-flex align-items-center justify-content-center">
                  {this.state.count > 1 ? <button onClick={() => this.setState({ count: this.state.count - 1 })} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                  <input type="number" name="count" value={this.state.count} onChange={this.handleChange} className={styles.prod_qinput}/>
                  <button onClick={() => this.setState({ count: this.state.count + 1 })} className={styles.prod_abtn}><FiPlus/></button>
                </div>
                <div className="col-3 ml-auto"><button className={styles.destroy_btn}><RiDeleteBin5Line/></button></div>
                <div className="col-3 font-weight-bold pr-0">10.00</div>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className={`${styles.main_lg} p-0 mb-3`}>
            <div className="prx-5 pt-5 pb-4 align-items-center row m-0">
              <div className="col-md-9 p-0 border-r-dot">
                <div className={utils.hightext_md}>Sila semak senarai barangan yang telah anda pilih sebelum Send Order</div>
                <div className={`pt-2 ${utils.text_md}`}>*   Jumlah barangan di sebelah dalah tidak termasuk caj penghantaran.<br/>** Caj Penghantaran seunit - SM: RM 7 / SS: RM10</div>
              </div>
              <div className="col-md-3 p-0 m-0">
                <div className={`text-center ${utils.text_lg}`}>Jumlah Barangan</div>
                <div className={`text-center ${utils.hightext_xl}`}>RM 10.00</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.main_lg} p-0 mb-3`}>
            <div className="border-b prx-5 pt-3"><div className={utils.h_xl}>Tempahan Order</div></div>
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
              <button className={styles.send_order}><FiSend/><span className="pl-2">Send Order</span></button>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default FirstPost;