import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from '../../../../../page.module.scss'
import { ChatUi } from './ChatUi'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{t('postJobTitle')}</h1>
      </div>
      <ChatUi />
    </div>
  )
}

export default NewJobPage
