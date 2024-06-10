'use client'

import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { jobSpecializationThemes } from '@/app/[locale]/(profile)/profile.helpers'
import {
  mapSeniorityLevel,
  mapSpecialization,
} from '@/app/[locale]/(profile)/profile.mappers'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { I18nNamespaces } from '@/i18n'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { Avatar } from '@gdh/ui-system'
import { EmploymentType } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'
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
  const t = useTranslations(I18nNamespaces.VerticalCard)

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
          {country}, {city} {remoteOnly && t('remote')}
        </div>
      </div>
      <div className={styles.techStack}>{...technologies}</div>
      <div className={styles.availability}>
        {isOpenForWork ? (
          <>
            <div className={styles.availableDot}></div>
            {employmentTypes.includes(EmploymentType.FULL_TIME) ? (
              <p className={styles.availableText}>{t('fullTime')}</p>
            ) : employmentTypes.includes(EmploymentType.CONTRACT) ? (
              <p className={styles.availableText}>{t('contratAvaible')}</p>
            ) : (
              <p className={styles.availableText}>{t('contratAvaible')}</p>
            )}
          </>
        ) : (
          <>
            <div className={styles.notAvailableDot}></div>
            <p className={styles.notAvailableText}>{t('notAvaible')}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default VerticalCard
