import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { JobApplicationChat } from '../../../(components)/JobApplicationChat/JobApplicationChat'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { ChatBotProvider } from './utils/ChatBotContext'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.AddJobPage)

  return (
    <>
      <JobsHeader logoWithTagLine={false} />
      <ChatBotProvider>
        <main>
          <Container>
            <AddJobTopBar header={t('header')} description={t('description')} />
            <JobApplicationChat />
          </Container>
        </main>
      </ChatBotProvider>
    </>
  )
}

export default NewJobPage
