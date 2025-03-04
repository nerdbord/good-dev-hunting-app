'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './InboxButton.module.scss'

const InboxButton = () => {
  const t = useTranslations('Inbox')
  const pathname = usePathname()

  // Don't render the button if we're already on the inbox page
  if (pathname.includes(AppRoutes.inbox)) {
    return null
  }

  return (
    <Link href={AppRoutes.inbox} className={styles.inboxButton}>
      <Button variant="primary">{t('inbox')}</Button>
    </Link>
  )
}

export default InboxButton
