import styles from './layout.module.scss'
import Meta from './_meta'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import cn from 'classnames'

export const siteTitle = 'PYG Tech App'
const type = 'success'

export default function Layout({ children, home, name }) {
    return (
        <div className={styles.container}>
            <Meta/>

            <header className={styles.header}>
                <Link href="/">
                    <a><img src="/images/profile.jpg" className={`${styles.headerImage} ${utilStyles.borderCircle}`} alt={name} /></a>
                </Link>
                <h2 className={`${utilStyles.headingLg} ${cn({ // consitional classnames
                    [utilStyles.success]: type === 'success',
                    [utilStyles.error]: type === 'error'
                })}`}>
                    <Link href="/"><a className={utilStyles.colorInherit}>{name}</a></Link>
                </h2>
            </header>
            <main>{children}</main>
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