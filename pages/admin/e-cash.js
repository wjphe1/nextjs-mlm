import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import cn from 'classnames'
import styles from '../../styles/module/admin/admin.module.scss'
import Layout from '../../components/admin/layout'
import Aecash from '../../components/admin/admin_ecash'

class Ecash extends React.Component {
    static getInitialProps({ pathname }){
        return { pathname }
    }

    constructor(props) {
        super(props);
        this.state = {
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

        const tab1svg = <Link href="/admin"><a className={`${cn({[styles.hbactive]: this.props.pathname === '/admin'})} ${styles.huge_btns}`}>
            <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37" cy="17" r="17" fill="#FF6202"/>
            <circle cx="67" cy="25" r="7" fill="#FFD9C2"/>
            <circle cx="58" cy="6" r="4" fill="#D14F00"/>
            <circle cx="54" cy="36" r="4" fill="#FFC5A2"/>
            <circle cx="12" cy="17" r="4" fill="#FFD3AB"/>
            <circle r="3" transform="matrix(-1 0 0 1 16 30)" fill="#EBBEA2"/>
            <circle cx="4" cy="26" r="4" fill="#FFB82E"/>
        </svg><span className="pt-2">Sales</span></a></Link>

        const tab2svg = <Link href="/admin/e-points"><a className={`${cn({[styles.hbactive]: this.props.pathname === '/admin/e-points'})} ${styles.huge_btns}`}>
            <svg width="45" height="40" viewBox="0 0 45 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="42" fill="#FFD9C2"/>
            <circle cx="28" cy="21" r="17" fill="#FF6202"/>
        </svg><span className="pt-2">E-Points</span></a></Link>
    
        const tab3svg = <Link href="/admin/e-cash"><a className={`${cn({[styles.hbactive]: this.props.pathname === '/admin/e-cash'})} ${styles.huge_btns}`}>
            <svg width="50" height="40" viewBox="0 0 50 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="13" r="9" fill="#FFD9C2"/>
            <circle cx="42.5" cy="3.5" r="3.5" fill="#FFB82E"/>
            <circle cx="24.5" cy="21.5" r="15.5" fill="#FF6202"/>
            <path d="M28.6948 24.1441C28.6948 24.6574 28.5595 25.1334 28.2888 25.5721C28.0275 26.0014 27.6355 26.3561 27.1128 26.6361C26.5995 26.9068 25.9881 27.0561 25.2788 27.0841V28.2181H24.3828V27.0701C23.3935 26.9861 22.5955 26.6921 21.9888 26.1881C21.3821 25.6748 21.0601 24.9794 21.0228 24.1021H23.5708C23.6268 24.6621 23.8975 25.0214 24.3828 25.1801V22.9681C23.6548 22.7814 23.0715 22.5994 22.6328 22.4221C22.2035 22.2448 21.8255 21.9601 21.4988 21.5681C21.1721 21.1761 21.0088 20.6394 21.0088 19.9581C21.0088 19.1088 21.3215 18.4274 21.9468 17.9141C22.5815 17.4008 23.3935 17.1114 24.3828 17.0461V15.9121H25.2788V17.0461C26.2588 17.1208 27.0335 17.4054 27.6028 17.9001C28.1721 18.3948 28.4895 19.0808 28.5548 19.9581H25.9928C25.9368 19.4541 25.6988 19.1274 25.2788 18.9781V21.1481C26.0535 21.3628 26.6508 21.5541 27.0708 21.7221C27.4908 21.8901 27.8641 22.1701 28.1908 22.5621C28.5268 22.9448 28.6948 23.4721 28.6948 24.1441ZM23.5428 19.8461C23.5428 20.0794 23.6128 20.2754 23.7528 20.4341C23.9021 20.5928 24.1121 20.7328 24.3828 20.8541V18.9081C24.1215 18.9548 23.9161 19.0574 23.7668 19.2161C23.6175 19.3654 23.5428 19.5754 23.5428 19.8461ZM25.2788 25.2221C25.5588 25.1754 25.7781 25.0634 25.9368 24.8861C26.1048 24.7088 26.1888 24.4894 26.1888 24.2281C26.1888 23.9854 26.1095 23.7894 25.9508 23.6401C25.8015 23.4814 25.5775 23.3461 25.2788 23.2341V25.2221Z" fill="white"/>
            <circle cx="40.5" cy="31.5" r="9.25" stroke="#FF6202" strokeWidth="0.5"/>
        </svg><span className="pt-2">E-Cash</span></a></Link>

        const tab4svg = <Link href="/admin/profit-loss"><a className={`${cn({[styles.hbactive]: this.props.pathname === '/admin/profit-loss'})} ${styles.huge_btns}`}>
            <svg width="40" height="40" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="12" fill="#FFC5A1"/>
            <rect y="15" width="12" height="12" fill="#D14F00"/>
            <rect y="30" width="12" height="12" fill="#FFD3AB"/>
            <rect x="14" width="12" height="12" fill="#FF6202"/>
            <rect x="14" y="15" width="12" height="12" fill="#FF6202"/>
            <rect x="14" y="30" width="12" height="12" fill="#FF6202"/>
            <rect x="28" width="12" height="12" fill="#FFB82E"/>
            <rect x="28" y="15" width="12" height="12" fill="#FF6202"/>
            <rect x="28" y="30" width="12" height="12" fill="#FFD9C2"/>
        </svg><span className="pt-2">P&amp;L</span></a></Link>

        const linktabs = <div className={styles.huge_btns_div}>
            {tab1svg} {tab2svg} {tab3svg} {tab4svg}
        </div>

        return (
        <Layout page={'reports'} {...this.props}>
            <Head>
                <title>{this.props.name} - Admin E-Cash</title>
            </Head>

            <section className="py-5 px-4">
                <Aecash links={linktabs}/>
            </section>
        </Layout>
        )
    }
}

export default Ecash;