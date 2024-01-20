import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import { GithubLoginButton } from '@/components/GithubLoginButton/GithubLoginButton'
import styles from './LandingHeader.module.scss'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import Logo from '@/components/Logo/Logo'
import { LandingContainer } from '../LandingContainer/LandingContainer'

const LandingHeader = () => {
  return (
    <header className={styles.wrapper}>
      <LandingContainer>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.frameButtons}>
            <div className={styles.buttonBox}>
              <div className={styles.mobileHide}>
                <FindTalentsBtn />
              </div>
              <GithubLoginButton />
              <div className={styles.mobileHide}>
                <CreateProfileBtn />
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </header>
  )
}
export default LandingHeader
