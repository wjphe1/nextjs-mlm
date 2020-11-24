import React from 'react'
import Router from 'next/router'
import styles from '../../styles/module/form.module.scss'
import Cookies from 'js-cookie'
import api from '../auth/api'
import routes from '../auth/routes'
import Spinner from 'react-bootstrap/Spinner'

class Adminlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isloaded: true,
      error: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login = (e) => {
    e.preventDefault();
    this.setState({ isloaded: false })
    const u = this.state.username;
    const p = this.state.password;
    api.post(routes.sign_in, {sign_in: {username: u, password: p} })
    .then(res => {
      if (res.headers.authorization) {
        const token = res.headers.authorization;
        Cookies.set('token', token, { expires: 7 }); // 7 days expiry
        api.defaults.headers.Authorization = token;
        //console.log(api.defaults.headers.Authorization)
      }
      if (res.data.user) {
        Cookies.set('user', res.data.user)
        //console.log(JSON.parse(Cookies.get('user')))
      }
      Router.reload();
    })
    .catch(error => {
      console.log(error.response)
      this.setState({ isloaded: true, error: true })
    })
  }

  render () {
    return (
        <div className={styles.bg}>
            <form onSubmit={this.login} className={styles.main}>
                <h3 className="text-center pb-4"><b>Login</b></h3>
                {this.state.error && <div className={`mb-4 ${styles.notice_error}`}><div className="col-10 d-flex align-items-center"><span className={styles.nexcl}>!</span> Error - Wrong Username or Password</div> <div onClick={() => this.setState({ error: false })} className={`col-2 ${styles.nclose}`}>Close</div></div>}
                <input name="username" placeholder="Username" className={styles.field} onChange={this.handleChange} required />
                <input name="password" type="password" placeholder="Password" className={styles.field} onChange={this.handleChange} required/>
                {/* <div className="d-flex align-items-center">
                    <input type="checkbox"/><span className="ml-3">Remember me</span>
                </div> */}
                <div className="pt-4 d-flex justify-content-center">
                  {this.state.isloaded ? <input type="submit" value="Log in" className={styles.submit} /> : <div className={styles.submit}><Spinner animation="border" variant="light" size='sm'/></div>}
                </div>
            </form>
        </div>
    )
  }
}

export default Adminlog;