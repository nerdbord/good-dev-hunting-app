import { ReviewCard } from '@/components/hunter-landing/UI/ReviewCard/ReviewCard'
import styles from './HunterReviews.module.scss'
import { reviews } from './reviews'

export const HunterReviews: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Opinie zleceniodawców</p>
      <div className={styles.reviewBox}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  )
}
