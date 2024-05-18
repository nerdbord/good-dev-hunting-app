'use client'
import GitHubButton from 'react-github-btn'

export const GithubStarsButton = () => {
  return (
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
  )
}

//export default GithubStarsButton
