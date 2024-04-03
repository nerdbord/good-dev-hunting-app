import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findUserByEmail } from '@/backend/user/user.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { HeroProfilesSection } from '@/components/landing-page/Hero/HeroProfilesSection'
import { getServerSession } from 'next-auth'
import styles from './Hero.module.scss'

const Hero = async () => {
  const session = await getServerSession(authOptions)
  const user = session ? await findUserByEmail(session.user.email) : null

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

      <HeroProfilesSection />
    </section>
  )
}
export default Hero
