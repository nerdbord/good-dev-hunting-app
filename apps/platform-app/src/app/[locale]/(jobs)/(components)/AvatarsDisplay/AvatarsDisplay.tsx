'use client'
import { Avatar } from '@gdh/ui-system'
import styles from './AvatarsDisplay.module.scss'

interface Applicant {
  id: number
  name: string
  avatarUrl: string
  appliedDate: string
  specialty: string
}

// Potential applicants with specialties that can match job technologies
const potentialApplicants: Applicant[] = [
  {
    id: 1,
    name: 'Alex',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    appliedDate: '2023-10-01',
    specialty: 'React',
  },
  {
    id: 2,
    name: 'Sam',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    appliedDate: '2023-10-02',
    specialty: 'TypeScript',
  },
  {
    id: 3,
    name: 'Jordan',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    appliedDate: '2023-10-03',
    specialty: 'UI/UX',
  },
  {
    id: 4,
    name: 'Taylor',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    appliedDate: '2023-10-04',
    specialty: 'DevOps',
  },
  {
    id: 5,
    name: 'Morgan',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    appliedDate: '2023-10-05',
    specialty: 'Node.js',
  },
  {
    id: 6,
    name: 'Casey',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    appliedDate: '2023-10-06',
    specialty: 'Mobile',
  },
  {
    id: 7,
    name: 'Jamie',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    appliedDate: '2023-10-07',
    specialty: 'Python',
  },
  {
    id: 8,
    name: 'Avery',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    appliedDate: '2023-10-08',
    specialty: 'Java',
  },
  {
    id: 9,
    name: 'Riley',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    appliedDate: '2023-10-09',
    specialty: 'C#',
  },
  {
    id: 10,
    name: 'Blake',
    avatarUrl: 'https://i.pravatar.cc/150?img=10',
    appliedDate: '2023-10-10',
    specialty: 'PHP',
  },
]

interface AvatarsDisplayProps {
  jobTechnologies?: string[]
}

export const AvatarsDisplay = ({
  jobTechnologies = [],
}: AvatarsDisplayProps) => {
  // Find applicants that match job technologies or return all if no technologies
  const relevantApplicants = [...potentialApplicants]

  if (jobTechnologies.length > 0) {
    // Prioritize applicants whose specialty matches job technologies
    relevantApplicants.sort((a, b) => {
      const aMatches = jobTechnologies.some((tech) =>
        a.specialty.toLowerCase().includes(tech.toLowerCase()),
      )
      const bMatches = jobTechnologies.some((tech) =>
        b.specialty.toLowerCase().includes(tech.toLowerCase()),
      )

      if (aMatches && !bMatches) return -1
      if (!aMatches && bMatches) return 1
      return 0
    })
  } else {
    // If no technologies, just shuffle
    relevantApplicants.sort(() => 0.5 - Math.random())
  }

  const maxVisibleAvatars = 3
  const visibleApplicants = relevantApplicants.slice(0, maxVisibleAvatars)
  const overflowCount = relevantApplicants.length - maxVisibleAvatars

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
