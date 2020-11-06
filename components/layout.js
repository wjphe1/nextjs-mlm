import styles from '../styles/module/layout.module.scss'
import util from '../styles/module/utils.module.scss'
import Meta from './_meta'
import Link from 'next/link'
import { HiOutlineShoppingCart, HiOutlineUser, HiOutlineSearch } from 'react-icons/hi';

export const siteTitle = 'REEZQA GLOBAL'

export default function Layout({ children, home, name }) {
    return (
        <div>
            <Meta/>

            <header className={styles.header}>
                <div className={`${styles.container} ${styles.flexcontent}`}>
                    <Link href="/"><a className={util.siteheader}>{name}</a></Link>
                    <form className="position-relative">
                        <input type="text" placeholder="Search product here" className={styles.search}/>
                        <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <div className="d-flex">
                        <div className="d-flex align-items-center"><HiOutlineUser/> <span className="pl-2">MEMBERS LOGIN</span></div>
                        <span className="px-3">|</span>
                        <div className="d-flex align-items-center"><HiOutlineShoppingCart/> <span className="pl-2">MY CARTS</span></div>
                    </div>
                </div>
            </header>
            <nav className={styles.topnav}>
                <div className={`${styles.container} ${styles.flexcontent}`}>
                    <Link href="/"><a className={styles.active}>FACEBOOK</a></Link>
                    <Link href="/"><a>KEAHLIAN REEZQA</a></Link>
                    <Link href="/"><a>KEAHLIAN REEZQA</a></Link>
                    <Link href="/"><a>VIDEO TESTIMONI</a></Link>
                    <Link href="/"><a>TESTIMONI</a></Link>
                    <Link href="/"><a>JUS SAKURA REEZQA</a></Link>
                    <Link href="/"><a>STOKIS REEZQA</a></Link>
                </div>
            </nav>

            <main className={styles.container}>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}