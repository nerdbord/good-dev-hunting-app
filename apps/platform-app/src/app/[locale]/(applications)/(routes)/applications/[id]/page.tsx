import Header from '@/app/[locale]/(profile)/(components)/Header/Header'
import { I18nNamespaces } from '@/i18n/request'
import { Container } from '@gdh/ui-system'
import { getTranslations } from 'next-intl/server'
import ApplicationDetails from '../../../(components)/ApplicationDetails'

interface ApplicationPageProps {
  params: {
    id: string
  }
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const t = await getTranslations(I18nNamespaces.Applications)

  return (
    <>
      <Header buttonsVariant="profiles" />
      <Container>
        {/* <div className={styles.header}>
          <h1>{t('applicationDetails')}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.applicationInfo}>
            <h2>{t('applicantInfo')}</h2>
            <p>Application ID: {params.id}</p>
            <ProfileMain profileId={'a17a0eed-fe07-4551-b7fc-a7b8212fd3ae'} />
            <ProfileDetails
              profileId={'a17a0eed-fe07-4551-b7fc-a7b8212fd3ae'}
            />
          </div>
          <div className={styles.actions}>
            <h2>{t('actions')}</h2>
            <ActionButtons />
            <ApplicationDetails />
            </div>
            </div> */}
        <ApplicationDetails />
      </Container>
    </>
  )
}

export default ApplicationPage
