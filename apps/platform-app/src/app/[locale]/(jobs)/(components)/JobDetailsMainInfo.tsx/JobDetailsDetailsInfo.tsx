"use client"
import { MarkdownReader } from '@/components/MarkdownReader/MarkdownReader';
import styles from './JobDetailsDetailsInfo.module.scss';
import { mockJobDetails } from '../../mockData';

import { I18nNamespaces } from '@/i18n/request';
import { useTranslations } from 'next-intl';


export const JobDetailsDetailsInfo = () => {
    const t = useTranslations(I18nNamespaces.Jobs)
    const tt = useTranslations(I18nNamespaces.WorkInformation)
    const sortedTechStack =
    mockJobDetails.techStack.sort((a, b) => a.name.localeCompare(b.name)) || []

    

  return (
    <>
      <section className={styles.container}>
        {/* <div className={styles.mobileView}>
        <ul className={styles.actions}>
        <li>
          <Button variant="primary" onClick={handleEdit}>
            {tButtons('edit')}
          </Button>
        </li>
        <li>
          <Button variant="secondary" onClick={handleDelete}>
            {tButtons('deleteJob')}
          </Button>
        </li>
      </ul>
        </div>{' '} */}
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>{tt('techstack')}</p>
            <div className={styles.techStackList}>
              {sortedTechStack.map((item, index) => (
                <p key={index} className={styles.techStackItem}>
                  {item.name}
                </p>
              ))}
            </div>
            
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{t('brief')}</p>
          <MarkdownReader
            text={mockJobDetails.projectBrief|| 'This user has not written a brief yet.'}
          />
        </div>
      </section>
    </>
  )
}
