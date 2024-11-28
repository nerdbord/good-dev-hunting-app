'use client'

import PostJobBtn from '@/app/[locale]/(jobs)/(components)/PostJobBtn/PostJobBtn'
import { Logo } from '@gdh/ui-system'
import { usePathname } from 'next/navigation'
import styles from './HunterHeader.module.scss'

const HunterHeader = () => {
  const pathname = usePathname()
  const isJobsPostPath = pathname?.includes('/jobs/add')

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.actions}>{!isJobsPostPath && <PostJobBtn />}</div>
    </header>
  )
}

export default HunterHeader
