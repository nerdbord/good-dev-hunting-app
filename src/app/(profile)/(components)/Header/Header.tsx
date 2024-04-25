import GithubAcc from '@/app/(auth)/(components)/GithubAcc/GithubAcc'
import HamburgerMenuMobileBtn from '@/app/(auth)/(components)/HamburgerMenuMobileBtn/HamburgerMenuMobileBtn'
import HunterAcc from '@/app/(auth)/(components)/HunterAcc/HunterAcc'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import { AppHeaderMobileSearchFilter } from '@/app/(profile)/(components)/Filters/AppHeaderMobileSearchFilter'
import ModerationBtn from '@/app/(profile)/(routes)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import logo from '@/assets/images/logo.png'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { Container } from '@/components/Container/Container'
import LoginBtnsWrapper from '@/components/LoginBtn/LoginBtnsWrapper'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = async () => {
  const { user, userIsHunter, userIsModerator, userHasProfile } =
    await getAuthorizedUser()

  //   if (user) {
  //     return (
  //       <header className={styles.wrapper}>
  //         <Container>
  //           <div className={styles.headerContent}>
  //             <div className={styles.logoAndGhStarsWrapper}>
  //               <Link href={AppRoutes.profilesList} className={styles.logo}>
  //                 <img src={logo.src} alt="Logo" />
  //                 <div className={styles.title}>Good Dev Hunting</div>
  //               </Link>
  //               <div className={styles.hideOnMobile}>
  //                 <GithubStarsButton />
  //               </div>
  //             </div>

  //             <div className={styles.frameButtons}>
  //               {userIsModerator && <ModerationBtn />}

  //               {!userIsHunter && userHasProfile ? (
  //                 <GithubAcc />
  //               ) : (
  //                 <>
  //                   {userIsHunter ? (
  //                     <>
  //                       <HunterAcc />
  //                       <LogOutBtn />
  //                     </>
  //                   ) : (
  //                     <>
  //                       <CreateProfileBtn data-testid="create-profile-button" />
  //                       <LogOutBtn />
  //                     </>
  //                   )}
  //                 </>
  //               )}
  //             </div>
  //             <div className={styles.hideOnDesktop}>
  //               <HamburgerMenuMobileBtn
  //                 userHasProfile={userHasProfile}
  //                 userIsModerator={userIsModerator}
  //                 userIsHunter={userIsHunter}
  //               />
  //               <AppHeaderMobileSearchFilter />
  //             </div>
  //           </div>
  //         </Container>
  //       </header>
  //     )
  //   }

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.logoAndGhStarsWrapper}>
            <Link href={AppRoutes.profilesList} className={styles.logo}>
              <img src={logo.src} alt="Logo" />
              <div className={styles.title}>Good Dev Hunting</div>
            </Link>
            <div className={styles.hideOnMobile}>
              <GithubStarsButton />
            </div>
          </div>
          <div className={styles.hideOnDesktop}>
            <HamburgerMenuMobileBtn
              userHasProfile={userHasProfile}
              userIsModerator={userIsModerator}
            />
            <AppHeaderMobileSearchFilter />
          </div>
          <div className={styles.frameButtons}>
            {userIsModerator && <ModerationBtn />}
            {user ? (
              <>
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
              </>
            ) : (
              <>
                <LoginBtnsWrapper />
                <CreateProfileBtn />
              </>
            )}
          </div>

          {/* <div className={styles.frameButtons}>
            <LoginBtnsWrapper />
            <CreateProfileBtn />
          </div> */}
        </div>
      </Container>
    </header>
  )
}
export default Header
