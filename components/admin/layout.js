import React, { useState } from 'react';
import styles from '../../styles/module/admin/layout.module.scss'
import Link from 'next/link'
import cn from 'classnames'
import { AuthProvider, ProtectRoute } from './auth/auth'
import { HiMenu, HiUserGroup } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { RiPieChart2Fill, RiShoppingBagFill } from 'react-icons/ri'

export const siteTitle = 'REEZQA GLOBAL'

/* <AuthProvider>
    <ProtectRoute>
    </ProtectRoute>
</AuthProvider> */

export default function Layout({ children, page, name }) {

    const [show, setShow] = useState(false);

    return (
        
        <div className={styles.main}>
            <nav className={styles.navbar}>
                <button onClick={() => setShow(!show)} className={styles.burger}><HiMenu/></button>
                <Link href="/admin"><a className={styles.brand}>REEZQA GLOBAL</a></Link>
                <button className={styles.user}><FaUserAlt/></button>
                <div className={styles.brand}>Admin</div>
            </nav>
            <div className={`${cn({[styles.expand]: show})} ${styles.sidebar}`}>
                <Link href="/admin"><a><div className={`${cn({[styles.ractive]: page === 'reports'})} ${styles.sidenav}`}><div className={styles.rc}><RiPieChart2Fill/></div><span>Reports</span></div></a></Link>
                <Link href="/admin/products"><a><div className={`${cn({[styles.pactive]: page === 'products'})} ${styles.sidenav}`}><div className={styles.pc}><RiShoppingBagFill/></div><span>Products</span></div></a></Link>
                <Link href="/admin/users"><a><div className={`${cn({[styles.uactive]: page === 'users'})} ${styles.sidenav}`}><div className={styles.uc}><HiUserGroup/></div><span>Users</span></div></a></Link>
            </div>
            <main className={styles.container}>{children}</main>
        </div>
    )
}