import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { AddJobChat } from '../../../(components)/AddJobChat/AddJobChat'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '../../../(components)/JobsTopBar/JobsTopBar'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <JobsHeader logoWithTagLine={true} />
      <main>
        <Container>
          <JobsTopBar
            header={t('addJobPageHeader')}
            subHeader={t('addJobPageSubHeader')}
          />
          <AddJobChat />
        </Container>
      </main>
    </>
  )
}

export default NewJobPage
