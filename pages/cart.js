import Head from 'next/head'
import React from 'react';
import Layout from '../components/layout'
import Cartpage from '../components/cartPage'


class FirstPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
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
    return (
      <Layout page={'index'} cart={this.state.cart} {...this.props}>
        <Head>
          <title>{this.props.name} - Product Cart</title>
        </Head>

        {/* Cart Section Header */}
        <Cartpage/>

      </Layout>
    )
  }
}

export default FirstPost;