import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import { ProfileCardWrapper } from '@/app/(profile)/(components)/ProfileCard/ProfileCardWrapper/ProfileCardWrapper'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { getRandomIndexes } from '@/utils/getRandomProfiles'
import { getServerSession } from 'next-auth'
import styles from './Hero.module.scss'
const Hero = async () => {
  const session = await getServerSession(authOptions)
  const profiles = await getPublishedProfilesPayload()
  const user = session ? await findUserByEmail(session.user.email) : null

  const randomIndexes = getRandomIndexes(profiles.length, 3)

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>Let your next</span>
          <span>employer find you</span>
        </div>
        <div className={styles.subtitle}>
          <p>Open sourced, free, hub for software developers to be present</p>
          <p>and ready for next commission work.</p>
        </div>
        <div className={styles.buttons}>
          {user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
          <FindTalentsBtn variant={'secondary'}>Find talents</FindTalentsBtn>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.section}>
          <div className={styles.frame1}>
            <ProfileCardWrapper profile={profiles[randomIndexes[0]]} />
          </div>
          <div className={styles.frame2}>
            <ProfileCardWrapper profile={profiles[randomIndexes[1]]} />
          </div>
          <div className={styles.frame3}>
            <ProfileCardWrapper profile={profiles[randomIndexes[2]]} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
