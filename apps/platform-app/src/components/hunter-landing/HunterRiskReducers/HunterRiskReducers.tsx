import Image from 'next/image'
import React from 'react'
import LandingProfileImg1 from '../../../assets/images/LandingProfileImg1.webp'
import LandingProfileImg2 from '../../../assets/images/LandingProfileImg2.webp'
import { SpecialistImage } from '../UI/SpecialistImage/SpecialistImage'
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
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="(max-width: 768px) 48px, 64px"
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
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

export const HunterRiskReducers = () => {
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
              <span className={styles.highlight}>240+</span> zweryfikowanych
              ekspertów i ekspertek
            </h2>
            <p>
              Współpracuj ze zweryfikowanymi programistami, testerami i
              designerami na każdym poziomie zaawansowania.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.specialistSection}>
        <div className={styles.specialistText}>
          <h2>
            Specjaliści biegli w <span className={styles.highlight}>50+</span>{' '}
            technologiach
          </h2>
          <p>
            Od Reacta, przez Pythona, po narzędzia UX/UI – nasi eksperci znają
            wszystkie technologie potrzebne do realizacji Twojego projektu.
          </p>
        </div>
        <div className={styles.specialistImageWrapper}>
          <SpecialistImage width={400} height={433} />
        </div>
      </div>
    </div>
  )
}
