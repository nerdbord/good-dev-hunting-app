'use client'

import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { useScreenDetection } from '@/hooks/useDeviceDetection'
import { ArrowLeft, ArrowRight } from '@gdh/ui-system/icons'
import { useEffect, useRef, useState } from 'react'
import TeamMemberCard from './TeamMemberCard'
import styles from './TeamMembersCarousel.module.scss'

type Props = {
  teamProfiles: ProfileModel[] | undefined
}

export const TeamMembersCarousel = ({ teamProfiles }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollMoveValue, setScrollMoveValue] = useState(200)
  const { isMobile, screenWidth } = useScreenDetection()

  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current)
      const columnWidth = parseInt(
        computedStyle.getPropertyValue('--column-width'),
        10,
      )
      const gap = parseInt(computedStyle.getPropertyValue('--gap'), 10)

      if (isMobile) {
        // On mobile scroll just one column at a time
        setScrollMoveValue(columnWidth + gap * 1)
      } else if (screenWidth < 1140) {
        setScrollMoveValue(columnWidth * 1 + gap * 1)
      } else {
        // On desktop scroll three columns at a time
        setScrollMoveValue(columnWidth * 3 + gap * 3)
      }
    }
  }, [isMobile, screenWidth])

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollMoveValue
    }
  }

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollMoveValue
    }
  }

  return (
    <div>
      <div className={styles.teamMembersContainer} ref={containerRef}>
        {!teamProfiles?.length && <TeamMemberCard isPlaceholder />}

        {teamProfiles?.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className={styles.navigation} aria-hidden="true">
        <button className={styles.navButton} onClick={handleScrollLeft}>
          <ArrowLeft />
        </button>
        <button className={styles.navButton} onClick={handleScrollRight}>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default TeamMembersCarousel
