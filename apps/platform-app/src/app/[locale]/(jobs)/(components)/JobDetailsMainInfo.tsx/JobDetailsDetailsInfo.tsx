'use client'
import { MarkdownReader } from '@/components/MarkdownReader/MarkdownReader'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { type JobModel } from '../../_models/job.model'
import styles from './JobDetailsDetailsInfo.module.scss'

interface JobDetailsDetailsInfoProps {
  job: JobModel
}

export const JobDetailsDetailsInfo = ({ job }: JobDetailsDetailsInfoProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const tt = useTranslations(I18nNamespaces.WorkInformation)

  const sortedTechStack = [...job.techStack].sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  return (
    <>
      <section className={styles.container}>
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>{tt('techstack')}</p>
            <div className={styles.techStackList}>
              {sortedTechStack.length > 0 ? (
                sortedTechStack.map((item, index) => (
                  <p key={index} className={styles.techStackItem}>
                    {item.name}
                  </p>
                ))
              ) : (
                <p className={styles.noTech}>No technologies specified</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{t('brief')}</p>
          <MarkdownReader
            text={job.projectBrief || 'This job does not have a brief yet.'}
          />
        </div>
      </section>
    </>
  )
}
