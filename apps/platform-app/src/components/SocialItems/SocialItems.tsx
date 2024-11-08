import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'

import styles from './SocialItems.module.scss'

export default function SocialItems({
  githubUsername,
  linkedIn,
  isNerdbordConnected,
}: {
  githubUsername: string | null
  linkedIn: string | null
  isNerdbordConnected?: boolean
}) {
  return (
    <div className={styles.social}>
      {githubUsername && (
        <div className={styles.socialItem}>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
            <GithubIcon2 />
          </a>
        </div>
      )}
      {linkedIn && (
        <div className={styles.socialItem}>
          <a
            className={styles.socialLink}
            href={linkedIn || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <LinkedIn />
          </a>
        </div>
      )}
      {githubUsername && isNerdbordConnected && (
        <li className={styles.socialItem}>
          <a
            className={styles.socialLink}
            href={`https://nerdbord.io/p/${githubUsername}`}
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
