import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/admin/layout'

class Reports extends React.Component {

  render () {
    return (
        <Layout page={'reports'} {...this.props}>
            <Head>
                <title>First Post</title>
            </Head>

            <h1>First Post 12 {this.props.name}</h1>
                
            <h2>
                <Link href="/"><a>Back to home</a></Link>
            </h2>
        </Layout>
    )
  }
}

export default Reports;