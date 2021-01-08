import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import api from './auth/api'
import routes from './auth/routes'
import Layout from './layout'
import styles from '../styles/module/blog.module.scss'
import utils from '../styles/module/utils.module.scss'
import homes from '../styles/module/home.module.scss'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { BsCaretRightFill } from 'react-icons/bs';
import { RiShareFill } from 'react-icons/ri';
import { FcOk } from 'react-icons/fc';
import { FiShoppingBag, FiSend, FiPlus, FiMinus } from 'react-icons/fi';
import Allprod from './allProducts'


class Productpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isloaded: false,
            error: false,
            err_msg: {},
            page_error: false,
            count: 1,
            cart: 0,
            snack: false,
        };
    }

  handleChange = (e) => {
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  addCart = () => {
    this.setState({ 
      cart: this.state.cart + 1,
      snack: true,
    })
    setTimeout(() => { this.setState({ snack: false }) }, 3000);
  }

    getProd = () => {
        api.get(routes.products + '/' + this.props.pid)
        .then(res => {
            const rows = res.data.product
            console.log(rows)
            if (rows.id) {
                this.setState({
                    product: rows,
                    isloaded: true,
                })
            } else {
                this.setState({ page_error: true, isloaded: true })
            }
        })
        .catch(err => {
            this.setState({ page_error: true, isloaded: true })
        })
    }

    componentDidMount() {
        this.getProd();
    }
  
  render () {
    return (<>
      {this.state.isloaded && <Layout page={'index'} cart={this.state.cart} {...this.props}>
            <Head>
                <title>{this.state.name} - Product</title>
            </Head>
            <section className="py-5 px-4">
                <div className={utils.breadcrumbs}><Link href="/"><a>REEZQA STORE</a></Link> <BsCaretRightFill/> {this.state.product.name}</div>
                <div className={styles.main_lg}>
                    <div className="row m-0">
                    <div className="col-md-3 p-0">
                        {this.state.product.photo.url ? <img src={'http://13.212.45.145'+ this.state.product.photo.url} alt="product Photo" className={styles.prod_img}/> : <img src="/images/placeholder.png" alt="product Photo" className={styles.prod_img}/>}
                    </div>
                    <div className={`col-md-9 ${styles.res_pad}`}>
                        <div className="d-flex border-b align-items-center pl-3">
                        <div className={utils.h_lg}>{this.state.product.name}</div>
                        <button className={`${styles.prod_sharebtn} ml-auto`}><RiShareFill/> <span className="pl-2">Share</span></button>
                        </div>
                        <div className="row m-0 pt-4">
                        <div className="px-3" style={{color: '#9A9A9A', minWidth: 120}}>HARGA</div>
                        <div className={`${styles.prod_price}`}>RM {this.state.product.product_prices[3] ? this.state.product.product_prices[3].price : '-'}</div>
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
                        <button onClick={this.addCart} className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></button>
                        <button className={styles.send_order}><FiSend/><span className="pl-2">Send Order</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="prod-tabs">
                <Tabs defaultActiveKey="desc">
                <Tab eventKey="desc" title="Deskripsi">
                    <div dangerouslySetInnerHTML={{__html: this.state.product.description}} />
                </Tab>
                <Tab eventKey="order" title="Pesanan">
                    <div dangerouslySetInnerHTML={{__html: this.state.product.order_description}} />
                </Tab>
                <Tab eventKey="delivery" title="Penghantaran">
                    <div dangerouslySetInnerHTML={{__html: this.state.product.delivery_description}} />
                </Tab>
                </Tabs>
            </div>

            <div className={`${utils.h_xl} pt-5`}>PILIHAN LAINNYA DI STORE REEZQA UNTUKMU</div>
            <Allprod/>
            <div id="snackbar" className={(this.state.snack ? 'show' : '')}><FcOk/> <span className="ml-2">Added to Cart</span></div>
        </section>
      </Layout>}
    </>)
  }
}

export default Productpage;