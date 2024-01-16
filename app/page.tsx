import React from 'react'
import styles from './page.module.scss'
import classNames from 'classnames/bind'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import Image from 'next/image'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { Container } from '@/components/Container/Container'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'

const Page: React.FC = () => {
  return (
    <>
      <LandingFooter />
    </>
  )
}
export default Page
