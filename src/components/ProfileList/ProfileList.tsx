import React from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { ProfileData } from '@/components/ProfileList/ProfileData'
interface ProfileListItem {
  id: number
  name: string
  seniority: string
  location: string
  technology: string
  technology2: string
  technology3: string
  others: string
}

interface ProfileListProps {
  data: ProfileListItem
}

enum JobSpecialization {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
}

interface TechnologyChipProps {
  name: string
  theme: JobSpecialization
  seniority: string
}

const getTechnologyClass = (theme: JobSpecialization, seniority: string) => {
  if (seniority.includes('Frontend')) {
    return styles.frontend
  } else if (seniority.includes('Backend')) {
    return styles.backend
  } else if (seniority.includes('Fullstack')) {
    return styles.fullstack
  }

  switch (theme) {
    case JobSpecialization.Frontend:
      return styles.frontend
    case JobSpecialization.Backend:
      return styles.backend
    case JobSpecialization.Fullstack:
      return styles.fullstack
    default:
      return ''
  }
}

const TechnologyChip: React.FC<TechnologyChipProps> = (props) => {
  const themeClass = getTechnologyClass(props.theme, props.seniority)
  return <p className={`${styles.badge} ${themeClass}`}>{props.name}</p>
}

const ProfileListItem: React.FC<ProfileListProps> = ({ data }) => {
  let theme: JobSpecialization
  if (data.seniority.includes('Frontend')) {
    theme = JobSpecialization.Frontend
  } else if (data.seniority.includes('Backend')) {
    theme = JobSpecialization.Backend
  } else if (data.seniority.includes('Fullstack')) {
    theme = JobSpecialization.Fullstack
  } else {
    theme = JobSpecialization.Frontend
  }
  const seniorityClass = getTechnologyClass(theme, data.seniority)

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={ProfilePicture.src} alt="Profile Picture" />
        </div>
        <div className={styles.data}>
          <p className={styles.name}>{data.name}</p>
          <p className={seniorityClass}>{data.seniority}</p>
          <p className={styles.location}>{data.location}</p>
        </div>
      </div>
      <div className={styles.technology}>
        <TechnologyChip
          name={data.technology}
          theme={theme}
          seniority={data.seniority}
        />
        <TechnologyChip
          name={data.technology2}
          theme={theme}
          seniority={data.seniority}
        />
        <TechnologyChip
          name={data.technology3}
          theme={theme}
          seniority={data.seniority}
        />
        <TechnologyChip
          name={data.others}
          theme={theme}
          seniority={data.seniority}
        />
      </div>
    </div>
  )
}

const ProfileList: React.FC = () => {
  return (
    <div>
      <div className={styles.title}>Profiles found</div>
      <div className={styles.ProfileListCont}>
        {ProfileData.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}

export default ProfileList
