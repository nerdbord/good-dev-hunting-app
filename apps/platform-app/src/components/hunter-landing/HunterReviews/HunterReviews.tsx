'use client'
import { ReviewCard } from '@/components/hunter-landing/UI/ReviewCard/ReviewCard'
import { useScreenDetection } from '@/hooks/useDeviceDetection'
import { I18nNamespaces } from '@/i18n/request'
import { ArrowLeft, ArrowRight } from '@gdh/ui-system/icons'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import styles from './HunterReviews.module.scss'
import { reviews_en, reviews_pl } from './reviews'

const reviewsMap: Record<string, typeof reviews_pl> = {
  pl: reviews_pl,
  en: reviews_en,
}

export const HunterReviews: React.FC = () => {
  const t = useTranslations(I18nNamespaces.HunterReviews)
  const locale = useLocale()
  const { isMobile } = useScreenDetection()
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = reviewsMap[locale] || reviews_en

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

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(currentRef)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`${styles.topSection} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('opinions')}</h2>
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
              <div className={styles.controls} aria-label={t('opinions')}>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={styles.arrow}
                  aria-label={t('back')}
                >
                  <ArrowLeft />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex + 2 >= reviews.length}
                  className={styles.arrow}
                  aria-label={t('next')}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
