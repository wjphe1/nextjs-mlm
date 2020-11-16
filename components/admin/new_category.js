import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md';

class Newcate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <section className="py-5 px-4">
        <div className="row m-0">
          <div className={`${styles.table} col-md-8 mb-4 p-0`}>
            <div className="d-flex align-items-center p-4 border-bottom">
              <div className={styles.thead}>Product Category</div>
            </div>
            <div className="p-4">
              <div className="pb-3">Category Name</div>
              <input type="text" placeholder="E.g.: Skin Care Beauty" className={form.field_light} style={{ maxWidth: 400 }}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`d-flex flex-column align-items-center p-4 ${styles.table}`}>
              <button className={styles.tbtn}>Create Category</button>
              <Link href={{ pathname: '/admin/products', query: { tab: 'category' } }}><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Newcate;