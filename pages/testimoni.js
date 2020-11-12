import Head from 'next/head'
import Layout from '../components/layout'
import Imglight from '../components/imgLightbox'
import tstyles from '../styles/module/testimoni.module.scss'
import utils from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link';
// Import Swiper React components
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

class Testimoni extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout page={'testimoni'} {...this.props}>
        <Head>
          <title>{this.props.name} - Testimoni</title>
        </Head>
        <section className="py-5 px-3">
          <div className={tstyles.main} style={{borderRadius: 10}}>
            <div className={utils.h_xl}>Testimoni</div>
            <div className="tesrow">
              <Swiper
                spaceBetween={15}
                slidesPerView={'auto'}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
              >
                <SwiperSlide><button className={tstyles.tesbtn}>B’COOL FUYOO B’COOL</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>B’QUEENZ MATTE</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>BB CREAM</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>JUS B KLEAR</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>JUS SAKURA</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>KOPI FUYOO</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>OXYGEN BUBBLE MASK</button></SwiperSlide>
                <SwiperSlide><button className={tstyles.tesbtn}>SABUN EMAS</button></SwiperSlide>
              </Swiper>
            </div>
          </div>
          <Imglight/>
        </section>
      </Layout>
    )
  }
}

export default Testimoni;