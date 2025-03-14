import { ReviewCard } from '@/components/hunter-landing/UI/ReviewCard/ReviewCard'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './HunterReviews.module.scss'
import { reviews } from './reviews'

export const HunterReviews: React.FC = () => {
  const t = useTranslations(I18nNamespaces.HunterReviews)
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t('opinions')}</p>
      <div className={styles.reviewBox}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  )
}
