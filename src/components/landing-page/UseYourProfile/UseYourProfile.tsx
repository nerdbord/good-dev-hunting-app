import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findProfileWithUserInclude } from '@/backend/profile/profile.service'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import UseYourProfileImg from '../../../assets/images/UseYourProfile.png'
import style from './UseYourProfile.module.scss'

const UseYourProfile = async () => {
  const session = await getServerSession(authOptions)

  const profile = session
    ? await findProfileWithUserInclude(session.user.email)
    : null

  return (
    <section id="UseYourProfile" className={style.container}>
      <div className={style.profileImg}>
        <Image src={UseYourProfileImg} alt="Use your profile image" />
      </div>
      <div className={style.textContainer}>
        <p className={style.text}>
          Join us in building the largest, free, open source platform dedicated
          to connecting software engineers with a world of development
          opportunities.
        </p>
        <div className={style.btn}>
          {profile ? <MyProfileBtn /> : <CreateProfileBtn />}
        </div>
      </div>
    </section>
  )
}

export default UseYourProfile
