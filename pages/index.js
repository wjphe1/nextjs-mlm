import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/module/home.module.scss'
import utils from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
// Import Swiper React components
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const cate = [
  { name: 'B’COOL FUYOO', bg: 'linear-gradient(206.65deg, #FF6202 16.71%, #FF0000 118.94%)'},
  { name: 'B’QUEENZ MATTE', bg: 'linear-gradient(29.54deg, #5700C7 20.8%, #609FFF 99.31%)'},
  { name: 'BB CREAM', bg: 'linear-gradient(29.54deg, #A35BFF 20.8%, #609FFF 99.31%)'},
  { name: 'JUS B KLEAR', bg: 'linear-gradient(206.65deg, #30CB5C 16.71%, #477C12 118.94%)'},
  { name: 'JUS SAKURA', bg: 'linear-gradient(29.54deg, #E499FF 20.8%, #F7C5FF 99.31%)'},
  { name: 'KOPI FUYOO', bg: 'linear-gradient(29.54deg, #B44D37 20.8%, #DC7058 99.31%)'},
  { name: 'OXYGEN BUBBLE MASK', bg: 'linear-gradient(206.65deg, #FF6202 16.71%, #FF0000 118.94%)'},
  { name: 'SABUN EMAS', bg: 'linear-gradient(202.05deg, #FFE600 -13.97%, #FFD01F 53.75%, #FFC530 88.93%)'}
]

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: 0
    };
  }

  handleChange = (e) => {
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout page={'index'} {...this.props} cart={this.state.cart}>
        <Head>
          <title>{this.props.name}</title>
        </Head>
        <section className="py-5 px-4">
          <div className="main-banner">
            <Swiper
              spaceBetween={30}
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
          </div>

          <div className="row py-5">
            <div className="col-3">
              <div className={styles.popular_nav}>
                <span>PRODUK POPULER</span>
                <svg width="199" height="176" viewBox="0 0 199 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="124.365" cy="75.296" r="74.3584" transform="rotate(-3.94334 124.365 75.296)" fill="url(#paint0_linear)" fillOpacity="0.24"/>
                  <circle cx="74.4821" cy="101.413" r="74.3584" transform="rotate(21.562 74.4821 101.413)" fill="url(#paint1_linear)" fillOpacity="0.24"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="145.67" y1="22.2425" x2="124.365" y2="149.654" gradientUnits="userSpaceOnUse">
                      <stop offset="0.328125" stopColor="#F24901"/>
                      <stop offset="1" stopColor="white" stopOpacity="0.73"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="95.787" y1="48.3599" x2="74.4821" y2="175.772" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F20101"/>
                      <stop offset="1" stopColor="white" stopOpacity="0.73"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="col-9">
              <Swiper
                spaceBetween={20}
                breakpoints={{
                  640: { slidesPerView: 1, },
                  768: { slidesPerView: 2, },
                  1068: { slidesPerView: 3, }
                }}
                navigation
                autoplay= {{ delay: 3000 }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
              >
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
                    <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
                    <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
                    <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
                    <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.prodcard} w-100 m-0`}>
                    <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
                    <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
                    <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
                    <div className="d-flex align-items-center mt-auto flex-wrap">
                      <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                      <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className={`${utils.h_xl} pt-3`}>KOLESKI PRODUK FUYOO</div>
          <div className="pt-3 pb-5 cate-swiper">
            <Swiper
              spaceBetween={15}
              breakpoints={{
                174: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                868: { slidesPerView: 4 },
                1068: { slidesPerView: 5 },
                1200: { slidesPerView: 6 }
              }}
              navigation
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {cate && cate.map((u, i) => 
                <SwiperSlide key={i}><button className={styles.catecard} style={{background: u.bg}}><div><div>{u.name}</div><div className={styles.line}></div></div></button></SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className={styles.productwrap}>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
          </div>
          
          <div className={`${utils.h_xl} pt-5`}>SEMUA PRODUK</div>
          <div className={styles.productwrap}>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
                <div className={`${styles.prodprice} ml-auto`}>RM 34.90</div>
              </div>
            </div>
            <div className={styles.prodcard}>
              <Link href="/products/generic"><a><div className={styles.prod_imgdiv}><img src="/images/sample-2.png" alt="Reezqa-banner"/></div></a></Link>
              <Link href="/products/generic"><a><div className={styles.prodtitle}>Kopi Reezqa</div></a></Link>
              <p>KOPI PRACAMPURAN KOPI ARBICA GOJI EKSTRAK DURIAN...</p>
              <div className="d-flex align-items-center mt-auto flex-wrap">
                <Link href="/products/generic"><a className={styles.keranjang}><FiShoppingBag/><span className="pl-2 db-mn">Keranjang</span></a></Link>
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