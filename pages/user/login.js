import React from 'react'
import styles from '../../styles/module/form.module.scss'
import Layout from '../../components/layout'

class Userlog extends React.Component {

  render () {
    return (
      <Layout page={'login'} {...this.props}>
        <div className={styles.bg} style={{ minHeight: '80vh' }}>
            <form className={styles.main}>
                <h3 className="text-center pb-4"><b>Login</b></h3>
                <input name="id" placeholder="User ID" className={styles.field} />
                <input type="password" placeholder="Password" className={styles.field} />
                <div className="d-flex align-items-center pb-4">
                    <input type="checkbox"/><span className="ml-3">Remember me</span>
                </div>
                <div className="d-flex justify-content-center"><input type="submit" value="Log in" className={styles.submit} /></div>
            </form>
        </div>
      </Layout>
    )
  }
}

export default Userlog;