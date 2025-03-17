'use client'
import { ReviewCard } from '@/components/hunter-landing/UI/ReviewCard/ReviewCard'
import { useScreenDetection } from '@/hooks/useDeviceDetection'
import { I18nNamespaces } from '@/i18n/request'
import { ArrowLeft, ArrowRight } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './HunterReviews.module.scss'
import { reviews } from './reviews'

export const HunterReviews: React.FC = () => {
  const t = useTranslations(I18nNamespaces.HunterReviews)
  const { isMobile } = useScreenDetection()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex + 2 < reviews.length) {
      setCurrentIndex(currentIndex + 2)
    }
  }

  const handlePrev = () => {
    if (currentIndex - 2 >= 0) {
      setCurrentIndex(currentIndex - 2)
    }
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t('opinions')}</p>
      <div className={styles.reviewBox}>
        {!isMobile ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div className={styles.mobileSlider}>
            {reviews
              .slice(currentIndex, currentIndex + 2)
              .map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            <div className={styles.controls}>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={styles.arrow}
              >
                <ArrowLeft />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + 2 >= reviews.length}
                className={styles.arrow}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
