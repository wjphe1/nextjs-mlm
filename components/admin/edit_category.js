import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import api from '../auth/api'
import routes from '../auth/routes'
import Spinner from 'react-bootstrap/Spinner'


class Editcate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: true,
      error: false,
      err_msg: '',
      category: '',
      page_error: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getCate = () => {
    api.get(routes.categories + '/' + this.props.cid)
      .then(res => {
        const row = res.data.category
        if (row.id) {
          this.setState({
            category: row.name
          })
        } else {
          this.setState({ page_error: true })
        }
    })
    .catch(err => {
        this.setState({ page_error: true })
    })
  }

  submitCate = (e) => {
    e.preventDefault();
    let vm = this;
    vm.setState({ error: false, isloaded: false })
    api.put(routes.categories + '/' + this.props.cid, { category: { name: this.state.category } })
    .then(res => {
      //console.log(res)
      Router.push({
        pathname: '/admin/products',
        query: { editcate: true, tab: 'category' },
      })
    })
    .catch(err => {
      //console.log(err.response.data)
      var msg = { error: err.response.status + ' : ' + err.response.statusText };
      if (err.response.data) { msg = err.response.data };
      setTimeout(() => {vm.setState({ err_msg: msg, isloaded: true, error: true })}, 100)
    })
  }

  
  componentDidMount() {
    this.getCate();
  }

  render () {
    return (
      <section className="py-5 px-4">
        {!this.state.page_error ? <form onSubmit={this.submitCate} className="row m-0">
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
          <div className={`${styles.table} col-lg-8 mb-4 p-0`}>
            <div className="d-flex align-items-center p-4 border-bottom">
              <div className={styles.thead}>Product Category</div>
            </div>
            <div className="p-4">
              <div className="pb-3">Category Name</div>
              <input type="text" value={this.state.category} name="category" onChange={this.handleChange} placeholder="E.g.: Skin Care Beauty" className={form.field_light} style={{ maxWidth: 400 }}/>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-start">
            <div className={`${styles.table} ${styles.submitdiv}`}>
              {this.state.isloaded ? <input className={styles.tbtn} type="submit" value="Update Category"/> : <button className={styles.tbtn} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
              <Link href={{ pathname: '/admin/products', query: { tab: 'category' } }}><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
            </div>
          </div>
        </form> : <div className="p-5 text-center">You are Not Authorized to View this Page</div>}
      </section>
    )
  }
}

export default Editcate;