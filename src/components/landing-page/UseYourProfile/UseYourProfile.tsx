import { authOptions } from '@/app/(auth)/auth'
import MyProfileBtn from '@/app/(profile)/(components)/MyProfileBtn/MyProfileBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { findUserByEmail } from '@/backend/user/user.service'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import UseYourProfileImg from '../../../assets/images/UseYourProfile.png'
import style from './UseYourProfile.module.scss'

const UseYourProfile = async () => {
  const session = await getServerSession(authOptions)

  const user = session ? await findUserByEmail(session.user.email) : null

  return (
    <section id="UseYourProfile" className={style.container}>
      <div className={style.profileImg}>
        <Image src={UseYourProfileImg} alt="Use your profile image" />
      </div>
      <div className={style.textContainer}>
        <p className={style.text}>
          Use your profile and share it with your friends! Join us in building
          the largest, free, open sourced platform dedicated to connecting
          software engineers with a world of development opportunities.
        </p>
        <div className={style.btn}>
          {user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
        </div>
      </div>
    </section>
  )
}

export default UseYourProfile
