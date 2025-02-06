import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { LogoGDH } from '@gdh/ui-system/icons'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import styles from './LogoWithTagline.module.scss'

export const LogoWithTagline = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  return (
    <Link href={AppRoutes.home} className={styles.container}>
      <div className={styles.logo}>
        <LogoGDH />
      </div>
      <span className={styles.tagLine}>{t('tagLine')}</span>
    </Link>
  )
}
