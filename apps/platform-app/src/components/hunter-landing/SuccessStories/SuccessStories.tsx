import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './SuccessStories.module.scss'

const SuccessStories = async () => {
  const t = await getTranslations(I18nNamespaces.Hunter)

  const stories = [
    {
      quote: t('story1Quote'),
      author: t('story1Author'),
      role: t('story1Role'),
    },
    {
      quote: t('story2Quote'),
      author: t('story2Author'),
      role: t('story2Role'),
    },
  ]

  return (
    <section id="success-stories" className={styles.wrapper}>
      <h2>{t('successStories')}</h2>
      <div className={styles.stories}>
        {stories.map((story, index) => (
          <div key={index} className={styles.story}>
            <blockquote>{story.quote}</blockquote>
            <div className={styles.author}>
              <strong>{story.author}</strong>
              <span>{story.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SuccessStories
