'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import Image from 'next/image'
import UseYourProfileImg from '../../../assets/images/UseYourProfile.png'
import UseYourProfileLight from '../../../assets/images/UseYourProfileLight.webp'
import style from './UseYourProfile.module.scss'

export const ThemeImage = () => {
  const { isDarkTheme } = useThemeStore()

  return (
    <div className={style.profileImg}>
      <Image
        src={!isDarkTheme ? UseYourProfileLight : UseYourProfileImg}
        alt="Use your profile image"
      />
    </div>
  )
}
