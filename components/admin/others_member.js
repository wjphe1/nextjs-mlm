import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import Cookies from 'js-cookie'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import dateTime from '../dateTime'
import api from '../auth/api'
import routes from '../auth/routes'
import DatePicker from "react-datepicker"
import { FiCalendar } from 'react-icons/fi'
import { HiOutlineSearch } from 'react-icons/hi'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

class Othermembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            userlist: [],
            isloaded: false,
            error: false,
            toast: true,
        };
    }

    getUsers = () => {
        api.get(routes.users)
        .then(res => {
            var user = {};
            var id = null;
            var userStr = Cookies.get('user');
            if (userStr) { user = JSON.parse(userStr); id = user.id }
            var rows = res.data.users
            rows = rows.filter(u => u.id !== id);
            this.setState({ userlist: rows, isloaded: true })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({ isloaded: true, error: true })
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    render () {
        var user = {};
        var role = null;
        var authorized = false;
        var userStr = Cookies.get('user');
        if (userStr) { user = JSON.parse(userStr); role = user.role }
        if (role !== 'AGENT' && role !== 'SUPERADMIN') { authorized = true }
        
        return (
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

                {/* Other Members Tabs */}
                <div className="admin-reports-tabs">
                    <Tabs defaultActiveKey="list" id="uncontrolled-tab-example">
                        <Tab eventKey="list" title="● Member List">
                            {(this.props.router.query.newuser && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.sexcl}>✓</span>
                                    <span><b>Congratulations -</b> User was Submitted for Approval</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                            </div>}
                            {(this.props.router.query.editself && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.sexcl}>✓</span>
                                    <span><b>Congratulations -</b> Your details was updated successfully</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                            </div>}
                            <div className={styles.table}>
                                <div className="d-flex align-items-center p-3 flex-wrap">
                                    <form className={styles.search_div}>
                                    <input type="text" placeholder="Search user here" className={styles.search}/>
                                    <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                                    </form>
                                    {authorized && <Link href="/admin/members/new"><a className={`ml-auto ${styles.tbtn}`}>New Member</a></Link>}
                                </div>
                                {this.state.isloaded ? <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="pl-4">Member ID</th>
                                            <th>Member Name</th>
                                            <th>Joined At</th>
                                            <th>Membership Level</th>
                                            <th>Status</th>
                                            <th>Member Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userlist.map((u, i) => 
                                            <tr key={i} className={styles.cell_center}>
                                                <td className="pl-4 font-weight-bold">{u.username}</td>
                                                <td className="font-weight-bold">{u.full_name}</td>
                                                <td>{dateTime(u.created_at)}</td>
                                                <td>{u.role.replace('_', ' ')}</td>
                                                {u.active && <td><button className={styles.status_green} disabled>Approved</button></td>}
                                                {u.active === null && <td><button className={styles.status_yellow} disabled>Pending</button></td>}
                                                {u.active === false && <td><button className={styles.status_red} disabled>Rejected</button></td>}
                                                <td><Link href={'/admin/members/'+ u.id}><a className={styles.modal_btn}>View</a></Link></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                                {this.state.isloaded && !this.state.userlist.length && <div className="p-5 text-center">No Downline Members Found.</div>}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        )
    }
}

export default withRouter(Othermembers);