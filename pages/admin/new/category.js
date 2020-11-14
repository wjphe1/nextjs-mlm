import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import styles from '../../../styles/module/admin/admin.module.scss'
import utils from '../../../styles/module/utils.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

class Products extends React.Component {
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
      <Layout page={'products'} {...this.props}>
        <Head>
          <title>{this.props.name} - Admin New Category</title>
        </Head>

        <section className="py-5 px-4">
            <div className={styles.table}>
                <div className="d-flex align-items-center p-3">
                    <div className={styles.thead}>Transaction History</div>
                    <Link to href="/admin/new/product"><a className={`ml-auto ${styles.tbtn}`}>New Product</a></Link>
                </div>
                <Table responsive="md">
                    <thead>
                        <tr>
                            <th className="pl-4"><input type="checkbox"/></th>
                            <th>Transaction ID</th>
                            <th>Transacted At</th>
                            <th>Member ID</th>
                            <th>Amount (MYR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="pl-4"><input type="checkbox"/></td>
                            {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="pl-4"><input type="checkbox"/></td>
                            {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="pl-4"><input type="checkbox"/></td>
                            {Array.from({ length: 4 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </section>
      </Layout>
    )
  }
}

export default Products;