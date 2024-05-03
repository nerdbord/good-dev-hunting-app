import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { HeroProfilesSection } from '@/components/landing-page/Hero/HeroProfilesSection'
import { useTranslations } from 'next-intl'
import styles from './Hero.module.scss'

const Hero = async () => {
  const t = useTranslations('Index')

  const { user, userIsHunter, userHasProfile } = await getAuthorizedUser()

  return (
    <section id="hero" className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>{t('hero')}</span>
        </div>
        <div className={styles.subtitle}>
          <p>{t('opensource')}</p>
        </div>
        <div className={styles.buttons}>
          {!userIsHunter && (
            <>{userHasProfile ? <MyProfileBtn /> : <CreateProfileBtn />}</>
          )}
          <FindTalentsBtn variant={'secondary'} />
        </div>
      </div>

      <HeroProfilesSection />
    </section>
  )
}
export default Hero
