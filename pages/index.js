import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/module/home.module.scss'
import utilStyles from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
// Import Swiper React components
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

class Home extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout page={'index'} {...this.props}>
        <Head>
          <title>{this.props.name}</title>
        </Head>
        <section className="p-5">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay= {{ delay: 3000 }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide><div className={styles.slide}><img src="/images/sample.png" alt="Reezqa-banner"/></div></SwiperSlide>
            <SwiperSlide><div className={styles.slide}><img src="/images/sample.png" alt="Reezqa-banner"/></div></SwiperSlide>
            <SwiperSlide><div className={styles.slide}><img src="/images/sample.png" alt="Reezqa-banner"/></div></SwiperSlide>
            <SwiperSlide><div className={styles.slide}><img src="/images/sample.png" alt="Reezqa-banner"/></div></SwiperSlide>
          </Swiper>

          <div className="row py-5">
            <div className="col-3">
              <div className={styles.popular_nav}>
                <span>PRODUK POPULER</span>
                <svg width="199" height="176" viewBox="0 0 199 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="124.365" cy="75.296" r="74.3584" transform="rotate(-3.94334 124.365 75.296)" fill="url(#paint0_linear)" fill-opacity="0.24"/>
                  <circle cx="74.4821" cy="101.413" r="74.3584" transform="rotate(21.562 74.4821 101.413)" fill="url(#paint1_linear)" fill-opacity="0.24"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="145.67" y1="22.2425" x2="124.365" y2="149.654" gradientUnits="userSpaceOnUse">
                      <stop offset="0.328125" stop-color="#F24901"/>
                      <stop offset="1" stop-color="white" stop-opacity="0.73"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="95.787" y1="48.3599" x2="74.4821" y2="175.772" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#F20101"/>
                      <stop offset="1" stop-color="white" stop-opacity="0.73"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="col-9">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation
                autoplay= {{ delay: 3000 }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
              >
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <img src="/images/sample-2.png" alt="Reezqa-banner"/>
                    <div className={styles.prodtitle}>Kopi Reezqa</div>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <img src="/images/sample-2.png" alt="Reezqa-banner"/>
                    <div className={styles.prodtitle}>Kopi Reezqa</div>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <img src="/images/sample-2.png" alt="Reezqa-banner"/>
                    <div className={styles.prodtitle}>Kopi Reezqa</div>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <img src="/images/sample-2.png" alt="Reezqa-banner"/>
                    <div className={styles.prodtitle}>Kopi Reezqa</div>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <img src="/images/sample-2.png" alt="Reezqa-banner"/>
                    <div className={styles.prodtitle}>Kopi Reezqa</div>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="p-5" style={{background: 'white'}}>
            <div className={utilStyles.headingXl}>KOLESKI PRODUK FUYOO</div>
            <div className="p-5"></div>
          </div>
          <div className={`${utilStyles.headingXl} text-center py-4`}>SEMUA PRODUK</div>
          <div className="d-flex flex-wrap" style={{margin: '0 -1rem'}}>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <img src="/images/sample-2.png" alt="Reezqa-banner"/>
              <div className={styles.prodtitle}>Kopi Reezqa</div>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="#"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Home;