import style from './UseYourProfile.module.scss'
import UseYourProfileImg from '../../../assets/images/UseYourProfile.png'
import Image from 'next/image'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserByEmail } from '@/backend/user/user.service'
import MyProfileBtn from '@/components/MyProfileBtn/MyProfileBtn'

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
          Use your profile and share it with your friend! Help us build the
          biggest, free, open sourced platform for connecting software engineers
          with people with dev stuff to do.
        </p>
        <div className={style.btn}>
          {user?.profile ? <MyProfileBtn /> : <CreateProfileBtn />}
        </div>
      </div>
    </section>
  )
}

export default UseYourProfile
