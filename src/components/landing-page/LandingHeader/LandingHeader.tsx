import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/helpers'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import LoginBtn from '@/components/LoginBtn/LoginBtn'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import Logo from '@/components/Logo/Logo'
import styles from './LandingHeader.module.scss'

const LandingHeader = async () => {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  if (user) {
    return (
      <header className={styles.wrapper}>
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.logoAndGhStarsWrapper}>
              <Logo />
              <div className={styles.hideOnMobile}>
                <GithubStarsButton />
              </div>
            </div>

            <div className={styles.frameButtons}>
              {userIsModerator && <ModerationBtn />}
              {!userIsHunter && userHasProfile ? (
                <GithubAcc />
              ) : (
                <>
                  {userIsHunter ? (
                    <>
                      <HunterAcc />
                      <LogOutBtn />
                    </>
                  ) : (
                    <>
                      <CreateProfileBtn data-testid="create-profile-button" />
                      <LogOutBtn />
                    </>
                  )}
                </>
              )}
            </div>
            <div className={styles.hideOnDesktop}>
              <HamburgerMenuMobileBtn
                userHasProfile={userHasProfile}
                userIsModerator={userIsModerator}
                userIsHunter={userIsHunter}
              />
            </div>
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Logo />
            <GithubStarsButton />
          </div>

          <div className={styles.hideOnDesktop}>
            <LoginBtn variant={'tertiary'}>Login</LoginBtn>
          </div>
          <div className={styles.frameButtons}>
            <FindTalentsBtn variant="tertiary" />
            <LoginBtnsWrapper />
            <CreateProfileBtn />
          </div>
        </div>
      </Container>
    </header>
  )
}
export default LandingHeader
