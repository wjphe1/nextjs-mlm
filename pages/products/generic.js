import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import Layout from '../../components/layout'
import styles from '../../styles/module/blog.module.scss'
import utils from '../../styles/module/utils.module.scss'
import homes from '../../styles/module/home.module.scss'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsCaretRightFill } from 'react-icons/bs';
import { RiShareFill } from 'react-icons/ri';
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
        <section className="py-5 px-4">
          <div className={utils.breadcrumbs}>REEZQA STORE <BsCaretRightFill/> KOPI REEZQA</div>
          <div className={styles.main_lg}>
            <div className="row m-0">
              <div className="col-md-3 p-0">
                <img src="/images/sample-2.png" alt="stokis" className={styles.prod_img}/>
              </div>
              <div className={`col-md-9 ${styles.res_pad}`}>
                <div className="d-flex border-b align-items-center pl-3">
                  <div className={utils.h_lg}>KOPI REEZQA</div>
                  <button className={`${styles.prod_sharebtn} ml-auto`}><RiShareFill/> <span className="pl-2">Share</span></button>
                </div>
                <div className="row m-0 pt-4">
                  <div className="px-3" style={{color: '#9A9A9A', minWidth: 120}}>HARGA</div>
                  <div className={`${styles.prod_price}`}>RM 34.90</div>
                </div>
                <div className="row m-0 py-4">
                  <div className="px-3" style={{color: '#9A9A9A', minWidth: 120}}>JUMLAH</div>
                  <div className="d-flex align-items-center">
                    {this.state.count > 1 ? <button onClick={() => this.setState({ count: this.state.count - 1 })} className={styles.prod_mbtn}><FiMinus/></button> : <button className={styles.prod_dbtn} disabled><FiMinus/></button>}
                    <input type="number" name="count" value={this.state.count} onChange={this.handleChange} className={styles.prod_qinput}/>
                    <button onClick={() => this.setState({ count: this.state.count + 1 })} className={styles.prod_abtn}><FiPlus/></button>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <button onClick={() => this.setState({ cart: this.state.cart + 1 })} className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                  <button className={styles.send_order}><FiSend/><span className="pl-2">Send Order</span></button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4"></div>
          <div className="prod-tabs">
            <Tabs defaultActiveKey="desc">
              <Tab eventKey="desc" title="Deskripsi">
                <p>
                  KOPI PRACAMPURAN<br/>
                  KOPI ARBICA<br/>
                  GOJI<br/>
                  EKSTRAK DURIAN BELANDA<br/>
                  EKSTRAK APRICOT<br/>
                  EKSTRAK BUNGA SAKURA<br/>
                  100% STEVIA ( TIADA GULA)<br/>
                  KE ARAH MINUMAN KOPI YANG SEDAP SERTA MEMBANTU KESIHATAN , MENSTABILKAN BERAT BADAN DAN KULIT YG SIHAT.<br/><br/>
                  KOPI KESIHATAN DAN KECANTIKAN<br/>
                  SAKURA <br/>
                  KHASIAT UNTUK MENCERAHKAN WAJAH<br/>
                  MELANCARKAN PERJALANAN HAID, SEGUGUT, DETOX, MENCANTIKKAN KULIT DAN GLOW KAN WAJAH<br/>
                </p>
              </Tab>
              <Tab eventKey="order" title="Pesanan">
                sdsd
              </Tab>
              <Tab eventKey="delivery" title="Penghantaran">
                dsdsd
              </Tab>
            </Tabs>
          </div>

          <div className={`${utils.h_xl} pt-5`}>PILIHAN LAINNYA DI STORE REEZQA UNTUKMU</div>
          <div className={homes.productwrap}>
            <div className={homes.prodcard}>
              <Link href="/products/generic"><a><div className={homes.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={homes.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <button className={homes.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                <div className={`${homes.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={homes.prodcard}>
              <Link href="/products/generic"><a><div className={homes.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={homes.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <button className={homes.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                <div className={`${homes.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={homes.prodcard}>
              <Link href="/products/generic"><a><div className={homes.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={homes.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <button className={homes.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                <div className={`${homes.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={homes.prodcard}>
              <Link href="/products/generic"><a><div className={homes.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={homes.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <button className={homes.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                <div className={`${homes.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default FirstPost;