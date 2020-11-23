import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import Layout from '../../components/admin/layout'
import Admprod from '../../components/admin/admin_prod'
import Othprod from '../../components/admin/others_prod'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    var user = {};
    var role = null;
    var userStr = Cookies.get('user');
    if (userStr) { user = JSON.parse(userStr); role = user.role }

    return (
      <Layout page={'products'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin Products</title>
        </Head>
        {(role && role ==='SUPERADMIN') ? <Admprod/> : <Othprod/>}
      </Layout>
    )
  }
}

export default Products;