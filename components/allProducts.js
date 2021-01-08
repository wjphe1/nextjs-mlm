import Link from 'next/link'
import React from 'react'
import api from './auth/api'
import routes from './auth/routes'
import Spinner from 'react-bootstrap/Spinner'
import styles from '../styles/module/home.module.scss'
import { FiShoppingBag } from 'react-icons/fi';

class Allprod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prodlist: [],
            isloaded: false,
            error: false,
            ppage: 1,
            pnext: false,
        };
    }

    getProd = (str) => {
        this.setState({ isloaded: false })
        var pagy = this.state.ppage + parseInt(str || 0);
        if (this.state.pquery && !str) { pagy = 1 }
        api.get(routes.products + '?page=' + pagy)
        .then(res => {
            const rows = res.data.products
            if (rows.length >= 20) { this.setState({ pnext: true, ppage: pagy }) }
            else { this.setState({ pnext: false, ppage: pagy }) }
            this.setState({ prodlist: rows, isloaded: true })
        })
        .catch(err => {
            this.setState({ isloaded: true, error: true })
        })
    }

    componentDidMount() {
        this.getProd();
    }

    render () {
        return (<>
            {this.state.isloaded ? <div className={styles.productwrap}>
                {this.state.prodlist.map((u, i) => <div className={styles.prodcard} key={i}>
                    <a href={"/products/" + u.id}><div className={styles.prod_imgdiv}>{u.photo.url ? <img src={'http://13.212.45.145'+ u.photo.url} alt="product Photo"/> : <img src="/images/placeholder.png" alt="product Photo"/>}</div></a>
                    <a href={"/products/" + u.id}><div className={styles.prodtitle}>{u.name}</div></a>
                    <div dangerouslySetInnerHTML={{__html: u.description}} />
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                        <a href={"/products/" + u.id} className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a>
                        <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                </div>)}
            </div> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
            {this.state.isloaded && !this.state.prodlist.length && <div className="p-5 text-center">No product found. Click new product to add.</div>}
                    {(this.state.pnext || this.state.ppage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                    {this.state.ppage > 1 && <button onClick={() => this.getProd(-1)} className={styles.tbtn}>Prev</button>}
                    <div>Page {this.state.ppage} Showing {(this.state.ppage - 1)*20 + 1} - {(this.state.ppage - 1)*20 + this.state.prodlist.length}</div>
                    {this.state.pnext && <button onClick={() => this.getProd(1)} className={styles.tbtn}>Next</button>}
                    </div>}
            
            </>
        )
    }
}

export default Allprod;