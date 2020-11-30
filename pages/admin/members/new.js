import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import Layout from '../../../components/admin/layout'
import Newmemb from '../../../components/admin/new_member'

class Members extends React.Component {
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
    var referral = '';
    var userStr = Cookies.get('user');
    if (userStr) { user = JSON.parse(userStr); role = user.role }
    if (role !== 'SUPERADMIN' && role !== 'HQ') { referral = user.username }

    return (
      <Layout page={'users'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin New Member</title>
        </Head>

        <Newmemb referral={referral}/>
      </Layout>
    )
  }
}

export default Members;