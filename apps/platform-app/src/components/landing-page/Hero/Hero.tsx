import MyProfileBtn from '@/app/[locale]/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { HeroProfilesSection } from '@/components/landing-page/Hero/HeroProfilesSection'
import { I18nNamespaces } from '@/i18n/request'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { getTranslations } from 'next-intl/server'
import styles from './Hero.module.scss'

const Hero = async () => {
  const { userIsHunter, userHasProfile } = await getAuthorizedUser()
  const t = await getTranslations(I18nNamespaces.Index)

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
