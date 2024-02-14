import { ProfileModel } from '@/app/(profile)/types'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'

import styles from './SocialItems.module.scss'

export default function SocialItems({
  userProfile,
  isNerdbordConnected,
}: {
  userProfile: ProfileModel
  isNerdbordConnected?: boolean
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
      {userProfile.githubUsername && isNerdbordConnected && (
        <li className={styles.socialItem}>
          <a
            className={styles.socialLink}
            href={`https://nerdbord.io/p/${userProfile.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio↗︎
          </a>
        </li>
      )}
    </div>
  )
}
