import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/admin/layout'
import Admrpt from '../../components/admin/admin_report'
import Othrpt from '../../components/admin/others_report'

class Reports extends React.Component {
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
      <Layout page={'reports'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin Reports</title>
        </Head>

        <Admrpt/>
        <Othrpt/>
      </Layout>
    )
  }
}

export default Reports;