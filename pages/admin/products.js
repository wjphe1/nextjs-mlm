import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/admin/layout'
import Admprod from '../../components/admin/admin_prod'
import Othprod from '../../components/admin/others_prod'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (e) => {
    console.log(e)
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  render () {
    return (
      <Layout page={'products'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin Products</title>
        </Head>
        <Admprod/>
        <Othprod/>
      </Layout>
    )
  }
}

export default Products;