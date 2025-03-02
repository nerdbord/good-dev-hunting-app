import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import { AddJobTopBar } from '../../../(components)/AddJobTopBar/AddJobTopBar'
import JobDetails from '../../../(components)/JobDetailsPage/JobDetails'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
interface JobPageProps {
  params: {
    id: string
  }
}

const JobPage = async ({ params }: JobPageProps) => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <JobsHeader />
      <Container>
        <AddJobTopBar
          header={t('jobPreview')}
          subHeader={`Job ID: ${params.id}`}
        />
        <JobDetails params={{ id: params.id }} />
      </Container>
    </>
  )
}

export default JobPage
