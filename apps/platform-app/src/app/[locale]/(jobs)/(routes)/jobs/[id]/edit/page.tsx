import { AddJobTopBar } from '@/app/[locale]/(jobs)/(components)/AddJobTopBar/AddJobTopBar'
import { CreateJobDetailsForm } from '@/app/[locale]/(jobs)/(components)/CreateJobDetailsForm/CreateJobDetailsForm'
import { JobsHeader } from '@/app/[locale]/(jobs)/(components)/JobsHeader/JobsHeader'
import { mockJobDetails } from '@/app/[locale]/(jobs)/mockData'
import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'

export default async function EditJobDetailsPage() {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <JobsHeader />
      <main>
        <Container>
          <AddJobTopBar
            header={t('jobEditHeader')}
            description={t('jobEditSubHeader')}
          />
          <CreateJobDetailsForm initialValues={mockJobDetails} />
        </Container>
      </main>
    </>
  )
}
