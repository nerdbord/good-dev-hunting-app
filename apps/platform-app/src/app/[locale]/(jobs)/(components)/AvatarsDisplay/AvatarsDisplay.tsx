'use client'
import { Avatar } from '@gdh/ui-system'
import styles from './AvatarsDisplay.module.scss'

interface Applicant {
  id: number
  name: string
  avatarUrl: string
  appliedDate: string
}

const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: 'Alice',
    avatarUrl: '/avatars/alice.jpg',
    appliedDate: '2023-10-01',
  },
  {
    id: 2,
    name: 'Bob',
    avatarUrl: '/avatars/bob.jpg',
    appliedDate: '2023-10-02',
  },
  {
    id: 3,
    name: 'Charlie',
    avatarUrl: '/avatars/charlie.jpg',
    appliedDate: '2023-10-03',
  },
  {
    id: 4,
    name: 'David',
    avatarUrl: '/avatars/david.jpg',
    appliedDate: '2023-10-04',
  },
  {
    id: 5,
    name: 'Eve',
    avatarUrl: '/avatars/eve.jpg',
    appliedDate: '2023-10-05',
  },
  {
    id: 6,
    name: 'Frank',
    avatarUrl: '/avatars/frank.jpg',
    appliedDate: '2023-10-06',
  },
  {
    id: 7,
    name: 'Grace',
    avatarUrl: '/avatars/grace.jpg',
    appliedDate: '2023-10-07',
  },
  {
    id: 8,
    name: 'Henry',
    avatarUrl: '/avatars/henry.jpg',
    appliedDate: '2023-10-08',
  },
  {
    id: 9,
    name: 'Ivy',
    avatarUrl: '/avatars/ivy.jpg',
    appliedDate: '2023-10-09',
  },
  {
    id: 10,
    name: 'Jack',
    avatarUrl: '/avatars/jack.jpg',
    appliedDate: '2023-10-10',
  },
]

export const AvatarsDisplay = () => {
  const maxVisibleAvatars = 3
  const visibleApplicants = mockApplicants.slice(0, maxVisibleAvatars)
  const overflowCount = mockApplicants.length - maxVisibleAvatars

  return (
    <div className={styles.avatarsWrapper}>
      <div className={styles.avatarsContainer}>
        {visibleApplicants.map((applicant) => (
          <div key={applicant.id} className={styles.avatarWrapper}>
            <Avatar src={applicant.avatarUrl} alt={applicant.name} />
            <div className={styles.applicantInfo}>
              <span className={styles.name}>{applicant.name}</span>
              <span className={styles.date}>{applicant.appliedDate}</span>
            </div>
          </div>
        ))}
        {overflowCount > 0 && (
          <div className={styles.overflowIndicator}>+{overflowCount} more</div>
        )}
      </div>
    </div>
  )
}

export default AvatarsDisplay
