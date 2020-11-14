import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/main.scss'
import 'swiper/swiper.scss'
import 'swiper/swiper-bundle.min.css'
import 'react-modal-video/scss/modal-video.scss'
import React from 'react'
import App from 'next/app'

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) { pageProps = await Component.getInitialProps(ctx) }
        return { pageProps }
    }

    state = {
        // global states here
        name: "REEZQA GLOBAL"
    }

    render () {
        const { Component, pageProps } = this.props

        return (
            <Component {...pageProps} {...this.state}/>
        )
    }
}