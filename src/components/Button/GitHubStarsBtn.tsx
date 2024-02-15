'use client'
import GitHubButton from 'react-github-btn'

const GithubStarsButton = () => {
  return (
    <GitHubButton
      href="https://github.com/nerdbord/good-dev-hunting-app"
      data-color-scheme="no-preference: dark; light: dark; dark: dark;"
      data-icon="octicon-star"
      data-size="large"
      data-show-count="true"
      aria-label="Star nerdbord/good-dev-hunting-app on GitHub"
    >
      Star
    </GitHubButton>
  )
}

export default GithubStarsButton
