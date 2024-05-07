import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import MyProfileBtn from '@/app/[locale]/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findProfileWithUserInclude } from '@/backend/profile/profile.service'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import UseYourProfileImg from '../../../assets/images/UseYourProfile.png'
import style from './UseYourProfile.module.scss'

const UseYourProfile = async () => {
  const t = await getTranslations('UserProfile')
  const { user } = await getAuthorizedUser()
  const profile = user ? await findProfileWithUserInclude(user.email) : null

  return (
    <section id="UseYourProfile" className={style.container}>
      <div className={style.profileImg}>
        <Image src={UseYourProfileImg} alt="Use your profile image" />
      </div>
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
