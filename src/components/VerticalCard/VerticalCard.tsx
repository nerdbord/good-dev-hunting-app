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
  userId,
  position,
  techStack,
  city,
  country,
  seniority,
  fullName,
  remoteOnly,
  employmentTypes,
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
    router.push(`${AppRoutes.profiles}/${userId}`)
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
        <div className={styles.dot}></div>
        {employmentTypes.includes(EmploymentType.FULL_TIME)
          ? 'Available for full-time'
          : employmentTypes.includes(EmploymentType.CONTRACT)
          ? 'Available for a contract'
          : 'Available for part-time'}
      </div>
    </div>
  )
}

export default VerticalCard
