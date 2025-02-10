import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { AddJobChat } from '../../../(components)/AddJobChat/AddJobChat'
import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { ChatBotProvider } from './utils/AddJobChatContext'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <JobsHeader logoWithTagLine={true} />
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
