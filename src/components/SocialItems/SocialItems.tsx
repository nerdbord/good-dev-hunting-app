import { ProfileModel } from '@/app/(profile)/types'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'

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
      {userProfile.linkedIn && (
        <div className={styles.socialItem}>
          <a
            className={styles.socialLink}
            href={userProfile.linkedIn || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <LinkedIn />
          </a>
        </div>
      )}
    </div>
  )
}
