import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Newmemb from '../../../components/admin/new_member'

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: (new Date()).setDate(new Date().getDate()+1)
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
      <Layout page={'users'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin New Member</title>
        </Head>

        <Newmemb/>
      </Layout>
    )
  }
}

export default Members;