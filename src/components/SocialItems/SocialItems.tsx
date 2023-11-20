import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'
import EmailIcon from '@/assets/icons/EmailIcon'
import { ProfileModel } from '@/data/frontend/profile/types'

import styles from './SocialItems.module.scss'

export default function SocialItems({
  userProfile,
}: {
  userProfile: ProfileModel
}) {
  return (
    <div className={styles.social}>
      <div className={styles.socialItem}>
        <a
          href={`https://github.com/${userProfile.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
          <GithubIcon2 />
        </a>
      </div>
      <div className={styles.socialItem}>
        LinkedIn
        <LinkedIn />
      </div>
      <div className={styles.socialItem}>
        Copy email
        <EmailIcon />
      </div>
    </div>
  )
}
