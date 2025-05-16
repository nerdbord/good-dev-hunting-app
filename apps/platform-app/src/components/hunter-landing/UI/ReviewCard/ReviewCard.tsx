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
    <li className={styles.card}>
      <ul className={styles.stars} aria-label={`Ocena: ${review.stars} z 5`}>
        {[...Array(review.stars)].map((_, i) => (
          <ReviewStar key={i} />
        ))}
      </ul>
      <blockquote className={styles.text}>“{review.text}”</blockquote>
      <div className={styles.profile}>
        <Image
          src={review.image}
          alt=""
          role="presentation"
          width={42}
          height={42}
          className={styles.avatar}
        />
        <div className={styles.profileData}>
          <p className={styles.name}>{review.name}</p>
          <p className={styles.role}>{review.role}</p>
        </div>
      </div>
    </li>
  )
}
