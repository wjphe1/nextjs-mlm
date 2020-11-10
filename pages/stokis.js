import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/module/blog.module.scss'
import utilStyles from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link';
import { HiOutlineShare } from 'react-icons/hi';

class Stokis extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout page={'stokis'} {...this.props}>
        <Head>
          <title>{this.props.name} - Stokis Reezqa</title>
        </Head>
        <section className="p-5">
            <div className={styles.main}>
                <div className={utilStyles.headingXl}>STOKIS STOKIS REEZQA GLOBAL</div>
                <div className={utilStyles.headingMd}>HEAD OFFICE JOHOR BAHRU - 0197577763 / 0137410099 </div>
                <div className="row m-0 pt-5">
                    <div className="col-md-4 pl-0 pb-3">
                        <img src="/images/sample-2.png" alt="stokis" style={{width: '100%', objectFit: 'cover', height: '100%', borderRadius: '12px'}}/>
                    </div>
                    <div className="col-md-8 pl-5">
                        <button className={`${styles.hubungi_btn} mb-5`}>HUBUNGI KAMI</button>
                        <p><b>STOKIS-STOKIS DAERAH JOHOR BAHRU</b></p>
                        <ol>
                            <li>ROKIAH HUSIN (PASIR GUDANG) - 0127081532</li>
                            <li>NANNY ANNISA (TMN SETIA INDAH) - 0149148628</li>
                            <li>ROSZALINDA (KULAI ) - 01111107633</li>
                            <li>ASYIKIN (KLUANG) - 0127880576</li>
                            <li>SY ATIAH (PONTIAN) - 0177944783</li>
                            <li>DATO DALINA (ISKANDAR PUTERI) - 0182474218</li>
                            <li>ASRAMIZA BINTE ARSHAD (TANGKAK) -  0196237944</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="py-4"></div>
            <div className={styles.main}>
                <div className={utilStyles.headingXl}>MASTER STOKIS KUALA LUMPUR &amp; SELANGOR</div>
                <p className="pt-5"><b>STOKIS-STOKIS DAERAH JOHOR BAHRU</b></p>
                <ol>
                    <li>ROKIAH HUSIN (PASIR GUDANG) - 0127081532</li>
                    <li>NANNY ANNISA (TMN SETIA INDAH) - 0149148628</li>
                    <li>ROSZALINDA (KULAI ) - 01111107633</li>
                    <li>ASYIKIN (KLUANG) - 0127880576</li>
                    <li>SY ATIAH (PONTIAN) - 0177944783</li>
                    <li>DATO DALINA (ISKANDAR PUTERI) - 0182474218</li>
                    <li>ASRAMIZA BINTE ARSHAD (TANGKAK) -  0196237944</li>
                </ol>
            </div>
        </section>
      </Layout>
    )
  }
}

export default Stokis;