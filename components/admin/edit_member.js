import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import cn from 'classnames'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import api from '../auth/api'
import routes from '../auth/routes'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

class Editmemb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_mode: false,
            page_error: false,
            title: '',
            ptype: 'password',
            ctype: 'password',
            show: false,
            pisloaded: true,
            perror: false,
            psuccess: false,
            perr_msg: {},
            pscs_msg: {},
            new_password: '',
            confirm_password: '',
            isloaded: false,
            error: false,
            err_msg: {},
            image: '',
            imagePreviewUrl: '',
            full_name: '',
            role: 'MASTER_STOKIS',
            ic: '',
            phone: '',
            username: '',
            password: '',
            email: '',
            upline_id: '',
            street: '',
            city: '',
            state: '',
            postcode: '',
            bank_name: 'Maybank',
            bank_account_number: '',
        };
    }
    
    showHide = (which) => {
        if (which === 'ptype') {
            const current = this.state.ptype;
            var result = 'text';
            if (current === 'text') { result = 'password'}
            this.setState({ ptype: result })
        } else {
            const current = this.state.ctype;
            var result = 'text';
            if (current === 'text') { result = 'password'}
            this.setState({ ctype: result })
        }
    }

    changePassword = () => {
        if (this.state.new_password === this.state.confirm_password) {
            this.setState({ pisloaded: false })
            api.put(routes.users + '/' + this.props.mid, { user: { password: this.state.new_password }})
            .then(res => {
                this.setState({ pscs_msg: { success: 'Password is Changed Successfully'}, pisloaded: true, psuccess: true })
            })
            .catch(err => {
                console.log(err.response)
                var msg = { error: err.response.status + ' : ' + err.response.statusText };
                if (err.response.data) { msg = err.response.data };
                this.setState({ perr_msg: msg, pisloaded: true, perror: true })
            })
        } else {
            this.setState({ perror: true, perr_msg: { error: 'Passwords do not match' } })
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    imgChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            image: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }

    submitUser = (e) => {
        e.preventDefault();
        this.setState({ error: false, isloaded: false })
        const postdata = {
            user: {
                full_name: this.state.full_name,
                role: this.state.role,
                ic_number: this.state.ic,
                username: this.state.username,
                email: this.state.email,
                phone_number: this.state.phone,
                upline_id: this.state.upline_id,
                address: this.state.street + ', ' + this.state.postcode + ', ' + this.state.city + ', ' + this.state.state,
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                postcode: this.state.postcode,
                bank_name: this.state.bank_name,
                bank_account_number: this.state.bank_account_number,
            }
        }
        api.put(routes.users + '/' + this.props.mid, postdata)
            .then(res => {
                //console.log(res)
                Router.push({
                    pathname: '/admin/members',
                    query: { edituser: true, tab: 'list' },
                })
            })
            .catch(err => {
                console.log(err.response)
                var msg = { error: err.response.status + ' : ' + err.response.statusText };
                if (err.response.data) { msg = err.response.data };
                setTimeout(() => {this.setState({ err_msg: msg, isloaded: true, error: true })}, 100)
            })
    }

    getUser = () => {
        api.get(routes.users + '/' + this.props.mid)
          .then(res => {
            const rows = res.data.user
            if (rows.id) {
                this.setState({
                    title: rows.full_name + ' [' + rows.username + '] Profile',
                    full_name: rows.full_name || '',
                    role: rows.role,
                    ic: rows.ic_number || '',
                    username: rows.username,
                    email: rows.email || '',
                    phone: rows.phone_number || '',
                    upline_id: rows.upline_id || '',
                    street: rows.street || '',
                    city: rows.city || '',
                    state: rows.state || '',
                    postcode: rows.postcode || '',
                    bank_name: rows.bank_name || '',
                    bank_account_number: rows.bank_account_number || '',
                    isloaded: true,
                })
            } else {
                this.setState({ page_error: true, isloaded: true })
            }
        })
        .catch(err => {
            this.setState({ page_error: true, isloaded: true })
        })
    }
    
    componentDidMount() {
        this.getUser();
    }

    render () {
        var user = {};
        var role = null;
        var myid = null;
        var authorized = false;
        var myself = false;
        var userStr = Cookies.get('user');
        if (userStr) { user = JSON.parse(userStr); role = user.role; myid = user.id }
        if (role === 'HQ') { authorized = true }
        if (this.props.mid === myid) { myself = true }

        let $imagePreview = null;
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} className={form.img_preview}/>);
        } else {
            $imagePreview = null;
        }

        return (
        <section className="py-5 px-4">
            {!this.state.page_error ? <form onSubmit={this.submitUser} className="row m-0">
                {this.state.isloaded ? <div className={`${cn({['pointer-none']: !this.state.edit_mode})} col-lg-8 p-0`}>
                    {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
                        <div className="col-10 d-flex align-items-center">
                            <span className={form.nexcl}>!</span> 
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'array') && <ul className="m-0 pl-4">
                                {Object.keys(this.state.err_msg.error).map(key =>
                                    <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                                )}
                            </ul>}
                        </div> 
                        <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                    </div>}
                    <div className={`${styles.table} mb-4 pb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom mb-4">
                            <div className={styles.thead}>{this.state.title}</div>
                        </div>
                        {/* <div className="row m-0 px-3 pb-4">
                            <div className="col-md-6 px-2">
                                <label>Profile Photo</label>
                                <div className="d-flex align-items-center">
                                    {this.state.imagePreviewUrl ? $imagePreview :
                                    <label htmlFor="file-upload" className={form.field_file}>Upload your Photo here</label>}
                                    <input id="file-upload" name="prod_img" type="file" onChange={(e)=>this.imgChange(e)} className="d-none"/>
                                </div>
                            </div>
                            <div className="col-md-6 px-2 d-flex align-items-end">
                                {this.state.imagePreviewUrl && <button onClick={() => {this.setState({image: '', imagePreviewUrl: ''})}} className={form.remove_img_btn}><MdCancel/> Remove</button>}
                            </div>
                        </div> */}
                        <div className="row m-0 px-3">
                            <div className="col-md-4 px-2">
                                <label>Member Full Name</label>
                                <input name="full_name" onChange={this.handleChange} value={this.state.full_name} type="text" className={form.field_light} required/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Membership Level</label>
                                <select name="role" onChange={this.handleChange} type="text" className={cn({[form.field_light]: authorized, [form.field_disabled]: !authorized})} value={this.state.role} disabled={!authorized}>
                                    <option value="MASTER_STOKIS">Master Stokis</option>
                                    <option value="STOKIS">Stokis</option>
                                    <option value="AGENT">Agent</option>
                                </select>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>IC Number</label>
                                <input name="ic" onChange={this.handleChange} value={this.state.ic} type="text" className={cn({[form.field_light]: authorized, [form.field_disabled]: !authorized})} disabled={!authorized} required={authorized}/>
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-6 px-2">
                                <label>Member Username</label>
                                <input name="username" onChange={this.handleChange} value={this.state.username} type="text" className={cn({[form.field_light]: authorized, [form.field_disabled]: !authorized})} disabled={!authorized} required={authorized}/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Passwords</label>
                                <div className="position-relative">
                                    <input type="text" className={form.field_disabled} disabled placeholder="****************"/>
                                    <div className={`${styles.tbtn} position-absolute text-center`} onClick={() => this.setState({ show: true })} style={{ top: 3, right: 3, userSelect: 'none', cursor: 'pointer' }}>Edit</div>
                                </div>
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-4 px-2">
                                <label>Email Address (Optional)</label>
                                <input name="email" onChange={this.handleChange} value={this.state.email} type="email" className={form.field_light}/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Phone Number</label>
                                <input name="phone" onChange={this.handleChange} value={this.state.phone} type="tel" className={form.field_light}/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Referral Member ID</label>
                                <input name="upline_id" onChange={this.handleChange} value={this.state.upline_id} type="text" className={cn({[form.field_light]: authorized, [form.field_disabled]: !authorized})} placeholder="E.g. Member5758" disabled={!authorized}/>
                            </div>
                        </div>
                        <div className="px-4 pb-2">Address</div>
                        <div className="px-4">
                            <input name="street" onChange={this.handleChange} value={this.state.street} type="text" className={form.field_light} placeholder="E.g. 5, Jalan Sultan 3"/>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-4 px-2">
                                <label>City</label>
                                <input name="city" onChange={this.handleChange} value={this.state.city} type="text" className={form.field_light}/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>State</label>
                                <select name="state" onChange={this.handleChange} value={this.state.state} className={form.field_light}>
                                    <option value='' className="d-none">Select State</option>
                                    <option>Perlis</option>
                                    <option>Kedah</option>
                                    <option>Pulau Pinang</option>
                                    <option>Perak</option>
                                    <option>Selangor</option>
                                    <option>Kuala Lumpur</option>
                                    <option>Putrajaya</option>
                                    <option>Negeri Sembilan</option>
                                    <option>Melaka</option>
                                    <option>Kelantan</option>
                                    <option>Terrenganu</option>
                                    <option>Pahang</option>
                                    <option>Johor</option>
                                    <option>Sabah</option>
                                    <option>Sarawak</option>
                                    <option>Labuan</option>
                                </select>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Postcode</label>
                                <input name="postcode" onChange={this.handleChange} value={this.state.postcode} type="number" className={form.field_light} placeholder="E.g. Member5758"/>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.table} mb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>Bank Account Details</div>
                        </div>
                        <div className="row m-0 px-3 py-4">
                            <div className="col-md-4 px-2">
                                <label>Bank Name</label>
                                <select name="bank_name" onChange={this.handleChange} value={this.state.bank_name} type="text" className={`font-weight-bold ${form.field_light}`}>
                                    <option>Maybank</option>
                                    <option>Public Bank</option>
                                    <option>AmBank</option>
                                    <option>BSN</option>
                                    <option>Bank Rakyat</option>
                                    <option>Bank Muamalat</option>
                                    <option>OCBC Bank</option>
                                    <option>HSBC Bank</option>
                                </select>
                            </div>
                            <div className="col-md-8 px-2">
                                <label>Account Number</label>
                                <input name="bank_account_number" onChange={this.handleChange} value={this.state.bank_account_number} type="number" className={form.field_light} required/>
                            </div>
                        </div>
                    </div>
                </div> : <div className="col-lg-8 d-flex justify-content-center p-5"><Spinner animation="border" size='lg'/></div>}
                {this.state.edit_mode ? <div className="col-lg-4 d-flex align-items-start">
                    <div className={`${styles.table} ${styles.submitdiv}`}>
                        {this.state.isloaded ? <input className={styles.tbtn} type="submit" value="Update Member"/> : <button className={styles.tbtn} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                        <Link href={{ pathname: '/admin/members', query: { tab: 'list' }}}><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard Changes</a></Link>
                    </div>
                </div> 
                :
                <div className="col-lg-4 d-flex align-items-start">
                    <div className={`${styles.table} ${styles.submitdiv}`}>
                        <div className={`font-weight-bold mb-2 ${utils.hightext_md}`}>View Mode</div>
                        {(authorized || myself) && <div onClick={() => {this.setState({ isloaded: false });setTimeout(() => this.setState({ edit_mode: true, isloaded: true }), 500)}} className={`w-100 text-center ${styles.tbtn}`} style={{ cursor: 'pointer' }}>Edit</div>}
                        <Link href={{ pathname: '/admin/members', query: { tab: 'list' }}}><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> {(authorized || myself) ? 'Discard Changes' : 'Go Back'}</a></Link>
                    </div>
                </div>}
            </form> : <div className="p-5 text-center">You are Not Authorized to View this Page</div>}
            <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="md" aria-labelledby="confirm-log-out" centered>
                <Modal.Header>
                    <div className={utils.modal_header}>Change Password</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center">
                        {this.state.perror && <div className={`w-100 mb-4 ${form.notice_error}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.nexcl}>!</span> 
                                {(this.state.perr_msg.error && typeof this.state.perr_msg.error === 'string') && <div>{this.state.perr_msg.error}</div>}
                                {(this.state.perr_msg.error && typeof this.state.perr_msg.error === 'object') && <ul className="m-0 pl-4">
                                    {Object.keys(this.state.perr_msg.error).map(key =>
                                        <li value={key} key={key}>{`${key}: ${this.state.perr_msg.error[key][0]}`}</li>
                                    )}
                                </ul>}
                            </div> 
                            <div onClick={() => this.setState({ perror: false })} className={`col-2 ${form.nclose}`}>Close</div>
                        </div>}
                        {this.state.psuccess && <div className={`w-100 mb-4 ${form.notice_success}`}>
                            <div className="col-10 d-flex align-items-center">
                                <span className={form.sexcl}>✓</span> 
                                <div>{this.state.pscs_msg.success}</div>
                            </div> 
                            <div onClick={() => this.setState({ psuccess: false })} className={`col-2 ${form.sclose}`}>Close</div>
                        </div>}
                        <div className="w-100 mb-4">
                            <label>New Passwords</label>
                            <div className="position-relative">
                                <input name="new_password" onChange={this.handleChange} type={this.state.ptype} className={form.field_light} required/>
                                <div className="position-absolute" onClick={() => this.showHide('ptype')} style={{ top: 7, right: 20, cursor: 'pointer', userSelect: 'none', fontSize: '1.5rem' }}>
                                    {this.state.ptype === 'text' ? <IoMdEyeOff/> : <IoMdEye/>}
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mb-4">
                            <label>Confirm Passwords</label>
                            <div className="position-relative">
                                <input name="confirm_password" onChange={this.handleChange} type={this.state.ctype} className={form.field_light} required/>
                                <div className="position-absolute" onClick={() => this.showHide('ctype')} style={{ top: 7, right: 20, cursor: 'pointer', userSelect: 'none', fontSize: '1.5rem' }}>
                                    {this.state.ctype === 'text' ? <IoMdEyeOff/> : <IoMdEye/>}
                                </div>
                            </div>
                        </div>
                        {this.state.pisloaded ? <button onClick={this.changePassword} className={`w-100 ${styles.tbtn}`}>Confirm</button>  : <button className={`w-100 ${styles.tbtn}`} disabled><Spinner animation="border" size='sm'/></button>}
                        <button onClick={() => this.setState({ show: false })} className={`w-100 ${styles.tbtn_reverse_borderless}`}><MdCancel/> Go Back</button>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
        )
    }
}

export default Editmemb;