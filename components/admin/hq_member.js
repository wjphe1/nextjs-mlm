import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
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

class HQmembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            userlist: [],
            pendinglist: [],
            pending_check: [],
            pending_selected: [],
            isloaded: false,
            error: false,
            merror: false,
            toast: true,
            accept: false,
            reject: false,
            nouser: false,
        };
    }

    checkPending = (i) => {
        var array = this.state.pending_check;
        var selected = [];
        const semua = this.state.pendinglist;

        if (i.target && (i.target.checked === true || i.target.checked === false)) {
            array = Array(semua.length).fill(i.target.checked) 
        } else {
            array[i] = !array[i];
        }

        array.forEach(function(part, index) {
            if (part) { selected = selected.concat(semua[index]) }
        });

        console.log(selected)

        this.setState({
            pending_check: array,
            pending_selected: selected,
        })
    }

    markUser = (decision) => {
        this.setState({ isloaded: false })
        const marked = this.state.pending_selected;
        if (marked.length) {
            for (var i= 0; i < marked.length; i++) {
                api.put(routes.users + '/' + marked[i].id, { user: { active: decision } })
                    .then(res => {
                        if (decision) { this.setState({ accept: true, toast: true }) }
                        else { this.setState({ reject: true, toast: true }) }
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ merror: true, toast: true })
                    })
            }
            this.getUsers();
        } else {
            this.setState({ isloaded: true, nouser: true, toast: true })
        }
    }

    getUsers = () => {
        api.get(routes.users)
        .then(res => {
            const rows = res.data.users
            const active = rows.filter((u) => u.active)
            const inactive = rows.filter((u) => !u.active)
            console.log(rows)
            console.log(active)
            console.log(inactive)
            this.setState({ 
                pendinglist: inactive, 
                userlist: active,
                pending_check: Array(inactive.length).fill(false),
                isloaded: true })
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
        const dtab = this.props.router.query.tab || 'pending';

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

                {/* Admin Reports Tabs */}
                <div className="admin-reports-tabs">
                    <Tabs defaultActiveKey={dtab} id="uncontrolled-tab-example">
                        <Tab eventKey="pending" title="● Status Pending Member">
                            {(this.state.accept && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.sexcl}>✓</span>
                                    <span><b>Welcome! -</b> User(s) was Accepted</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false, accept: false })} className={`col-2 ${form.sclose}`}>Close</div>
                            </div>}
                            {(this.state.reject && this.state.toast) && <div className={`mb-4 ${form.notice_warning}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.wexcl}>✓</span>
                                    <span><b>Uh Oh.. -</b> User(s) was Rejected</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false, reject: false })} className={`col-2 ${form.wclose}`}>Close</div>
                            </div>}
                            {(this.state.nouser && this.state.toast) && <div className={`mb-4 ${form.notice_error}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.nexcl}>!</span>
                                    <span><b>Error -</b> Please select member(s) for further actions</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false, error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                            </div>}
                            {(this.state.merror && this.state.toast) && <div className={`mb-4 ${form.notice_error}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.nexcl}>!</span>
                                    <span><b>Error -</b> Update member status error, please try again later</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false, error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                            </div>}
                            <div className={styles.table}>
                                <div className="d-flex align-items-center p-3 flex-wrap">
                                    <form className={styles.search_div}>
                                    <input type="text" placeholder="Search user here" className={styles.search}/>
                                    <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                                    </form>
                                    <div className="d-flex align-items-center ml-auto flex-nowrap py-2">
                                    <div className="font-weight-bold">Action</div>
                                    <button onClick={() => this.markUser(true)} className={`ml-3 mr-2 py-2 ${styles.tbtn}`}>Approve</button>
                                    <button onClick={() => this.markUser(false)} className={`mr-3 ml-2 py-2 ${styles.tbtn_reverse}`}>Reject</button>
                                    </div>
                                </div>
                                {this.state.isloaded ? <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="pl-4"><input type="checkbox" onChange={this.checkPending}/></th>
                                            <th>Member ID</th>
                                            <th>Member Name</th>
                                            <th>Applied At</th>
                                            <th>User Level</th>
                                            <th>Referred by</th>
                                            <th>Status</th>
                                            <th>Member Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.pendinglist.map((u, i) => 
                                            <tr key={i}>
                                                <td className="pl-4"><input type="checkbox" checked={this.state.pending_check[i]} onChange={() => this.checkPending(i)}/></td>
                                                <td className="font-weight-bold">{u.username}</td>
                                                <td className="font-weight-bold">{u.full_name}</td>
                                                <td>{dateTime(u.created_at)}</td>
                                                <td>{u.role.replace('_', ' ')}</td>
                                                {u.upline ? <td>{u.upline.username}</td> : <td> - </td>}
                                                {u.active && <td><button className={styles.status_green} disabled>Approved</button></td>}
                                                {u.active === null && <td><button className={styles.status_yellow} disabled>Pending</button></td>}
                                                {u.active === false && <td><button className={styles.status_red} disabled>Rejected</button></td>}
                                                <td><Link href={'/admin/members/'+ u.id}><a className={styles.modal_btn}>View</a></Link></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                                {this.state.isloaded && !this.state.pendinglist.length && <div className="p-5 text-center">No User Request Found.</div>}
                            </div>
                        </Tab>
                        <Tab eventKey="list" title="● Member List">
                            {(this.props.router.query.newuser && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.sexcl}>✓</span>
                                    <span><b>Congratulations -</b> User was created successfully</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                            </div>}
                            {(this.props.router.query.edituser && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                                <div className="col-10 d-flex align-items-center">
                                    <span className={form.sexcl}>✓</span>
                                    <span><b>Congratulations -</b> User details was updated successfully</span>
                                </div>
                                <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                            </div>}
                            <div className={styles.table}>
                                <div className="d-flex align-items-center p-3 flex-wrap">
                                    <form className={styles.search_div}>
                                    <input type="text" placeholder="Search user here" className={styles.search}/>
                                    <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                                    </form>
                                    <Link href="/admin/members/new"><a className={`ml-auto ${styles.tbtn}`}>New Member</a></Link>
                                </div>
                                {this.state.isloaded ? <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="pl-4">Member ID</th>
                                            <th>Member Name</th>
                                            <th>Joined At</th>
                                            <th>Membership Level</th>
                                            <th>Referred by</th>
                                            <th>Status</th>
                                            <th>Member Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.userlist.map((u, i) => 
                                            <tr key={i}>
                                                <td className="pl-4 font-weight-bold">{u.username}</td>
                                                <td className="font-weight-bold">{u.full_name}</td>
                                                <td>{dateTime(u.created_at)}</td>
                                                <td>{u.role.replace('_', ' ')}</td>
                                                {u.upline ? <td>{u.upline.username}</td> : <td> - </td>}
                                                {u.active && <td><button className={styles.status_green} disabled>Approved</button></td>}
                                                {u.active === null && <td><button className={styles.status_yellow} disabled>Pending</button></td>}
                                                {u.active === false && <td><button className={styles.status_red} disabled>Rejected</button></td>}
                                                <td><Link href={'/admin/members/'+ u.id}><a className={styles.modal_btn}>View</a></Link></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                                {this.state.isloaded && !this.state.userlist.length && <div className="p-5 text-center">No User Request Found.</div>}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        )
    }
}

export default withRouter(HQmembers);