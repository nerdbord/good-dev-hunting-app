'use client'

import { mapSeniorityLevel } from '@/app/(profile)/mappers'
import { ProfileModel } from '@/app/(profile)/types'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { EmploymentType } from '@prisma/client'
import { usePlausible } from 'next-plausible'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './VerticalCard.module.scss'

const VerticalCard = ({
  position,
  techStack,
  city,
  country,
  seniority,
  fullName,
  remoteOnly,
  employmentTypes,
  isOpenForWork,
  avatarUrl,
  githubUsername,
}: ProfileModel) => {
  const router = useRouter()
  const plausible = usePlausible()

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
    router.push(`${AppRoutes.profiles}/${githubUsername}`)
  }

  return (
    <div className={styles.card} onClick={handleOpenProfile}>
      <Image
        width={120}
        height={120}
        src={avatarUrl || ProfilePicture}
        alt="Profile Picture"
        className={styles.avatar}
      />
      <div className={styles.person}>
        <h4 className={styles.name}>{fullName}</h4>
        <div className={styles.position}>
          {mapSeniorityLevel(seniority)} {position}
        </div>
        <div className={styles.location}>
          {country.name}, {city.name} {remoteOnly && '/ Remote'}
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
