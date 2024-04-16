'use client'

import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { jobSpecializationThemes } from '@/app/(profile)/profile.helpers'
import {
  mapSeniorityLevel,
  mapSpecialization,
} from '@/app/(profile)/profile.mappers'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { EmploymentType } from '@prisma/client'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'
import { Avatar } from '../Avatar/Avatar'
import styles from './VerticalCard.module.scss'

const VerticalCard = (
  props: PropsWithChildren<{
    avatarUrl: ProfileModel['avatarUrl']
    city: ProfileModel['city']
    country: ProfileModel['country']
    employmentTypes: ProfileModel['employmentTypes']
    fullName: ProfileModel['fullName']
    githubUsername: ProfileModel['githubUsername']
    isOpenForWork: ProfileModel['isOpenForWork']
    position: ProfileModel['position']
    remoteOnly: ProfileModel['remoteOnly']
    seniority: ProfileModel['seniority']
    techStack: ProfileModel['techStack']
  }>,
) => {
  const router = useRouter()
  const plausible = usePlausible()

  const {
    avatarUrl,
    city,
    country,
    employmentTypes,
    fullName,
    githubUsername,
    isOpenForWork,
    position,
    remoteOnly,
    seniority,
    techStack,
  } = props

  const technologies = techStack.map((tech, index) => {
    if (index < 4) {
      return (
        <p className={styles.tech}>
          {index < 3 ? tech.name : `+ ${techStack.length - index} more`}
        </p>
      )
    }
  })

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: githubUsername },
    })
    router.push(`${AppRoutes.profile}/${githubUsername}`)
  }

  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[position],
    }),
    [position],
  )

  return (
    <div
      className={styles.card}
      style={specializationTheme}
      onClick={handleOpenProfile}
    >
      <Avatar src={avatarUrl || ProfilePicture} size={120} />
      <div className={styles.person}>
        <h4 className={styles.name}>{fullName}</h4>
        <div className={styles.position}>
          {mapSeniorityLevel(seniority)} {mapSpecialization(position)}
        </div>
        <div className={styles.location}>
          {country}, {city} {remoteOnly && '/ Remote'}
        </div>
      </div>
      <div className={styles.techStack}>{...technologies}</div>
      <div className={styles.availability}>
        {isOpenForWork ? (
          <>
            <div className={styles.availableDot}></div>
            {employmentTypes.includes(EmploymentType.FULL_TIME) ? (
              <p className={styles.availableText}>Available for full-time</p>
            ) : employmentTypes.includes(EmploymentType.CONTRACT) ? (
              <p className={styles.availableText}>Available for a contract</p>
            ) : (
              <p className={styles.availableText}>Available for a contract</p>
            )}
          </>
        ) : (
          <>
            <div className={styles.notAvailableDot}></div>
            <p className={styles.notAvailableText}>Not available for work</p>
          </>
        )}
      </div>
    </div>
  )
}

export default VerticalCard
