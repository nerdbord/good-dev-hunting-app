import { getDisplayProfilesCount } from '@/app/[locale]/(profile)/_actions/queries/countApprovedProfiles'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import LandingProfileImg1 from '../../../assets/images/LandingProfileImg1.webp'
import LandingProfileImg2 from '../../../assets/images/LandingProfileImg2.webp'
import SpecialistImg from '../../../assets/images/SpecialistImg.webp'
import styles from './HunterRiskReducers.module.scss'

interface ProfileCardProps {
  name: string
  position: string
  location: string
  skills: string[]
  avatar: any
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  position,
  location,
  skills,
  avatar,
}) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <Image src={avatar} alt={name} />
        </div>
        <div className={styles.profileInfo}>
          <h3>{name}</h3>
          <p>{position}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className={styles.skills}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export async function HunterRiskReducers() {
  const t = useTranslations(I18nNamespaces.HunterRiskReducers)

  const profileCount = await getDisplayProfilesCount()

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <div className={styles.profilesContainer}>
            <ProfileCard
              name="Anna Dębowska"
              position="Junior Frontend Developer"
              location="Poland, Warsaw / Remote"
              skills={['TypeScript', 'React.js', 'SCSS', '+3 more']}
              avatar={LandingProfileImg1}
            />
            <ProfileCard
              name="Krystian Jasiński"
              position="Senior Fullstack Developer"
              location="Poland, Warsaw / Remote"
              skills={['JavaScript', 'React.js', 'Vue.js', '+5 more']}
              avatar={LandingProfileImg2}
            />
          </div>
          <div className={styles.textSection}>
            <h2>
              <span className={styles.highlight}>
                {profileCount !== null ? `${profileCount || 240}+` : ''}
              </span>{' '}
              {t('expertsTitle')}
            </h2>
            <p>{t('expertsDescription')}</p>
          </div>
        </div>

        <div className={styles.specialistSection}>
          <div className={styles.specialistText}>
            <h2>{t('specialistsTitle1')}</h2>
            <h2>
              {t('specialistsTitle2')
                .split('50+')
                .map((part, index, array) => {
                  if (index === 0) {
                    return (
                      <React.Fragment key={index}>
                        {part}
                        <span className={styles.highlight}>50+</span>
                      </React.Fragment>
                    )
                  }
                  return part
                })}
            </h2>
            <p>{t('specialistsDescription')}</p>
          </div>
          <div className={styles.specialistImageWrapper}>
            <Image
              src={SpecialistImg}
              alt="Specialist with technology icons"
              className={styles.specialistImg}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
