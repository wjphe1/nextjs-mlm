import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import React from 'react';
import Link from 'next/link'

export default class Home extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout home {...this.props}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>{this.props.name}</p>
          <Link href="/posts/first-post">Go to my first post.</Link>
        </section>
      </Layout>
    )
  }
}