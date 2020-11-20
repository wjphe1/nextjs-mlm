import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/admin/layout'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'

class Users extends React.Component {
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
          <title>{this.props.name} - Admin Users</title>
        </Head>

        <section className="py-5 px-4">
          {/* Head Section */}
          <div className="d-flex align-items-center flex-wrap">
            <div className={utils.h_xl}>Members Management</div>
            {/* Date Pickers */}
            <div className="ml-auto d-flex align-items-center flex-wrap">
              <label className="date-div">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">From</span>
                <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </label>
              <label className="date-div">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">To</span>
                <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </label>
            </div>
          </div>

          {/* Admin Reports Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey="pending" id="uncontrolled-tab-example">
              <Tab eventKey="pending" title="● Status Pending Member">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3 flex-wrap">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <div className="d-flex align-items-center ml-auto flex-nowrap py-2">
                      <div className="font-weight-bold">Action</div>
                      <button className={`ml-3 mr-2 py-2 ${styles.tbtn}`}>Approve</button>
                      <button className={`mr-3 ml-2 py-2 ${styles.tbtn_reverse}`}>Reject</button>
                    </div>
                  </div>
                  <Table responsive>
                  <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Applied At</th>
                        <th>User Level</th>
                        <th>Referred by</th>
                        <th>Member Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Member1234</td>
                        <td className="font-weight-bold">Tan Ten Tun</td>
                        <td>20 Oct 2020 11.30 AM</td>
                        <td>Master Stokis</td>
                        <td>Member8564</td>
                        <td><button className={styles.modal_btn}>View</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="list" title="● Member List">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3 flex-wrap">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <Link href="/admin/new/member"><a className={`ml-auto ${styles.tbtn}`}>New Member</a></Link>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Joined At</th>
                        <th>Membership Level</th>
                        <th>Referred by</th>
                        <th>Member Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Member1234</td>
                        <td className="font-weight-bold">Tan Ten Tun</td>
                        <td>20 Oct 2020 11.30 AM</td>
                        <td>Master Stokis</td>
                        <td>Member8564</td>
                        <td><button className={styles.modal_btn}>View</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
            </Tabs>
          </div>
        </section>
      </Layout>
    )
  }
}

export default Users;