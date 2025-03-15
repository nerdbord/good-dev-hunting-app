'use client'

import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { I18nNamespaces } from '@/i18n/request'
import { EmploymentType } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './TeamMemberCard.module.scss'

type Props = {
  member?: ProfileModel
  isPlaceholder?: boolean
}

export const TeamMemberCard = ({ member, isPlaceholder = false }: Props) => {
  const t = useTranslations(I18nNamespaces.HunterTeam)

  const renderAvailabilityInfo = (member: ProfileModel) => {
    if (member.employmentTypes.includes(EmploymentType.FULL_TIME)) {
      return <p className={styles.availabilityInfo}>{t('fullTime')}</p>
    } else if (member.employmentTypes.includes(EmploymentType.CONTRACT)) {
      return <p className={styles.availabilityInfo}>{t('contract')}</p>
    } else if (member.employmentTypes.includes(EmploymentType.PART_TIME)) {
      return <p className={styles.availabilityInfo}>{t('partTime')}</p>
    } else {
      return null
    }
  }

  if (isPlaceholder || !member) {
    return (
      <div className={styles.memberCard}>
        <div className={styles.avatarContainer}>
          <Image
            src="/devsTeamAvatar.webp"
            alt={"database error, can't load team members informations"}
            width={120}
            height={120}
            className={styles.avatar}
          />
          <div className={styles.statusIndicator}>
            <div
              className={styles.statusDot}
              style={{ backgroundColor: '#df1f1f' }}
            />
          </div>
        </div>
        <div className={styles.memberInfo}>
          <h3 className={styles.memberName}>Deliaf Krowten</h3>
          <p className={styles.memberPosition}>Intern Network Administrator</p>
          <p className={styles.memberLocation}>Neverland, Null Island</p>
        </div>
      </div>
    )
  }

  if (!member) return null

  return (
    <div className={styles.memberCard}>
      <div className={styles.avatarContainer}>
        <Image
          src={member.avatarUrl || ProfilePicture}
          alt={member.fullName}
          width={120}
          height={120}
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
          {member.remoteOnly && t('remote')}
        </p>
      </div>

      {renderAvailabilityInfo(member)}
    </div>
  )
}

export default TeamMemberCard
