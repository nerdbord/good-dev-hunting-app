import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import { ProfileCardWrapper } from '@/app/(profile)/(components)/ProfileCard/ProfileCardWrapper/ProfileCardWrapper'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { getAuthorizedUser } from '@/auth'
import { getRandomProfiles } from '@/backend/profile/profile.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import styles from './Hero.module.scss'

const Hero = async () => {
  // const session = await auth()
  // const user = session ? await findUserByEmail(session.user?.email) : null
  const { user } = await getAuthorizedUser()
  const [first, second, third] = await getRandomProfiles(3)

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>Let your next project find you</span>
        </div>
        <div className={styles.subtitle}>
          <p>
            Open source, free hub for software developers to be present and
            ready for next commission work.
          </p>
        </div>
        <div className={styles.buttons}>
          {user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
          <FindTalentsBtn variant={'secondary'} />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.section}>
          {first && (
            <div className={styles.frame1}>
              <ProfileCardWrapper profile={first} />
            </div>
          )}
          {second && (
            <div className={styles.frame2}>
              <ProfileCardWrapper profile={second} />
            </div>
          )}
          {third && (
            <div className={styles.frame3}>
              <ProfileCardWrapper profile={third} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default Hero
