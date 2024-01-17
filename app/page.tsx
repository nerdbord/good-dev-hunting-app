import React from 'react'
import styles from './page.module.scss'
import classNames from 'classnames/bind'
import CreateProfileBtn from '@/components/CreateProfileBtn/CreateProfileBtn'
import ProfilePicture from '@/assets/images/ProfilePicture.png'
import Image from 'next/image'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { Container } from '@/components/Container/Container'

import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'

const Page: React.FC = () => {
  return (
    <Container>
      <MeetTeam />
    </Container>

  )
}
export default Page
