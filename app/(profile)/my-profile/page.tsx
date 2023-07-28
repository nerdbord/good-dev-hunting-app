import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  // 1. Wyciągnąć z sesji token z requesta w tym widoku
  // https://stackoverflow.com/questions/69057271/why-are-cookies-not-sent-to-the-server-via-getserversideprops-in-next-js/69058105#69058105

  const response = await fetch('http://localhost:3000/api/profiles/me', {
    method: 'GET',
    headers: {
      // 2. Dodać do nagłówka requesta token z sesji
      Cookie: 'token do autoryzacji',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.log('RESPONSE NIE JEST OK')
  }

  const textResponse = await response.text()
  console.log('RESPONSE TEKST: ', textResponse)

  let profile
  try {
    profile = JSON.parse(textResponse)
    console.log('TEST FULL NAME TO', profile.fullName)
  } catch (error) {
    console.error('STĄD BŁĘDY WYSZLI', error)
  }

  return (
    <div className={styles.wrapper}>
      <ProfileTopBar />
      <ProfileMain />
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage
