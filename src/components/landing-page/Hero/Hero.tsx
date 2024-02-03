import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import { findUserByEmail } from '@/backend/user/user.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import styles from './Hero.module.scss'

const Hero = async () => {
  const session = await getServerSession(authOptions)

  const user = session ? await findUserByEmail(session.user.email) : null

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
            <div className={styles.container}>
              <div className={styles.profile}>
                <Image src={ProfilePicture} alt="Profile Picture" />
              </div>
              <div className={styles.data}>
                <p className={styles.name}>Karolina Morwinska</p>
                <p className={styles.fullstack}>Senior Fullstack Developer</p>
                <p className={styles.location}>Poland, Warsaw / Remote</p>
              </div>
            </div>
            <div className={`${styles.technology} ${styles.fullstack}`}>
              <span>Javascript</span>
              <span>React</span>
              <span>Vue.js</span>
              <span>+5 more</span>
            </div>
          </div>
          <div className={styles.frame2}>
            <div className={styles.container}>
              <div className={styles.profile}>
                <Image src={ProfilePicture} alt="Profile Picture" />
              </div>
              <div className={styles.data}>
                <p className={styles.name}>Kristin Watson</p>
                <p className={styles.frontend}>Junior Frontend Developer</p>
                <p className={styles.location}>Poland, Warsaw / Remote</p>
              </div>
            </div>
            <div className={`${styles.technology} ${styles.frontend}`}>
              <span>Javascript</span>
              <span>React</span>
              <span>Vue.js</span>
              <span>+5 more</span>
            </div>
          </div>
          <div className={styles.frame3}>
            <div className={styles.container}>
              <div className={styles.profile}>
                <Image src={ProfilePicture} alt="Profile Picture" />
              </div>
              <div className={styles.data}>
                <p className={styles.name}>Veres Panna</p>
                <p className={styles.fullstack}>Mid Fullstack Developer</p>
                <p className={styles.location}>Poland, Warsaw / Remote</p>
              </div>
            </div>
            <div className={`${styles.technology} ${styles.fullstack}`}>
              <span>Javascript</span>
              <span>React</span>
              <span>Vue.js</span>
              <span>+5 more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
