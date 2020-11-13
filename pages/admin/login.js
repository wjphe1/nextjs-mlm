import React from 'react'
import styles from '../../styles/module/form.module.scss'

class Adminlog extends React.Component {

  render () {
    return (
        <div className={styles.bg}>
            <form className={styles.main}>
                <h3 className="text-center pb-4"><b>Admin Login</b></h3>
                <input name="id" placeholder="User ID" className={styles.field} />
                <input type="password" placeholder="Password" className={styles.field} />
                <div className="d-flex align-items-center pb-4">
                    <input type="checkbox"/><span className="ml-3">Remember me</span>
                </div>
                <div className="d-flex justify-content-center"><input type="submit" value="Log in" className={styles.submit} /></div>
            </form>
        </div>
    )
  }
}

export default Adminlog;