import React, { useState } from 'react'
import Router from 'next/router'
import styles from '../../styles/module/admin/layout.module.scss'
import astyl from '../../styles/module/admin/admin.module.scss'
import api from '../auth/api'
import routes from '../auth/routes'
import Link from 'next/link'
import cn from 'classnames'
import Cookies from 'js-cookie'
import Modal from 'react-bootstrap/Modal'
import { AuthProvider, ProtectRoute } from '../auth/auth'
import { HiMenu, HiUserGroup } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { RiPieChart2Fill, RiShoppingBagFill, RiLogoutCircleRLine } from 'react-icons/ri'
import { MdCancel } from 'react-icons/md'

export const siteTitle = 'REEZQA GLOBAL'

export default function Layout({ children, page, name }) {

    const [show, setShow] = useState(false);
    const [log, setLog] = useState(false);

    var user = {};
    if (Cookies.get('user')) {
        user = JSON.parse(Cookies.get('user'));
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        delete api.defaults.headers.Authorization;
        api.delete(routes.sign_out);
        Router.reload();
    }

    return (
        <AuthProvider>
            <ProtectRoute>
                <div className={styles.main}>
                    <nav className={styles.navbar}>
                        <button onClick={() => setShow(!show)} className={styles.burger}><HiMenu/></button>
                        <Link href="/admin"><a className={styles.brand}>REEZQA GLOBAL</a></Link>
                        <button className={styles.user}><FaUserAlt/></button>
                        <div className={styles.brand}>{user.full_name}</div>
                        <button onClick={() => setLog(true)} className={styles.logout_btn}><RiLogoutCircleRLine/></button>
                    </nav>
                    <div className={`${cn({[styles.expand]: show})} ${styles.sidebar}`}>
                        <Link href="/admin"><a><div className={`${cn({[styles.ractive]: page === 'reports'})} ${styles.sidenav}`}><div className={styles.rc}><RiPieChart2Fill/></div><span>Reports</span></div></a></Link>
                        <Link href="/admin/products"><a><div className={`${cn({[styles.pactive]: page === 'products'})} ${styles.sidenav}`}><div className={styles.pc}><RiShoppingBagFill/></div><span>Products</span></div></a></Link>
                        <Link href="/admin/users"><a><div className={`${cn({[styles.uactive]: page === 'users'})} ${styles.sidenav}`}><div className={styles.uc}><HiUserGroup/></div><span>Users</span></div></a></Link>
                    </div>
                    <main className={styles.container}>{children}</main>
                </div>
                <Modal show={log} onHide={() => setLog(false)} size="sm" aria-labelledby="confirm-log-out" centered>
                    <Modal.Body>
                        <div className="font-weight-bold pb-4 text-center">Confirm Log Out?</div>
                        <div className="d-flex flex-column align-items-center" style={{fontSize: '1.2rem'}}>
                            <button onClick={logout} className={`w-100 ${astyl.tbtn}`}>Confirm</button>
                            <button onClick={() => setLog(false)} className={`w-100 ${astyl.tbtn_reverse_borderless}`}><MdCancel/> Go Back</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </ProtectRoute>
        </AuthProvider>
    )
}