import { ThemeSwitcher } from '@/app/[locale]/(profile)/(components)/ThemeSwitcher/ThemeSwitcher'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button, Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { JobsHeader } from '../../../(components)/JobsHeader/JobsHeader'
import { JobsTopBar } from '../../../(components)/JobsTopBar/JobsTopBar'
import { MyJobsList } from '../../../(components)/MyJobsList/MyJobsList'
import { mockJobs } from './mockData'

const NewJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)
  const tButtons = await getTranslations(I18nNamespaces.Buttons)
  const jobs = [...mockJobs]

  const renderJobsCount = () => {
    if (jobs.length === 0) {
      return t('noJobs')
    }
    if (jobs.length === 1) {
      return `${jobs.length} ${t('job')}`
    }
    return `${jobs.length} ${t('jobs')}`
  }

  return (
    <>
      <JobsHeader logoWithTagLine={true} />
      <main>
        <ThemeSwitcher />
        <Container>
          <JobsTopBar header={t('myJobs')} subHeader={renderJobsCount()}>
            <Link href={AppRoutes.postJob}>
              <Button variant="primary">{tButtons('addJob')}</Button>
            </Link>
          </JobsTopBar>
          <MyJobsList jobs={jobs} />
        </Container>
      </main>
    </>
  )
}

export default NewJobPage
