import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import Layout from '../../components/layout'


class FirstPost extends React.Component {

  render () {
    return (
      <Layout {...this.props}>
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

export default FirstPost;