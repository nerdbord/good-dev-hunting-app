import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { JobApplicationChat } from '../../../(components)/JobApplicationChat/JobApplicationChat'
import { ChatBotProvider } from './utils/ChatBotContext'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.AddJobPage)

  return (
    <ChatBotProvider>
      <AddJobTopBar header={t('header')} description={t('description')} />
      <JobApplicationChat />
    </ChatBotProvider>
  )
}

export default NewJobPage
