import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { I18nNamespaces } from '@/i18n'
import { getTranslations } from 'next-intl/server'
import styles from './VisitorBanner.module.scss'

const VisitorBanner = async () => {
  const t = await getTranslations(I18nNamespaces.Index)
  const { user } = await getAuthorizedUser()
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <span>{t('visitorBaner')} </span>
      </div>
    )
  } else {
    return null
  }
}

export default VisitorBanner
