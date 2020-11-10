import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/module/blog.module.scss'
import utilStyles from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link';
import { HiOutlineShare } from 'react-icons/hi';

class Keahlian extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout page={'keahlian'} {...this.props}>
        <Head>
          <title>{this.props.name} - Keahlian Reezqa</title>
        </Head>
        <section className="p-5">
            <div className={styles.main}>
                <div className={utilStyles.headingXl}>Keahlian Reeqza</div>
                <div className="d-flex align-items-center">
                    <div className={utilStyles.headingMd}>Manfaat Menjadi Ejen REEZQA</div>
                    <button className={`${styles.sharebtn} ml-auto`}><HiOutlineShare/></button>
                </div>
                <img src="/images/sample.png" alt="keahlian" className="w-100 py-4"/>
                <p>
                    Akak bagi tauw..<br/><br/>
                    <b>RUJUK PD BUKU AHLI YG D SERTAKAN</b><br/><br/>
                    Setiap pembelian RM50 akak akan  bagi rebet RM4  dan bila cukup jumlah RM50..<br/>
                    Akak masukkan duit nie dlm akaun sis...<br/><br/>
                    Selepas tu, setiap pembelian akan dapat 1 point yg mana bila dh terkumpul jadi 500 point tanpa had masa... akan boleh tebus point tu untuk dapatkan lagi RM250 masuk ke akaun sis.<br/>
                </p>
            </div>
        </section>
      </Layout>
    )
  }
}

export default Keahlian;