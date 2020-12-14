import Link from 'next/link'
import React from 'react'
import api from '../auth/api'
import routes from '../auth/routes'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import utils from '../../styles/module/utils.module.scss'
import Spinner from 'react-bootstrap/Spinner'

class Referral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            error: false,
            success: false,
            msg: '',
            one: '',
            two: '',
            three: '',
            four: '',

        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    postSettings = () => {
        this.setState({ error: false, success: false })
        if (!this.state.one && !this.state.two && !this.state.three && !this.state.four) {
            const msg = { error: 'Please fill in all the settings' }
            this.setState({ error: true, err_msg: msg })
        } else {
            this.setState({ isloaded: false })
            const data = { setting: {
                new_member_level1_ecash_reward: this.state.one, 
                new_member_level2_ecash_reward: this.state.two,
                new_member_level3_ecash_reward: this.state.three, 
                new_member_level4_ecash_reward: this.state.four,
            }}

            api.post(routes.settings, data)
                .then(res => {
                    this.setState({ success: true, isloaded: true })
                })
                .catch(err => {
                    console.log(err.response)
                    var msg = { error: err.response.status + ' : ' + err.response.statusText };
                    if (err.response.data) { msg = err.response.data };
                    this.setState({ err_msg: msg, isloaded: true, error: true })
                })
        }
    }

    getSettings = () => {
        api.get(routes.settings)
        .then(res => {
            const rows = res.data.settings
            this.setState({
                one: rows.new_member_level1_ecash_reward.toString(),
                two: rows.new_member_level2_ecash_reward.toString(),
                three: rows.new_member_level3_ecash_reward.toString(), 
                four: rows.new_member_level4_ecash_reward.toString(),
                isloaded: true,
            })
        })
        .catch(err => {
            console.log(err.response)
            var msg = { error: err.response.status + ' : ' + err.response.statusText };
            if (err.response.data) { msg = err.response.data };
            this.setState({ err_msg: msg, isloaded: true, error: true })
        })
    }

    componentDidMount = () => {
        this.getSettings();
    }

    render () {
        return (
            <div className={`border-top ${styles.table}`}>
            {this.state.error && <div className={`mx-5 my-4 ${form.notice_error}`}>
                <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span> 
                    {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                    {(this.state.err_msg.error && typeof this.state.err_msg.error === 'object') && <ul className="m-0 pl-4">
                    {Object.keys(this.state.err_msg.error).map(key =>
                        <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                    )}
                    </ul>}
                </div> 
                <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.success && <div className={`mx-5 my-4 ${form.notice_success}`}>
                <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span> 
                    <div><b>Success -</b> Updated settings successfully</div>
                </div> 
                <div onClick={() => this.setState({ success: false })} className={`col-2 ${form.sclose}`}>Close</div>
            </div>}
                <div className={`${form.notice_warning} mx-5 mt-4`}><span>For Product E-cash Settings, please go to <Link href="/admin/products"><a style={{fontWeight: 'bold', color: '#FF6202', whiteSpace: 'nowrap'}}>product tab</a></Link> and set the new e-cash earned value for each product.</span></div>
                <div className={`px-5 pt-4 ${utils.text_lg}`}>New Member Acquisition</div>
                {this.state.isloaded ? <div className="row m-0 py-3 px-5 flex-nowrap" style={{ maxWidth: 600 }}>
                    <div className="col-3 pl-4 pr-0">
                        <div className="py-2">Level</div>
                        <div className={styles.level}>1</div>
                        <div className={styles.level}>2</div>
                        <div className={styles.level}>3</div>
                        <div className={styles.level}>4</div>
                    </div>
                    <div className="col-9 pr-4">
                        <div className="py-2 text-nowrap">E-Cash Earned</div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15" value={this.state.one} name="one" onChange={this.handleChange}/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 10" value={this.state.two} name="two" onChange={this.handleChange}/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 5" value={this.state.three} name="three" onChange={this.handleChange}/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 3" value={this.state.four} name="four" onChange={this.handleChange}/></div>
                        </div>
                    </div>
                </div> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}    
                {this.state.isloaded ? <button onClick={this.postSettings} className={`px-5 mx-5 mb-5 ${styles.tbtn}`}>Update</button> : <button className={`px-5 mx-5 mb-5 ${styles.tbtn}`} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
            </div>
        )
    }
}

export default Referral;