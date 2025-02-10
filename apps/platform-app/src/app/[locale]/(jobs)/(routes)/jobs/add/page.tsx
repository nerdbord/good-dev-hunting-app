import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { AddJobChat } from '../../../(components)/JobApplicationChat/AddJobChat'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { ChatBotProvider } from './utils/AddJobChatContext'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <JobsHeader logoWithTagLine={false} />
      <ChatBotProvider>
        <main>
          <Container>
            <AddJobTopBar
              header={t('addJobPageHeader')}
              subHeader={t('addJobPageSubHeader')}
            />
            <AddJobChat />
          </Container>
        </main>
      </ChatBotProvider>
    </>
  )
}

export default NewJobPage
