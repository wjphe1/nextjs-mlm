import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/module/utils.module.scss'
import React from 'react';
import Link from 'next/link'

class Home extends React.Component {

  render () {
    // use this.props.xxx to call global states
    return (
      <Layout home {...this.props}>
        <Head>
          <title>{this.props.name}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>{this.props.name}</p>
          <Link href="/posts/first-post">Go to my first post.</Link>
        </section>
      </Layout>
    )
  }
}

export default Home;