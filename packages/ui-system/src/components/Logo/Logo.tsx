import Link from 'next/link'
import logo from '../../assets/images/logo.png'
import { AppRoutes } from '../../utils/routes'
import styles from './Logo.module.scss'

export const Logo = () => {
  return (
    <Link href={AppRoutes.home} className={styles.logo}>
      <img src={logo.src} alt="Logo" />
      <div className={styles.title}>Good Dev Hunting</div>
    </Link>
  )
}
