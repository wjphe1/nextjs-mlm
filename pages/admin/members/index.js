import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import Layout from '../../../components/admin/layout'
import HQmembers from '../../../components/admin/hq_member'
import Othermembers from '../../../components/admin/others_member'

class Users extends React.Component {
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
    var user = {};
    var role = null;
    var userStr = Cookies.get('user');
    if (userStr) { user = JSON.parse(userStr); role = user.role }

    return (
      <Layout page={'users'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin Members</title>
        </Head>
        {(role && role ==='HQ') ? <HQmembers/> : <Othermembers/>}
      </Layout>
    )
  }
}

export default Users;