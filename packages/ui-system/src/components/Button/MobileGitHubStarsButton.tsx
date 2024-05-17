import GitHubButton from 'react-github-btn'
import styles from './MobileGitHubStarsButton.module.scss'

export const MobileGitHubStarsButton = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Like what we do?
          <br /> Give us a star on Github ⭐️
        </div>
        <div>
          <GitHubButton
            href="https://github.com/nerdbord/good-dev-hunting-app"
            data-color-scheme="light"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star nerdbord/good-dev-hunting-app on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </>
  )
}
