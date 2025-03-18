import { ReviewStar } from '@/components/icons/ReviewStar'
import Image, { type StaticImageData } from 'next/image'
import styles from './ReviewCard.module.scss'

interface Review {
  name: string
  role: string
  text: string
  stars: number
  image: StaticImageData
}

interface ReviewCardProps {
  review: Review
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {[...Array(review.stars)].map((_, i) => (
          <ReviewStar key={i} />
        ))}
      </div>
      <p className={styles.text}>“{review.text}”</p>
      <div className={styles.profile}>
        <Image
          src={review.image}
          alt={review.name}
          width={42}
          height={42}
          className={styles.avatar}
        />
        <div className={styles.profileData}>
          <p className={styles.name}>{review.name}</p>
          <p className={styles.role}>{review.role}</p>
        </div>
      </div>
    </div>
  )
}
