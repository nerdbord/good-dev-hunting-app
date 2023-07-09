'use client'
import React, { useState, useEffect } from 'react'
import styles from '@/components/ProfileList/ProfileList.module.scss'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import {
  ProfileData,
  ProfileListItems,
} from '@/components/ProfileList/ProfileData'

enum JobSpecialization {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
  None = 'None',
}

interface TechnologyChipProps {
  name: string
  theme: JobSpecialization
  seniority: string
}

const getTechnologyClassByTheme = (
  theme: JobSpecialization,
  seniority: string,
) => {
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
const getTechnologyClassBySeniority = (seniority: string) => {
  if (seniority.includes('Frontend')) {
    return styles.frontend
  } else if (seniority.includes('Backend')) {
    return styles.backend
  } else if (seniority.includes('Fullstack')) {
    return styles.fullstack
  }
  return ''
}

const TechnologyChip: React.FC<TechnologyChipProps> = (props) => {
  const themeClass = getTechnologyClassByTheme(props.theme, props.seniority)
  return <p className={`${styles.badge} ${themeClass}`}>{props.name}</p>
}

const ProfileListItem: React.FC<{ data: ProfileListItems }> = ({ data }) => {
  const [theme, setTheme] = useState<JobSpecialization>(JobSpecialization.None)

  useEffect(() => {
    if (data.seniority.includes('Frontend')) {
      setTheme(JobSpecialization.Frontend)
    } else if (data.seniority.includes('Backend')) {
      setTheme(JobSpecialization.Backend)
    } else if (data.seniority.includes('Fullstack')) {
      setTheme(JobSpecialization.Fullstack)
    } else {
      setTheme(JobSpecialization.Frontend)
    }
  }, [])

  const seniorityClass = getTechnologyClassBySeniority(data.seniority)
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
    <div className={styles.mainContainer}>
      <div className={styles.title}>Profiles found</div>
      <div className={styles.profileListCont}>
        {ProfileData.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}

export default ProfileList
