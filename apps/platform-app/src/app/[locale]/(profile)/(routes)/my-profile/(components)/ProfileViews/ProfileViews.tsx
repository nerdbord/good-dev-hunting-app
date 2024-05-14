import ViewIcon from '@/assets/icons/ViewIcon'
import { I18nNamespaces } from '@/i18n'

import { useTranslations } from 'next-intl'
import styles from './ProfileViews.module.scss'

const ProfileViews = ({ viewCount }: { viewCount: number }) => {
  const t = useTranslations(I18nNamespaces.Index)
  return (
    <div className={styles.profileViewsContainer}>
      <div className={styles.profileViews}>
        <ViewIcon />
        {t('profileViews')} <span>{viewCount}</span>
      </div>
    </div>
  )
}

export default ProfileViews
