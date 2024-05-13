import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { getTranslations } from 'next-intl/server'
import styles from './VisitorBanner.module.scss'
const VisitorBanner = async () => {
  const t = await getTranslations('Index')
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
