import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './CreateJobHeader.module.scss'

interface CreateJobHeaderProps {
  params?: {
    id: string
  }
}

export const CreateJobHeader = async ({ params }: CreateJobHeaderProps) => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <div className={styles.header}>
        <h1>{t('jobPreview')}</h1>
      </div>
      <p>Job ID: {params.id}</p>
    </>
  )
}
