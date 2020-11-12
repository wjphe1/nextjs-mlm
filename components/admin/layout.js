import styles from '../../styles/module/layout.module.scss'
import Link from 'next/link'
import cn from 'classnames'
import { AuthProvider, ProtectRoute } from './auth/auth'

export const siteTitle = 'REEZQA GLOBAL'

export default function Layout({ children, page, name }) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <div className="main-container">
                    <nav class="navbar navbar-light bg-light">
                        <a class="navbar-brand" href="#">Navbar</a>
                    </nav>

                    <main className={styles.container}>{children}</main>
                </div>
            </ProtectRoute>
        </AuthProvider>
    )
}