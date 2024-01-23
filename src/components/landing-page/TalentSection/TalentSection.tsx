import styles from './TalentSection.module.scss'

import { JobSpecialization } from '@/components/ProfileList/profile-data'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import { EmploymentType, PublishingState } from '@prisma/client'

// components
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import ProfileCard from '@/components/ProfileCard/ProfileCard'

const mockedCards: ProfileModelSimplified[] = [
  {
    id: '0',
    fullName: 'Karolina Morwińska',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'Poland',
    },
    openForCountryRelocation: true,
    city: {
      name: 'Warsaw',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Fullstack,
    seniority: 'Senior',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
  {
    id: '1',
    fullName: 'Kristin Watson',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'Poland',
    },
    openForCountryRelocation: true,
    city: {
      name: 'Warsaw',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Frontend,
    seniority: 'Junior',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
  {
    id: '2',
    fullName: 'Veres Panna',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'Poland',
    },
    openForCountryRelocation: true,
    city: {
      name: 'Warsaw',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Fullstack,
    seniority: 'Mid',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
  {
    id: '3',
    fullName: 'Robert Fox',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'Italy',
    },
    openForCountryRelocation: true,
    city: {
      name: 'Rome',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Frontend,
    seniority: 'Intern',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
  {
    id: '4',
    fullName: 'Kovács Tímea',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'USA',
    },
    openForCountryRelocation: true,
    city: {
      name: 'New York City',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Fullstack,
    seniority: 'Junior',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
  {
    id: '5',
    fullName: 'Albert Flores',
    avatarUrl: 'https://avatars.githubusercontent.com/u/110562040?v=4',
    linkedIn: 'https://www.linkedin.com/in/meczajkowski/',
    userId: '',
    bio: '',
    country: {
      name: 'Poland',
    },
    openForCountryRelocation: true,
    city: {
      name: 'Warsaw',
    },
    openForCityRelocation: true,
    remoteOnly: true,
    position: JobSpecialization.Backend,
    seniority: 'Senior',
    techStack: ['JavaScript', 'React.js', 'Vue.js', 'TypeScript', 'Angular'],
    employmentType: EmploymentType.FULL_TIME,
    githubUsername: null,
    state: PublishingState.APPROVED,
    userEmail: '',
  },
]

const TalentSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
      <div className={styles.talents}>
        {mockedCards.map((cardData) => (
          <ProfileCard key={cardData.id} data={cardData} />
        ))}
      </div>
      <FindTalentsBtn variant="primary">Find all talents</FindTalentsBtn>
    </section>
  )
}

export default TalentSection
