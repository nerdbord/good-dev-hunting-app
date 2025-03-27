'use client'

import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './HunterWhyWorth.module.scss'

const backgroundDefault = '/Background.svg'
const backgroundOne = '/Background1.svg'
const backgroundTwo = '/Background2.svg'

type Props = {}

export const HunterWhyWorth = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const t = useTranslations(I18nNamespaces.HunterWhyWorth)

  const getBackgroundImage = () => {
    switch (selectedOption) {
      case 0:
        return backgroundDefault
      case 1:
        return backgroundOne
      case 2:
        return backgroundTwo
      default:
        return backgroundDefault
    }
  }

  const handleOptionClick = (option: number) => {
    setSelectedOption(option)
  }

  return (
    <div className={styles.fullWidthWrapper}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <div
              className={`${styles.reason} ${
                selectedOption === 0 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(0)}
            >
              <h3 className={styles.reasonTitle}>{t('freeTitle')}</h3>
              <p className={styles.reasonDescription}>{t('freeDescription')}</p>
            </div>

            <div
              className={`${styles.reason} ${
                selectedOption === 1 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(1)}
            >
              <h3 className={styles.reasonTitle}>{t('simpleTitle')}</h3>
              <p className={styles.reasonDescription}>
                {t('simpleDescription')}
              </p>
            </div>

            <div
              className={`${styles.reason} ${
                selectedOption === 2 ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(2)}
            >
              <h3 className={styles.reasonTitle}>{t('techTitle')}</h3>
              <p className={styles.reasonDescription}>{t('techDescription')}</p>
            </div>
          </div>

          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${getBackgroundImage()})` }}
          />
        </div>
      </div>
    </div>
  )
}
