'use client'

import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { useScreenDetection } from '@/hooks/useDeviceDetection'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './HunterTeam.module.scss'

type Props = {
  teamProfiles: ProfileModel[]
}

export const HunterTeam = ({ teamProfiles }: Props) => {
  const t = useTranslations(I18nNamespaces.HunterTeam)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollMoveValue, setScrollMoveValue] = useState(200)
  const { isMobile, screenWidth } = useScreenDetection()

  useEffect(() => {
    console.log('Device type changed:', isMobile ? 'Mobile' : 'Desktop')
  }, [isMobile])

  useEffect(() => {
    // Get computed CSS values from the container element
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current)
      const columnWidth = parseInt(
        computedStyle.getPropertyValue('--column-width'),
        10,
      )
      const gap = parseInt(computedStyle.getPropertyValue('--gap'), 10)

      if (isMobile) {
        // On mobile scroll just one column at a time
        setScrollMoveValue(columnWidth + gap)
      } else if (screenWidth < 1024) {
        setScrollMoveValue(columnWidth * 1 + gap * 1)
      } else {
        // On desktop scroll three columns at a time
        setScrollMoveValue(columnWidth * 3 + gap * 3)
      }
    }
  }, [isMobile, screenWidth])

  const handleScrollLeft = () => {
    console.log('scrollLeft', scrollMoveValue)
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollMoveValue
    }
  }

  const handleScrollRight = () => {
    console.log('scrollRight', scrollMoveValue)
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollMoveValue
    }
  }

  const getAvailabilityType = (profile: ProfileModel) => {
    if (profile.employmentTypes?.includes('FULL_TIME')) return 'fullTime'
    if (profile.employmentTypes?.includes('CONTRACT')) return 'contract'
    return 'partTime'
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>
          <span>{t('descriptionBold')}</span>
          {t('description')}
        </p>
        <p className={styles.signature}>{t('signature')}</p>
      </div>

      <div>
        <div className={styles.teamMembersContainer} ref={containerRef}>
          {teamProfiles.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div className={styles.avatarContainer}>
                <Image
                  src={member.avatarUrl || ProfilePicture}
                  alt={member.fullName}
                  width={150}
                  height={150}
                  className={styles.avatar}
                />
                <div className={styles.statusIndicator}>
                  {member.isOpenForWork && <div className={styles.statusDot} />}
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.fullName}</h3>
                <p className={styles.memberPosition}>{member.position}</p>
                <p className={styles.memberLocation}>
                  {member.country}
                  {member.city && `, ${member.city}`}
                  {member.remoteOnly && ' (Remote)'}
                </p>
                <div className={styles.availabilityInfo}>
                  {member.isOpenForWork
                    ? t('availableFor', { type: getAvailabilityType(member) })
                    : t('notAvailable')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.navigation} aria-hidden="true">
          <button
            className={styles.navButton}
            onClick={handleScrollLeft}
            tabIndex={-1}
          >
            &lt;
          </button>
          <button
            className={styles.navButton}
            onClick={handleScrollRight}
            tabIndex={-1}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}

export default HunterTeam
