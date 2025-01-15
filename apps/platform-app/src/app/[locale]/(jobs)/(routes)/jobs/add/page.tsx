// import { I18nNamespaces } from '@/i18n/request'
// import { getTranslations } from 'next-intl/server'

import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { JobApplicationChat } from '../../../(components)/JobApplicationChat/JobApplicationChat'
import { ChatBotProvider } from './ChatBotContext'
import styles from './page.module.scss'

const NewJobPage = async () => {
  // const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <ChatBotProvider>
      <div className={styles.wrapper}>
        <AddJobTopBar />
        <JobApplicationChat />
      </div>
    </ChatBotProvider>
  )
}

export default NewJobPage
