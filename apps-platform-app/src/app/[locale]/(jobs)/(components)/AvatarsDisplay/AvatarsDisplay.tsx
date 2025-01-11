'use client'
import { Avatar } from '@gdh/ui-system'
import styles from './AvatarsDisplay.module.scss'

interface Applicant {
  id: number
  name: string
  avatarUrl?: string // Make avatarUrl optional
  appliedDate: string
}

const mockApplicants: Applicant[] = [
  { id: 1, name: 'Alice', avatarUrl: '/avatars/alice.jpg', appliedDate: '2023-10-01' },
  { id: 2, name: 'Bob', appliedDate: '2023-10-02' }, // No avatarUrl
  { id: 3, name: 'Charlie', avatarUrl: '/avatars/charlie.jpg', appliedDate: '2023-10-03' },
  { id: 4, name: 'David', appliedDate: '2023-10-04' }, // No avatarUrl
  { id: 5, name: 'Eve', avatarUrl: '/avatars/eve.jpg', appliedDate: '2023-10-05' },
  { id: 6, name: 'Frank', avatarUrl: '/avatars/frank.jpg', appliedDate: '2023-10-06' },
]

const defaultAvatarUrl = '/avatars/default-avatar.png' // Path to default avatar image

export const AvatarsDisplay = () => {
  const maxVisibleAvatars = 4
  const visibleApplicants = mockApplicants.slice(0, maxVisibleAvatars)
  const overflowCount = mockApplicants.length - maxVisibleAvatars

  return (
    <div className={styles.avatarsContainer}>
      {visibleApplicants.map((applicant) => (
        <div key={applicant.id} className={styles.avatarWrapper}>
          <Avatar src={applicant.avatarUrl || defaultAvatarUrl} alt={applicant.name} />
          <div className={styles.applicantInfo}>
            <span className={styles.name}>{applicant.name}</span>
            <span className={styles.date}>{applicant.appliedDate}</span>
          </div>
        </div>
      ))}
      {overflowCount > 0 && (
        <div className={styles.overflowIndicator}>
          +{overflowCount} more
        </div>
      )}
    </div>
  )
}

export default AvatarsDisplay 