'use client'

import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './HunterWhyWorth.module.scss'

const backgroundDefault = '/sectionone.png'
const backgroundOne = '/sectiontwo.png'
const backgroundTwo = '/Background2.svg'

type Props = {}

export const HunterWhyWorth = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [activeImage, setActiveImage] = useState<string>(backgroundDefault)
  const [nextImage, setNextImage] = useState<string>(backgroundDefault)
  const [transitioning, setTransitioning] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const t = useTranslations(I18nNamespaces.HunterWhyWorth)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const newImage = getBackgroundImage(selectedOption)
    if (newImage !== activeImage) {
      setNextImage(newImage)
      setTransitioning(true)

      const timer = setTimeout(() => {
        setActiveImage(newImage)
        setTransitioning(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [selectedOption, activeImage, isMobile])

  const getBackgroundImage = (option: number) => {
    switch (option) {
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
        <h2 className={styles.title}>
          {/*     <span className={styles.titleFirstLine}>{t('titleFirstLine')}</span>
          <span className={styles.titleSecondLine}>{t('titleSecondLine')}</span> */}
          <span className={styles.titleFirstLine}>
            {t('titleFirstLine')} {t('titleSecondLine')}
          </span>
        </h2>

        <div className={styles.contentContainer}>
          {isMobile ? (
            <>
              <div className={styles.mobileSection}>
                <div
                  className={styles.mobileImageContainer}
                  style={{ backgroundImage: `url(${backgroundDefault})` }}
                >
                  <Link href={AppRoutes.postJob}>
                    <button className={styles.mobileButton}>
                      {t('addJobForFree')}
                    </button>
                  </Link>
                </div>
                <div className={styles.mobileTextContent}>
                  <h3 className={styles.mobileTitle}>{t('freeTitle')}</h3>
                  <p className={styles.mobileDescription}>
                    {t('freeDescription')}
                  </p>
                </div>
              </div>

              <div className={styles.mobileSection}>
                <div
                  className={styles.mobileImageContainer}
                  style={{ backgroundImage: `url(${backgroundOne})` }}
                >
                  <div className={styles.mobileModal}>
                    <Image
                      src="/Frame.png"
                      alt="Clock icon"
                      width={32}
                      height={32}
                      className={styles.modalIcon}
                    />
                    <p className={styles.modalText}>{t('addJobInOneMinute')}</p>
                  </div>
                </div>
                <div className={styles.mobileTextContent}>
                  <h3 className={styles.mobileTitle}>{t('simpleTitle')}</h3>
                  <p className={styles.mobileDescription}>
                    {t('simpleDescription')}
                  </p>
                </div>
              </div>

              <div className={styles.mobileSection}>
                <div
                  className={styles.mobileImageContainer}
                  style={{ backgroundImage: `url(${backgroundTwo})` }}
                ></div>
                <div className={styles.mobileTextContent}>
                  <h3 className={styles.mobileTitle}>{t('techTitle')}</h3>
                  <p className={styles.mobileDescription}>
                    {t('techDescription')}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.textContainer}>
                <div
                  className={`${styles.reason} ${
                    selectedOption === 0 ? styles.selected : ''
                  }`}
                  onClick={() => handleOptionClick(0)}
                >
                  <h3 className={styles.reasonTitle}>{t('freeTitle')}</h3>
                  <p className={styles.reasonDescription}>
                    {t('freeDescription')}
                  </p>
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
                  <p className={styles.reasonDescription}>
                    {t('techDescription')}
                  </p>
                </div>
              </div>

              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <div
                    className={styles.imageLayer}
                    style={{ backgroundImage: `url(${activeImage})` }}
                  />
                  {transitioning && (
                    <div
                      className={`${styles.imageLayer} ${styles.fadeIn}`}
                      style={{ backgroundImage: `url(${nextImage})` }}
                    />
                  )}
                </div>

                <div className={styles.contentLayer}>
                  {selectedOption === 0 && (
                    <Link href={AppRoutes.postJob}>
                      <button className={styles.addJobButton}>
                        {t('addJobForFree')}
                      </button>
                    </Link>
                  )}

                  {selectedOption === 1 && (
                    <div className={styles.modal}>
                      <Image
                        src="/Frame.png"
                        alt="Clock icon"
                        width={32}
                        height={32}
                        className={styles.modalIcon}
                      />
                      <p className={styles.modalText}>
                        {t('addJobInOneMinute')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
