import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import api from '../auth/api'
import routes from '../auth/routes'
import Spinner from 'react-bootstrap/Spinner'

class Newmemb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ptype: 'password',
            image: '',
            imgData: '',
            isloaded: true,
            error: false,
            err_msg: {},
            full_name: '',
            role: 'MASTER_STOKIS',
            ic: '',
            phone: '',
            username: '',
            password: '',
            email: '',
            upline_id: this.props.referral,
            street: '',
            city: '',
            state: '',
            postcode: '',
            bank_name: 'Maybank',
            bank_account_number: '',
        };
    }

    showHide = () => {
        const current = this.state.ptype;
        var result = 'text';
        if (current === 'text') { result = 'password'}
        this.setState({ ptype: result })
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
                imgData: reader.result
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
                profile_picture: this.state.imgData,
                role: this.state.role,
                ic_number: this.state.ic,
                username: this.state.username,
                password: this.state.password,
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
        api.post(routes.users, postdata)
            .then(res => {
                //console.log(res)
                Router.push({
                    pathname: '/admin/members',
                    query: { newuser: true, tab: 'list' },
                })
            })
            .catch(err => {
                console.log(err.response)
                var msg = err.response.status + ' : ' + err.response.statusText
                if (err.response.data) { msg = err.response.data }

                setTimeout(() => {this.setState({ err_msg: msg, isloaded: true, error: true })}, 100)
            })
    }

    render () {

        let $imagePreview = null;
        if (this.state.imgData) {
            $imagePreview = (<img src={this.state.imgData} className={form.img_preview}/>);
        } else {
            $imagePreview = null;
        }

        return (
        <section className="py-5 px-4">
            <form onSubmit={this.submitUser} className="row m-0">
                {this.state.isloaded ? <div className="col-lg-8 p-0">
                    {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
                        <div className="col-10 d-flex align-items-center">
                            <span className={form.nexcl}>!</span> 
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                                {Object.keys(this.state.err_msg.error).map(key =>
                                    <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                                )}
                            </ul>}
                            {!this.state.err_msg.error && typeof this.state.err_msg === 'string' && <div>{this.state.err_msg}</div>}
                        </div> 
                        <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                    </div>}
                    <div className={`${styles.table} mb-4 pb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom mb-4">
                            <div className={styles.thead}>New Member Details</div>
                        </div>
                        <div className="row m-0 px-3 pb-4">
                            <div className="col-md-6 px-2">
                                <label>Profile Photo</label>
                                <div className="d-flex align-items-center">
                                    {this.state.imgData ? $imagePreview :
                                    <label htmlFor="file-upload" className={form.field_file}>Upload your Photo here</label>}
                                    <input id="file-upload" name="prod_img" type="file" onChange={(e)=>this.imgChange(e)} className="d-none"/>
                                </div>
                            </div>
                            <div className="col-md-6 px-2 d-flex align-items-end">
                                {this.state.imgData && <button onClick={() => {this.setState({image: '', imgData: ''})}} className={form.remove_img_btn}><MdCancel/> Remove</button>}
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-4 px-2">
                                <label>Member Full Name</label>
                                <input name="full_name" onChange={this.handleChange} value={this.state.full_name} type="text" className={form.field_light} required/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Membership Level</label>
                                <select name="role" onChange={this.handleChange} type="text" className={form.field_light} value={this.state.role}>
                                    <option value="MASTER_STOKIS">Master Stokis</option>
                                    <option value="STOKIS">Stokis</option>
                                    <option value="AGENT">Agent</option>
                                </select>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>IC Number</label>
                                <input name="ic" onChange={this.handleChange} value={this.state.ic} type="text" className={form.field_light} required/>
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-6 px-2">
                                <label>Member Username</label>
                                <input name="username" onChange={this.handleChange} value={this.state.username} type="text" className={form.field_light} required/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Passwords</label>
                                <div className="position-relative">
                                    <input name="password" onChange={this.handleChange} type={this.state.ptype} className={form.field_light} required/>
                                    <div className="position-absolute" onClick={this.showHide} style={{ top: 7, right: 20, cursor: 'pointer', userSelect: 'none', fontSize: '1.5rem' }}>
                                        {this.state.ptype === 'text' ? <IoMdEyeOff/> : <IoMdEye/>}
                                    </div>
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
                                <label>Referral Member Username</label>
                                <input name="upline_id" onChange={this.handleChange} value={this.state.upline_id} type="text" className={form.field_light} placeholder="E.g. Member5758"/>
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
                <div className="col-lg-4 d-flex align-items-start">
                    <div className={`${styles.table} ${styles.submitdiv}`}>
                        {this.state.isloaded ? <input className={styles.tbtn} type="submit" value="Create Member"/> : <button className={styles.tbtn} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                        <Link href="/admin/members"><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
                    </div>
                </div>
            </form>
        </section>
        )
    }
}

export default Newmemb;