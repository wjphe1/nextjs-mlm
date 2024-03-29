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
            aisloaded: false,
            error: false,
            merror: false,
            toast: true,
            accept: false,
            reject: false,
            nouser: false,
            page: 1,
            next: false,
            apage: 1,
            anext: false,
            pquery: '',
            aquery: '',
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
            setTimeout(() => {this.getUsers();}, 500)
        } else {
            this.setState({ isloaded: true, nouser: true, toast: true })
        }
    }

    getUsers = (str) => {
        this.setState({ aisloaded: false })
        var pagy = this.state.apage + parseInt(str || 0);
        if (this.state.aquery && !str) { pagy = 1 }
        api.get(routes.users + '?page=' + pagy + '&status[]=ACTIVE&query=' + this.state.aquery)
        .then(res => {
            const rows = res.data.users
            if (rows.length >= 20) { this.setState({ anext: true, apage: pagy }) }
            else { this.setState({ anext: false, apage: pagy }) }
            console.log(rows)
            this.setState({ userlist: rows, aisloaded: true })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({ aisloaded: true, aerror: true })
        })
    }

    getpendingUsers = (str) => {
        this.setState({ isloaded: false })
        var pagy = this.state.page + parseInt(str || 0);
        if (this.state.pquery && !str) { pagy = 1 }
        api.get(routes.users + '?page=' + pagy + '&status=PENDING&query=' + this.state.pquery)
        .then(res => {
            const rows = res.data.users
            if (rows.length >= 20) { this.setState({ next: true, page: pagy }) }
            else { this.setState({ next: false, page: pagy }) }
            console.log(rows)
            this.setState({ pendinglist: rows, isloaded: true, pending_check: Array(rows.length).fill(false) })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({ isloaded: true, error: true })
        })
    }

    componentDidMount() {
        this.getUsers();
        this.getpendingUsers();
    }

    render () {
        const dtab = this.props.router.query.tab || 'pending';

        return (
            <section className="py-5 px-4">
                {/* Head Section */}
                <div className="d-flex align-items-center flex-wrap">
                    <div className={utils.h_xl}>Members Management</div>
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
                                    <div className={styles.search_div}>
                                        <input type="text" placeholder="Search members here" className={styles.search} onChange={(e)=>this.setState({ pquery: e.target.value })}/>
                                        <button onClick={() => this.getpendingUsers()} className={styles.submit}><HiOutlineSearch/></button>
                                    </div>
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
                            {(this.state.next || this.state.page > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                                {this.state.page > 1 && <button onClick={() => this.getpendingUsers(-1)} className={styles.tbtn}>Prev</button>}
                                <div>Page {this.state.page} Showing {(this.state.page - 1)*20 + 1} - {(this.state.page - 1)*20 + this.state.pendinglist.length}</div>
                                {this.state.next && <button onClick={() => this.getpendingUsers(1)} className={styles.tbtn}>Next</button>}
                            </div>}
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
                                    <div className={styles.search_div}>
                                        <input type="text" placeholder="Search members here" className={styles.search} onChange={(e)=>this.setState({ aquery: e.target.value })}/>
                                        <button onClick={() => this.getUsers()} className={styles.submit}><HiOutlineSearch/></button>
                                    </div>
                                    <Link href="/admin/members/new"><a className={`ml-auto ${styles.tbtn}`}>New Member</a></Link>
                                </div>
                                {this.state.aisloaded ? <Table responsive>
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
                                {this.state.aisloaded && !this.state.userlist.length && <div className="p-5 text-center">No User Request Found.</div>}
                            </div>
                            {(this.state.anext || this.state.apage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                                {this.state.apage > 1 && <button onClick={() => this.getUsers(-1)} className={styles.tbtn}>Prev</button>}
                                <div>Page {this.state.apage} Showing {(this.state.apage - 1)*20 + 1} - {(this.state.apage - 1)*20 + this.state.userlist.length}</div>
                                {this.state.anext && <button onClick={() => this.getUsers(1)} className={styles.tbtn}>Next</button>}
                            </div>}
                        </Tab>
                    </Tabs>
                </div>
            </section>
        )
    }
}

export default withRouter(HQmembers);