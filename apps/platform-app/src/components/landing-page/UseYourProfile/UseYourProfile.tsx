import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import MyProfileBtn from '@/app/[locale]/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findProfileWithUserInclude } from '@/backend/profile/profile.service'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import { ThemeImage } from './ThemeImage'
import style from './UseYourProfile.module.scss'

const UseYourProfile = async () => {
  const t = await getTranslations(I18nNamespaces.UserProfile)
  const { user } = await getAuthorizedUser()
  const profile = user ? await findProfileWithUserInclude(user.email) : null

  return (
    <section id="UseYourProfile" className={style.container}>
      <ThemeImage />
      <div className={style.textContainer}>
        <p className={style.text}>{t('howItWork')}</p>
        <div className={style.btn}>
          {profile ? <MyProfileBtn /> : <CreateProfileBtn />}
        </div>
      </div>
    </section>
  )
}

export default UseYourProfile
