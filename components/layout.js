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
                        <Link href="#"><a className="d-flex align-items-center"><HiOutlineUser/> <span className="pl-2">MEMBERS LOGIN</span></a></Link>
                        <span className="px-3">|</span>
                        <Link href="#"><a className="d-flex align-items-center"><HiOutlineShoppingCart/> <span className="pl-2">MY CARTS</span></a></Link>
                    </div>
                </div>
            </header>
            <nav className={`${styles.topnav} h-scroll`} style={{overflowX: 'auto', overflowY: 'hidden'}}>
                <div className={`${styles.container} ${styles.flexcontent} w-100`}>
                    <Link href="/"><a className={styles.active}>REEZQA STORE</a></Link>
                    <Link href="/"><a>KEAHLIAN REEZQA</a></Link>
                    <Link href="/"><a>FACEBOOK</a></Link>
                    <Link href="/"><a>VIDEO TESTIMONI</a></Link>
                    <Link href="/"><a>TESTIMONI</a></Link>
                    <Link href="/"><a>STOKIS REEZQA</a></Link>
                </div>
            </nav>

            <main className={styles.container}>{children}</main>

            <div className={styles.footer}>
                <div className={`${styles.container} row m-auto py-3`}>
                    <div className="px-3 d-flex flex-column">
                        <Link href="#"><a className={styles.foot_btn}>BANTUAN (Hubungi Kami)</a></Link>
                        <Link href="#"><a className={styles.foot_btn}>FAQ (Tanya Jawab)</a></Link>
                        <Link href="#"><a className={styles.foot_btn}>FEATURE DI TV1</a></Link>
                        <Link href="#"><a className={styles.foot_btn}>SERTAI KAMI</a></Link>
                    </div>
                    <div className="px-5 d-flex flex-column">
                        <span className={styles.foot_link_header}>REEZQA GLOBAL</span>
                        <Link href="#"><a className={styles.foot_link}>KEAHLIAN REEZQA</a></Link>
                        <Link href="#"><a className={styles.foot_link}>FACEBOOK</a></Link>
                        <Link href="#"><a className={styles.foot_link}>STOKIS REEZQA</a></Link>
                        <span className="pb-4"></span>
                        <span className={styles.foot_link_header}>TESTIMONI</span>
                        <Link href="#"><a className={styles.foot_link}>PRODUK TESTIMONI</a></Link>
                        <Link href="#"><a className={styles.foot_link}>VIDEO TESTIMONI</a></Link>
                        <Link href="#"><a className={styles.foot_link}>JUS SAKURA REEZQA</a></Link>
                    </div>
                    <div className="px-3 d-flex flex-column">
                        <span className={styles.foot_link_header}>PRODUK</span>
                        <Link href="#"><a className={styles.foot_link}>B'COOL FUYOO</a></Link>
                        <Link href="#"><a className={styles.foot_link}>B'QUEENz MATTE</a></Link>
                        <Link href="#"><a className={styles.foot_link}>BB CREAM</a></Link>
                        <Link href="#"><a className={styles.foot_link}>JUS B KLEAR</a></Link>
                        <Link href="#"><a className={styles.foot_link}>JUS SAKURA</a></Link>
                        <Link href="#"><a className={styles.foot_link}>KOPI FUYOO</a></Link>
                        <Link href="#"><a className={styles.foot_link}>OXYGEN BUBBLE MASK</a></Link>
                        <Link href="#"><a className={styles.foot_link}>SABUN EMAS</a></Link>
                    </div>
                    <div className="ml-auto">
                        <Link href="#"><a className={styles.foot_login_btn}><HiOutlineUser/><span className="pl-2">MEMBERS LOGIN</span></a></Link>
                    </div>
                </div>
                <div className="border-top text-center pt-3">2020 HAK CIPTA TERPELIHARA <Link href="/"><a>REEZQA GLOBAL</a></Link></div>
            </div>
        </div>
    )
}